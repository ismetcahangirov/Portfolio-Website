import React from "react";

const Container = ({ children, className }) => {
  return (
    <div className={`mx-auto w-full ${className} px-2 lg:px-12 `}>
      {children}
    </div>
  );
};

export default Container;
