import React from 'react';
import { Helmet } from 'react-helmet-async';
import { content } from '../content';

export default function ArticleSEO({ article }) {
  if (!article) return null;
  const seoContent = content.articleSEO;
  const safeContent = typeof article.content === 'string' ? article.content : '';
  const safeExcerpt = typeof article.excerpt === 'string' ? article.excerpt : '';
  const safeTags = Array.isArray(article.tags) ? article.tags : [];
  const safeCategory = typeof article.category === 'string' ? article.category : 'Technical';
  const safeAuthor = typeof article.author === 'string' ? article.author : 'Unknown Author';
  const safeTitle = typeof article.title === 'string' ? article.title : 'Article';

  // Generate meta description from excerpt or content
  const metaDescription = safeExcerpt || 
    `${safeContent.substring(0, 160).replace(/[#*`]/g, '').trim()}...`;

  // Generate keywords from tags and category
  const keywords = safeTags.length > 0
    ? [...safeTags, safeCategory, safeAuthor].join(', ')
    : `${safeCategory}, ${safeAuthor}, blog, article`;

  const publishedDate = article.published_date || article.created_date;
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const imageUrl = article.cover_image || seoContent.fallbackImage;

  // Structured Data (JSON-LD) for Article
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": safeTitle,
    "description": metaDescription,
    "image": imageUrl,
    "datePublished": publishedDate,
    "dateModified": article.updated_date || publishedDate,
    "author": {
      "@type": "Person",
      "name": safeAuthor
    },
    "publisher": {
      "@type": "Organization",
      "name": seoContent.publisherName,
      "logo": {
        "@type": "ImageObject",
        "url": seoContent.publisherLogo
      }
    },
    "articleSection": safeCategory,
    "keywords": keywords,
    "wordCount": safeContent.split(/\s+/).filter(Boolean).length,
    "timeRequired": article.read_time ? `PT${article.read_time}M` : undefined
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{safeTitle}{seoContent.titleSuffix}</title>
      <meta name="title" content={safeTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={safeAuthor} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="article" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={safeTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="article:published_time" content={publishedDate} />
      <meta property="article:modified_time" content={article.updated_date || publishedDate} />
      <meta property="article:author" content={safeAuthor} />
      <meta property="article:section" content={safeCategory} />
      {safeTags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={safeTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}