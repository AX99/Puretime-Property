import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import MembershipItem from './membershipItem'

const Memberships = () => {
  const data = useStaticQuery(graphql`
    {
      allMembershipsJson {
        nodes {
          id
          title
          logo {
            publicURL
          }
        }
      }
    }
  `)
  
  return (
    <>
      {data.allMembershipsJson.nodes.map((node) => (
        <img
          key={node.id}
          src={node.logo.publicURL}
          width={64}
          height={64}
          alt={node.title}
          title={node.title}
          className="w-16 h-16 object-contain"
        />
      ))}
    </>
  )
}

export default Memberships
