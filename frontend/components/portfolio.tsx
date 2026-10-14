"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Camera, ExternalLink, GitBranch, Mail, Menu, MessageCircle, Store, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";

const nav = ["Home", "About", "Projects", "Skills", "Beyond", "Contact"];
const skills = [
  { area: "Frontend systems", items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML / CSS"] },
  { area: "Backend & web", items: ["Node.js", "Express", "REST APIs", "MongoDB"] },
  { area: "Programming", items: ["JavaScript", "C++", "Data structures", "Problem solving"] },
  { area: "Creative toolkit", items: ["Figma", "Visual systems", "Poster design", "Layout & typography"] },
];

const reveal = { initial: { opacity: 0, y: 34 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } };

function CustomCursor() {
  const [position, setPosition] = useState({ x: -50, y: -50 });
  const [label, setLabel] = useState("");
  useEffect(() => {
    const move = (event: MouseEvent) => setPosition({ x: event.clientX, y: event.clientY });
    const over = (event: MouseEvent) => setLabel((event.target as HTMLElement).closest("[data-cursor]")?.getAttribute("data-cursor") ?? "");
    window.addEventListener("mousemove", move); document.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); document.removeEventListener("mouseover", over); };
  }, []);
  return <div className={`cursor ${label ? "cursor-active" : ""}`} style={{ transform: `translate3d(${position.x}px,${position.y}px,0)` }}>{label}</div>;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)), { rootMargin: "-40% 0px -50%" });
    nav.forEach((item) => { const node = document.getElementById(item.toLowerCase()); if (node) observer.observe(node); });
    return () => observer.disconnect();
  }, []);
  return (
    <header className="nav-shell">
      <a className="brand" href="#home" aria-label="Kamrul Faysal home"><b>KF</b><span>FAYSAL</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{nav.map((item) => <a key={item} className={active === item.toLowerCase() ? "active" : ""} href={`#${item.toLowerCase()}`}>{item}</a>)}</nav>
      <div className="nav-actions"><a className="resume-link" href={profile.resumeUrl}>Résumé</a><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GitBranch size={18} /></a><button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button></div>
      {open && <motion.nav className="mobile-nav" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>{nav.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)}>{item}<span>0{nav.indexOf(item) + 1}</span></a>)}</motion.nav>}
    </header>
  );
}

function SectionTitle({ index, kicker, children }: { index: string; kicker: string; children: React.ReactNode }) {
  return <motion.div className="section-title" {...reveal}><p><span>{index}</span> / {kicker}</p><h2>{children}</h2></motion.div>;
}

function MeetMe() {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnOutside = (event: PointerEvent) => {
      if (panel.current && !panel.current.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const whatsappMessage = encodeURIComponent("Hi Kamrul, I found your portfolio and would like to connect.");

  return (
    <div className={`meet-me ${open ? "is-open" : ""}`} ref={panel}>
      {open && (
        <motion.div className="meet-menu" id="meet-menu" initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8 }} role="menu">
          <p><span>CONTACT CHANNEL</span><i>SELECT</i></p>
          <a href={`mailto:${profile.email}`} role="menuitem" onClick={() => setOpen(false)}><span className="meet-icon"><Mail /></span><span><b>Mail me</b><small>{profile.email}</small></span><ArrowUpRight /></a>
          <a href={`https://wa.me/${profile.whatsapp}?text=${whatsappMessage}`} target="_blank" rel="noreferrer" role="menuitem" onClick={() => setOpen(false)}><span className="meet-icon whatsapp"><MessageCircle /></span><span><b>WhatsApp me</b><small>Usually replies soon</small></span><ArrowUpRight /></a>
        </motion.div>
      )}
      <button className="meet-trigger" type="button" aria-expanded={open} aria-controls="meet-menu" onClick={() => setOpen((value) => !value)}>
        <span className="meet-pulse"><i /></span><b>{open ? "Close" : "Meet me"}</b>{open ? <X /> : <MessageCircle />}
      </button>
    </div>
  );
}

export function Portfolio() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const [override, setOverride] = useState(false);
  useEffect(() => {
    const target = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let input: string[] = [];
    const keydown = (event: KeyboardEvent) => { input = [...input, event.key].slice(-10); if (target.every((key, i) => input[i]?.toLowerCase() === key.toLowerCase())) { setOverride(true); window.setTimeout(() => setOverride(false), 2200); } };
    window.addEventListener("keydown", keydown); return () => window.removeEventListener("keydown", keydown);
  }, []);
  return (
    <main className={override ? "system-override" : ""}>
      <CustomCursor /><motion.div className="scroll-progress" style={{ scaleX }} />{override && <div className="override-message">SYSTEM OVERRIDE // CREATIVE MODE ENABLED</div>}<Navbar /><MeetMe />

      <section id="home" className="hero">
        <motion.div className="hero-copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <motion.p className="eyebrow" initial={{ y: 12 }} animate={{ y: 0 }} transition={{ delay: 0.12 }}>SOFTWARE ENGINEER <i /> CREATIVE DEVELOPER</motion.p>
          <h1 aria-label="Kamrul Hasan Faysal"><motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.18, duration: 0.75 }}>KAMRUL</motion.span><motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.26, duration: 0.75 }}>HASAN</motion.span><motion.span className="surname" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.34, duration: 0.75 }}>FAYSAL</motion.span></h1>
          <motion.div className="hero-summary" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.62 }}><p>I engineer digital products where <strong>code, interaction, and visual design</strong> meet.</p><span>{profile.bio}</span></motion.div>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}><a className="button primary" href="#projects">Explore my work <ArrowUpRight size={17} /></a><a className="button ghost" href={profile.github} target="_blank" rel="noreferrer">GitHub <GitBranch size={17} /></a></motion.div>
          <div className="hero-status"><span><i /> {profile.availability}</span><span>{profile.location}</span><span>Final-Year SWE</span></div>
        </motion.div>
        <div className="hero-signature" aria-label="KF — Engineering and design"><strong>KF</strong><span>ENGINEERING × DESIGN</span></div>
        <div className="scroll-cue"><span>SCROLL TO EXPLORE</span><i /></div>
      </section>

      <section id="about" className="section about"><SectionTitle index="01" kicker="ABOUT">ENGINEERING WITH<br />A DESIGNER&apos;S EYE.</SectionTitle><div className="about-layout"><motion.div className="about-copy" {...reveal}><p className="lede">Software engineering provides the structure. Design gives the product character.</p><p>I’m a final-year Software Engineering student focused on modern web development, software projects, and product creation. I care about how systems work—and equally about how people experience them.</p><p>That dual perspective shapes every build: clear logic, intentional interaction, and visual decisions that earn their place.</p></motion.div><motion.dl className="identity-panel" {...reveal}>{[["Name", profile.name], ["Role", profile.role], ["Focus", "Software / Web / UI"], ["Location", "Bangladesh"], ["Status", profile.availability]].map(([dt, dd]) => <div key={dt}><dt>{dt}</dt><dd>{dd}</dd></div>)}</motion.dl></div></section>

      <section id="projects" className="section projects"><SectionTitle index="02" kicker="SELECTED PROJECTS">BUILT TO THINK.<br />DESIGNED TO LAND.</SectionTitle><div className="project-list">{projects.map((project, index) => <motion.article className="project" key={project.title} {...reveal}><div className={`project-visual visual-${project.visual}`} data-cursor="VIEW ↗"><div className="window-bar"><span /><span /><span /><b>KH / {project.title.toUpperCase()}</b></div><div className="project-art"><em>0{index + 1}</em><strong>{project.title.slice(0, 2).toUpperCase()}</strong><i /></div></div><div className="project-copy"><p className="project-meta">PROJECT 0{index + 1} <span>{project.year}</span></p><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div><a href={project.githubUrl} target="_blank" rel="noreferrer">Source code <ArrowUpRight size={18} /></a></div></motion.article>)}</div><a className="all-projects" href={profile.github} target="_blank" rel="noreferrer">View all projects on GitHub <ArrowUpRight /></a></section>

      <section id="skills" className="section skills"><SectionTitle index="03" kicker="CAPABILITIES">TECH<br />ARSENAL.</SectionTitle><div className="skill-grid">{skills.map((group, index) => <motion.article key={group.area} {...reveal}><span>0{index + 1}</span><h3>{group.area}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></motion.article>)}</div><div className="skill-command"><span>KH-F@PORTFOLIO:~$</span><p>build --with clarity --ship with-character</p><i>PROCESS COMPLETE</i></div></section>

      <section id="beyond" className="section beyond"><SectionTitle index="04" kicker="BEYOND ENGINEERING">BEYOND<br />THE CODE.</SectionTitle><motion.p className="beyond-intro" {...reveal}>My work beyond software is shaped by photography, community, and entrepreneurship.</motion.p><div className="beyond-grid"><motion.article className="beyond-card society" {...reveal}><div className="beyond-visual"><Camera aria-hidden="true" /><strong>DIUPS</strong><span>MEMBER / PHOTOGRAPHY</span></div><div className="beyond-copy"><p>01 / COMMUNITY</p><h3>Daffodil International University Photographic Society</h3><p>I am a member of the Daffodil International University Photographic Society (DIUPS).</p></div></motion.article><motion.article className="beyond-card commerce" {...reveal}><div className="beyond-visual"><Store aria-hidden="true" /><strong>ONEELIXIR</strong><span>PERFUME BUSINESS</span></div><div className="beyond-copy"><p>02 / BUSINESS</p><h3>OneElixir</h3><p>I run OneElixir, my perfume business.</p></div></motion.article></div></section>

      <section id="contact" className="section contact"><div className="contact-orbit" aria-hidden="true"><i /><span /></div><p className="eyebrow">05 / CONTACT — TRANSMISSION OPEN</p><h2>LET&apos;S BUILD<br /><span>SOMETHING</span><br />MEMORABLE.</h2><a className="contact-link" href={`mailto:${profile.email}`}>Start a conversation <ArrowUpRight /></a><div className="contact-socials"><a href={`mailto:${profile.email}`}><Mail /> Email</a><a href={profile.github} target="_blank" rel="noreferrer"><GitBranch /> GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><ExternalLink /> LinkedIn</a></div></section>

      <footer><div><strong>KAMRUL HASAN FAYSAL</strong><span>SOFTWARE ENGINEER / CREATIVE DEVELOPER</span></div><p>Designed &amp; engineered with intention.</p><div><span className="online"><i /> PORTFOLIO // ONLINE</span><span>© {new Date().getFullYear()}</span></div></footer>
    </main>
  );
}
