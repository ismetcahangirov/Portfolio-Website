"use client";

import React, { useState } from "react";
import Container from "../Container";
import ContactMethods from "./ContactMethods";
import ContactInput from "./ContactInput";
import { Button } from "@/components/ui/button";
import Section from "../Section";
import { toast } from "sonner";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formError, setFormError] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newObj = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name.trim()) newObj.name = "Name required";
    if (!formData.email.trim()) newObj.email = "Email required";
    if (!emailRegex.test(formData.email)) newObj.email = "Email invalid";
    if (!formData.subject.trim()) newObj.subject = "Subject required";
    if (!formData.message.trim()) newObj.message = "Message required";

    if (Object.keys(newObj).length > 0) {
      setFormError(newObj);
      return;
    }

    toast.success("Message successfully delivered!");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setFormError({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError((prev) => ({ ...prev, [name]: "" }));
  };
  return (
    <Section iD={"contact"} className={"group bg-gray-50"}>
      <Container>
        <div>
          <div className="w-max  mb-15 group">
            <h2 className="  uppercase font-bold text-5xl md:text-7xl tracking-wide">
              Contact
            </h2>
            <div className="mt-1 w-0 h-[2px] bg-black transition-all duration-200 group-hover:w-full"></div>
          </div>
          <div className="flex flex-wrap md:flex-nowrap space-y-5">
            <div className="space-y-5 flex flex-col  w-full">
              <ContactMethods head={"address"} body={"BAKU"} to={"#contact"} />
              <ContactMethods
                head={"email"}
                body={"cahangirovismat@gmail.com"}
                to={"mailto:cahangirovismat@gmail.com"}
              />
              <ContactMethods
                head={"phone"}
                body={"+994552972759"}
                to={"tel:+994552972759"}
              />
            </div>
            <form className="w-full space-y-3" onSubmit={handleSubmit}>
              <ContactInput
                inp={true}
                value={formData.name}
                name={"name"}
                action={handleChange}
                placeholder={"Name"}
                err={formError.name}
              />
              <ContactInput
                inp={true}
                value={formData.email}
                name={"email"}
                action={handleChange}
                placeholder={"Email"}
                err={formError.email}
              />
              <ContactInput
                inp={true}
                value={formData.subject}
                name={"subject"}
                action={handleChange}
                placeholder={"Subject"}
                err={formError.subject}
              />
              <ContactInput
                inp={false}
                value={formData.message}
                name={"message"}
                action={handleChange}
                placeholder={"Message"}
                err={formError.message}
              />
              <Button
                type={"submit"}
                className={"cursor-pointer w-full rounded-none py-4"}
              >
                SEND
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default ContactSection;
