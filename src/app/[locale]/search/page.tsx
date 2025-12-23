'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';
import ArticleCard from '@/components/ArticleCard';
import { useMessages } from 'next-intl';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const locale = params.locale as string || 'en';
  const query = searchParams.get('q') || '';

  const t = useTranslations('search');
  const tn = useTranslations('nav');
  const messages = useMessages() as { articles: Record<string, { title: string; description: string; category: string }> };
  const articles = messages.articles || {};

  // Simple search implementation
  const results = Object.entries(articles).filter(([slug, article]) => {
    if (!query) return false;
    const searchLower = query.toLowerCase();
    return (
      article.title.toLowerCase().includes(searchLower) ||
      article.description.toLowerCase().includes(searchLower) ||
      article.category.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            {t('results')}
          </h1>

          {/* Search Form */}
          <form action={`/${locale}/search`} method="GET" className="relative max-w-xl">
            <label htmlFor="search" className="sr-only">{tn('search')}</label>
            <input
              type="search"
              name="q"
              id="search"
              defaultValue={query}
              placeholder={tn('searchPlaceholder')}
              className="input pl-12 pr-4 py-4 text-lg"
              autoFocus
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
          </form>

          {query && (
            <p className="mt-4 text-gray-600">
              {results.length} {results.length === 1 ? 'result' : 'results'} for "{query}"
            </p>
          )}
        </div>
      </header>

      {/* Results */}
      <section className="py-12" aria-label="Search results">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map(([slug, article]) => (
                <ArticleCard
                  key={slug}
                  slug={slug}
                  title={article.title}
                  description={article.description}
                  category={article.category}
                  readTime={5}
                />
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" aria-hidden="true" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {t('noResults')}
              </h2>
              <p className="text-gray-600 mb-6">
                {t('tryDifferent')}
              </p>
              <Link
                href={`/${locale}/articles`}
                className="btn-primary inline-flex items-center gap-2"
              >
                Browse All Articles
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">
                Enter a search term to find articles
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
