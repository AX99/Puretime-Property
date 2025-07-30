import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const AuthorCard = ({ author }) => {
  if (!author) return null;
  
  const { name, bio, image } = author;
  
  // Format author name to first name + last initial
  const formatAuthorName = (fullName) => {
    if (!fullName) return "";
    const nameParts = fullName.split(" ");
    if (nameParts.length === 1) return nameParts[0];
    
    const firstName = nameParts[0];
    const lastInitial = nameParts[nameParts.length - 1].charAt(0) + ".";
    
    return `${firstName} ${lastInitial}`;
  };
  
  return (
    <div className="flex items-start gap-4 p-4 bg-neutral-50 rounded-lg">
      {image && image.gatsbyImageData && (
        <div className="flex-shrink-0">
          <GatsbyImage
            image={getImage(image.gatsbyImageData)}
            alt={name}
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
      )}
      
      <div className="flex-grow">
        <h4 className="font-semibold text-neutral-900 mb-1">{formatAuthorName(name)}</h4>
        {bio && (
          <p className="text-neutral-600 text-body-sm">{bio}</p>
        )}
      </div>
    </div>
  );
};

export default AuthorCard;
