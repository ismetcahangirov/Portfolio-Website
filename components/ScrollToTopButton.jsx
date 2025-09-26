import useScrollPosition from "@/app/_hooks/useScrollPositions";
import React from "react";
import { Button } from "./ui/button";
import { ChevronUp } from "lucide-react";

const ScrollToTopButton = () => {
  const showButton = useScrollPosition();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    showButton && (
      <Button
        onClick={scrollToTop}
        variant={"destructive"}
        className="
          fixed 
          bottom-8 
          right-8 
          text-white 
          rounded-[3px] 
          cursor-pointer 
          z-50 
          w-12
          h-12
          hover:bg-gray-800 
          transition 
          duration-300
          flex justify-center items-center
        "
      >
        <ChevronUp />
      </Button>
    )
  );
};

export default ScrollToTopButton;
