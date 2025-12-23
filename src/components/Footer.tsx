'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Shield, Mail, Twitter, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  const t = useTranslations('footer');
  const params = useParams();
  const locale = params.locale as string || 'en';

  const footerLinks = {
    links: [
      { href: `/${locale}`, label: t('links') },
      { href: `/${locale}/articles`, label: t('resources') },
      { href: `/${locale}/about`, label: t('links') },
    ],
    legal: [
      { href: `/${locale}/privacy`, label: t('privacyPolicy') },
      { href: `/${locale}/terms`, label: t('terms') },
      { href: `/${locale}/accessibility`, label: t('accessibility') },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/keypoint', label: 'Twitter' },
    { icon: Github, href: 'https://github.com/keypoint', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/company/keypoint', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-4" aria-label="Keypoint Home">
              <div className="p-2 rounded-lg bg-primary-600 text-white">
                <Shield className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="font-display font-bold text-lg text-white">Keypoint</span>
            </Link>
            <p className="text-sm text-gray-400">{t('tagline')}</p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 text-gray-400 hover:text-primary-400 hover:bg-gray-800 rounded-lg transition-colors"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t('links')}</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors focus:outline-none focus:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t('resources')}</h3>
            <ul className="space-y-3" role="list">
              <li>
                <Link
                  href={`/${locale}/articles`}
                  className="text-sm text-gray-400 hover:text-primary-400 transition-colors focus:outline-none focus:text-primary-400"
                >
                  All Articles
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/articles?level=beginner`}
                  className="text-sm text-gray-400 hover:text-primary-400 transition-colors focus:outline-none focus:text-primary-400"
                >
                  Beginner Guides
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/articles?level=advanced`}
                  className="text-sm text-gray-400 hover:text-primary-400 transition-colors focus:outline-none focus:text-primary-400"
                >
                  Advanced Topics
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t('legal')}</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors focus:outline-none focus:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Keypoint. {t('copyright')}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}/contact`}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
