import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"

const SEO = ({ title, description, pathname, image, article }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
          twitterUsername
          keywords
          organization {
            name
            email
            phone
            address
          }
          social {
            facebook
            twitter
            instagram
            linkedin
            youtube
          }
        }
      }
    }
  `)

  const {
    title: defaultTitle,
    description: defaultDescription,
    siteUrl,
    twitterUsername,
    keywords,
    organization,
    social,
  } = site.siteMetadata

  const seo = {
    title: title ? `${title} | ${defaultTitle}` : defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || "/"}`,
    image: image ? `${siteUrl}${image}` : `${siteUrl}/default-image.jpg`, // Ensure you have a default image
    keywords: keywords?.join(", "),
  }

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
      <meta property="og:site_name" content={organization?.name || "The African"} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      {twitterUsername && <meta name="twitter:creator" content={twitterUsername} />}

      {/* Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: organization?.name || "The African",
          url: siteUrl,
          logo: `${siteUrl}/logo.png`, // Replace with your actual logo URL
          contactPoint: {
            "@type": "ContactPoint",
            email: organization?.email,
            telephone: organization?.phone,
            contactType: "Customer Support",
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: organization?.address,
          },
          sameAs: [
            social?.facebook,
            social?.twitter,
            social?.instagram,
            social?.linkedin,
            social?.youtube,
          ].filter(Boolean),
        })}
      </script>

      {/* Canonical URL */}
      <link rel="canonical" href={seo.url} />
    </>
  )
}

SEO.defaultProps = {
  title: null,
  description: null,
  pathname: null,
  image: null,
  article: false,
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  pathname: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
}

export default SEO
