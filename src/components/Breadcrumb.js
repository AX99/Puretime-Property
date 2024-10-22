import React from 'react'
import { Link } from 'gatsby'

const Breadcrumb = ({ items }) => {
  return (
    <div className="my-4">
      <ul className="flex gap-2">
        {items.slice(0, -1).map((item, index) => (
          <li key={item.id}>
            <Link className="hover:underline" to={item.href}>
              {item.label}
            </Link>
            {index < items.length - 1 && <span> &gt; </span>}
          </li>
        ))}
        <li className="font-semibold underline decoration-primary-600">
          {items[items.length - 1].label}
        </li>
      </ul>
    </div>
  )
}

export default Breadcrumb
