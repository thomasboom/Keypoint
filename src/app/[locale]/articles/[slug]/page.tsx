import { getTranslations, getMessages } from 'next-intl/server';
import { useMessages } from 'next-intl';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Calendar, Share2, ChevronLeft, ArrowRight } from 'lucide-react';

type PageProps = {
  params: { locale: string; slug: string };
};

export async function generateMetadata({ params: { locale, slug } }: PageProps) {
  const messages = await getMessages();
  const articles = messages.articles as Record<string, { title: string; description: string }>;
  const article = articles?.[slug];

  if (!article) {
    return { title: 'Article Not Found - Keypoint' };
  }

  return {
    title: `${article.title} - Keypoint`,
    description: article.description,
  };
}

// Sample article content - in a real app this would come from a CMS or MDX files
const articleContent: Record<string, { en: string; nl: string }> = {
  'password-security': {
    en: `
## Why Password Security Matters

Your passwords are the keys to your digital life. From email accounts to banking, social media to cloud storage, strong passwords are your first line of defense against unauthorized access.

## Creating Strong Passwords

A strong password should be:

- At least 12 characters long
- A mix of uppercase and lowercase letters
- Include numbers and special characters
- Unique for each account
- Not based on personal information

### The Problem with Reused Passwords

When you use the same password across multiple sites, a single data breach can compromise all your accounts. This is known as credential stuffing, and it's one of the most common attack vectors.

## Password Managers

Consider using a password manager to:

- Generate strong, unique passwords
- Store passwords securely
- Auto-fill credentials safely
- Sync across devices

Popular options include Bitwarden, 1Password, and Dashlane.

## Two-Factor Authentication

Always enable two-factor authentication (2FA) when available. This adds an extra layer of security beyond your password.

## Quick Tips

1. Never share your passwords
2. Change passwords regularly for sensitive accounts
3. Use passphrases for easier memorization
4. Enable biometric authentication when possible
    `,
    nl: `
## Waarom Wachtwoordbeveiliging Belangrijk Is

Je wachtwoorden zijn de sleutels tot je digitale leven. Van e-mailaccounts tot bankzaken, van sociale media tot cloudopslag, sterke wachtwoorden zijn je eerste verdedigingslinie tegen ongeautoriseerde toegang.

## Sterke Wachtwoords Maken

Een sterk wachtwoord moet:

- Minstens 12 tekens lang zijn
- Een mix van hoofdletters en kleine letters bevatten
- Cijfers en speciale tekens bevatten
- Uniek zijn voor elk account
- Niet gebaseerd zijn op persoonlijke informatie

### Het Probleem met Hergebruikte Wachtwoorden

Wanneer je hetzelfde wachtwoord op meerdere sites gebruikt, kan een enkele datalek al je accounts compromitteren.

## Wachtwoordmanagers

Overweeg het gebruik van een wachtwoordmanager om:

- Sterke, unieke wachtwoorden te genereren
- Wachtwoorden veilig op te slaan
- Inloggegevens veilig automatisch in te vullen
- Te synchroniseren over apparaten

## Twee-Factor Authenticatie

Schakel altijd twee-factor authenticatie (2FA) in wanneer beschikbaar. Dit voegt een extra beveiligingslaag toe.
    `,
  },
  'two-factor-auth': {
    en: `
## What is Two-Factor Authentication?

Two-factor authentication (2FA) adds an extra layer of security to your accounts. Instead of just entering a password, you also need to prove you have access to something else.

## Types of 2FA

### SMS Codes
Codes sent via text message. Convenient but less secure (SIM swapping attacks).

### Authenticator Apps
Apps like Google Authenticator or Authy generate time-based codes. More secure than SMS.

### Hardware Keys
Physical devices like YubiKey. Highest security level.

### Biometric
Fingerprint or facial recognition. Convenient and secure.

## Setting Up 2FA

1. Go to your account security settings
2. Look for "Two-Factor Authentication" or "2FA"
3. Choose your preferred method
4. Follow the setup instructions
5. Save your backup codes in a safe place

## Why 2FA Matters

Even if someone steals your password, they can't access your account without the second factor. This simple step can prevent the majority of account takeovers.
    `,
    nl: `
## Wat is Twee-Factor Authenticatie?

Twee-factor authenticatie (2FA) voegt een extra beveiligingslaag toe aan je accounts. In plaats van alleen een wachtwoord in te voeren, moet je ook bewijzen dat je toegang hebt tot iets anders.

## Soorten 2FA

### SMS-codes
Codes verzonden via tekstbericht. Gemakkelijk maar minder veilig.

### Authenticator-apps
Apps zoals Google Authenticator genereren tijdgebonden codes. Veiliger dan SMS.

### Hardware-sleutels
Fysieke apparaten zoals YubiKey. Hoogste beveiligingsniveau.

## 2FA Instellen

1. Ga naar je accountbeveiligingsinstellingen
2. Zoek naar "Twee-Factor Authenticatie" of "2FA"
3. Kies je favoriete methode
4. Volg de installatie-instructies
5. Bewaar je back-upcodes op een veilige plek
    `,
  },
};

export default async function ArticlePage({ params: { locale, slug } }: PageProps) {
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'article' });
  const articles = messages.articles as Record<string, { title: string; description: string; category: string }>;
  const article = articles[slug];

  if (!article) {
    notFound();
  }

  const content = articleContent[slug] || { en: 'Content coming soon...', nl: 'Inhoud binnenkort beschikbaar...' };
  const articleContentText = locale === 'nl' ? content.nl : content.en;

  const relatedArticles = Object.entries(articles)
    .filter(([s]) => s !== slug)
    .slice(0, 2);

  return (
    <article className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href={`/${locale}/articles`}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            Back to Articles
          </Link>

          <span className="badge-beginner mb-4 inline-flex">
            {article.category}
          </span>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {article.title}
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            {article.description}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" aria-hidden="true" />
              5 {t('readTime')}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              {t('published')} December 2024
            </span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          {articleContentText.split('\n').map((line, index) => {
            if (line.startsWith('## ')) {
              return <h2 key={index}>{line.replace('## ', '')}</h2>;
            }
            if (line.startsWith('### ')) {
              return <h3 key={index}>{line.replace('### ', '')}</h3>;
            }
            if (line.startsWith('- ')) {
              return <li key={index}>{line.replace('- ', '')}</li>;
            }
            if (line.match(/^\d+\./)) {
              return <li key={index}>{line.replace(/^\d+\.\s*/, '')}</li>;
            }
            if (line.startsWith('1. ')) {
              return <li key={index}>{line.replace('1. ', '')}</li>;
            }
            if (line.trim()) {
              return <p key={index}>{line}</p>;
            }
            return null;
          })}
        </div>

        {/* Share */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-gray-600">
              <Share2 className="w-5 h-5" aria-hidden="true" />
              {t('share')}
            </span>
            <div className="flex gap-2">
              <button
                className="btn-ghost text-sm"
                aria-label="Share on Twitter"
              >
                Twitter
              </button>
              <button
                className="btn-ghost text-sm"
                aria-label="Share on Facebook"
              >
                Facebook
              </button>
              <button
                className="btn-ghost text-sm"
                aria-label="Copy link"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      <section className="bg-gray-50 border-t border-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
            {t('related')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedArticles.map(([relatedSlug, relatedArticle]) => (
              <Link
                key={relatedSlug}
                href={`/${locale}/articles/${relatedSlug}`}
                className="card p-6 hover:shadow-lg transition-shadow"
              >
                <span className="badge-intermediate text-xs mb-2 inline-block">
                  {relatedArticle.category}
                </span>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {relatedArticle.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {relatedArticle.description}
                </p>
                <span className="inline-flex items-center gap-1 text-primary-600 text-sm font-medium">
                  Read Article
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
