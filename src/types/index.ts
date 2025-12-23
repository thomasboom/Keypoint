import { locales } from '@/i18n';

export type Locale = (typeof locales)[number];

export interface Article {
  slug: string;
  title: string;
  description: string;
  category: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Gevorderd';
  keywords?: string[];
  readTime?: number;
  publishedDate?: string;
  updatedDate?: string;
  author?: string;
}

export interface PageProps {
  params: { locale: string };
}

export interface ArticlePageProps extends PageProps {
  params: PageProps['params'] & { slug: string };
}

export interface SearchPageProps extends PageProps {
  searchParams: { q?: string };
}
