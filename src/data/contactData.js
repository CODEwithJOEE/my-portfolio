import { MdEmail } from "react-icons/md";
import {
  FaPhone,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaDownload,
} from "react-icons/fa";

export const EMAIL = "joemarie27r@gmail.com";

export const CONTACTS = [
  {
    name: "Email",
    Icon: MdEmail,
    color: "#EA4335",
    link: `mailto:${EMAIL}?subject=Project%20Inquiry%20from%20Portfolio`,
  },
  {
    name: "Phone",
    Icon: FaPhone,
    color: "#16a34a",
    link: "tel:+639073195155",
  },
  {
    name: "WhatsApp",
    Icon: FaWhatsapp,
    color: "#25D366",
    link: "https://wa.me/639073195155",
  },
  {
    name: "Facebook",
    Icon: FaFacebook,
    color: "#1877F2",
    link: "https://www.facebook.com/joemarie.amante.ronday/",
  },
  {
    name: "Instagram",
    Icon: FaInstagram,
    color: "#E4405F",
    link: "https://www.instagram.com/joemari_e69/?hl=de",
  },
  {
    name: "LinkedIn",
    Icon: FaLinkedin,
    color: "#0A66C2",
    link: "https://ph.linkedin.com/in/joemarie-ronday-908a9a360",
  },
  {
    name: "Download vCard",
    Icon: FaDownload,
    color: "#0284C7",
    link: "/files/joemarie-ronday.vcf", // put the .vcf under /public/files
    download: true,
  },
];

// Small helper to know if a link is external (for target/rel)
export const isExternalLink = (href) => /^https?:\/\//i.test(href);
