import { CharacterData } from "@/types/characters";
import { Card, Image } from "antd";
import Meta from "antd/es/card/Meta";

interface CharacterProps {
  character: CharacterData;
}

const CharacterCard: React.FC<CharacterProps> = ({ character }) => {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
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
  );
};

export { CharacterCard };
