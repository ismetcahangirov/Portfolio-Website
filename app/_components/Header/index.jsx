import React from "react";
import Container from "../Container";
import Logo from "@/components/Logo";
import Navbar from "./navbar";

const Header = () => {
  return (
    <header className="p-3 sticky top-0 bg-black z-50">
      <Container className={"relative flex items-center justify-between px-0"}>
        <Logo width="35px" height="35px" black={false} />
        <Navbar />
      </Container>
    </header>
  );
};

export default Header;
