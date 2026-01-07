'use client';

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Button,
  EmptyState,
  ErrorState,
  Heading,
  Input,
  Loader,
  Skeleton,
  Text,
} from "@/design-system";
import { getApiErrorMessage } from "../api/errors";
import { fetchMonstersList } from "../api/monstersApi";
import type { MonsterListItem } from "../types";
import { MonsterCard } from "./MonsterCard";

const SUGGESTION_LIMIT = 6;

export function MonsterList() {
  const [monsters, setMonsters] = useState<MonsterListItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchMonstersList()
      .then((data) => {
        if (cancelled) return;
        setMonsters(data.results);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(getApiErrorMessage(err));
      })
      .finally(() => {
        if (cancelled) return;
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const query = searchTerm.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!query) return monsters;
    return monsters.filter((monster) => monster.name.toLowerCase().includes(query));
  }, [monsters, query]);

  const suggestions = query ? filtered.slice(0, SUGGESTION_LIMIT) : [];

  const renderLoadingState = () => (
    <section className="space-y-4">
      <div className="space-y-2">
        <Heading as="h1" size="lg">
          Monsters
        </Heading>
        <Text variant="secondary" size="sm">
          Fetching the codex...
        </Text>
      </div>
      <Loader />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="rounded-lg border border-border bg-surface p-4">
            <Skeleton className="mb-3 h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </section>
  );

  if (isLoading) {
    return renderLoadingState();
  }

  if (error) {
    return (
      <ErrorState
        title="Unable to load monsters"
        message={error}
        action={
          <Button variant="secondary" onClick={() => location.reload()}>
            Retry
          </Button>
        }
      />
    );
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Heading as="h1" size="lg">
          Monsters
        </Heading>
        <Text variant="secondary" size="sm">
          Browse the codex and jump into details.
        </Text>
      </div>

      <div className="relative">
        <Input
          placeholder="Search monsters..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        {query ? (
          <div className="absolute left-0 right-0 z-10 mt-2 max-h-64 overflow-y-auto rounded-md border border-border bg-surface shadow-md">
            {suggestions.length ? (
              suggestions.map((monster) => (
                <button
                  key={monster.index}
                  type="button"
                  className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-text-primary hover:bg-surface-strong"
                  onMouseDown={(event) => {
                    event.preventDefault();
                    setSearchTerm(monster.name);
                  }}
                >
                  <span>{monster.name}</span>
                  <span className="text-xs uppercase text-text-muted">{monster.index}</span>
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-text-muted">No matches.</div>
            )}
          </div>
        ) : null}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No monsters found"
          message="Try another search term or reset your query."
          action={
            query ? (
              <Button variant="secondary" onClick={() => setSearchTerm("")}>
                Clear search
              </Button>
            ) : null
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((monster) => (
            <Link key={monster.index} href={`/monsters/${monster.index}`} className="block">
              <MonsterCard monster={monster} />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
