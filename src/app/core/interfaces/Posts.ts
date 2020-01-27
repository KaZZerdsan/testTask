export interface Posts {
  'totalItems': number;
  'itemsPerPage': number;
  'countOfPages': number;
  'data': Post[];
}

export interface Post {
  'id': number;
  'name': string;
  'description': string;
  'new': boolean;
  'popular': boolean;
  'image': Image;
}

export interface Image {
  'id': number;
  'contentUrl': string;
}

export interface ShowImage {
  name: string;
  description: string;
  url: string;
  popular: boolean;
}
