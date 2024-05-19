import { getComics } from "@/app/actions";
import { CharacterData } from "@/types/characters";
import { ComicData } from "@/types/comics";
import { Card, Carousel, Flex, Image, Modal, Spin } from "antd";
import Meta from "antd/es/card/Meta";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { CSSProperties } from "react";
import { Grid } from "antd";
import { get } from "http";

interface CharacterProps {
  character: CharacterData;
}

interface ComicProps {
  characterID: number;
}

type StylesType = {
  Input: CSSProperties;
  OtherComponent: CSSProperties;
};

const CharacterCard: React.FC<CharacterProps> = ({ character }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { useBreakpoint } = Grid;

  // Change the slidesToShow according to the screen size
  function getFlexOrientation(screen: any) {
    if (screen.md) {
      return "row";
    }
    if (screen.sm) {
      return "row";
    }
    return "column";
  }

  function getAlignItems(screen: any) {
    if (screen.md) {
      return "flex-start";
    }
    if (screen.sm) {
      return "center";
    }
    return "center";
  }

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card
        hoverable
        style={{ width: 240 }}
        onClick={showModal}
        cover={
          <Image
            style={{ objectFit: "cover" }}
            height={"50%"}
            preview={false}
            alt={character.name}
            src={character.thumbnail.path + "." + character.thumbnail.extension}
          />
        }
      >
        <Meta title={character.name} description={"#" + character.id} />
      </Card>
      <Modal
        title={character.name}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={800}
        centered
      >
        <Flex
          style={{
            flexDirection: getFlexOrientation(useBreakpoint()),
            margin: "10 0",
            gap: 10,
          }}
          align={getAlignItems(useBreakpoint())}
        >
          <Image
            style={{ objectFit: "cover", borderRadius: 10 }}
            width={"40%"}
            height={"50%"}
            alt={character.name}
            src={character.thumbnail.path + "." + character.thumbnail.extension}
          />
          <Paragraph style={{ flex: 1, fontSize: 16 }}>
            {character.description
              ? character.description
              : "No description available"}
          </Paragraph>
        </Flex>
        <ComicsCarousel characterID={character.id} />
      </Modal>
    </>
  );
};

const ComicsCarousel: React.FC<ComicProps> = ({ characterID }) => {
  const [comics, setComics] = useState<ComicData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { useBreakpoint } = Grid;

  // Change the slidesToShow according to the screen size
  function getSlidesToShow(screen: any) {
    if (screen.md) {
      return 3;
    }
    if (screen.sm) {
      return 2;
    }
    return 1;
  }

  useEffect(() => {
    const getData = async () => {
      const data = await getComics(characterID);
      setComics(data);
      setIsLoading(false);
    };
    getData();
  }, []);

  return (
    <Flex
      style={{
        flexDirection: "column",
        marginTop: "30px",
        borderRadius: 10,
      }}
    >
      <Title level={4}>Comics</Title>

      {isLoading && <Spin />}
      {!isLoading && comics.length === 0 && (
        <Paragraph>No comics available</Paragraph>
      )}
      <Carousel
        style={{
          width: "100%",
          height: "400px",
          gap: 10,
        }}
        autoplay={true}
        draggable
        slidesToShow={getSlidesToShow(useBreakpoint())}
        arrows
        infinite={false}
      >
        {comics.map((comic) => (
          <Comic key={comic.id} {...comic} />
        ))}
      </Carousel>
    </Flex>
  );
};

const Comic = (comic: ComicData) => {
  const { useBreakpoint } = Grid;

  function getComicWidth(screen: any) {
    if (screen.md) {
      return "80%";
    }
    if (screen.sm) {
      return "60%";
    }
    return "100%";
  }

  return (
    <Card
      key={comic.id}
      // hoverable
      style={{
        width: getComicWidth(useBreakpoint()),
        height: 380,
      }}
      cover={
        <Image
          style={{ objectFit: "cover" }}
          height={300}
          alt={comic.title}
          src={comic.thumbnail.path + "." + comic.thumbnail.extension}
        />
      }
    >
      <Meta title={comic.title} description={"#" + comic.id} />
    </Card>
  );
};

export { CharacterCard };
