"use client";

import { Flex, Image, Input, Layout } from "antd";
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
import Search from "antd/es/input/Search";
import { get } from "http";

export const HomePage = () => {
  const marvelLogo = "/marvel_logo.svg";

  const [characters, setCharacters] = useState<CharacterData[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getCharacters();
  }, []);

  async function getCharacters(name?: string) {
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
    setCharacters(characters);
    // return characters;
  }
  function handleSearch() {
    getCharacters(search);
  }

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "transparent",
          gap: 20,
        }}
      >
        <Image height={40} src={marvelLogo} alt="marvel logo" preview={false} />
        <Search
          placeholder="Busque por um personagem"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={handleSearch}
          enterButton
        />
      </Header>
      <Flex gap={20} justify="center" align="center" wrap="wrap">
        {characters.map((character) => (
          <CharacterCard character={character} key={character.id} />
        ))}
      </Flex>
    </Layout>
  );
};
