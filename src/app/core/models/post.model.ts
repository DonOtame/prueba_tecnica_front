import { CommentItem } from '.';

export interface PostsList {
  data: PostItemData[];
  message: string;
}

export interface PostItem {
  data: PostItemData;
  message: string;
}

export interface PostItemData {
  id: number;
  title: string;
  content: string;
  authorUsername: string;
  comments?: CommentItem[];
}
