import React from "react";
import PropTypes from "prop-types";

const SEO = ({ title, description, pathname, image, article }) => {
  // Default metadata
  const defaultTitle = "The African - Your Source for African News and Insights";
  const defaultDescription =
    "Stay updated with the latest news, stories, and insights from Africa, brought to you by The African.";
  const siteUrl = "https://www.theafrican.co";
  const twitterUsername = "@TheAfrican";
  const defaultImage = `${siteUrl}/default-image.jpg`; // Replace with your default image path
  const organization = {
    name: "The African",
    email: "contact@theafrican.co",
    phone: "+1234567890",
    address: "123 African Street, Nairobi, Kenya",
  };
  const social = {
    facebook: "https://www.facebook.com/theafrican",
    twitter: "https://twitter.com/theafrican",
    instagram: "https://www.instagram.com/theafrican",
    linkedin: "https://www.linkedin.com/company/theafrican",
    youtube: "https://www.youtube.com/channel/theafrican",
  };

  // Construct SEO metadata
  const seo = {
    title: title ? `${title} | ${defaultTitle}` : defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || "/"}`,
    image: image ? `${siteUrl}${image}` : defaultImage,
    keywords: "Africa, News, Insights, Stories, The African",
  };

  return (
    <>
      {/* General SEO Tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="keywords" content={seo.keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:site_name" content={organization.name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={twitterUsername} />

      {/* Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: organization.name,
          url: siteUrl,
          logo: `${siteUrl}/logo.png`, // Replace with your actual logo URL
          contactPoint: {
            "@type": "ContactPoint",
            email: organization.email,
            telephone: organization.phone,
            contactType: "Customer Support",
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: organization.address,
          },
          sameAs: [
            social.facebook,
            social.twitter,
            social.instagram,
            social.linkedin,
            social.youtube,
          ].filter(Boolean),
        })}
      </script>

      {/* Canonical URL */}
      <link rel="canonical" href={seo.url} />
    </>
  );
};

SEO.defaultProps = {
  title: null,
  description: null,
  pathname: null,
  image: null,
  article: false,
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  pathname: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
};

export default SEO;
