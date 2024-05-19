"use server";

import api from "@/services/api";
import { CharacterData } from "@/types/characters";

export async function getCharacters(name?: string): Promise<CharacterData[]> {
  const params: { [key: string]: string | number | undefined } = {
    limit: 100,
    ts: 1,
    apikey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
    hash: process.env.NEXT_PUBLIC_HASH,
  };

  if (name) {
    params.nameStartsWith = name;
  }

  const response = await api.get("/characters", { params });
  const characters: CharacterData[] = response.data.data.results;
  return characters as CharacterData[];
}
