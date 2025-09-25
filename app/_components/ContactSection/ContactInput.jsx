import React from "react";

const ContactInput = ({ inp, value, action, name, placeholder, err }) => {
  return inp ? (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        className="border-0 outline-0 border-b-1 py-2 px-3 w-full placeholder:text-sm"
        value={value}
        onChange={action}
        name={name}
      />
      {err && <p className="text-red-500 text-sm px-3">{err}</p>}
    </div>
  ) : (
    <div>
      <textarea
        type="text"
        placeholder={placeholder}
        className="border-0 outline-0 border-b-1 py-2 px-3 w-full resize-none overflow-auto placeholder:text-sm"
        value={value}
        onChange={action}
        name={name}
      />
      {err && <p className="text-red-500 text-sm px-3">{err}</p>}
    </div>
  );
};

export default ContactInput;
