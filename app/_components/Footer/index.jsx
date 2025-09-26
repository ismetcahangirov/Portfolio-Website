import Logo from "@/components/Logo";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const socials = [
  {
    name: "TikTok",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Ionicons_logo-tiktok.svg/2048px-Ionicons_logo-tiktok.svg.png",
    href: "https://www.tiktok.com/@yourusername",
  },
  {
    name: "Instagram",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/CIS-A2K_Instagram_Icon_%28Black%29.svg/2048px-CIS-A2K_Instagram_Icon_%28Black%29.svg.png",
    href: "https://www.instagram.com/yourusername",
  },
  {
    name: "Facebook",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Facebook_icon_%28black%29.svg/2048px-Facebook_icon_%28black%29.svg.png",
    href: "https://www.facebook.com/yourusername",
  },
  {
    name: "Threads",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Threads_%28app%29_logo.svg/2048px-Threads_%28app%29_logo.svg.png",
    href: "https://www.threads.net/@yourusername",
  },
  {
    name: "X (Twitter)",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/01/X-Logo-Round-Color.png",
    href: "https://x.com/yourusername",
  },
  {
    name: "YouTube",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/YouTube_dark_icon_%282017%29.svg/2560px-YouTube_dark_icon_%282017%29.svg.png",
    href: "https://www.youtube.com/@yourusername",
  },
  {
    name: "LinkedIn",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/LinkedIn_logo_In-Black.svg/1200px-LinkedIn_logo_In-Black.svg.png",
    href: "https://www.linkedin.com/in/yourusername",
  },
];

const Footer = () => {
  return (
    <footer className="select-none h-[300px] flex  flex-col space-y-6 justify-center items-center bg-LigtGray">
      <Logo black={true} width="90px" height="90px" />
      <div className="flex items-center gap-3">
        {socials.map((social) => {
          return (
            <Link key={social.name} href={social.href}>
              <Image
                alt={social.name}
                src={social.image}
                width={50}
                height={50}
                className="w-[auto] h-[25px]  grayscale contrast-100 object-cover transition-all duration-350 hover:invert hover:drop-shadow-2xl"
              />
            </Link>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
