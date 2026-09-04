import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">BOLTZ</Link>
        <div className="nav-links">
          {isHome ? (
            <>
              <a href="#works">Works</a>
              <Link to="/services">Services</Link>
              <a href="#about">About</a>
            </>
          ) : (
            <>
              <Link to="/#works">Works</Link>
              <Link to="/services">Services</Link>
              <Link to="/#about">About</Link>
            </>
          )}
        </div>
        {isHome ? (
          <a href="#contact-card" className="contact-btn">CONTACT</a>
        ) : (
          <Link to="/#contact-card" className="contact-btn">CONTACT</Link>
        )}
        <button
          className={`nav-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {isHome ? (
          <>
            <a href="#works" onClick={() => setMenuOpen(false)}>Works</a>
            <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#contact-card" className="mobile-contact" onClick={() => setMenuOpen(false)}>CONTACT</a>
          </>
        ) : (
          <>
            <Link to="/" onClick={() => setMenuOpen(false)}>Works</Link>
            <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
            <Link to="/#about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/#contact-card" className="mobile-contact" onClick={() => setMenuOpen(false)}>CONTACT</Link>
          </>
        )}
      </div>
    </>
  )
}

export default Navbar
