import { Archivo, Hanken_Grotesk, JetBrains_Mono, Caveat } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.ismatcahangirov.com"),
  title: "Ismat Cahangirov — Full Stack Developer",
  description:
    "Full stack developer from Baku. I design, build and ship web and mobile products end to end with Next.js, React Native, Node.js and PostgreSQL.",
  icons: { icon: "/logo.svg" },
  openGraph: {
    title: "Ismat Cahangirov — Full Stack Developer",
    description:
      "Web and mobile products built end to end: IdeyaNest, Xira, Docify, Minna, Cahan Academy and more.",
    images: ["/scene/hero-bust.png"],
    type: "website",
  },
};

export const viewport = {
  themeColor: "#d5d5d5",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${hanken.variable} ${jetbrains.variable} ${caveat.variable}`}
    >
      <body>
        {children}
        <Toaster position="bottom-center" theme="dark" />
      </body>
    </html>
  );
}
