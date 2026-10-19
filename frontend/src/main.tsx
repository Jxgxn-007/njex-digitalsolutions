import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Eye,
  Github,
  Globe,
  Globe2,
  Linkedin,
  Mail,
  Menu,
  Phone,
  ShoppingBag,
  Sparkles,
  Target,
  X,
  Zap,
} from 'lucide-react';
import { teamMembers, TeamMember } from './teamData';
import './styles.css';

const services = [
  {
    icon: Globe2,
    title: 'Website Development',
    description:
      'High-performance websites and bespoke web applications built with precision, fast loading speeds, and responsive design across all devices.',
    features: ['Modern UI/UX', 'SEO & Speed Optimized', 'Responsive Architecture'],
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce Solutions',
    description:
      'Custom online storefronts, interactive product catalogs, and streamlined booking workflows that make ordering effortless for customers.',
    features: ['Product Catalogs', 'Order Workflows', 'Mobile-First Checkout'],
  },
  {
    icon: Code2,
    title: 'Custom Software',
    description:
      'Tailored business software, internal dashboards, and client portals engineered around your team’s specific operational needs.',
    features: ['Custom Dashboards', 'Workflow Automation', 'API Integrations'],
  },
  {
    icon: Zap,
    title: 'Digital Automation',
    description:
      'Smart process automation and third-party integrations that connect your tools, eliminate repetitive manual tasks, and save time.',
    features: ['Workflow Automation', 'Instant Alerts', 'System Connectivity'],
  },
];

const navigationLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Mission & Vision', href: '#mission-vision' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

function TeamCard({ member }: { member: TeamMember }) {
  const [imgError, setImgError] = React.useState(false);

  return (
    <article className="team-card" id={member.id}>
      <div className="team-avatar-box">
        {!imgError ? (
          <img
            src={member.photoUrl}
            alt={member.role}
            className="team-photo"
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="team-avatar-fallback">
            <span>NJEX</span>
          </div>
        )}
      </div>

      <div className="team-content">
        <h3 className="team-role">{member.role}</h3>
        <p className="team-area">{member.area}</p>

        {member.socials && (
          <div className="team-social-links" aria-label="Social and portfolio links">
            {member.socials.portfolio && (
              <a
                href={member.socials.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="team-social-link"
                title="View Portfolio"
                aria-label={`${member.role} Portfolio`}
              >
                <Globe size={13} aria-hidden="true" />
                <span>Portfolio</span>
                <ArrowUpRight size={12} className="social-arrow" aria-hidden="true" />
              </a>
            )}
            {member.socials.github && (
              <a
                href={member.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="team-social-link"
                title="GitHub Profile"
                aria-label={`${member.role} GitHub`}
              >
                <Github size={13} aria-hidden="true" />
                <span>GitHub</span>
                <ArrowUpRight size={12} className="social-arrow" aria-hidden="true" />
              </a>
            )}
            {member.socials.linkedin && (
              <a
                href={member.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="team-social-link"
                title="LinkedIn Profile"
                aria-label={`${member.role} LinkedIn`}
              >
                <Linkedin size={13} aria-hidden="true" />
                <span>LinkedIn</span>
                <ArrowUpRight size={12} className="social-arrow" aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    service: 'Website Development',
    message: '',
  });
  const [sent, setSent] = React.useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };

    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('nav-overlay-active');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('nav-overlay-active');
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.body.classList.remove('nav-overlay-active');
    };
  }, [menuOpen]);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = form.name.trim();
    const cleanEmail = form.email.trim();
    const cleanMessage = form.message.trim();

    if (!cleanName || !cleanEmail || !cleanMessage) return;

    const subject = encodeURIComponent(`NJEX Enquiry — ${form.service}`);
    const body = encodeURIComponent(
      `Name: ${cleanName}\nEmail: ${cleanEmail}\nService: ${form.service}\n\nProject details:\n${cleanMessage}`
    );
    window.location.href = `mailto:njtech.in@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="site-shell">
      {/* ==================== COMPACT FLOATING NAVIGATION ==================== */}
      <header className="floating-nav-bar" aria-label="Site header">
        <a className="brand-logo-link" href="#home" onClick={closeMenu} aria-label="NJEX home">
          <span className="brand-mark">NJ</span>
          <span className="brand-text">
            <strong>NJEX</strong>
            <small>DIGITAL SOLUTIONS</small>
          </span>
        </a>

        <button
          className="menu-toggle-btn"
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="nav-overlay"
        >
          <span className="menu-btn-text">{menuOpen ? 'CLOSE' : 'MENU'}</span>
          <span className="menu-btn-icon">
            {menuOpen ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
          </span>
        </button>
      </header>

      {/* ==================== FULL-SCREEN NAVIGATION OVERLAY ==================== */}
      <div
        id="nav-overlay"
        className={`nav-overlay ${menuOpen ? 'is-active' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="nav-overlay-content">
          <nav className="overlay-menu-list" aria-label="Main menu">
            {navigationLinks.map((item, index) => (
              <a
                className="overlay-menu-link"
                href={item.href}
                key={item.href}
                onClick={closeMenu}
              >
                <span className="menu-num">0{index + 1}</span>
                <span className="menu-label">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="overlay-footer-contact">
            <a className="overlay-contact-item" href="mailto:njtech.in@gmail.com">
              <Mail size={15} aria-hidden="true" />
              <span>njtech.in@gmail.com</span>
            </a>
            <a className="overlay-contact-item" href="tel:+918610870325">
              <Phone size={15} aria-hidden="true" />
              <span>+91 86108 70325</span>
            </a>
          </div>
        </div>
      </div>

      <main>
        {/* ==================== 1. HERO SECTION ==================== */}
        <section className="hero-section" id="home">
          <div className="section-wrap hero-grid">
            <div className="hero-main">
              <div className="hero-eyebrow">
                <span className="eyebrow-dot" aria-hidden="true" />
                <span>SOFTWARE · DESIGN · DIGITAL SOLUTIONS</span>
              </div>

              <h1 className="hero-title">
                We Build Digital Experiences.
              </h1>

              <p className="hero-subtitle">
                Websites, software, and digital solutions that move your business forward.
              </p>

              <div className="hero-cta-group">
                <a className="btn btn-gold" href="#work">
                  View Our Work <ArrowRight size={16} aria-hidden="true" />
                </a>
                <a className="btn btn-outline" href="#contact">
                  Contact Us <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>

              <div className="hero-capabilities-bar">
                <span className="cap-label">CORE DISCIPLINES</span>
                <div className="cap-tags">
                  <span className="cap-tag">Web Applications</span>
                  <span className="cap-sep">·</span>
                  <span className="cap-tag">E-Commerce</span>
                  <span className="cap-sep">·</span>
                  <span className="cap-tag">Custom Software</span>
                </div>
              </div>
            </div>

            {/* Desktop Hero Visual Showcase */}
            <div className="hero-showcase" aria-hidden="true">
              <div className="hero-showcase-panel">
                <div className="showcase-panel-header">
                  <div className="showcase-status">
                    <span className="showcase-pulse" />
                    <span>SYSTEMS ACTIVE</span>
                  </div>
                  <span className="showcase-edition">NJEX // 2026</span>
                </div>

                <div className="showcase-panel-body">
                  <div className="showcase-code-snippet">
                    <span className="code-comment">// Verified Digital Architecture</span>
                    <p className="code-line">
                      <span className="code-keyword">const</span> solution = <span className="code-keyword">new</span> <span className="code-fn">DigitalPlatform</span>(&#123;
                    </p>
                    <p className="code-line code-indent">
                      focus: <span className="code-str">'E-Commerce & Custom Software'</span>,
                    </p>
                    <p className="code-line code-indent">
                      craft: <span className="code-str">'Modern UX & Clean Code'</span>,
                    </p>
                    <p className="code-line code-indent">
                      speed: <span className="code-str">'Optimized For Conversion'</span>
                    </p>
                    <p className="code-line">&#125;);</p>
                  </div>

                  <div className="showcase-deployment-card">
                    <div className="deploy-meta">
                      <span className="deploy-label">FEATURED DEPLOYMENT</span>
                      <strong className="deploy-title">Gokul Traders Online Platform</strong>
                    </div>
                    <a href="#work" className="deploy-link">
                      <span>Explore Work</span>
                      <ArrowRight size={13} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 2. SERVICES SECTION ==================== */}
        <section className="services-section section-pad" id="services">
          <div className="section-wrap">
            <div className="section-header">
              <span className="section-eyebrow">SERVICES & CAPABILITIES</span>
              <h2 className="section-title">What We Build</h2>
              <p className="section-subtitle">
                Comprehensive digital engineering tailored to modern business requirements.
              </p>
            </div>

            <div className="services-grid">
              {services.map(({ icon: Icon, title, description, features }) => (
                <article className="service-card" key={title}>
                  <div className="service-icon-box" aria-hidden="true">
                    <Icon size={24} strokeWidth={1.4} />
                  </div>
                  <h3 className="service-card-title">{title}</h3>
                  <p className="service-card-desc">{description}</p>
                  <ul className="service-feature-list">
                    {features.map((feature) => (
                      <li key={feature} className="service-feature-item">
                        <CheckCircle2 size={13} className="feature-check" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 3. FEATURED PROJECT (GOKUL TRADERS) ==================== */}
        <section className="project-section section-pad" id="work">
          <div className="section-wrap">
            <div className="section-header">
              <span className="section-eyebrow">FEATURED CASE STUDY</span>
              <h2 className="section-title">Gokul Traders</h2>
              <p className="section-subtitle">
                A high-volume online crackers booking and catalog exploration platform.
              </p>
            </div>

            <article className="project-card">
              {/* Realistic Browser Window & Project Visual */}
              <div className="project-preview-window">
                <div className="browser-header-bar" aria-hidden="true">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                  <span className="browser-url">https://gokul-traders.in</span>
                </div>

                <div className="browser-mock-body">
                  <div className="mock-spark-bg" aria-hidden="true">
                    <span className="spark spark-1">✦</span>
                    <span className="spark spark-2">✳</span>
                    <span className="spark spark-3">✧</span>
                  </div>
                  <div className="mock-badge">FESTIVE BOOKING & CATALOG PLATFORM</div>
                  <h3 className="mock-headline">
                    Make this season shine.
                  </h3>
                  <p className="mock-subheading">
                    Explore curated festive crackers, view catalog pricing, and place booking reservations online.
                  </p>
                  <span className="mock-cta">EXPLORE PRODUCT SELECTIONS ↗</span>

                  <div className="mock-tags-row">
                    <span className="mock-tag-item">E-COMMERCE</span>
                    <span className="mock-tag-item">RESPONSIVE WEB</span>
                    <span className="mock-tag-item">LIVE CLIENT PROJECT</span>
                  </div>
                </div>
              </div>

              {/* Project Dossier & Verified Features */}
              <div className="project-info">
                <div className="project-tags">
                  <span className="tag">E-Commerce</span>
                  <span className="tag">Web Platform</span>
                  <span className="tag">Live Deployment</span>
                </div>

                <h3 className="project-title">Gokul Traders</h3>
                <p className="project-desc">
                  An online crackers booking platform built for Gokul Traders to help customers explore curated festive products, review catalog pricing, and place booking reservations online.
                </p>

                <div className="project-features-grid">
                  <div className="project-feature-card">
                    <span className="p-feat-num">01</span>
                    <strong>Online Booking Flow</strong>
                    <p>Enables direct booking requests online through structured forms and real-time order calculation.</p>
                  </div>
                  <div className="project-feature-card">
                    <span className="p-feat-num">02</span>
                    <strong>Festive Product Discovery</strong>
                    <p>Organized catalog categorization and visual presentation tailored to seasonal shopping surges.</p>
                  </div>
                </div>

                <div className="project-actions">
                  <a
                    className="btn btn-gold"
                    href="https://gokul-traders.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                  <span className="project-live-url">https://gokul-traders.in/</span>
                </div>

                <p className="project-disclaimer">
                  Verified project overview based on the live deployment at gokul-traders.in.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* ==================== 4. ABOUT NJEX ==================== */}
        <section className="about-section section-pad" id="about">
          <div className="section-wrap about-grid">
            <div className="about-heading-col">
              <span className="section-eyebrow">ABOUT NJEX</span>
              <h2 className="about-title">
                Crafting digital solutions with purpose, precision, and longevity.
              </h2>
            </div>

            <div className="about-content-col">
              <p className="about-lead">
                NJEX is a modern digital solutions studio partnering with businesses to build high-impact web applications, e-commerce platforms, and custom software systems.
              </p>
              <p className="about-body">
                We bridge creative user experience design with dependable technical architecture. Every solution we build is engineered around clear operational goals, intuitive user workflows, and long-term scalability.
              </p>

              <div className="about-pillars">
                <div className="about-pillar">
                  <span className="pillar-num">01</span>
                  <strong>Purposeful Design</strong>
                  <p>Interfaces crafted for real human usability and brand distinction.</p>
                </div>
                <div className="about-pillar">
                  <span className="pillar-num">02</span>
                  <strong>Modern Engineering</strong>
                  <p>Clean, maintainable code architectures that scale with your growth.</p>
                </div>
                <div className="about-pillar">
                  <span className="pillar-num">03</span>
                  <strong>Direct Collaboration</strong>
                  <p>Direct access to engineering leadership without bureaucratic layers.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 5. MISSION & VISION ==================== */}
        <section className="mv-section section-pad" id="mission-vision">
          <div className="section-wrap">
            <div className="section-header">
              <span className="section-eyebrow">PURPOSE & DIRECTION</span>
              <h2 className="section-title">Mission & Vision</h2>
              <p className="section-subtitle">
                The core principles guiding our work and technology partnerships.
              </p>
            </div>

            <div className="mv-grid">
              <article className="mv-card">
                <div className="mv-icon-box" aria-hidden="true">
                  <Target size={24} strokeWidth={1.4} />
                </div>
                <h3 className="mv-title">Our Mission</h3>
                <p className="mv-text">
                  Our mission is to transform ideas into meaningful digital solutions by combining creativity, technology, and practical problem-solving. We aim to help businesses build a stronger digital presence, improve their workflows, and deliver exceptional experiences to their users.
                </p>
                <div className="mv-meta">
                  <span>PROBLEM-SOLVING FOCUS</span>
                  <span className="mv-dot">·</span>
                  <span>MEASURABLE VALUE</span>
                </div>
              </article>

              <article className="mv-card">
                <div className="mv-icon-box" aria-hidden="true">
                  <Eye size={24} strokeWidth={1.4} />
                </div>
                <h3 className="mv-title">Our Vision</h3>
                <p className="mv-text">
                  Our vision is to become a trusted technology partner known for delivering quality software and reliable digital experiences. We aspire to empower organizations through accessible technology, thoughtful design, and continuous innovation.
                </p>
                <div className="mv-meta">
                  <span>LONG-TERM PARTNERSHIP</span>
                  <span className="mv-dot">·</span>
                  <span>TECHNICAL EXCELLENCE</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ==================== 6. TEAM ==================== */}
        <section className="team-section section-pad" id="team">
          <div className="section-wrap">
            <div className="section-header">
              <span className="section-eyebrow">OUR TEAM</span>
              <h2 className="section-title">The People Behind NJEX</h2>
              <p className="section-subtitle">
                Dedicated professionals passionate about design, systems, and digital execution.
              </p>
            </div>

            <div className="team-grid">
              {teamMembers.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 7. CONTACT ==================== */}
        <section className="contact-section section-pad" id="contact">
          <div className="section-wrap contact-grid">
            <div className="contact-info">
              <span className="section-eyebrow">GET IN TOUCH</span>
              <h2 className="contact-headline">
                Have an idea? Let's build something exceptional together.
              </h2>
              <p className="contact-subtext">
                Whether you’re planning a new website, developing a custom web platform, or looking to automate operational workflows, reach out directly. We reply promptly within 24 hours.
              </p>

              <div className="direct-channels">
                <a className="direct-channel-card" href="mailto:njtech.in@gmail.com">
                  <Mail size={20} aria-hidden="true" />
                  <div>
                    <small>DIRECT EMAIL</small>
                    <strong>njtech.in@gmail.com</strong>
                  </div>
                  <ArrowUpRight size={15} className="channel-arrow" aria-hidden="true" />
                </a>

                <a className="direct-channel-card" href="tel:+918610870325">
                  <Phone size={20} aria-hidden="true" />
                  <div>
                    <small>PHONE / WHATSAPP</small>
                    <strong>+91 86108 70325</strong>
                  </div>
                  <ArrowUpRight size={15} className="channel-arrow" aria-hidden="true" />
                </a>
              </div>

              <div className="contact-note">
                <Sparkles size={14} className="note-icon" aria-hidden="true" />
                <span>DIRECT FOUNDER RESPONSE · NO BUREAUCRATIC DELAYS</span>
              </div>
            </div>

            <div className="contact-form-box">
              <div className="form-box-header">
                <span>PROJECT ENQUIRY</span>
                <span className="form-status-indicator">READY TO ASSIST</span>
              </div>

              <form className="contact-form" onSubmit={submit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="How should we address you?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="service">Service Needed</label>
                  <select
                    id="service"
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                  >
                    <option value="Website Development">Website Development</option>
                    <option value="E-commerce Solutions">E-commerce Solutions</option>
                    <option value="Custom Software">Custom Software</option>
                    <option value="Digital Automation">Digital Automation</option>
                    <option value="Other">Other Custom Project</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Project Details</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your project, objectives, or timeline…"
                  />
                </div>

                <button className="btn btn-gold form-btn" type="submit">
                  <span>Send Project Enquiry</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>

                {sent && (
                  <p className="form-status-msg" role="status">
                    Your email app has been opened with your inquiry pre-filled!
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* ==================== 8. SUBSTANTIAL MULTI-COLUMN FOOTER ==================== */}
      <footer className="footer-rich">
        <div className="section-wrap footer-inner">
          <div className="footer-grid">
            {/* Column 1: Studio Identity */}
            <div className="footer-col footer-col-brand">
              <a className="footer-brand" href="#home" onClick={closeMenu} aria-label="NJEX home">
                <span className="brand-mark">NJ</span>
                <span className="brand-text">
                  <strong>NJEX</strong>
                  <small>DIGITAL SOLUTIONS</small>
                </span>
              </a>
              <p className="footer-desc">
                NJEX designs and engineers bespoke web applications, high-converting e-commerce platforms, and tailored software solutions for ambitious organizations.
              </p>
              <div className="footer-direct-link">
                <a href="mailto:njtech.in@gmail.com">njtech.in@gmail.com</a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="footer-col footer-col-links">
              <h3 className="footer-heading">Quick Navigation</h3>
              <ul className="footer-list">
                {navigationLinks.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} onClick={closeMenu}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Capabilities */}
            <div className="footer-col footer-col-services">
              <h3 className="footer-heading">Capabilities</h3>
              <ul className="footer-list">
                <li><a href="#services" onClick={closeMenu}>Website Development</a></li>
                <li><a href="#services" onClick={closeMenu}>E-commerce Solutions</a></li>
                <li><a href="#services" onClick={closeMenu}>Custom Software</a></li>
                <li><a href="#services" onClick={closeMenu}>Digital Automation</a></li>
                <li><a href="#work" onClick={closeMenu}>Gokul Traders Case Study</a></li>
              </ul>
            </div>

            {/* Column 4: Direct Action & Contact */}
            <div className="footer-col footer-col-contact">
              <h3 className="footer-heading">Start a Conversation</h3>
              <p className="footer-contact-text">
                Ready to turn your idea into a dependable digital product? We are ready to help.
              </p>
              <div className="footer-contact-actions">
                <a className="btn btn-gold footer-btn" href="#contact" onClick={closeMenu}>
                  Get in Touch <ArrowRight size={14} aria-hidden="true" />
                </a>
              </div>
              <div className="footer-phone-contact">
                <Phone size={13} aria-hidden="true" />
                <a href="tel:+918610870325">+91 86108 70325</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <span className="footer-copy">
              © {currentYear} NJEX Software & Digital Solutions. All rights reserved.
            </span>
            <span className="footer-tagline">
              Design · Engineering · Longevity
            </span>
            <a className="footer-back-to-top" href="#home" onClick={scrollToTop}>
              Back to Top <ArrowUp size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);