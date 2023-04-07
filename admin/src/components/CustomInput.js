import React from "react";

const CustomInput = ({ type, value, onChange, label, i_id, i_class }) => {
  return (
    <div className="form-floating mb-3">
      <input
        id={i_id}
        value={value}
        onChange={onChange}
        type={type}
        className={`form-control ${i_class}`}
        placeholder={label}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default CustomInput;
