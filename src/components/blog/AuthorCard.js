import React from "react";

const AuthorCard = ({ author }) => {
    return (
        <div>
            <div>
                author.image && {<img src={author.image} alt={author.name} />}
            </div>
            <div>
                <h2>{author.name}</h2>
                <p>{author.bio}</p>
            </div>
        </div>
    );
};

export default AuthorCard;