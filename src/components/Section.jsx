import React from "react";

const Section = ({ title, children }) => {
  return (
    <div className="my-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="flex gap-4">{children}</div>
    </div>
  );
};

export default Section;
