import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Code2,
  Eye,
  Globe2,
  Mail,
  Menu,
  Phone,
  ShoppingBag,
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
    description: 'Fast, responsive websites built to showcase your brand and engage visitors.',
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce Solutions',
    description: 'Modern online storefronts and smooth checkout experiences that drive sales.',
  },
  {
    icon: Code2,
    title: 'Custom Software',
    description: 'Tailored web applications and internal tools designed around your workflows.',
  },
  {
    icon: Zap,
    title: 'Digital Automation',
    description: 'Smart integrations and automated processes that simplify daily operations.',
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
          <div className="section-wrap hero-inner">
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
          </div>
        </section>

        {/* ==================== 2. SERVICES SECTION ==================== */}
        <section className="services-section section-pad" id="services">
          <div className="section-wrap">
            <div className="section-header">
              <span className="section-eyebrow">SERVICES</span>
              <h2 className="section-title">What We Do</h2>
            </div>

            <div className="services-grid">
              {services.map(({ icon: Icon, title, description }) => (
                <article className="service-card" key={title}>
                  <div className="service-icon-box" aria-hidden="true">
                    <Icon size={22} strokeWidth={1.4} />
                  </div>
                  <h3 className="service-card-title">{title}</h3>
                  <p className="service-card-desc">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 3. FEATURED PROJECT ==================== */}
        <section className="project-section section-pad" id="work">
          <div className="section-wrap">
            <div className="section-header">
              <span className="section-eyebrow">FEATURED PROJECT</span>
              <h2 className="section-title">Gokul Traders</h2>
            </div>

            <article className="project-card">
              <div className="project-preview-window">
                <div className="browser-header-bar" aria-hidden="true">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                  <span className="browser-url">https://gokul-traders.in</span>
                </div>
                <div className="browser-mock-body">
                  <div className="mock-badge">FESTIVE BOOKING PLATFORM</div>
                  <h3 className="mock-headline">
                    Make this season shine.
                  </h3>
                  <span className="mock-cta">EXPLORE PRODUCT SELECTIONS ↗</span>
                </div>
              </div>

              <div className="project-info">
                <div className="project-tags">
                  <span className="tag">E-Commerce</span>
                  <span className="tag">Web Platform</span>
                </div>

                <h3 className="project-title">Gokul Traders</h3>
                <p className="project-desc">
                  A digital platform for browsing and booking crackers online.
                </p>

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
              </div>
            </article>
          </div>
        </section>

        {/* ==================== 4. ABOUT NJEX ==================== */}
        <section className="about-section" id="about">
          <div className="section-wrap">
            <div className="about-container">
              <span className="section-eyebrow">ABOUT NJEX</span>
              <h2 className="about-statement">
                NJEX helps businesses turn ideas into practical digital solutions through thoughtful design and technology.
              </h2>
            </div>
          </div>
        </section>

        {/* ==================== 5. MISSION & VISION ==================== */}
        <section className="mv-section section-pad" id="mission-vision">
          <div className="section-wrap">
            <div className="section-header">
              <span className="section-eyebrow">PURPOSE & DIRECTION</span>
              <h2 className="section-title">Mission & Vision</h2>
            </div>

            <div className="mv-grid">
              <article className="mv-card">
                <div className="mv-icon-box" aria-hidden="true">
                  <Target size={22} strokeWidth={1.4} />
                </div>
                <h3 className="mv-title">Our Mission</h3>
                <p className="mv-text">
                  To turn ideas into useful, user-focused digital solutions.
                </p>
              </article>

              <article className="mv-card">
                <div className="mv-icon-box" aria-hidden="true">
                  <Eye size={22} strokeWidth={1.4} />
                </div>
                <h3 className="mv-title">Our Vision</h3>
                <p className="mv-text">
                  To become a trusted technology partner for businesses building a better digital future.
                </p>
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
              <span className="section-eyebrow">CONTACT</span>
              <h2 className="contact-headline">
                Have an idea? Let's build it.
              </h2>
              <p className="contact-subtext">
                Reach out directly via email, phone, or send us a message through the form.
              </p>

              <div className="direct-channels">
                <a className="direct-channel-card" href="mailto:njtech.in@gmail.com">
                  <Mail size={18} aria-hidden="true" />
                  <div>
                    <small>EMAIL</small>
                    <strong>njtech.in@gmail.com</strong>
                  </div>
                </a>

                <a className="direct-channel-card" href="tel:+918610870325">
                  <Phone size={18} aria-hidden="true" />
                  <div>
                    <small>PHONE / WHATSAPP</small>
                    <strong>+91 86108 70325</strong>
                  </div>
                </a>
              </div>
            </div>

            <div className="contact-form-box">
              <form className="contact-form" onSubmit={submit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter your name"
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
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Project Details</label>
                  <textarea
                    id="message"
                    required
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Briefly describe what you would like to build…"
                  />
                </div>

                <button className="btn btn-gold form-btn" type="submit">
                  <span>Send Message</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>

                {sent && (
                  <p className="form-status-msg" role="status">
                    Your email app has been opened with your message ready to send!
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* ==================== 8. COMPACT FOOTER ==================== */}
      <footer className="footer-compact">
        <div className="section-wrap footer-compact-inner">
          <div className="footer-top-row">
            <a className="footer-brand" href="#home" onClick={closeMenu} aria-label="NJEX home">
              <span className="brand-mark">NJ</span>
              <span className="brand-text">
                <strong>NJEX</strong>
                <small>SOFTWARE & DIGITAL SOLUTIONS</small>
              </span>
            </a>

            <div className="footer-contacts">
              <a href="mailto:njtech.in@gmail.com">njtech.in@gmail.com</a>
              <span className="footer-sep">·</span>
              <a href="tel:+918610870325">+91 86108 70325</a>
            </div>
          </div>

          <div className="footer-nav-row">
            <nav className="footer-nav-links" aria-label="Footer links">
              {navigationLinks.map((item) => (
                <a href={item.href} key={item.href} onClick={closeMenu}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="footer-bottom-row">
            <span className="footer-copyright">
              © {currentYear} NJEX. All rights reserved.
            </span>
            <a className="footer-top-link" href="#home" onClick={scrollToTop}>
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