"use client";

import { Flex, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import api from "@/services/api";
import { CharacterCard } from "@/components/CharacterCard";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { CharacterData } from "@/types/characters";
import { useEffect, useState } from "react";

async function getCharacters() {
  const response = await api.get("/characters", {
    params: {
      limit: 100,
      ts: 1,
      apikey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
      hash: process.env.NEXT_PUBLIC_HASH,
    },
  });
  const characters: CharacterData[] = response.data.data.results;
  return characters;
}

export const HomePage = () => {
  const [characters, setCharacters] = useState<CharacterData[]>([]);

  useEffect(() => {
    getCharacters().then((data) => setCharacters(data));
  }, []);

  return (
    <Layout>
      <Header>opa</Header>
      <Flex gap={20} justify="center" align="center" wrap="wrap">
        {characters.map((character) => (
          <CharacterCard character={character} key={character.id} />
        ))}
      </Flex>
    </Layout>
  );
};
