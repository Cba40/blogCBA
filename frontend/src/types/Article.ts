export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: number;
  category: 'ia' | 'gadgets' | 'iot' | 'software'; // ✅ Tipado más seguro
  image: string;
  featured?: boolean;
}