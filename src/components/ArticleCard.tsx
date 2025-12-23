'use client';

import { useMessages } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Clock, ArrowRight, Lock, Shield, Cpu } from 'lucide-react';

interface ArticleCardProps {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime?: number;
  featured?: boolean;
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Beginner: Lock,
  'Gevorderd': Lock,
  Intermediate: Shield,
  Advanced: Cpu,
  Expert: Cpu,
};

const categoryColors: Record<string, string> = {
  Beginner: 'badge-beginner',
  'Gevorderd': 'badge-intermediate',
  Intermediate: 'badge-intermediate',
  Advanced: 'badge-advanced',
  Expert: 'badge-advanced',
};

const ArticleCard = ({
  slug,
  title,
  description,
  category,
  readTime = 5,
  featured = false,
}: ArticleCardProps) => {
  const params = useParams();
  const locale = params.locale as string || 'en';
  const messages = useMessages() as { articles?: Record<string, { keywords?: string[] }> };
  const articleKey = Object.keys(messages.articles || {}).find(
    (key) => (messages.articles?.[key] as unknown as { title?: string })?.title === title
  );
  const keywords = articleKey ? (messages.articles?.[articleKey] as unknown as { keywords?: string[] })?.keywords : [];

  const CategoryIcon = categoryIcons[category] || Shield;
  const colorClass = categoryColors[category] || 'badge bg-gray-100 text-gray-800';

  return (
    <article
      className={`card group h-full ${featured ? 'ring-2 ring-primary-500' : ''}`}
      aria-labelledby={`article-${slug}-title`}
    >
      <div className="card-body flex flex-col h-full">
        {/* Category and read time */}
        <div className="flex items-center justify-between mb-3">
          <span className={`${colorClass} flex items-center gap-1`}>
            <CategoryIcon className="w-3 h-3" aria-hidden="true" />
            {category}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400" aria-label={`${readTime} min read`}>
            <Clock className="w-3 h-3" aria-hidden="true" />
            {readTime} min read
          </span>
        </div>

        {/* Title */}
        <h3
          id={`article-${slug}-title`}
          className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors"
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 flex-1">{description}</p>

        {/* Keywords for searchability */}
        {keywords && keywords.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4" aria-label="Article keywords">
            {keywords.slice(0, 3).map((keyword) => (
              <span key={keyword} className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                #{keyword}
              </span>
            ))}
          </div>
        )}

        {/* Link */}
        <Link
          href={`/${locale}/articles/${slug}`}
          className="inline-flex items-center gap-2 text-primary-600 font-medium text-sm group-hover:text-primary-700 transition-colors mt-auto"
          aria-label={`Read more about ${title}`}
        >
          {featured && <span className="text-xs font-semibold uppercase tracking-wide">Featured</span>}
          <span>
            {featured ? 'Read Article' : 'Learn More'}
          </span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
};

export default ArticleCard;
