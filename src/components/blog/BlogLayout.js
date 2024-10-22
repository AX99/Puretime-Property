import React from 'react'
import Header from '../header'
import Footer from '../footer'

const BlogLayout = ({ children }) => {
  const menu = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Blog',
      href: '/blog',
    },
  ]

  return (
    <div>
      <Header menu={menu} />
      {children}
      <Footer />
    </div>
  )
}

export default BlogLayout
