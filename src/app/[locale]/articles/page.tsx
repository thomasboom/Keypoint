import { getTranslations } from 'next-intl/server';
import { useMessages } from 'next-intl';
import Link from 'next/link';
import { Filter, Search } from 'lucide-react';
import ArticleCard from '@/components/ArticleCard';

type PageProps = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: PageProps) {
  const t = await getTranslations({ locale, namespace: 'nav' });
  return {
    title: `${t('articles')} - Keypoint`,
  };
}

export default function ArticlesPage({ params: { locale } }: PageProps) {
  const messages = useMessages() as { articles: Record<string, { title: string; description: string; category: string }> };

  const articles = messages.articles || {};
  const articleEntries = Object.entries(articles);

  const categories = ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Gevorderd'];

  const filteredArticles = articleEntries.map(([slug, article]) => ({
    slug,
    ...article,
    readTime: 5,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Articles
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Explore our comprehensive collection of privacy guides, from basic security tips to advanced protection strategies.
          </p>

          {/* Search Bar */}
          <div className="mt-6 relative max-w-xl">
            <form action={`/${locale}/search`} method="GET">
              <label htmlFor="search" className="sr-only">Search</label>
              <input
                type="search"
                name="q"
                id="search"
                placeholder="Search privacy topics..."
                className="input pl-10 pr-4"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
            </form>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-2 text-sm font-medium text-gray-500 mr-2">
              <Filter className="w-4 h-4" aria-hidden="true" />
              Filter by level:
            </span>
            <Link
              href={`/${locale}/articles`}
              className="px-4 py-2 rounded-full text-sm font-medium bg-primary-600 text-white"
            >
              All
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/${locale}/articles?level=${category.toLowerCase()}`}
                className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12" aria-label="Articles list">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No articles found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Pagination */}
      <section className="py-8 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
            <span className="px-4 py-2 text-sm text-gray-400">Page 1 of 1</span>
          </nav>
        </div>
      </section>
    </div>
  );
}
