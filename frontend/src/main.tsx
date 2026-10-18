import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Bot,
  Check,
  ExternalLink,
  Globe2,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Sparkles,
  Workflow,
  X,
} from 'lucide-react';
import { teamMembers, TeamMember } from './teamData';
import './styles.css';

const services = [
  {
    icon: Globe2,
    number: '01',
    title: 'Websites & E-commerce',
    body: 'Distinctive, high-performance web applications and online storefronts designed to convert visits into lasting business relationships.',
  },
  {
    icon: MessageCircle,
    number: '02',
    title: 'WhatsApp Commerce',
    body: 'Friction-light conversational journeys bringing product discovery, catalog browsing, and booking closer to everyday chat.',
  },
  {
    icon: Workflow,
    number: '03',
    title: 'Digital Identity & Automation',
    body: 'Domain architecture, secure business communications, and automated operational workflows that bring clarity to daily tasks.',
  },
  {
    icon: Bot,
    number: '04',
    title: 'Custom Digital Solutions',
    body: 'Purpose-built web software, booking systems, and internal tools engineered around the exact way your company operates.',
  },
];

const navigationLinks = [
  { number: '01', label: 'Home', href: '#home', tag: 'Top of page' },
  { number: '02', label: 'Services', href: '#services', tag: 'What we engineer' },
  { number: '03', label: 'Selected Work', href: '#work', tag: 'Case studies' },
  { number: '04', label: 'About NJEX', href: '#about', tag: 'Studio philosophy' },
  { number: '05', label: 'Our Team', href: '#team', tag: 'The minds behind' },
  { number: '06', label: 'Contact', href: '#contact', tag: 'Initiate project' },
];

const footerServices = [
  'Website Development',
  'E-commerce Solutions',
  'WhatsApp Checkout',
  'Digital Identity',
  'Workflow Automation',
  'Custom Software Solutions',
];

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const [imgError, setImgError] = React.useState(false);
  const showPhoto = Boolean(member.photoUrl && !imgError);

  return (
    <article className="team-card" id={member.id}>
      <div className="team-avatar-box">
        {showPhoto ? (
          <img
            src={member.photoUrl}
            alt={member.name}
            className="team-photo"
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="team-avatar-placeholder" aria-label={`Avatar placeholder for ${member.name}`}>
            <div className="avatar-ambient-glow" aria-hidden="true" />
            <div className="avatar-orbit" aria-hidden="true" />
            <div className="avatar-frame">
              <span className="avatar-number">{member.avatarPlaceholder.initials}</span>
              <span className="avatar-brand-tag">NJEX</span>
            </div>
            <div className="avatar-badge">{member.avatarPlaceholder.badgeText}</div>
          </div>
        )}
        <div className="team-index">MEMBER / {String(index + 1).padStart(2, '0')}</div>
      </div>

      <div className="team-content">
        <div className="team-header">
          <h3 className="team-name">{member.name}</h3>
          <p className="team-designation">{member.designation}</p>
        </div>

        <div className="team-responsibility">
          <span className="resp-label">Area of Responsibility</span>
          <span className="resp-value">{member.responsibility}</span>
        </div>

        <p className="team-bio">{member.bio}</p>

        {member.socialLinks && (
          <div className="team-links">
            {member.socialLinks.linkedin && (
              <a
                href={member.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="team-link"
                aria-label={`${member.name} on LinkedIn`}
              >
                <Linkedin size={14} aria-hidden="true" />
                <span>LinkedIn</span>
                <ArrowUpRight size={12} aria-hidden="true" />
              </a>
            )}
            {member.socialLinks.portfolio && (
              <a
                href={member.socialLinks.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="team-link"
                aria-label={`${member.name} Portfolio`}
              >
                <ExternalLink size={14} aria-hidden="true" />
                <span>Portfolio</span>
                <ArrowUpRight size={12} aria-hidden="true" />
              </a>
            )}
            {member.socialLinks.email && (
              <a
                href={member.socialLinks.email}
                className="team-link"
                aria-label={`Email ${member.name}`}
              >
                <Mail size={14} aria-hidden="true" />
                <span>Email</span>
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
    service: 'Website or e-commerce',
    message: '',
  });
  const [sent, setSent] = React.useState(false);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Keyboard accessibility and body scroll locking
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
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

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return;
    }

    const subject = encodeURIComponent(`NJEX project enquiry — ${form.service}`);
    const body = encodeURIComponent(
      `Name: ${cleanName}\nEmail: ${cleanEmail}\nInterested in: ${form.service}\n\nProject details:\n${cleanMessage}`
    );
    window.location.href = `mailto:njtech.in@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="site-shell">
      <div className="grain" aria-hidden="true" />

      {/* ==================== IMMERSIVE CORNER CONTROLS (NO HORIZONTAL BAR) ==================== */}
      <div className="immersive-nav-bar">
        {/* Top-Left Compact Logo / Monogram */}
        <a className="corner-brand" href="#home" onClick={closeMenu} aria-label="NJEX studio home">
          <span className="corner-brand-mark">NJ</span>
          <span className="corner-brand-info">
            <strong>NJEX</strong>
            <small>SOFTWARE & DIGITAL SOLUTIONS</small>
          </span>
        </a>

        {/* Top-Right Minimal Menu Icon */}
        <button
          className="corner-menu-trigger"
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close navigation overlay' : 'Open navigation overlay'}
          aria-expanded={menuOpen}
          aria-controls="fullscreen-navigation"
        >
          <span className="menu-trigger-text">{menuOpen ? 'CLOSE' : 'MENU'}</span>
          <span className="menu-trigger-icon-box">
            {menuOpen ? <X size={17} aria-hidden="true" /> : <Menu size={17} aria-hidden="true" />}
          </span>
        </button>
      </div>

      {/* ==================== FULL-SCREEN NAVIGATION OVERLAY ==================== */}
      <div
        id="fullscreen-navigation"
        className={`fullscreen-overlay ${menuOpen ? 'overlay-active' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="overlay-ambient-glow" aria-hidden="true" />
        <div className="overlay-container">
          <div className="overlay-top-strip">
            <span className="overlay-edition">NJEX DIGITAL STUDIO // NAVIGATION</span>
            <span className="overlay-status-pill">
              <span className="status-dot-pulse" aria-hidden="true" /> ACCEPTING CLIENT PROJECTS
            </span>
          </div>

          <div className="overlay-body">
            {/* Primary Editorial Navigation Links */}
            <nav className="overlay-nav-links" aria-label="Overlay Navigation">
              {navigationLinks.map((link) => (
                <a
                  key={link.number}
                  href={link.href}
                  className="overlay-nav-item"
                  onClick={closeMenu}
                >
                  <span className="nav-item-num">{link.number}</span>
                  <span className="nav-item-title">{link.label}</span>
                  <span className="nav-item-tag">{link.tag}</span>
                  <ArrowUpRight className="nav-item-arrow" size={24} aria-hidden="true" />
                </a>
              ))}
            </nav>

            {/* Studio Context & Direct Inquiries */}
            <div className="overlay-sidebar">
              <div className="overlay-sidebar-block">
                <span className="sidebar-label">THE STUDIO</span>
                <p className="sidebar-description">
                  NJEX designs, architects, and builds bespoke software, conversion-focused web applications, and thoughtful digital commerce systems for ambitious businesses.
                </p>
              </div>

              <div className="overlay-sidebar-block">
                <span className="sidebar-label">DIRECT CONTACT</span>
                <a className="sidebar-link" href="mailto:njtech.in@gmail.com">
                  <Mail size={15} aria-hidden="true" />
                  <span>njtech.in@gmail.com</span>
                </a>
                <a className="sidebar-link" href="tel:+918610870325">
                  <Phone size={15} aria-hidden="true" />
                  <span>+91 86108 70325</span>
                </a>
              </div>

              <div className="overlay-sidebar-cta">
                <a className="button button-gold overlay-cta-btn" href="#contact" onClick={closeMenu}>
                  Start a Project <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div className="overlay-bottom-bar">
            <span>© {currentYear} NJEX</span>
            <span>STRATEGY · DESIGN · DEVELOPMENT</span>
            <span>PRESS ESC TO CLOSE</span>
          </div>
        </div>
      </div>

      <main>
        {/* ==================== CINEMATIC FULL-SCREEN HERO ==================== */}
        <section className="hero-fullscreen" id="home">
          <div className="hero-top-ambient" aria-hidden="true" />
          <div className="section-wrap hero-content-grid">
            <div className="hero-editorial">
              <div className="hero-kicker">
                <span className="kicker-rule" aria-hidden="true" />
                <span>INDEPENDENT DIGITAL & SOFTWARE STUDIO</span>
              </div>

              <h1 className="hero-headline">
                Ideas deserve<br />
                <em>better digital</em><br />
                experiences.
              </h1>

              <p className="hero-summary">
                NJEX partners with forward-thinking businesses to engineer distinctive web applications, frictionless commerce storefronts, and custom software systems shaped around the way ambitious companies actually grow.
              </p>

              <div className="hero-actions-wrap">
                <a className="button button-gold hero-btn-primary" href="#work">
                  Explore Our Work <ArrowRight size={16} aria-hidden="true" />
                </a>
                <a className="button button-outline hero-btn-secondary" href="#contact">
                  Start a Project <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>

              <div className="hero-specs-row">
                <div className="spec-item">
                  <span className="spec-dot" aria-hidden="true" />
                  <strong>STRATEGY</strong>
                  <small>Clarity & Architecture</small>
                </div>
                <div className="spec-item">
                  <span className="spec-dot" aria-hidden="true" />
                  <strong>CRAFT</strong>
                  <small>Refined Aesthetics</small>
                </div>
                <div className="spec-item">
                  <span className="spec-dot" aria-hidden="true" />
                  <strong>ENGINEERING</strong>
                  <small>Reliable Codebases</small>
                </div>
              </div>
            </div>

            {/* Asymmetric Geometric Art Installation */}
            <div className="hero-monolith-art" aria-label="Abstract gold NJEX architectural sculpture">
              <div className="monolith-orbit orbit-a" aria-hidden="true" />
              <div className="monolith-orbit orbit-b" aria-hidden="true" />
              <div className="monolith-axis axis-vert" aria-hidden="true" />
              <div className="monolith-axis axis-horiz" aria-hidden="true" />
              <div className="monolith-core" aria-hidden="true">
                <div className="monolith-frame">
                  <span className="monolith-letter letter-n">N</span>
                  <span className="monolith-letter letter-j">J</span>
                </div>
                <div className="monolith-cross-light" />
              </div>
              <div className="monolith-coordinates" aria-hidden="true">
                <span>COORD // 13.0827° N · 80.2707° E</span>
                <span>EDITION / 2026.01</span>
              </div>
              <div className="monolith-badge">ESTABLISHED WITH INTENTION</div>
            </div>
          </div>

          {/* Cinematic Bottom Hero Ribbon */}
          <div className="hero-bottom-ribbon">
            <div className="section-wrap ribbon-inner">
              <div className="ribbon-col">
                <span className="ribbon-dim">FEATURED CASE STUDY</span>
                <strong className="ribbon-bold">GOKUL TRADERS // ECOMMERCE BOOKING</strong>
              </div>
              <div className="ribbon-col ribbon-center">
                <span className="ribbon-dim">FOCUS</span>
                <span className="ribbon-bold">PURPOSE · PRECISION · LONGEVITY</span>
              </div>
              <a className="ribbon-col ribbon-right" href="#work">
                <span>EXPLORE WORK</span>
                <ArrowDownRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* ==================== EDITORIAL INTRO MANIFESTO ==================== */}
        <section className="manifesto-band">
          <div className="section-wrap manifesto-layout">
            <div className="manifesto-aside">
              <span className="section-num">01 // ESSENCE</span>
              <p className="aside-title">THE DIGITAL PARADOX</p>
            </div>
            <div className="manifesto-main">
              <h2>
                Good technology should do more than work.<br />
                <em>It should advance your business forward.</em>
              </h2>
              <p className="manifesto-lead">
                Too much software is built generic, bloated, and disconnected from genuine customer needs. NJEX builds with restraint: thoughtful design systems, resilient codebases, and digital experiences that honor your brand’s reputation.
              </p>
            </div>
          </div>
        </section>

        {/* ==================== PROMINENT CASE STUDY: GOKUL TRADERS ==================== */}
        <section className="work-section section-pad" id="work">
          <div className="section-wrap">
            <div className="section-header-editorial">
              <div className="header-eyebrow-box">
                <span className="section-num">02 // SELECTED WORK</span>
                <p className="eyebrow">VERIFIED PROJECT CASE STUDY</p>
              </div>
              <div className="header-title-split">
                <h2>Ideas made<br /><em>real.</em></h2>
                <p className="heading-summary">
                  Every project starts with an operational need.<br />
                  We engineer around the people who interact with it every day.
                </p>
              </div>
            </div>

            {/* Gokul Traders Feature Case Study */}
            <article className="featured-case-study">
              <div className="case-study-visual">
                <div className="case-study-window" aria-hidden="true">
                  <div className="window-bar">
                    <span className="dot dot-red" />
                    <span className="dot dot-yellow" />
                    <span className="dot dot-green" />
                    <span className="window-url">https://gokul-traders.in</span>
                  </div>
                  <div className="festive-sky">
                    <div className="festive-glow" />
                    <div className="spark spark-1">✳</div>
                    <div className="spark spark-2">✦</div>
                    <div className="spark spark-3">✧</div>
                    <div className="window-mock-card">
                      <small className="mock-tag">FESTIVE CRACKERS BOOKING PLATFORM</small>
                      <strong className="mock-title">
                        Make this<br />
                        season shine.
                      </strong>
                      <span className="mock-btn">EXPLORE PRODUCT SELECTIONS ↗</span>
                    </div>
                  </div>
                </div>
                <div className="visual-caption-tag" aria-hidden="true">
                  <span>PROJECT / 001</span>
                  <span>ONLINE COMMERCE ENGINE</span>
                </div>
              </div>

              <div className="case-study-dossier">
                <div className="dossier-meta-tags">
                  <span className="meta-pill">CLIENT CASE STUDY</span>
                  <span className="meta-pill">CRACKER BOOKING APPLICATION</span>
                  <span className="meta-pill">RESPONSIVE WEB</span>
                </div>

                <h3 className="dossier-title">Gokul Traders</h3>
                <p className="dossier-lead">
                  An online crackers booking website application designed to help customers explore curated festive products, review catalog pricing, and place booking reservations online.
                </p>

                <div className="dossier-features-grid">
                  <div className="dossier-feature-card">
                    <span className="feature-num">01</span>
                    <strong>Online Booking Flow</strong>
                    <p>Enables direct booking requests online through structured forms and order summarization.</p>
                  </div>
                  <div className="dossier-feature-card">
                    <span className="feature-num">02</span>
                    <strong>Festive Product Discovery</strong>
                    <p>Organized catalog categorization and visual presentation tailored to seasonal shopping surges.</p>
                  </div>
                  <div className="dossier-feature-card">
                    <span className="feature-num">03</span>
                    <strong>Cross-Device Responsive Web</strong>
                    <p>Engineered for swift, accessible browsing on both mobile smartphones and desktop computers.</p>
                  </div>
                </div>

                <div className="dossier-actions">
                  <a
                    className="button button-gold live-site-btn"
                    href="https://gokul-traders.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Live Website <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                  <span className="live-site-url">https://gokul-traders.in/</span>
                </div>

                <p className="project-disclaimer">
                  Verified project overview based on the live deployment at gokul-traders.in. Features listed reflect verified functionality.
                </p>
              </div>
            </article>

            <div className="case-study-footer">
              <span>ONE PURPOSEFUL PROJECT AT A TIME.</span>
              <a href="#contact" className="case-footer-link">
                Discuss your next project <ArrowRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* ==================== SERVICES SECTION ==================== */}
        <section className="services-section section-pad" id="services">
          <div className="section-wrap">
            <div className="section-header-editorial">
              <div className="header-eyebrow-box">
                <span className="section-num">03 // CAPABILITIES</span>
                <p className="eyebrow">WHAT WE BRING TO THE TABLE</p>
              </div>
              <div className="header-title-split">
                <h2>Built around your<br /><em>next big move.</em></h2>
                <p className="heading-summary">
                  Clear thinking. Careful execution.<br />
                  Digital tools tailored to how your business creates revenue.
                </p>
              </div>
            </div>

            <div className="services-editorial-grid">
              {services.map(({ icon: Icon, number, title, body }) => (
                <article className="service-editorial-card" key={number}>
                  <div className="service-card-top">
                    <span className="service-card-num">{number}</span>
                    <Icon size={24} strokeWidth={1.3} className="service-card-icon" aria-hidden="true" />
                  </div>
                  <h3 className="service-card-title">{title}</h3>
                  <p className="service-card-body">{body}</p>
                  <div className="service-card-footer">
                    <a href="#contact" className="service-card-anchor" aria-label={`Enquire about ${title}`}>
                      <span>Initiate project</span>
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== ABOUT SECTION ==================== */}
        <section className="about-section section-pad" id="about">
          <div className="section-wrap about-grid-layout">
            <div className="about-monolith">
              <div className="about-frame">
                <div className="about-frame-inner">
                  <span className="monogram-letter letter-1">N</span>
                  <span className="monogram-letter letter-2">J</span>
                </div>
                <div className="frame-cross cross-h" aria-hidden="true" />
                <div className="frame-cross cross-v" aria-hidden="true" />
              </div>
              <div className="about-tag">DESIGNED WITH PURPOSE</div>
            </div>

            <div className="about-narrative">
              <div className="header-eyebrow-box">
                <span className="section-num">04 // PHILOSOPHY</span>
                <p className="eyebrow">THE NJEX APPROACH</p>
              </div>

              <h2>Small details.<br /><em>Enduring value.</em></h2>

              <p className="about-body-lead">
                We believe the best digital solutions balance how an application looks with how reliably it executes behind the scenes.
              </p>
              <p className="about-body-text">
                Our approach is deeply collaborative, direct, and unencumbered by unnecessary layers. We eliminate guesswork by building modular foundations that allow your brand to scale with confidence.
              </p>

              <div className="about-tenets-list">
                <div className="tenet-item">
                  <div className="tenet-icon-wrap">
                    <Check size={16} aria-hidden="true" />
                  </div>
                  <div className="tenet-copy">
                    <strong>Purpose First</strong>
                    <p>Start with the actual operational problem before writing a single line of code.</p>
                  </div>
                </div>

                <div className="tenet-item">
                  <div className="tenet-icon-wrap">
                    <Check size={16} aria-hidden="true" />
                  </div>
                  <div className="tenet-copy">
                    <strong>Refined Craftsmanship</strong>
                    <p>Every interface hierarchy, button state, and database touchpoint must feel intentional.</p>
                  </div>
                </div>

                <div className="tenet-item">
                  <div className="tenet-icon-wrap">
                    <Check size={16} aria-hidden="true" />
                  </div>
                  <div className="tenet-copy">
                    <strong>Engineered to Evolve</strong>
                    <p>Clean architecture that stands up to production demands and leaves room for tomorrow.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== TEAM SECTION ==================== */}
        <section className="team-section section-pad" id="team">
          <div className="section-wrap">
            <div className="section-header-editorial">
              <div className="header-eyebrow-box">
                <span className="section-num">05 // OUR TEAM</span>
                <p className="eyebrow">THE PEOPLE BEHIND NJEX</p>
              </div>
              <div className="header-title-split">
                <h2>Good work is a<br /><em>team effort.</em></h2>
                <p className="heading-summary">
                  Multidisciplinary specialists collaborating<br />
                  to craft dependable digital solutions.
                </p>
              </div>
            </div>

            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <TeamCard key={member.id} member={member} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* ==================== CONTACT SECTION ==================== */}
        <section className="contact-section section-pad" id="contact">
          <div className="section-wrap contact-editorial-grid">
            <div className="contact-dossier">
              <div className="header-eyebrow-box">
                <span className="section-num">06 // INITIATE</span>
                <p className="eyebrow">HAVE A PROJECT IN MIND?</p>
              </div>

              <h2>Let's build<br /><em>what's next.</em></h2>

              <p className="contact-dossier-lead">
                Tell us what you are aiming to create. We'll start with a transparent conversation about your goals, timelines, and the ideal technical path forward.
              </p>

              <div className="contact-touchpoints">
                <a className="contact-channel-link" href="mailto:njtech.in@gmail.com">
                  <div className="channel-icon-box">
                    <Mail size={16} aria-hidden="true" />
                  </div>
                  <div>
                    <span className="channel-label">DIRECT EMAIL</span>
                    <strong className="channel-value">njtech.in@gmail.com</strong>
                  </div>
                  <ArrowUpRight size={15} className="channel-arrow" aria-hidden="true" />
                </a>

                <a className="contact-channel-link" href="tel:+918610870325">
                  <div className="channel-icon-box">
                    <Phone size={16} aria-hidden="true" />
                  </div>
                  <div>
                    <span className="channel-label">PHONE / WHATSAPP</span>
                    <strong className="channel-value">+91 86108 70325</strong>
                  </div>
                  <ArrowUpRight size={15} className="channel-arrow" aria-hidden="true" />
                </a>
              </div>

              <div className="contact-studio-note">
                <span className="note-status-dot" aria-hidden="true" />
                <span>DIRECT FOUNDER RESPONSE WITHIN 24 HOURS</span>
              </div>
            </div>

            <div className="contact-form-card">
              <div className="form-card-top">
                <span>PROJECT ENQUIRY DOSSIER</span>
                <Sparkles size={16} className="form-sparkle" aria-hidden="true" />
              </div>

              <form className="contact-form" onSubmit={submit}>
                <label htmlFor="contact-name">
                  Your name
                  <input
                    id="contact-name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="How should we address you?"
                  />
                </label>

                <label htmlFor="contact-email">
                  Email address
                  <input
                    id="contact-email"
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com"
                  />
                </label>

                <label htmlFor="contact-service">
                  What do you need?
                  <select
                    id="contact-service"
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                  >
                    <option value="Website or e-commerce">Website or e-commerce</option>
                    <option value="WhatsApp checkout">WhatsApp checkout</option>
                    <option value="Digital identity & automation">Digital identity & automation</option>
                    <option value="Custom software">Custom software</option>
                    <option value="Something else">Something else</option>
                  </select>
                </label>

                <label htmlFor="contact-message">
                  Tell us a little about your project
                  <textarea
                    id="contact-message"
                    required
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your idea, timeline, or current technical bottleneck…"
                  />
                </label>

                <button className="button button-gold form-submit-btn" type="submit">
                  <span>Send Project Enquiry</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>

                {sent && (
                  <p className="form-note form-note-success" role="status" aria-live="polite">
                    Your email application should open with your enquiry pre-populated. Review and send it to submit to NJEX.
                  </p>
                )}
                <p className="form-note">
                  This form directly prepares your email inquiry. No personal data is stored on third-party tracking databases.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* ==================== SUBSTANTIAL MULTI-COLUMN FOOTER ==================== */}
      <footer className="footer">
        <div className="footer-top-glow" aria-hidden="true" />
        <div className="section-wrap footer-inner">
          <div className="footer-grid">
            {/* Column 1: Studio Information */}
            <div className="footer-col footer-col-company">
              <a className="footer-brand" href="#home" onClick={closeMenu} aria-label="NJEX studio home">
                <span className="brand-mark">NJ</span>
                <span className="brand-copy">
                  <strong>NJEX</strong>
                  <small>SOFTWARE & DIGITAL SOLUTIONS</small>
                </span>
              </a>
              <p className="footer-tagline-text">Software & Digital Solutions</p>
              <p className="footer-company-desc">
                NJEX partners with forward-thinking enterprises to design, architect, and engineer dependable web platforms, smart commerce solutions, and custom software systems.
              </p>
              <div className="footer-direct-contact">
                <a className="footer-contact-link" href="mailto:njtech.in@gmail.com" aria-label="Send email to NJEX">
                  <Mail size={15} aria-hidden="true" />
                  <span>njtech.in@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="footer-col footer-col-links">
              <h3 className="footer-col-title">Quick Links</h3>
              <ul className="footer-link-list">
                {navigationLinks.map((item) => (
                  <li key={item.number}>
                    <a href={item.href} onClick={closeMenu}>
                      <span className="link-bullet" aria-hidden="true">―</span> {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Our Services */}
            <div className="footer-col footer-col-services">
              <h3 className="footer-col-title">Our Services</h3>
              <ul className="footer-link-list">
                {footerServices.map((serviceName) => (
                  <li key={serviceName}>
                    <a href="#services" onClick={closeMenu}>
                      <span className="link-bullet" aria-hidden="true">―</span> {serviceName}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact Information */}
            <div className="footer-col footer-col-contact">
              <h3 className="footer-col-title">Contact Information</h3>
              <p className="footer-enquiry-msg">
                Have an upcoming project or idea? We’re ready to discuss how we can build it together with precision.
              </p>
              <div className="footer-contact-details">
                <a className="footer-contact-link" href="mailto:njtech.in@gmail.com">
                  <Mail size={15} aria-hidden="true" />
                  <span>njtech.in@gmail.com</span>
                </a>
                <a className="footer-contact-link" href="tel:+918610870325">
                  <Phone size={15} aria-hidden="true" />
                  <span>+91 86108 70325</span>
                </a>
              </div>
              <div className="footer-cta-wrap">
                <a className="button button-gold footer-cta-btn" href="#contact" onClick={closeMenu}>
                  Start a Project <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Footer Bar */}
          <div className="footer-bottom-bar">
            <span className="footer-copy-text">
              © {currentYear} NJEX. All rights reserved.
            </span>
            <span className="footer-philosophy">
              Strategy · Design · Development
            </span>
            <a className="footer-back-to-top" href="#home" onClick={scrollToTop} aria-label="Back to top of page">
              Back to Top <ArrowUp size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);