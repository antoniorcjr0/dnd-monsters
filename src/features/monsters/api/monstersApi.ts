import { fetchJson } from "@/lib/fetcher";
import { isNotFoundError } from "./errors";
import type { MonsterDetails, MonsterListResponse } from "../types";

const API_BASE_URL = "https://www.dnd5eapi.co";

export async function fetchMonstersList(): Promise<MonsterListResponse> {
  return fetchJson<MonsterListResponse>("/api/monsters", {
    baseUrl: API_BASE_URL,
  });
}

export async function fetchMonsterByIndex(index: string): Promise<MonsterDetails> {
  const encodedIndex = encodeURIComponent(index);

  try {
    return await fetchJson<MonsterDetails>(`/api/2014/monsters/${encodedIndex}`, {
      baseUrl: API_BASE_URL,
    });
  } catch (error) {
    if (isNotFoundError(error)) {
      return fetchJson<MonsterDetails>(`/api/monsters/${encodedIndex}`, {
        baseUrl: API_BASE_URL,
      });
    }
    throw error;
  }
}
