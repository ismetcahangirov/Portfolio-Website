"use client";

import React from "react";
import useInView from "../_hooks/useInView";

const Section = ({ children, iD, className }) => {
  const { ref, isVisible } = useInView(0.3);
  return (
    <section
      ref={ref}
      id={iD}
      className={`${className} flex  py-20 overflow-hidden items-center justify-center  border-b-1  transition-all duration-700 ease-out transform ${
        isVisible ? "  opacity-100 translate-x-0" : "opacity-0 -translate-x-1/2"
      }`}
    >
      {children}
    </section>
  );
};

export default Section;
