import React from 'react'
import PropTypes from 'prop-types'

const MembershipItem = ({ logo, title }) => {
  return (
    <div className="relative group">
      <img 
        src={logo} 
        width={64} 
        height={64} 
        alt={title}
        className="w-8 h-8 object-contain opacity-60 hover:opacity-100 transition-opacity duration-200"
        title={title}
      />
    </div>
  )
}

MembershipItem.propTypes = {
  logo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default MembershipItem
