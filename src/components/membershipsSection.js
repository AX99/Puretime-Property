import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const MembershipsSection = () => {
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
    <div className="flex items-center justify-center gap-12">
      {data.allMembershipsJson.nodes.map((node) => (
        <div key={node.id} className="flex flex-col items-center group">
          <img 
            src={node.logo.publicURL} 
            width={80} 
            height={80} 
            alt={node.title}
            className="w-20 h-20 object-contain mb-3"
          />
          <p className="text-sm font-medium text-neutral-600 text-center">
            {node.title}
          </p>
        </div>
      ))}
    </div>
  )
}

export default MembershipsSection
