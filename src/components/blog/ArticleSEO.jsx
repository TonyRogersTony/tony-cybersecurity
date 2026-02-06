import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function ArticleSEO({ article }) {
  if (!article) return null;

  // Generate meta description from excerpt or content
  const metaDescription = article.excerpt || 
    article.content.substring(0, 160).replace(/[#*`]/g, '').trim() + '...';

  // Generate keywords from tags and category
  const keywords = article.tags 
    ? [...article.tags, article.category, article.author].join(', ')
    : `${article.category}, ${article.author}, blog, article`;

  const publishedDate = article.published_date || article.created_date;
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const imageUrl = article.cover_image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200';

  // Structured Data (JSON-LD) for Article
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": metaDescription,
    "image": imageUrl,
    "datePublished": publishedDate,
    "dateModified": article.updated_date || publishedDate,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Joe Bains",
      "logo": {
        "@type": "ImageObject",
        "url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200"
      }
    },
    "articleSection": article.category,
    "keywords": keywords,
    "wordCount": article.content.split(/\s+/).length,
    "timeRequired": article.read_time ? `PT${article.read_time}M` : undefined
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{article.title} | Joe Bains</title>
      <meta name="title" content={article.title} />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={article.author} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="article" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={article.title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="article:published_time" content={publishedDate} />
      <meta property="article:modified_time" content={article.updated_date || publishedDate} />
      <meta property="article:author" content={article.author} />
      <meta property="article:section" content={article.category} />
      {article.tags && article.tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={article.title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}