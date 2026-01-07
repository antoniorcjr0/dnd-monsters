import { fetchJson } from "@/lib/fetcher";
import type { MonsterDetails, MonsterListResponse } from "../types";

const API_BASE_URL = "https://www.dnd5eapi.co";

export async function fetchMonstersList(): Promise<MonsterListResponse> {
  return fetchJson<MonsterListResponse>("/api/monsters", {
    baseUrl: API_BASE_URL,
  });
}

export async function fetchMonsterByIndex(index: string): Promise<MonsterDetails> {
  return fetchJson<MonsterDetails>(`/api/monsters/${index}`, {
    baseUrl: API_BASE_URL,
  });
}
