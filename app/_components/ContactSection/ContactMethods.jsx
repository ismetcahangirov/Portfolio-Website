import Link from "next/link";
import React from "react";

const ContactMethods = ({ head, body, to = "/" }) => {
  return (
    <div className="flex flex-col space-y-1">
      <strong className="uppercase text-sm">{head}:</strong>
      <Link className="text-Gray text-sm" href={to}>
        {body}
      </Link>
    </div>
  );
};

export default ContactMethods;
