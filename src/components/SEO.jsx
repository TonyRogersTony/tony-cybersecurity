import React from 'react';
import { Helmet } from 'react-helmet-async';
import { content } from './content';

export default function SEO({ section }) {
  const { seo } = content;
  const sectionData = section ? seo.sections[section] : null;
  
  const title = sectionData ? sectionData.title : seo.title;
  const description = sectionData ? sectionData.description : seo.description;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="author" content={seo.author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={seo.image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={seo.url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={seo.image} />

      {/* Canonical URL */}
      <link rel="canonical" href={seo.url} />

      {/* Structured Data - Person Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": seo.author,
          "jobTitle": "Senior Implementation Engineer",
          "description": seo.description,
          "url": seo.url,
          "image": seo.image,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "London",
            "addressCountry": "United Kingdom"
          },
          "alumniOf": {
            "@type": "Organization",
            "name": "University of Wolverhampton"
          },
          "knowsAbout": [
            "Cloud Computing",
            "AWS",
            "Linux Administration",
            "DevOps",
            "System Integration",
            "Database Administration",
            "Python",
            "Docker",
            "Kubernetes"
          ],
          "sameAs": []
        })}
      </script>

      {/* Structured Data - Professional Service */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": `${seo.author} Technical Consulting`,
          "description": "Technical consulting and training services specializing in cloud migrations, system integrations, and Linux administration",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "London",
            "addressCountry": "GB"
          },
          "areaServed": "Worldwide",
          "serviceType": [
            "Technical Consulting",
            "Cloud Migration",
            "System Integration",
            "Linux Training",
            "DevOps Consulting"
          ]
        })}
      </script>
    </Helmet>
  );
}