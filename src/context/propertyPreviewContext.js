import React, { createContext, useContext, useState } from 'react'

const PropertyPreviewContext = createContext({})
PropertyPreviewContext.displayName = 'PropertyPreviewContext'

export const PropertyPreviewProvider = ({ children }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [previewProperty, setPreviewProperty] = useState(null)

  const openPreview = (property) => {
    setPreviewProperty(property)
    setIsPreviewOpen(true)
  }

  const closePreview = () => {
    setIsPreviewOpen(false)
  }

  return (
    <PropertyPreviewContext.Provider 
      value={{ 
        isPreviewOpen, 
        previewProperty, 
        openPreview, 
        closePreview 
      }}
    >
      {children}
    </PropertyPreviewContext.Provider>
  )
}

export const usePropertyPreview = () => useContext(PropertyPreviewContext) 