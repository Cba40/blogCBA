export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  date: string;
  readTime: number;
  category: string;
  image: string;
  featured?: boolean;
}