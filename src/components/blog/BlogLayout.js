import React from 'react';
import Header from '../header';

const BlogLayout = ({ children }) => {
    const menu = [
        {
            name: "Home",
            href: "/",
        },
        {
            name: "Blog",
            href: "/blog",
        },
    ];

    return (
        <div>
            <Header menu={menu}/>
            {children}
        </div>
    );
}; 

export default BlogLayout