import React from 'react'
import Header from '../header'
import Footer from '../footer'
import { motion } from 'framer-motion'

const BlogLayout = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex flex-col"
    >
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </motion.div>
  )
}

export default BlogLayout
