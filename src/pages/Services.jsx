import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Letters from '../components/Letters.jsx'

function Services() {
  const pageRef = useRef(null)
  const heroRef = useRef(null)
  const whatRef = useRef(null)
  const faqRef = useRef(null)
  const contactRef = useRef(null)
  const headingRef = useRef(null)
  const [faqVisible, setFaqVisible] = useState(false)
  const [openFaq, setOpenFaq] = useState(-1)
  const [contactVisible, setContactVisible] = useState(false)
  const [whatVisible, setWhatVisible] = useState(false)
  const [formStatus, setFormStatus] = useState('idle')
  const [formError, setFormError] = useState('')

  async function handleContactSubmit(e) {
    e.preventDefault()
    if (formStatus === 'sending') return
    const form = e.target
    const fields = Object.fromEntries(new FormData(form).entries())
    setFormStatus('sending')
    setFormError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      let data = {}
      try { data = await res.json() } catch { /* non-JSON response */ }
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }
      form.reset()
      const textarea = form.querySelector('textarea')
      if (textarea) textarea.style.height = ''
      setFormStatus('success')
      setTimeout(() => setFormStatus('idle'), 6000)
    } catch (err) {
      setFormStatus('error')
      setFormError(err.message || 'Failed to send. Please email helloboltz@gmail.com directly.')
    }
  }

  useEffect(() => {
    const t = setTimeout(() => {
      pageRef.current?.classList.add('visible')
      heroRef.current?.classList.add('is-inview')
    }, 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => el.classList.add('is-inview'))
          } else {
            el.classList.remove('is-inview')
          }
        })
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const el = whatRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => setWhatVisible(true))
          } else {
            setWhatVisible(false)
          }
        })
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const el = headingRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => el.classList.add('is-visible'))
          } else {
            el.classList.remove('is-visible')
          }
        })
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const el = faqRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => setFaqVisible(true))
          } else {
            setFaqVisible(false)
          }
        })
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const el = contactRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => setContactVisible(true))
          } else {
            setContactVisible(false)
          }
        })
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('.services-showcase')
    const observers = []
    els.forEach((el) => {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              requestAnimationFrame(() => el.classList.add('is-inview'))
            } else {
              el.classList.remove('is-inview')
            }
          })
        },
        { threshold: 0.2 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const faqs = [
    { q: 'WHY BOLTZ INSTEAD OF HIRING IN-HOUSE?', a: 'We combine senior-level design and development into one focused team, so you get agency quality at a fraction of the cost and time of a full in-house hire.' },
    { q: 'HOW FAST DO YOU DELIVER?', a: 'Most design projects wrap in 5–10 business days. Full website builds take 4–6 weeks depending on scope. We’ll agree on a timeline upfront.' },
    { q: 'WHAT DOES THE PROCESS LOOK LIKE?', a: 'Discovery → Design → Review → Development → Launch. You’re involved at every stage and we keep communication tight throughout.' },
    { q: "WHAT IF I DON'T LIKE THE DESIGN?", a: 'We offer revision rounds built into every project. If we’re off-track, we revisit — your satisfaction is non-negotiable.' },
    { q: 'HOW DO I GET STARTED?', a: 'Fill out the contact form or email us. We’ll schedule a quick call to understand your project and send a proposal within 24–48 hours.' },
    { q: 'ARE THERE REFUNDS?', a: 'We don’t offer full refunds after work begins, but we’re committed to getting it right. We’ll revise until you’re happy.' },
  ]

  return (
    <div className="services-page" ref={pageRef}>
      <Navbar />

      <section className="services-hero" ref={heroRef}>
        <h1 className="services-hero-title">
          <span className="services-hero-line">
            <Letters text="OUR CREATIVE" />
            <img src="/Service.jpg" alt="" className="services-hero-thumb" />
            <span className="services-hero-purple"><Letters text="SERVICES" start={12} /></span>
          </span>
          <br />
          <span className="services-hero-line">
            <Letters text="EXCELLENCE" start={20} />
            <img src="/thunder.png" alt="" className="services-hero-bolt" />
            <Letters text="DELIVERED" start={30} />
          </span>
        </h1>
        <p className="services-hero-subtitle">
          <Letters text="Ideas, stories, and strategies from the creative edge covering design" start={40} /><br />
          <Letters text="development, and the tools that bring bold digital work to life." start={110} />
        </p>
      </section>

      <section id="services" className="services-what-section" ref={whatRef}>
        <p className="services-what-label">(Services)</p>
        <h2 className={`services-what-title ${whatVisible ? 'is-visible' : ''}`}>
          <Letters text="WHAT WE DO" start={0} />
        </h2>
        <div className="services-what-divider" />
      </section>

      <section className="services-showcase">
        <div className="services-showcase-content">
          <div className="services-showcase-left">
            <p className="services-showcase-label">Web Design</p>
            <div className="services-showcase-card">
              <div className="services-showcase-mockup">
                <img src="/mockup.jpg" alt="Web Design Mockup" className="services-showcase-mockup-img" />
              </div>
            </div>
            <div className="services-showcase-tags">
              <span className="services-showcase-tag">UX/UI Design</span>
              <span className="services-showcase-tag">Responsive Layouts</span>
              <span className="services-showcase-tag">Design System</span>
            </div>
          </div>

          <div className="services-showcase-right">
            <h3 className="services-showcase-heading" ref={headingRef}>Wireframe</h3>
            <div className="services-showcase-divider" />
            <div className="services-showcase-meta">
              <div className="services-showcase-meta-row">
                <span className="services-showcase-meta-label">Starts at</span>
                <span className="services-showcase-meta-value">$500</span>
              </div>
              <div className="services-showcase-meta-row">
                <span className="services-showcase-meta-label">Timeline</span>
                <span className="services-showcase-meta-value">1 - 2 Week</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="services-section-divider" />

      <section className="services-showcase services-showcase-last">
        <div className="services-showcase-content">
          <div className="services-showcase-left">
            <p className="services-showcase-label">Brand Design</p>
            <div className="services-showcase-card">
              <div className="services-showcase-mockup">
                <img src="/Service.jpg" alt="Brand Design Mockup" className="services-showcase-mockup-img" />
              </div>
            </div>
            <div className="services-showcase-tags">
              <span className="services-showcase-tag">Visual Identity</span>
              <span className="services-showcase-tag">Style Guides</span>
              <span className="services-showcase-tag">Brand Strategy</span>
            </div>
          </div>

          <div className="services-showcase-right">
            <p className="services-showcase-description">From logo to language, we shape your best Identity Strategic brand systems that tells your story and stand strong.</p>
            <div className="services-showcase-divider" />
            <div className="services-showcase-meta">
              <div className="services-showcase-meta-row">
                <span className="services-showcase-meta-label">Starts at</span>
                <span className="services-showcase-meta-value">$300</span>
              </div>
              <div className="services-showcase-meta-row">
                <span className="services-showcase-meta-label">Timeline</span>
                <span className="services-showcase-meta-value">1 Week</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="services-section-divider" />

      <section className="services-showcase services-showcase-last">
        <div className="services-showcase-content">
          <div className="services-showcase-left">
            <p className="services-showcase-label">Logo Design</p>
            <div className="services-showcase-card">
              <div className="services-showcase-mockup">
                <img src="/monkeytilt.jpg" alt="Logo Design Mockup" className="services-showcase-mockup-img" />
              </div>
            </div>
            <div className="services-showcase-tags">
              <span className="services-showcase-tag">Website Development</span>
              <span className="services-showcase-tag">Custom Code</span>
              <span className="services-showcase-tag">No Code</span>
            </div>
          </div>

          <div className="services-showcase-right">
            <p className="services-showcase-description">Every brand deserves a signature mark. We craft logos that are bold and clear. Let your brand speak without saying a word.</p>
            <div className="services-showcase-divider" />
            <div className="services-showcase-meta">
              <div className="services-showcase-meta-row">
                <span className="services-showcase-meta-label">Starts at</span>
                <span className="services-showcase-meta-value">$1000</span>
              </div>
              <div className="services-showcase-meta-row">
                <span className="services-showcase-meta-label">Timeline</span>
                <span className="services-showcase-meta-value">15 Days</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section" ref={faqRef}>
        <div className={`faq-header ${faqVisible ? 'visible' : ''}`}>
          <p className="faq-kicker">(FAQs)</p>
          <h2 className="faq-title"><Letters text="YOUR" /><span className="faq-space"> </span><Letters text="QUESTIONS," /><span className="faq-space"> </span><Letters text="ANSWERED" /></h2>
          <p className="faq-subtitle">Helping you understand our process and offerings at Boltz.</p>
        </div>

        <div className={`faq-columns ${faqVisible ? 'visible' : ''}`}>
            <div className="faq-col">
              {faqs.filter((f, i) => i % 2 === 0).map((faq, i) => {
                const idx = i * 2
                return (
                  <div
                    className={`faq-item ${openFaq === idx ? 'open' : ''}`}
                    key={idx}
                    onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                    style={{ transitionDelay: `${i * 0.8}s` }}
                  >
                    <div className="faq-question-row">
                      <span className="faq-question">{faq.q}</span>
                      <span className="faq-icon">{openFaq === idx ? '−' : '+'}</span>
                    </div>
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="faq-col">
              {faqs.filter((f, i) => i % 2 === 1).map((faq, i) => {
                const idx = i * 2 + 1
                return (
                  <div
                    className={`faq-item ${openFaq === idx ? 'open' : ''}`}
                    key={idx}
                    onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                    style={{ transitionDelay: `${i * 0.8}s` }}
                  >
                    <div className="faq-question-row">
                      <span className="faq-question">{faq.q}</span>
                      <span className="faq-icon">{openFaq === idx ? '−' : '+'}</span>
                    </div>
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
      </section>

      <section className="contact-section" ref={contactRef}>
        <h2 className={`contact-heading ${contactVisible ? 'visible' : ''}`}>LET'S CONNECT</h2>

        <div className="contact-card">
          <div
            className="contact-card-bg"
            style={{ backgroundImage: "url('/contact-bg.jpg')" }}
          />
          <div className="contact-card-inner">
            <h3 className={`contact-card-title ${contactVisible ? 'visible' : ''}`}>
              <Letters text="LET'S BUILD" /><br /><Letters text="SOMETHING GREAT" start={11} />
            </h3>

            <div className="contact-content">
              <div className="contact-left">
                <p className={`contact-card-sub ${contactVisible ? 'visible' : ''}`}><Letters text="Let's Talk" /></p>
              </div>

              <div className="contact-right">
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-field">
                  <label>Your Name</label>
                  <input type="text" name="name" placeholder="Enter your Name" required />
                </div>
                <div className="form-field">
                  <label>Your Email</label>
                  <input type="email" name="email" placeholder="Enter the Email" required />
                </div>
                <div className="form-field">
                  <label>Project Description</label>
                  <textarea
                    name="message"
                    placeholder="Type Here..."
                    rows="1"
                    required
                    onInput={(e) => {
                      e.target.style.height = 'auto'
                      e.target.style.height = e.target.scrollHeight + 'px'
                    }}
                  />
                </div>
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hp-field"
                />
                <button type="submit" className="contact-submit" disabled={formStatus === 'sending'}>
                  {formStatus === 'sending' ? 'SENDING...' : 'SEND NOW!'}
                </button>
                {formStatus !== 'idle' && (
                  <p className={`form-status ${formStatus}`} role="status">
                    {formStatus === 'sending' && 'Sending your message...'}
                    {formStatus === 'success' && "Message sent! We'll get back to you soon."}
                    {formStatus === 'error' && formError}
                  </p>
                )}
              </form>
              </div>
            </div>
          </div>

          <div className="contact-bottom">
            <div className="contact-marquee">
              <div className="contact-marquee-track">
                {[0, 1, 2, 3, 0, 1, 2, 3].map((i) => (
                  <div className="contact-bottom-group" key={i}>
                    <span>
                      <a
                        className="contact-bottom-email"
                        href="mailto:helloboltz@gmail.com"
                      >
                        HELLOBOLTZ@GMAIL.COM
                      </a>
                    </span>
                    <span className="contact-sep">✦</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-col">
            <h4 className="footer-heading">Navigation</h4>
            <nav className="footer-links">
              <a href="#about">ABOUT</a>
              <a href="#works">WORKS</a>
              <a href="#services" onClick={(e) => { const el = document.getElementById('services'); if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }) } }}>SERVICES</a>
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

export default Services
