import { useMessages } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowRight, Shield, Lock, Eye, Cpu, ChevronRight } from 'lucide-react';
import ArticleCard from '@/components/ArticleCard';

type PageProps = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: PageProps) {
  const t = await getTranslations({ locale, namespace: 'hero' });
  return {
    title: `Keypoint - ${t('title')}`,
    description: t('subtitle'),
  };
}

export default function HomePage({ params: { locale } }: PageProps) {
  const messages = useMessages() as { articles: Record<string, { title: string; description: string; category: string }> };

  const articles = messages.articles || {};
  const articleEntries = Object.entries(articles);

  // Get featured articles (first 3)
  const featuredArticles = articleEntries.slice(0, 3).map(([slug, article]) => ({
    slug,
    ...article,
    readTime: 5,
    featured: true,
  }));

  const topics = [
    {
      icon: Lock,
      title: 'Beginner',
      description: 'Start your privacy journey with fundamentals',
      href: `/${locale}/articles?level=beginner`,
      color: 'bg-green-500',
    },
    {
      icon: Eye,
      title: 'Intermediate',
      description: 'Deepen your understanding of digital privacy',
      href: `/${locale}/articles?level=intermediate`,
      color: 'bg-blue-500',
    },
    {
      icon: Cpu,
      title: 'Advanced',
      description: 'Master advanced privacy techniques',
      href: `/${locale}/articles?level=advanced`,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMCAwdi02aC02djZoNnptLTYgNmgtNnY2aDZ2LTZ6bTYgMGg2djZoLTZ2LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Your Privacy, Your Control
            </h1>
            <p className="text-lg sm:text-xl text-primary-100 mb-8 animate-slide-up">
              Empowering you with knowledge to protect your digital life. From beginner basics to advanced security strategies.
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-up">
              <Link
                href={`/${locale}/articles`}
                className="btn-primary flex items-center gap-2"
              >
                Start Learning
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link
                href="#featured"
                className="btn bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm flex items-center gap-2"
              >
                Explore Topics
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section id="featured" className="py-16 lg:py-24 bg-gray-50" aria-labelledby="featured-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="featured-heading" className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Featured Articles
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Essential privacy guides to get you started
            </p>
            <Link
              href={`/${locale}/articles`}
              className="inline-flex items-center gap-2 mt-6 text-primary-600 font-medium hover:text-primary-700 transition-colors"
            >
              View All Articles
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-16 lg:py-24 bg-white" aria-labelledby="topics-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="topics-heading" className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Explore Topics
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose your starting point and build your privacy knowledge step by step
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topics.map((topic) => (
              <Link
                key={topic.title}
                href={topic.href}
                className="group p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 hover:shadow-lg"
              >
                <div className={`w-12 h-12 rounded-xl ${topic.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <topic.icon className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{topic.title}</h3>
                <p className="text-gray-600 mb-4">{topic.description}</p>
                <span className="inline-flex items-center gap-2 text-primary-600 font-medium group-hover:gap-3 transition-all">
                  Explore
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats/Trust Section */}
      <section className="py-16 bg-gray-900 text-white" aria-label="Keypoint statistics">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-400 mb-2">50+</div>
              <div className="text-gray-400">Privacy Articles</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-400 mb-2">2</div>
              <div className="text-gray-400">Languages</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-400 mb-2">100K+</div>
              <div className="text-gray-400">Readers Monthly</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-400 mb-2">4.9</div>
              <div className="text-gray-400">Reader Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-primary-600" aria-labelledby="cta-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-16 h-16 text-primary-200 mx-auto mb-6" aria-hidden="true" />
          <h2 id="cta-heading" className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Take Control of Your Digital Privacy
          </h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Start your journey to better privacy today. Our beginner-friendly guides make complex topics easy to understand.
          </p>
          <Link
            href={`/${locale}/articles`}
            className="btn bg-white text-primary-600 hover:bg-primary-50 font-semibold px-8 py-4 inline-flex items-center gap-2"
          >
            Start Learning Now
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
