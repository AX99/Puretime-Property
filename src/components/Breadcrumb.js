import React, { useMemo } from "react";
import { Link } from "gatsby";

const BREADCRUMB_SEPARATOR = " > ";

const Breadcrumb = ({ items }) => {
  const visibleItems = useMemo(() => items.slice(0, -1), [items]);

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex gap-2">
        {visibleItems.map((item, index) => (
          <li key={item.id}>
            <Link className="hover:underline" to={item.href}>
              {item.label}
            </Link>
            {index < items.length - 1 && (
              <span aria-hidden="true">{BREADCRUMB_SEPARATOR}</span>
            )}
          </li>
        ))}
        <li className="font-semibold underline decoration-primary-600">
          {items[items.length - 1].label}
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
