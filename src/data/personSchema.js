import { EMAIL } from "./contactData";

export const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Joemarie Ronday",
  jobTitle: "Front-end Web Developer",
  url: "https://joe-portfolio-website.vercel.app/",
  email: `mailto:${EMAIL}`,
  telephone: "+639073195155",
  sameAs: [
    "https://www.facebook.com/joemarie.amante.ronday/",
    "https://ph.linkedin.com/in/joemarie-ronday-908a9a360",
    "https://www.instagram.com/joemari_e69/",
  ],
};
