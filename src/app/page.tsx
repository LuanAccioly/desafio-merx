"use client";

import { Flex, Image, Layout, Spin, Switch } from "antd";
import { Header } from "antd/es/layout/layout";
import { CharacterCard } from "@/components/CharacterCard";
import { CharacterData } from "@/types/characters";
import { useEffect, useState } from "react";
import { Typography } from "antd";
import Search from "antd/es/input/Search";
import { getCharacters } from "./actions";

export default function Home() {
  const marvelLogo = "/marvel_logo.svg";
  const [characters, setCharacters] = useState<CharacterData[]>([]);
  const [search, setSearch] = useState("");
  const [ignoreIncomplete, setIgnoreIncomplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { Text } = Typography;

  useEffect(() => {
    const getData = async () => {
      const data = await getCharacters();
      setCharacters(data);
      setIsLoading(false);
    };
    getData();
  }, []);

  async function handleSearch() {
    setIsLoading(true);
    const data = await getCharacters(search);
    setCharacters(data);
    setIsLoading(false);
  }

  async function handleLogo() {
    setSearch("");
    setIsLoading(true);
    const data = await getCharacters();
    setCharacters(data);
    setIsLoading(false);
  }

  function handleIgnoreIncomplete() {
    setIgnoreIncomplete((prev) => !prev);
  }

  return (
    <Layout style={{ height: "100%", minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "transparent",
          gap: 20,
        }}
      >
        <Image
          onClick={handleLogo}
          height={40}
          src={marvelLogo}
          alt="marvel logo"
          preview={false}
          style={{ cursor: "pointer" }}
        />
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
          padding: "0px 40px 40px",
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
          <Text>Ignorar resultados sem imagem</Text>
          <Switch
            checked={ignoreIncomplete}
            onChange={handleIgnoreIncomplete}
          />
        </Flex>
        {isLoading ? (
          <Flex
            style={{ width: "100%", height: "90vh" }}
            justify="center"
            align="center"
          >
            <Spin size="large" />
          </Flex>
        ) : (
          <Flex
            style={{ width: "100%" }}
            gap={20}
            justify="center"
            align="center"
            wrap="wrap"
          >
            {characters
              .filter((character) => {
                if (
                  ignoreIncomplete &&
                  character.thumbnail.path.includes("image_not_available")
                ) {
                  return false;
                }
                return true;
              })
              .map((character) => (
                <CharacterCard character={character} key={character.id} />
              ))}
          </Flex>
        )}
      </Flex>
    </Layout>
  );
}
