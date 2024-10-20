import React from "react";
import { Link } from "gatsby";

const Breadcrumb = ({ items }) => {
  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link to={item.href}>{item.label}</Link>
          </li>
        ))}
        <li>{items[items.length - 1].label}</li>
      </ul>
    </div>
  );
};

export default Breadcrumb;
