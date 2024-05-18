interface Thumbnail {
  path: string;
  extension: string;
}

interface ComicItem {
  resourceURI: string;
  name: string;
}

interface Comic {
  available: number;
  collectionURI: string;
  items: ComicItem[];
  returned: number;
}

interface SeriesItem {
  resourceURI: string;
  name: string;
}

interface Series {
  available: number;
  collectionURI: string;
  items: SeriesItem[];
  returned: number;
}

interface StoryItem {
  resourceURI: string;
  name: string;
  type: string;
}

interface Story {
  available: number;
  collectionURI: string;
  items: StoryItem[];
  returned: number;
}

interface EventItem {
  resourceURI: string;
  name: string;
}

interface Event {
  available: number;
  collectionURI: string;
  items: EventItem[];
  returned: number;
}

interface Url {
  type: string;
  url: string;
}

export interface CharacterData {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics: Comic;
  series: Series;
  stories: Story;
  events: Event;
  urls: Url[];
}