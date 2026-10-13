export const DEFAULT_CONTACT = {
  email: "cahangirovismat@gmail.com",
  phone: "+994 55 297 27 59",
  github: "ismetcahangirov",
  location: { az: "Bakı, Azərbaycan", en: "Baku, Azerbaijan" },
};

export const telHref = (phone) => `tel:${phone.replace(/[^\d+]/g, "")}`;
export const githubUrl = (user) => `https://github.com/${user}`;
