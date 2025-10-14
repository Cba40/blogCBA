// src/types/Article.ts

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string; 
  readtime: number; 
  category: string;
  image: string;
  featured: boolean | null; 
}