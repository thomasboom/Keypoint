import { getTranslations } from 'next-intl/server';
import { Shield, Users, Globe, Lock, Eye, Heart } from 'lucide-react';
import type { PageProps } from '@/types';

type AboutPageProps = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: AboutPageProps) {
  const t = await getTranslations({ locale, namespace: 'nav' });
  return {
    title: `${t('about')} - Keypoint`,
  };
}

export default function AboutPage({ params: { locale } }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <Shield className="w-16 h-16 text-primary-600 mx-auto mb-6" aria-hidden="true" />
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            About Keypoint
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to make privacy education accessible to everyone, regardless of their technical background or location.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                In an increasingly digital world, privacy has become a fundamental right that everyone should understand and be able to exercise. Yet, privacy education is often scattered, technical, and inaccessible to the average person.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Keypoint was created to bridge this gap. We believe that everyone deserves to understand how to protect their personal information, regardless of their technical expertise or background.
              </p>
              <p className="text-lg text-gray-600">
                Our platform provides clear, accessible, and comprehensive privacy guidance in multiple languages, making digital security education truly global.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                <Lock className="w-32 h-32 text-primary-600" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-primary-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Accessibility First
              </h3>
              <p className="text-gray-600">
                We believe privacy education should be available to everyone, regardless of technical background or ability.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-7 h-7 text-green-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Global Perspective
              </h3>
              <p className="text-gray-600">
                Privacy knows no borders. We're committed to providing content in multiple languages for a worldwide audience.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Eye className="w-7 h-7 text-purple-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Transparency
              </h3>
              <p className="text-gray-600">
                We believe in being open about how we work and how we protect your data when you visit our site.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
              Built by a Passionate Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our team combines expertise in security, education, and accessibility to create the best possible resource.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Sarah Chen', role: 'Founder & Security Expert', initial: 'S' },
              { name: 'Marcus Johnson', role: 'Head of Education', initial: 'M' },
              { name: 'Elena Rodriguez', role: 'Accessibility Lead', initial: 'E' },
              { name: 'David Kim', role: 'International Relations', initial: 'D' },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-semibold text-gray-600">{member.initial}</span>
                </div>
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-12 h-12 text-primary-200 mx-auto mb-6" aria-hidden="true" />
          <h2 className="font-display text-3xl font-bold mb-4">
            Join Our Community
          </h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Whether you're here to learn or to contribute, we're glad you're part of our mission to make privacy education accessible to all.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/keypoint"
              className="btn bg-white text-primary-600 hover:bg-primary-50"
            >
              Contribute on GitHub
            </a>
            <a
              href={`/${locale}/contact`}
              className="btn bg-primary-700 text-white hover:bg-primary-800"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
