import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
}

const BASE_TITLE = 'DreamBoost - India\'s #1 Exam Preparation Platform';
const BASE_DESC = 'Master your exams with smart practice. Access 500+ test series, track progress, and compete with thousands of students across India.';

const SEO: React.FC<SEOProps> = ({
  title,
  description = BASE_DESC,
  canonicalUrl,
  ogImage = '/og-image.png',
  ogType = 'website',
  noIndex = false,
}) => {
  const fullTitle = title ? `${title} | DreamBoost` : BASE_TITLE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
};

export default SEO;
