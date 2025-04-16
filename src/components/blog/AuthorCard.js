import React from 'react'

const AuthorCard = ({ author }) => {
  return (
    <div className="mt-12">
      <div>{author.image && <img src={author.image} alt={author.name} />}</div>
      <div>
        <h2>{author.name}</h2>
        {author.bio && <p>{author.bio}</p>}
      </div>
    </div>
  )
}

export default AuthorCard
