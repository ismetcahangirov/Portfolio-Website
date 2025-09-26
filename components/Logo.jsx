"use client";

import Image from "next/image";
import Link from "next/link";
const Logo = ({ black = false, width = "35px", height = "35px" }) => {
  return (
    <Link href={"/"}>
      <Image
        src={`${black ? "./blackLogo.svg" : "./whiteLogo.svg"}`}
        style={{ width: width, height: height }}
        className={` cursor-pointer`}
        alt="Logo"
        width={150}
        height={150}
      />
    </Link>
  );
};

export default Logo;
