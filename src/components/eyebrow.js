import React from "react";
import PropTypes from "prop-types";

const Eyebrow = ({ label, ...props }) => {
  return (
    <div className="flex flex-row items-center opacity-80">
      <hr className="w-16 text-primary-600"></hr>
      <p className={`text-body-sm font-semibold tracking-widest text-primary-600 pl-4 ${props.className}`}>
        {label}
      </p>
    </div>
  );
};

Eyebrow.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Eyebrow;
