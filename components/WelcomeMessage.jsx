"use client";
import { Earth } from "lucide-react";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const [showWelcome, setShowWelcome] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const welcomeDuration = 5000;
  const fadeDuration = 1000;
  const expireTime = 6 * 60 * 60 * 1000;

  useEffect(() => {
    const lastShown = localStorage.getItem("welcomeTime");

    if (!lastShown || Date.now() - parseInt(lastShown, 10) > expireTime) {
      setShowWelcome(true);

      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          localStorage.setItem("welcomeTime", Date.now().toString());
          setShowWelcome(false);
        }, fadeDuration);
      }, welcomeDuration);

      return () => clearTimeout(timer);
    }
  }, []);

  const firstDiv = "Welcome to My".split(" ");
  const secondDiv = "Portfolio Website".split(" ");
  const thirdDiv = "www.ismatcahangirov.com".split(" ");

  if (showWelcome) {
    return (
      <div
        className={`h-screen overflow-hidden flex flex-col items-center justify-center bg-black text-white text-4xl transition-all duration-1000 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="space-y-3 flex justify-center items-center flex-col">
          <div className="space-x-3">
            {firstDiv.map((div, i) => (
              <span
                key={i + div}
                className="inline-block slideInFromLeft space-x-3 uppercase font-bold"
                style={{ "--i": 1 }}
              >
                {div}
              </span>
            ))}
          </div>
          <div className="space-x-3">
            {secondDiv.map((div, i) => (
              <span
                key={i + div}
                className="inline-block slideInFromRight uppercase font-bold text-red-800"
              >
                {div}
              </span>
            ))}
          </div>
          <div className="slideInFromBottom bg-white px-4 py-2 text-[18px] overflow-hidden rounded-md flex justify-center items-center space-x-1 text-red-500">
            <Earth size={15} />
            {thirdDiv.map((div, i) => (
              <span key={i + div} className="inline-block slideInFromBottom">
                {div}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!showWelcome) return <>{children}</>;
}
