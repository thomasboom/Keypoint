import { getTranslations } from 'next-intl/server';
import { Mail, MessageSquare, Github, Twitter, Linkedin } from 'lucide-react';
import type { PageProps } from '@/types';

type ContactPageProps = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: ContactPageProps) {
  const t = await getTranslations({ locale, namespace: 'nav' });
  return {
    title: `${t('contact')} - Keypoint`,
  };
}

export default function ContactPage({ params: { locale } }: ContactPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <MessageSquare className="w-12 h-12 text-primary-600 mx-auto mb-6" aria-hidden="true" />
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions, suggestions, or want to contribute? We'd love to hear from you.
          </p>
        </div>
      </header>

      {/* Contact Options */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* General Inquiries */}
            <div className="card p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-primary-600" aria-hidden="true" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                General Inquiries
              </h2>
              <p className="text-gray-600 mb-4">
                Questions about Keypoint, partnerships, or media inquiries.
              </p>
              <a
                href="mailto:hello@keypoint.privacy"
                className="text-primary-600 font-medium hover:text-primary-700"
              >
                hello@keypoint.privacy
              </a>
            </div>

            {/* Contributing */}
            <div className="card p-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Github className="w-6 h-6 text-green-600" aria-hidden="true" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Contributing
              </h2>
              <p className="text-gray-600 mb-4">
                Want to help improve Keypoint? Check out our open-source projects.
              </p>
              <a
                href="https://github.com/keypoint"
                className="text-primary-600 font-medium hover:text-primary-700"
              >
                View on GitHub →
              </a>
            </div>

            {/* Feedback */}
            <div className="card p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Twitter className="w-6 h-6 text-purple-600" aria-hidden="true" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Feedback & Suggestions
              </h2>
              <p className="text-gray-600 mb-4">
                Share your thoughts or suggest new article topics.
              </p>
              <a
                href="https://twitter.com/keypoint"
                className="text-primary-600 font-medium hover:text-primary-700"
              >
                @keypoint on Twitter
              </a>
            </div>

            {/* Careers */}
            <div className="card p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <Linkedin className="w-6 h-6 text-orange-600" aria-hidden="true" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Careers
              </h2>
              <p className="text-gray-600 mb-4">
                Interested in joining our team? Check out open positions.
              </p>
              <a
                href="https://linkedin.com/company/keypoint"
                className="text-primary-600 font-medium hover:text-primary-700"
              >
                LinkedIn Page →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-6 text-center">
            Send Us a Message
          </h2>
          <form className="space-y-6" action="#" method="POST">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="input"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select id="subject" name="subject" className="input" required>
                <option value="">Select a topic</option>
                <option value="general">General Inquiry</option>
                <option value="contributing">Contributing</option>
                <option value="feedback">Feedback</option>
                <option value="bug">Report an Issue</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="input"
                placeholder="How can we help you?"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="btn-primary w-full"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Response Time Notice */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500">
            We typically respond within 1-2 business days. For urgent matters, please reach out via social media.
          </p>
        </div>
      </section>
    </div>
  );
}
