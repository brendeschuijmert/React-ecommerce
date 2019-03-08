/* eslint-disable */

import React from 'react'
import {graphql, useStaticQuery} from 'gatsby'
import get from 'lodash/get'
import {Image, Header} from 'semantic-ui-react'
import Helmet from 'react-helmet'
import ProductList from '../components/ProductList'
import logo from '../images/ill-short-dark.svg'
import Layout from '../components/Layout'

export default StoreIndex = (props) => {

  const data = useStaticQuery(graphql `
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMoltinProduct {
      edges {
        node {
          id
          name
          description
          background_colour
          new
          mainImageHref
          meta {
            display_price {
              with_tax {
                amount
                currency
                formatted
              }
            }
          }
          mainImage {
            childImageSharp {
              sizes(maxWidth: 600) {
                ...GatsbyImageSharpSizes
              }
            }
          }
        }
      }
    }
  }
  `)

  const siteTitle = get(data, 'site.siteMetadata.title')
  const products = get(data, 'allMoltinProduct.edges')
  const filterProductsWithoutImages = products.filter(v => v.node.mainImageHref)
  return (
    <Layout location={props.location}>
      <Helmet title={siteTitle}/>
      <Header
        as="h3"
        icon
        textAlign="center"
        style={{
        marginBottom: '2em'
      }}>
        <Header.Content
          style={{
          width: '60%',
          margin: '0 auto'
        }}>
          <Image src={logo} alt={'logo'}/>
        </Header.Content>
      </Header>
      <ProductList products={filterProductsWithoutImages}/>
    </Layout>
  )
}
