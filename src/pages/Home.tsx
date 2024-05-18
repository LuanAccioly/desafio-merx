"use client";

import { Flex, Image, Input, Layout, Switch } from "antd";
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
import { Space, Typography } from "antd";

export const HomePage = () => {
  const marvelLogo = "/marvel_logo.svg";

  const [characters, setCharacters] = useState<CharacterData[]>([]);
  const [search, setSearch] = useState("");
  const [ignoreIncomplete, setIgnoreIncomplete] = useState(false);
  const { Text } = Typography;

  useEffect(() => {
    getCharacters();
  }, []);

  useEffect(() => {
    if (ignoreIncomplete) {
      const filteredCharacters = characters.filter(
        (character) => !character.thumbnail.path.includes("image_not_available")
      );
      setCharacters(filteredCharacters);
    } else {
      getCharacters(search);
    }
  }, [ignoreIncomplete]);

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
  }
  function handleSearch() {
    getCharacters(search);
  }

  function handleIgnoreIncomplete() {
    setIgnoreIncomplete((prev) => !prev);
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
      <Flex
        style={{
          flexDirection: "column",
          padding: "0px 40px",
        }}
        justify="flex-end"
        align="end"
        gap="20px"
      >
        <Flex
          style={{ width: "300px", paddingRight: "10px" }}
          gap="10px"
          justify="flex-end"
        >
          <Text>Ignorar incompletos</Text>
          <Switch
            checked={ignoreIncomplete}
            onChange={handleIgnoreIncomplete}
          />
        </Flex>
        <Flex gap={20} justify="center" align="center" wrap="wrap">
          {characters.map((character) => (
            <CharacterCard character={character} key={character.id} />
          ))}
        </Flex>
      </Flex>
    </Layout>
  );
};
