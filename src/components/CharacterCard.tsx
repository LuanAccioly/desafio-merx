import { getComics } from "@/app/actions";
import { CharacterData } from "@/types/characters";
import { ComicData } from "@/types/comics";
import { Card, Carousel, Flex, Image, Modal } from "antd";
import Meta from "antd/es/card/Meta";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { use, useEffect, useState } from "react";

interface CharacterProps {
  character: CharacterData;
}

interface ComicProps {
  characterID: number;
}

const CharacterCard: React.FC<CharacterProps> = ({ character }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            height={250}
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
        <Flex style={{ flexDirection: "row" }}>
          <Image
            style={{ objectFit: "cover", borderRadius: 10 }}
            width={300}
            height={300}
            alt={character.name}
            src={character.thumbnail.path + "." + character.thumbnail.extension}
          />
          <Paragraph style={{ flex: 1, margin: 10, fontSize: 16 }}>
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

  useEffect(() => {
    const getData = async () => {
      const data = await getComics(characterID);
      setComics(data);
    };
    getData();
  }, []);

  return (
    <Flex
      style={{
        flexDirection: "column",
        // backgroundColor: "#EC1D24",
        marginTop: "20px",
        borderRadius: 10,
        padding: 10,
      }}
    >
      <Title style={{ marginTop: 10 }} level={4}>
        Comics
      </Title>
      <Carousel
        style={{
          width: "100%",
          height: "400px",
        }}
        autoplay={true}
        draggable
        slidesToShow={3}
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
  return (
    <Card
      key={comic.id}
      hoverable
      style={{ width: 200, height: 380, margin: 10 }}
      cover={
        <Image
          style={{ objectFit: "cover" }}
          height={300}
          preview={false}
          alt={comic.title}
          src={comic.thumbnail.path + "." + comic.thumbnail.extension}
        />
      }
    >
      <Meta title={comic.title} description={"#" + comic.id} />
    </Card>
  );
};
{
  /* <Flex style={{ flexDirection: "row", flexWrap: "wrap" }}>
  {comics.map((comic) => (
    <Card
      key={comic.id}
      hoverable
      style={{ width: 180, height: 200, margin: 10 }}
      cover={
        <Image
          style={{ objectFit: "cover" }}
          height={250}
          preview={false}
          alt={comic.title}
          src={comic.thumbnail.path + "." + comic.thumbnail.extension}
        />
      }
    >
      <Meta title={comic.title} description={"#" + comic.id} />
    </Card>
  ))}
</Flex> */
}

export { CharacterCard };
