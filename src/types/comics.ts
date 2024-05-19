export interface ComicData {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: TextObject[];
  resourceURI: string;
  urls: Url[];
  series: Series;
  variants: any[];
  collections: any[];
  collectedIssues: any[];
  dates: Date[];
  prices: Price[];
  thumbnail: Image;
  images: Image[];
  creators: Creators;
  characters: Characters;
  stories: Stories;
  events: Events;
}

interface TextObject {
  type: string;
  language: string;
  text: string;
}

interface Url {
  type: string;
  url: string;
}

interface Series {
  resourceURI: string;
  name: string;
}

interface Date {
  type: string;
  date: string;
}

interface Price {
  type: string;
  price: number;
}

interface Image {
  path: string;
  extension: string;
}

interface Creators {
  available: number;
  collectionURI: string;
  items: Creator[];
  returned: number;
}

interface Creator {
  resourceURI: string;
  name: string;
  role: string;
}

interface Characters {
  available: number;
  collectionURI: string;
  items: Character[];
  returned: number;
}

interface Character {
  resourceURI: string;
  name: string;
}

interface Stories {
  available: number;
  collectionURI: string;
  items: Story[];
  returned: number;
}

interface Story {
  resourceURI: string;
  name: string;
  type: string;
}

interface Events {
  available: number;
  collectionURI: string;
  items: any[];
  returned: number;
}
