import { useState, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["About", "Skills", "Projects", "Education", "Contact"];

const SKILLS = [
  { group: "Frontend", color: "#1a6cf6", bg: "#e8f0fe", items: ["HTML5", "CSS3", "JavaScript"] },
  { group: "Backend", color: "#0f7b5c", bg: "#e0f5ee", items: ["Python", "Django", "Flask"] },
  { group: "AI / ML", color: "#6c3fcf", bg: "#f0ebff", items: ["NLTK", "scikit-learn", "TensorFlow", "Pandas", "NumPy", "LangChain", "LangGraph"] },
  { group: "Tools", color: "#b05c00", bg: "#fff3e0", items: ["Git", "GitHub", "VS Code", "Ollama", "Streamlit"] },
];

const PROJECTS = [
  {
    title: "RAG Chatbot",
    desc: "Conversational chatbot built with Python and NLP techniques. Understands user queries and returns context-aware replies using intent classification.",
    stack: ["Python", "streamlit", "Ollama", "LangChain", "langgraph"],
    color: "#6c3fcf",
    bg: "#f0ebff",
    live: "https://agent-rag1.streamlit.app/",
  },
  {
    title: "ECOMMERCE WEBSITE (Django)",
    desc: "Full-stack web app where companies post jobs and candidates apply. Features user auth, role-based access, and an admin dashboard.",
    stack: ["Django", "HTML/CSS", "JavaScript", "django", "SQLite"],
    color: "#0f7b5c",
    bg: "#e0f5ee",
    live: "https://ecommerce-1-g8wt.onrender.com",
  },
  {
    title: "Topic Sentiment Analyser",
    desc: "NLP model that performs sentiment analysis on various topics. Uses NLTK for text preprocessing and sentiment scoring.",
    stack: ["NLTK", "Python", "Pandas", "NumPy", "scikit-learn"],
    color: "#1a6cf6",
    bg: "#e8f0fe",
    live: "https://nltk-sentiment-analyzer.onrender.com",
  },
  {
    title: "Student Dashboard",
    desc: "Responsive web dashboard showing attendance, grades, and announcements. Built as a full-stack project with Django backend and JS frontend.",
    stack: ["Django", "JavaScript", "Chart.js", "CSS"],
    color: "#b05c00",
    bg: "#fff3e0",
    live: "#",
  },
];

// ─── STYLES ──────────────────────────────────────────────────────────────────
const styles = {
  root: {
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    background: "#f7f8fc",
    color: "#1a1a2e",
    minHeight: "100vh",
    lineHeight: 1.6,
  },

  // Navbar
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "rgba(247,248,252,0.92)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid #e4e6f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 2rem",
    height: 60,
  },
  navBrand: { fontSize: 16, fontWeight: 700, color: "#1a1a2e", letterSpacing: "-0.02em" },
  navLinks: { display: "flex", gap: 28 },
  navLink: {
    fontSize: 13,
    color: "#555",
    cursor: "pointer",
    textDecoration: "none",
    fontWeight: 500,
    transition: "color 0.2s",
  },

  // Hero
  hero: {
    padding: "5rem 2rem 4rem",
    maxWidth: 720,
    margin: "0 auto",
    textAlign: "center",
  },
  heroName: { fontSize: 36, fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 10 },
  heroRole: { fontSize: 16, color: "#555", marginBottom: 6 },
  heroBadge: {
    display: "inline-block",
    fontSize: 12,
    fontWeight: 600,
    background: "#e6f4ea",
    color: "#1a7a3c",
    padding: "4px 12px",
    borderRadius: 20,
    marginBottom: "1.5rem",
    border: "1px solid #b2dfcb",
  },
  heroButtons: { display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: "1.5rem" },
  btnPrimary: {
    background: "#1a1a2e",
    color: "#fff",
    border: "none",
    padding: "10px 22px",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
  btnOutline: {
    background: "transparent",
    color: "#1a1a2e",
    border: "1.5px solid #d0d3e8",
    padding: "10px 22px",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
  heroLinks: { display: "flex", gap: 20, justifyContent: "center" },
  heroLinkItem: { fontSize: 13, color: "#888" },

  // Section
  section: { maxWidth: 800, margin: "0 auto", padding: "3rem 2rem" },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.12em",
    color: "#888",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  sectionTitle: { fontSize: 24, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "1.75rem" },
  divider: { borderTop: "1px solid #e4e6f0", margin: "0 2rem" },

  // About
  aboutText: { fontSize: 15, color: "#444", lineHeight: 1.8, maxWidth: 600 },

  // Skills
  skillsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 14,
  },
  skillCard: {
    background: "#fff",
    border: "1px solid #e4e6f0",
    borderRadius: 12,
    padding: "1rem 1.25rem",
  },
  skillGroupLabel: { fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 },
  skillTags: { display: "flex", flexWrap: "wrap", gap: 6 },
  skillTag: { fontSize: 12, fontWeight: 500, padding: "4px 10px", borderRadius: 6 },

  // Projects
  projectsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 16,
  },
  projectCard: {
    background: "#fff",
    border: "1px solid #e4e6f0",
    borderRadius: 14,
    padding: "1.25rem 1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  projectHeader: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  projectTitle: { fontSize: 15, fontWeight: 700 },
  projectGithub: { fontSize: 12, fontWeight: 600, color: "#1a6cf6", cursor: "pointer" },
  projectDesc: { fontSize: 13, color: "#555", lineHeight: 1.7 },
  projectStack: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 },
  stackTag: { fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 5 },

  // Education
  eduCard: {
    background: "#fff",
    border: "1px solid #e4e6f0",
    borderRadius: 14,
    padding: "1.25rem 1.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
  },
  eduDegree: { fontSize: 15, fontWeight: 700, marginBottom: 4 },
  eduCollege: { fontSize: 13, color: "#666" },
  eduYear: { fontSize: 22, fontWeight: 800, color: "#1a6cf6", lineHeight: 1 },
  eduCgpa: { fontSize: 13, color: "#888", textAlign: "right" },

  // Contact
  contactGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 },
  contactCard: {
    background: "#fff",
    border: "1px solid #e4e6f0",
    borderRadius: 12,
    padding: "1rem 1.25rem",
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  contactType: { fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.08em" },
  contactVal: { fontSize: 13, fontWeight: 600, color: "#1a6cf6" },

  // Footer
  footer: {
    textAlign: "center",
    padding: "2rem",
    fontSize: 12,
    color: "#aaa",
    borderTop: "1px solid #e4e6f0",
    marginTop: "2rem",
  },
};

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Navbar() {
  const scroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <nav style={styles.nav}>
      <span style={styles.navBrand}></span>
      <div style={styles.navLinks}>
        {NAV_LINKS.map((l) => (
          <span key={l} style={styles.navLink} onClick={() => scroll(l.toLowerCase())}>
            {l}
          </span>
        ))}
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section style={styles.hero}>
      <h1 style={styles.heroName}>MOHAMMED FAHAD T H </h1>
      <p style={styles.heroRole}>AI Engineer &nbsp;·&nbsp; Full Stack Developer &nbsp;·&nbsp; AI / ML Enthusiast</p>
      <span style={styles.heroBadge}>Open to work — Fresher 2026</span>
      <div style={styles.heroButtons}>
        <button style={styles.btnPrimary} onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
          View Projects
        </button>
        <a 
          href="/resume.pdf" 
          download="Mohammed_Fahad_Resume.pdf" 
          style={{ ...styles.btnOutline, textDecoration: "none", display: "inline-block", textAlign: "center" }}
        >
          Download Resume
        </a>
      </div>
      <div style={styles.heroLinks}>
        <span style={styles.heroLinkItem}>https://github.com/cybersecurity-1</span>
        <span style={styles.heroLinkItem}>https://www.linkedin.com/in/mohammed-fahad07/</span>
        <span style={styles.heroLinkItem}>fahad01freelance@gmail.com</span>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={styles.section}>
      <p style={styles.sectionLabel}>About me</p>
      <h2 style={styles.sectionTitle}>Who I am</h2>
      <p style={styles.aboutText}>
        Hello, I'm Mohammed Fahad T H
        I'm a BSc Computer Science graduate from VLBJ College of Arts and Science, Coimbatore, passionate about building intelligent systems that solve real-world problems.
        My journey into AI began with web development using Python and Django, but I found my true calling in Generative AI and Agentic Systems. I'm now focused on creating production-ready AI applications that leverage RAG architectures, LangChain, and LangGraph.
        Currently seeking opportunities as a GenAI/Agentic AI Engineer where I can contribute to innovative AI solutions while continuously learning and growing.
      </p>
      <p style={{ ...styles.aboutText, marginTop: 14 }}>
        I'm actively looking for roles where I can contribute, learn fast, and grow as an engineer.
        Whether it's a web app or an AI project, I love turning ideas into working products.
      </p>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" style={styles.section}>
      <p style={styles.sectionLabel}>What I know</p>
      <h2 style={styles.sectionTitle}>Skills</h2>
      <div style={styles.skillsGrid}>
        {SKILLS.map((s) => (
          <div key={s.group} style={styles.skillCard}>
            <p style={{ ...styles.skillGroupLabel, color: s.color }}>{s.group}</p>
            <div style={styles.skillTags}>
              {s.items.map((item) => (
                <span key={item} style={{ ...styles.skillTag, background: s.bg, color: s.color }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" style={styles.section}>
      <p style={styles.sectionLabel}>What I built</p>
      <h2 style={styles.sectionTitle}>Projects</h2>
      <div style={styles.projectsGrid}>
        {PROJECTS.map((p) => (
          <div key={p.title} style={styles.projectCard}>
            <div style={styles.projectHeader}>
              <span style={styles.projectTitle}>{p.title}</span>
              <a href={p.live} style={styles.projectGithub} target="_blank" rel="noopener noreferrer">Live →</a>
            </div>
            <p style={styles.projectDesc}>{p.desc}</p>
            <div style={styles.projectStack}>
              {p.stack.map((t) => (
                <span key={t} style={{ ...styles.stackTag, background: p.bg, color: p.color }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" style={styles.section}>
      <p style={styles.sectionLabel}>Background</p>
      <h2 style={styles.sectionTitle}>Education</h2>
      <div style={styles.eduCard}>
        <div>
          <p style={styles.eduDegree}>BSc — Computer Science</p>
          <p style={styles.eduCollege}>VLB Janakiammal College of Arts and Science, Coimbatore</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={styles.eduYear}>2025</p>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const contacts = [
    { type: "Email", val: "fahad01freelance@gmail.com", href: "mailto:fahad01freelance@gmail.com" },
    { type: "GitHub", val: "github.com/cybersecurity-1", href: "https://github.com/cybersecurity-1" },
    { type: "LinkedIn", val: "linkedin.com/in/mohammed-fahad07", href: "https://www.linkedin.com/in/mohammed-fahad07/" },
  ];
  return (
    <section id="contact" style={styles.section}>
      <p style={styles.sectionLabel}>Get in touch</p>
      <h2 style={styles.sectionTitle}>Contact</h2>
      <p style={{ ...styles.aboutText, marginBottom: "1.5rem" }}>
        I'm actively looking for full-time roles in AI/ML. Feel free to reach out!
      </p>
      <div style={styles.contactGrid}>
        {contacts.map((c) => (
          <a key={c.type} href={c.href} style={{ ...styles.contactCard, textDecoration: "none" }}>
            <span style={styles.contactType}>{c.type}</span>
            <span style={styles.contactVal}>{c.val}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return <footer style={styles.footer}>Built with React · {new Date().getFullYear()} · Mohammed Fahad T H</footer>;
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  return (
    <div style={styles.root}>
      <Navbar />
      <Hero />
      <div style={styles.divider} />
      <About />
      <div style={styles.divider} />
      <Skills />
      <div style={styles.divider} />
      <Projects />
      <div style={styles.divider} />
      <Education />
      <div style={styles.divider} />
      <Contact />
      <Footer />
    </div>
  );
}
