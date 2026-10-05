import { Link } from 'react-router-dom'
import Navbar from './Navbar.jsx'

function LegalPage({ label, title, updated, intro, sections }) {
  return (
    <div className="legal-page">
      <Navbar />

      <section className="legal-hero">
        <p className="legal-label">{label}</p>
        <h1 className="legal-title">{title}</h1>
        <p className="legal-updated">Last updated: {updated}</p>
      </section>

      <section className="legal-body">
        <p className="legal-intro">{intro}</p>

        {sections.map((section, i) => (
          <div className="legal-section" key={i}>
            <h2 className="legal-heading">{section.heading}</h2>
            {section.paragraphs.map((paragraph, j) => (
              <p key={j}>{paragraph}</p>
            ))}
            {section.list && (
              <ul className="legal-list">
                {section.list.map((item, k) => (
                  <li key={k}>{item}</li>
                ))}
              </ul>
            )}
            {section.note && <p className="legal-note">{section.note}</p>}
          </div>
        ))}

        <div className="legal-contact-card">
          <h2 className="legal-heading">Contact Us</h2>
          <p>
            If you have any questions about this policy, or about how we handle your
            information, email us and we will get back to you as soon as possible.
          </p>
          <a href="mailto:helloboltz@gmail.com" className="legal-email">
            HELLOBOLTZ@GMAIL.COM
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-col">
            <h4 className="footer-heading">Navigation</h4>
            <nav className="footer-links">
              <Link to="/#about">ABOUT</Link>
              <Link to="/#works">WORKS</Link>
              <Link to="/#services">SERVICES</Link>
            </nav>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Social</h4>
            <nav className="footer-links">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">TWITTER(X)</a>
              <a href="https://www.linkedin.com/company/boltzmakeitmad/" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
              <a href="https://www.instagram.com/boltzdot/" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
            </nav>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Legals</h4>
            <nav className="footer-links">
              <Link to="/privacy">PRIVACY POLICY</Link>
              <Link to="/terms">TERM OF SERVICE</Link>
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">© 2026 BOLTZ. All rights reserved.</span>
          <a href="#" className="footer-back-top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>Back to top</a>
        </div>
      </footer>

      <div className="hero-text-section">
        <img
          src="/boltz-logo.png"
          alt="BOLTZ"
          className="hero-giant-image"
          style={{ display: 'block', width: '100%', height: '100%', borderRadius: 'inherit', cornerShape: 'inherit', objectPosition: 'center center', objectFit: 'contain' }}
        />
      </div>
    </div>
  )
}

export default LegalPage