"use server";

import api from "@/services/api";
import { CharacterData } from "@/types/characters";
import { ComicData } from "@/types/comics";

export async function getCharacters(name?: string): Promise<CharacterData[]> {
  const params: { [key: string]: string | number | undefined } = {
    limit: 100,
    ts: 1,
    apikey: process.env.PUBLIC_KEY,
    hash: process.env.HASH,
  };

  if (name) {
    params.nameStartsWith = name;
  }

  const response = await api.get("/characters", { params });
  const characters: CharacterData[] = response.data.data.results;
  return characters as CharacterData[];
}

export async function getComics(characterId: number): Promise<ComicData[]> {
  const params: { [key: string]: string | number | undefined } = {
    limit: 8,
    ts: 1,
    apikey: process.env.PUBLIC_KEY,
    hash: process.env.HASH,
  };

  const response = await api.get(`/characters/${characterId}/comics`, {
    params,
  });
  const characters: ComicData[] = response.data.data.results;
  return characters as ComicData[];
}
