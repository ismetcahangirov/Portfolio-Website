"use client";

import { useTheme } from "next-themes";
import React from "react";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

const ThemeModule = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      className="cursor-pointer bg-transparent text-black hover:text-white dark:text-white hover:dark:text-black"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
};

export default ThemeModule;
