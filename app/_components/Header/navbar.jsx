"use client";

import useClickOutside from "@/app/_hooks/useClickOutside";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";

const links = [
  { name: "home", href: "/#home" },
  { name: "about", href: "/#about" },
  { name: "skills", href: "/#skills" },
  { name: "projects", href: "/#projects" },
  { name: "contact", href: "/#contact" },
];

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useClickOutside(() => setOpenMenu(false));
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (menuRef.current) {
      setHeight(menuRef.current.scrollHeight);
    }
  }, [openMenu]);

  return (
    <div>
      <div className="sm:hidden">
        <Button
          onClick={() => setOpenMenu(!openMenu)}
          asChild
          className="cursor-pointer p-1 w-[35px] h-[35px] bg-transparent"
        >
          {openMenu ? <X /> : <Menu />}
        </Button>
      </div>

      <div
        className="sm:hidden absolute left-0 top-[47px] w-full overflow-hidden transition-all duration-300 ease-in-out flex flex-col space-y-2 bg-white "
        style={{ maxHeight: openMenu ? `${height}px` : "0px" }}
      >
        <div ref={menuRef} className="flex flex-col uppercase">
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="w-full text-center py-3 uppercase tracking-wide"
              onClick={() => setOpenMenu(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="hidden sm:flex space-x-15">
        {links.map((link, i) => (
          <Link
            key={i}
            href={link.href}
            className="relative text-white text-md uppercase tracking-wide  group cursor-pointer"
            onClick={() => setOpenMenu(false)}
          >
            {link.name}
            <span className="absolute -bottom-1 h-[1px] bg-white transition-all duration-200 w-0 left-1/2 group-hover:w-full group-hover:left-0" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
