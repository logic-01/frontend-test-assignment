export interface Post {
  userId: number;
  title: string;
  body: string;
}

export interface IncomingPost extends Post {
  id: number;
}
