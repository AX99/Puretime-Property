import * as React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

function Seo({ lang, meta, title, description, image, url }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
          title
          description
          author
        }
      }
    }
  `)

  const siteTitle = title || site.siteMetadata.title
  const metaDescription = description || site.siteMetadata.description
  const siteUrl = site.siteMetadata.siteUrl
  const ogImage = image
  const ogUrl = `/${url}` || ''

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={siteTitle}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `keywords`,
          content: `quick house sale, mortgage broker near me, sell house fast, cash property buyers, property cash buyers UK, sell home quickly, fast property sale, quick home sale, sell house without estate agent, problem property buyers, distressed property sale, sell house without repairs, chain-free property sale, avoid repossession, sell inherited property, quick completion property, sell property with tenants, property cash offer, quick house valuation, sell house without fees, property finance options, bridging loans property, buy-to-let mortgages, property development finance, commercial property loans, property investment UK`,
        },
        {
          property: `og:image`,
          content: `${siteUrl}${ogImage}`,
        },
        {
          property: `og:title`,
          content: siteTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:url`,
          content: `${siteUrl}${ogUrl}`,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.author || ``,
        },
        {
          name: `twitter:image`,
          content: `${siteUrl}${ogImage}`,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

Seo.propTypes = {
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
}

export default Seo
