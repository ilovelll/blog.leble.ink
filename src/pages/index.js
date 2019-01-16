import React from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import SEO from '../components/SEO'
import Layout from '../components/Layout'
import { formatReadingTime } from '../utils/helpers'
import { rhythm } from '../utils/typography'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title
    const siteDescription = data.site.siteMetadata.description
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
        lang={`zh-cn`}
        title={siteTitle}
        description={siteDescription}
        keywords={[`lihongen`, `夏色如风`, `blog`, `javascript`]}
        slug={``}
        />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}
              {` • ${formatReadingTime(node.timeToRead)}`}</small>
              <p dangerouslySetInnerHTML={{ __html: node.frontmatter.spoiler }} />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          timeToRead
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            spoiler
          }
        }
      }
    }
  }
`
