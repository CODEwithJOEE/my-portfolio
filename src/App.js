import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useTheme from "./hooks/useTheme";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Layout from "./components/Layout";

import About from "./Section/About";
import Projects from "./Section/Projects";
import Experience from "./Section/Experience";
import Skills from "./Section/Skills";
import Education from "./Section/Education";
import Contact from "./Section/Contact";
import Certificates from "./Section/Certificates";

const PAGES = [
  { id: "about", label: "About", component: <About /> },
  { id: "projects", label: "Project", component: <Projects /> },
  { id: "experience", label: "Experience", component: <Experience /> },
  { id: "skills", label: "Skills", component: <Skills /> },
  { id: "education", label: "Education", component: <Education /> },
  { id: "contact", label: "Contact", component: <Contact /> },
  { id: "certificates", label: "Certificates", component: <Certificates /> },
];

export default function App() {
  const [active, setActive] = useState("about");
  const { dark, toggle } = useTheme(true);

  const RightPanel =
    active === "about" ? (
      <About onNavigate={setActive} />
    ) : (
      PAGES.find((p) => p.id === active)?.component ?? (
        <About onNavigate={setActive} />
      )
    );

  return (
    <div
      className={
        dark
          ? "min-h-screen bg-slate-900 text-slate-100"
          : "min-h-screen bg-slate-50 text-slate-900"
      }
    >
      <Header
        pages={PAGES.map(({ id, label }) => ({ id, label }))}
        active={active}
        onSelect={setActive}
        dark={dark}
        onToggleTheme={toggle}
      />
      <Layout
        left={<Sidebar onSelectContact={() => setActive("contact")} />}
        right={
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              {RightPanel}
            </motion.div>
          </AnimatePresence>
        }
      />
    </div>
  );
}
