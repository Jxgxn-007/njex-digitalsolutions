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
  { icon: Globe2, number: '01', title: 'Websites & E-commerce', body: 'Distinctive websites and online storefronts designed to turn visits into meaningful customer action.' },
  { icon: MessageCircle, number: '02', title: 'WhatsApp Commerce', body: 'Friction-light customer journeys that bring product discovery and checkout closer to conversation.' },
  { icon: Workflow, number: '03', title: 'Digital Identity & Automation', body: 'Domain, business email, and workflow foundations that help teams work with more clarity.' },
  { icon: Bot, number: '04', title: 'Custom Digital Solutions', body: 'Purpose-built software experiences shaped around the way your business actually works.' },
];

const footerQuickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Our Work', href: '#work' },
  { label: 'About Us', href: '#about' },
  { label: 'Our Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
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
  const [form, setForm] = React.useState({ name: '', email: '', service: 'Website or e-commerce', message: '' });
  const [sent, setSent] = React.useState(false);
  const closeMenu = () => setMenuOpen(false);

  // BUG-003 Fix: Handle Escape key and body scroll locking when mobile menu is open
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

  // BUG-008 Fix: Trim input values and reject empty/whitespace-only submissions
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
      <header className="header">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="NJEX home">
          <span className="brand-mark">NJ</span>
          <span className="brand-copy">
            <strong>NJEX</strong>
            <small>SOFTWARE & DIGITAL SOLUTIONS</small>
          </span>
        </a>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <nav
          id="primary-navigation"
          className={menuOpen ? 'nav nav-open' : 'nav'}
          aria-label="Main Navigation"
        >
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#work" onClick={closeMenu}>Our work</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#team" onClick={closeMenu}>Team</a>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>
            Start a project <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </nav>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" aria-hidden="true" /> INDEPENDENT DIGITAL STUDIO</div>
            <h1>Building digital<br /><em>solutions</em> for the<br />future.</h1>
            <p className="hero-lede">We bring ideas to life through thoughtful design, dependable software, and digital experiences built around your business.</p>
            <div className="hero-actions">
              <a className="button button-gold" href="#work">
                Explore our work <ArrowRight size={17} aria-hidden="true" />
              </a>
              <a className="text-link" href="#services">
                What we do <ArrowDownRight size={17} aria-hidden="true" />
              </a>
            </div>
            <div className="hero-note">
              <span className="status-dot" aria-hidden="true" /> STRATEGY · DESIGN · DEVELOPMENT
            </div>
          </div>
          <div className="hero-art" aria-label="Abstract gold NJEX monogram artwork">
            <div className="orbit orbit-one" aria-hidden="true" />
            <div className="orbit orbit-two" aria-hidden="true" />
            <div className="art-cross cross-one" aria-hidden="true" />
            <div className="art-cross cross-two" aria-hidden="true" />
            <div className="art-core" aria-hidden="true">
              <span>N</span>
              <span>J</span>
            </div>
            <div className="art-caption" aria-hidden="true">
              <span>IDEAS INTO IMPACT</span>
              <span className="caption-rule" />
              <span>EST. WITH INTENTION</span>
            </div>
            <div className="art-index" aria-hidden="true">NJEX / 001</div>
          </div>
          {/* BUG-010 Fix: Corrected counter to 01 — 06 to match total sections */}
          <div className="hero-bottom" aria-hidden="true">
            <span>SCROLL TO EXPLORE</span>
            <span className="scroll-line" />
            <span>01 — 06</span>
          </div>
        </section>

        <section className="intro-band">
          <div className="section-wrap intro-inner">
            <p className="eyebrow">A DIGITAL PARTNER FOR WHAT'S NEXT</p>
            <h2>Good technology should do more than work.<br /><em>It should move you forward.</em></h2>
            <p className="intro-desc">NJEX partners with businesses to shape practical, polished digital solutions — from their first online presence to smarter ways of serving customers.</p>
          </div>
        </section>

        <section className="services section-wrap section-pad" id="services">
          <div className="section-heading">
            <div>
              <p className="eyebrow">WHAT WE BRING TO THE TABLE</p>
              <h2>Built around your<br /><em>next big move.</em></h2>
            </div>
            <p className="heading-side">Clear thinking. Careful execution.<br />Digital tools with a purpose.</p>
          </div>
          <div className="service-grid">
            {services.map(({ icon: Icon, number, title, body }) => (
              <article className="service-card" key={number}>
                <div className="service-top">
                  <span>{number}</span>
                  <Icon size={23} strokeWidth={1.4} aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
                <a href="#contact" aria-label={`Enquire about ${title}`}>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="work-section" id="work">
          <div className="section-wrap section-pad">
            <div className="section-heading work-heading">
              <div>
                <p className="eyebrow">SELECTED WORK</p>
                <h2>Ideas made<br /><em>real.</em></h2>
              </div>
              <p className="heading-side">Every project starts with a need.<br />We build around the people who have it.</p>
            </div>
            <article className="project-card">
              <div className="project-visual">
                <div className="project-window" aria-hidden="true">
                  <div className="window-top"><span /><span /><span /><small>GOKUL TRADERS</small></div>
                  <div className="firework f-one">✳</div>
                  <div className="firework f-two">✦</div>
                  <div className="firework f-three">✧</div>
                  <div className="mock-content">
                    <small>CELEBRATE EVERY MOMENT</small>
                    <strong>Make this<br />season shine.</strong>
                    <span className="mock-button">EXPLORE COLLECTION ↗</span>
                  </div>
                  <div className="mock-spark spark-a" />
                  <div className="mock-spark spark-b" />
                  <div className="mock-spark spark-c" />
                </div>
                <div className="project-visual-label" aria-hidden="true">PROJECT / 001</div>
              </div>
              <div className="project-info">
                <div className="project-meta"><span>ECOMMERCE</span><span>WEB APPLICATION</span></div>
                <h3>Gokul Traders</h3>
                <p>A crackers booking website application designed to help customers explore products and place their booking requests online.</p>
                <div className="project-tags"><span>Online booking</span><span>Product discovery</span><span>Responsive web</span></div>
                <a className="project-link" href="https://gokul-traders.in/" target="_blank" rel="noopener noreferrer">
                  Visit live website <ArrowUpRight size={17} aria-hidden="true" />
                </a>
                <p className="project-disclaimer">Project overview based on the information provided. Features shown in this mockup are illustrative.</p>
              </div>
            </article>
            <div className="work-foot" aria-hidden="true">
              <span>ONE PROJECT AT A TIME.</span>
              <span>MORE STORIES IN THE MAKING <ArrowRight size={14} /></span>
            </div>
          </div>
        </section>

        <section className="about section-wrap section-pad" id="about">
          <div className="about-symbol" aria-hidden="true">
            <div className="symbol-frame"><span>N</span><span>J</span></div>
            <span className="symbol-label">DESIGNED WITH PURPOSE</span>
          </div>
          <div className="about-copy">
            <p className="eyebrow">THE NJEX APPROACH</p>
            <h2>Small details.<br /><em>Meaningful impact.</em></h2>
            <p>We believe the best digital solutions balance how something looks with how well it works. Our approach is collaborative, practical, and focused on creating experiences people can use with confidence.</p>
            <div className="values">
              <div>
                <Check size={16} aria-hidden="true" />
                <span><strong>Purpose first</strong><small>Start with the real problem.</small></span>
              </div>
              <div>
                <Check size={16} aria-hidden="true" />
                <span><strong>Thoughtful craft</strong><small>Make every interaction count.</small></span>
              </div>
              <div>
                <Check size={16} aria-hidden="true" />
                <span><strong>Built to evolve</strong><small>Leave room for what's next.</small></span>
              </div>
            </div>
          </div>
        </section>

        {/* Dedicated Company Team Section */}
        <section className="team-section section-wrap section-pad" id="team">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-line" aria-hidden="true" /> THE PEOPLE BEHIND NJEX</p>
              <h2>Good work is a<br /><em>team effort.</em></h2>
            </div>
            <p className="heading-side">Multidisciplinary specialists collaborating<br />to craft dependable digital solutions.</p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-wrap contact-inner">
            <div className="contact-copy">
              <p className="eyebrow">HAVE AN IDEA IN MIND?</p>
              <h2>Let's build<br /><em>what's next.</em></h2>
              <p>Tell us what you're working on. We'll start with a conversation about your goals and the right next step.</p>
              <a className="contact-email" href="mailto:njtech.in@gmail.com">
                <Mail size={17} aria-hidden="true" /> njtech.in@gmail.com <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <a className="contact-phone" href="tel:+918610870325">
                <Phone size={15} aria-hidden="true" /> +91 86108 70325
              </a>
            </div>
            <form className="contact-form" onSubmit={submit}>
              <div className="form-heading">
                <span>PROJECT ENQUIRY</span>
                <Sparkles size={17} aria-hidden="true" />
              </div>
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
                Tell us a little about it
                <textarea
                  id="contact-message"
                  required
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Your idea, goals, or challenge…"
                />
              </label>
              <button className="button button-gold form-submit" type="submit">
                Send project enquiry <ArrowRight size={16} aria-hidden="true" />
              </button>
              {sent && (
                <p className="form-note form-note-success" role="status" aria-live="polite">
                  Your email app should open with your enquiry details. Review and send it to contact NJEX.
                </p>
              )}
              <p className="form-note">This form opens your default email application. No data is stored on this website.</p>
            </form>
          </div>
        </section>
      </main>

      {/* Redesigned Large Company Footer */}
      <footer className="footer">
        <div className="footer-top-glow" aria-hidden="true" />
        <div className="section-wrap footer-inner">
          <div className="footer-grid">
            {/* Column 1: Company Information */}
            <div className="footer-col footer-col-company">
              <a className="brand footer-brand" href="#home" onClick={closeMenu} aria-label="NJEX home">
                <span className="brand-mark">NJ</span>
                <span className="brand-copy">
                  <strong>NJEX</strong>
                  <small>SOFTWARE & DIGITAL SOLUTIONS</small>
                </span>
              </a>
              <p className="footer-tagline-text">Software & Digital Solutions</p>
              <p className="footer-company-desc">
                NJEX partners with businesses to architect, design, and engineer dependable web platforms, smart commerce solutions, and custom software systems.
              </p>
              <div className="footer-direct-contact">
                <a className="footer-contact-link" href="mailto:njtech.in@gmail.com" aria-label="Send email to NJEX">
                  <Mail size={15} aria-hidden="true" />
                  <span>njtech.in@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links (BUG-005 Fix: h3 heading) */}
            <div className="footer-col footer-col-links">
              <h3 className="footer-col-title">Quick Links</h3>
              <ul className="footer-link-list">
                {footerQuickLinks.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} onClick={closeMenu}>
                      <span className="link-bullet" aria-hidden="true">―</span> {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Our Services (BUG-005 Fix: h3 heading) */}
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

            {/* Column 4: Contact Information (BUG-005 Fix: h3 heading) */}
            <div className="footer-col footer-col-contact">
              <h3 className="footer-col-title">Contact Information</h3>
              <p className="footer-enquiry-msg">
                Have an upcoming project or idea? We’re ready to discuss how we can build it together.
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