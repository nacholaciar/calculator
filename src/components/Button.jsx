import React from "react";
import { useDispatch } from "react-redux";

const Button = ({ children, id, action, className }) => {
  const dispatch = useDispatch();

  return (
    <button id={id} onClick={() => dispatch(action)} className={className}>
      {children}
    </button>
  );
};

export default Button;
