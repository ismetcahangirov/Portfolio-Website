export default function manifest() {
  return {
    name: "Ismat Jahangirov — Full Stack Developer",
    short_name: "Jahangirov",
    start_url: "/",
    display: "standalone",
    background_color: "#d5d5d5",
    theme_color: "#d5d5d5",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
