import { useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Services from './pages/Services.jsx'
import Navbar from './components/Navbar.jsx'
import Letters from './components/Letters.jsx'

function App() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      const el = document.getElementById(id)
      if (el) {
        const t = setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 60)
        return () => clearTimeout(t)
      }
    }
  }, [location])

  const aboutSectionRef = useRef(null)
  const testimonialsRef = useRef(null)
  const servicesRef = useRef(null)
  const worksRef = useRef(null)
  const heroRef = useRef(null)
  const faqRef = useRef(null)
  const [faqVisible, setFaqVisible] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [testimonialsVisible, setTestimonialsVisible] = useState(false)
  const [servicesVisible, setServicesVisible] = useState(false)
  const [activeService, setActiveService] = useState(2)
  const [openFaq, setOpenFaq] = useState(-1)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [heroBottomLoaded, setHeroBottomLoaded] = useState(false)
  const marqueeRef = useRef(null)
  const [marqueeVisible, setMarqueeVisible] = useState(false)
  const contactRef = useRef(null)
  const [contactVisible, setContactVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setHeroBottomLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const el = marqueeRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => setMarqueeVisible(true))
          } else {
            setMarqueeVisible(false)
          }
        })
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [location.pathname])

  useEffect(() => {
    let target = 0
    let current = 0
    let raf = null

    const animate = () => {
      const isMobile = window.innerWidth <= 768
      const lerpFactor = isMobile ? 0.12 : 0.085
      const next = current + (target - current) * lerpFactor
      current = Math.abs(target - next) < 0.0005 ? target : next
      setScrollProgress(current)
      if (Math.abs(target - current) < 0.0005) {
        raf = null
        return
      }
      raf = requestAnimationFrame(animate)
    }

    const handleScroll = () => {
      if (!worksRef.current) return
      const rect = worksRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const total = rect.height - windowHeight

      if (total <= 0) return
      target = Math.min(Math.max(-rect.top / total, 0), 1)
      if (!raf) raf = requestAnimationFrame(animate)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
      return () => {
        window.removeEventListener('scroll', handleScroll)
        if (raf) cancelAnimationFrame(raf)
      }
    }, [location.pathname])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsInView(true)
          else setIsInView(false)
        })
      },
      { threshold: 0.3 }
    )
    if (aboutSectionRef.current) observer.observe(aboutSectionRef.current)
    return () => observer.disconnect()
  }, [location.pathname])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setTestimonialsVisible(true)
          else setTestimonialsVisible(false)
        })
      },
      { threshold: 0.15 }
    )
    if (testimonialsRef.current) observer.observe(testimonialsRef.current)
    return () => observer.disconnect()
  }, [location.pathname])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => setServicesVisible(true))
          } else {
            setServicesVisible(false)
          }
        })
      },
      { threshold: 0.15 }
    )
    if (servicesRef.current) observer.observe(servicesRef.current)
    return () => observer.disconnect()
  }, [location.pathname])

  useEffect(() => {
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
    if (faqRef.current) observer.observe(faqRef.current)
    return () => observer.disconnect()
  }, [location.pathname])

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => el.classList.add('is-revealed'))
          } else {
            el.classList.remove('is-revealed')
          }
        })
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    const t = setTimeout(() => el.classList.add('is-revealed'), 100)
    return () => {
      observer.disconnect()
      clearTimeout(t)
    }
  }, [location.pathname])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => setContactVisible(true))
          }
        })
      },
      { threshold: 0.15 }
    )
    if (contactRef.current) observer.observe(contactRef.current)
    return () => observer.disconnect()
  }, [location.pathname])

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length)
    }, 11000)
    return () => clearInterval(timer)
  }, [])

  const services = [
    {
      label: 'Web Design',
      marquee: 'WEB DESIGN',
      description: 'We build fast, responsive websites that convert visitors into loyal customers.',
      tags: ['UI/UX Design', 'Responsive Layouts', 'Web Development'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=600&fit=crop',
    },
    {
      label: 'Brand Design',
      marquee: 'BRAND DESIGN',
      description: 'We design clean, functional logos that elevate your brand\'s essence.',
      tags: ['Brand Strategy', 'Visual Identity', 'Brand Guidelines'],
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&h=600&fit=crop',
    },
    {
      label: 'Development',
      marquee: 'BRAND DESIGN',
      description: 'We design clean, functional logos that elevate your brand\'s essence.',
      tags: ['Development', 'React', 'Framer'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=600&fit=crop',
    },
  ]

  const marqueeItems1 = [
    'BRAND DESIGN', 'LOGO DESIGN', 'WEBSITE DESIGN',
    'BRAND DESIGN', 'LOGO DESIGN', 'WEBSITE DESIGN',
  ]

  const faqs = [
    { q: 'WHY BOLTZ INSTEAD OF HIRING IN-HOUSE?', a: 'We combine senior-level design and development into one focused team, so you get agency quality at a fraction of the cost and time of a full in-house hire.' },
    { q: 'HOW FAST DO YOU DELIVER?', a: 'Most projects kick off within 2–3 days and ship a first version in about two weeks. Every timeline comes with clear milestones before we start.' },
    { q: 'WHAT DOES THE PROCESS LOOK LIKE?', a: 'We begin with a discovery call, then move through design, build, and launch — with weekly check-ins and live demos at every stage.' },
    { q: "WHAT IF I DON'T LIKE THE DESIGN?", a: 'We present multiple directions early and iterate until you are happy. Our goal is to nail it during revisions, not surprise you at the end.' },
    { q: 'HOW DO I GET STARTED?', a: 'Just hit the contact button and tell us about your project. We respond within 24 hours with next steps and a ballpark quote.' },
    { q: 'ARE THERE REFUNDS?', a: 'We offer full deposit refunds before production begins. Once design work starts, our standard milestone terms apply.' },
  ]

  const marqueeItems2 = [
    'WEBSITE', 'OVER 100 CUSTOMERS', 'SENIOR DESIGNER',
    'WEBSITE', 'OVER 100 CUSTOMERS', 'SENIOR DESIGNER',
  ]

  const renderItems = (items, className) => (
    <>
      {items.map((item, index) => (
        <span key={index} className={`marquee-item ${className}`}>
          {item}
          <span className="separator">◆</span>
        </span>
      ))}
    </>
  )

  const grayWords = [
    { text: 'STARTUPS', delay: 0 },
    { text: 'AND', delay: 200 },
    { text: 'BRANDS', delay: 400 },
    { text: 'LAUNCH', delay: 600 },
    { text: 'SHARP,', delay: 800 },
    { text: 'FAST,', delay: 1000 },
    { text: 'AND', delay: 1200 },
    { text: 'WITH', delay: 1400 },
    { text: 'ZERO', delay: 1600 },
    { text: 'DRAMA.', delay: 1800 },
  ]

  const tags = [
    { icon: '✦', label: 'Branding' },
    { icon: '🌐', label: 'Logo' },
    { icon: '🌐', label: 'Website' },
    { icon: '◆', label: 'Motion Design' },
    { icon: '✏', label: 'UI/UX' },
    { icon: '☰', label: 'CMS Website' },
  ]

  const projects = [
    {
      id: 1,
      title: 'SCREENRENT',
      year: '2025',
      role: 'Lead Designer',
      services: ['Website Design', 'Product Design', 'Branding', 'Development'],
      description: "A cinematic rental marketplace where every frame drives conversion.",
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1400&h=900&fit=crop',
      glow: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.55), transparent 62%)',
    },
    {
      id: 2,
      title: 'NOVATECH',
      year: '2024',
      role: 'Creative Director',
      services: ['Brand Identity', 'UI/UX Design', 'Web Development'],
      description: "Rebuilding a legacy brand into a sharp, scalable digital identity.",
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=900&fit=crop',
      glow: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.5), transparent 62%)',
    },
    {
      id: 3,
      title: 'PIXELFLOW',
      year: '2024',
      role: 'Design Lead',
      services: ['Motion Design', 'App Design', 'Branding'],
      description: "A motion-first product app with fluid, expressive interactions.",
      image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1400&h=900&fit=crop',
      glow: 'radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.5), transparent 62%)',
    },
  ]

  const clamp01 = (v) => Math.min(Math.max(v, 0), 1)
  const easeInOut = (t) => t * t * (3 - 2 * t)

  const getCaseStyle = (index) => {
    const n = projects.length
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
    const seg = 1 / n
    const start = index * seg
    const end = start + seg
    const trans = seg * 0.62

    const center = start + seg / 2
    const fadeIn = index === 0
      ? 1
      : clamp01((scrollProgress - (center - seg / 2 - trans / 2)) / trans)
    const fadeOut = index === n - 1
      ? 1
      : clamp01((center + seg / 2 + trans / 2 - scrollProgress) / trans)

    const opacity = Math.min(fadeIn, fadeOut)
    const easedIn = easeInOut(fadeIn)
    const easedOut = easeInOut(fadeOut)

    const incoming = 1 - easedIn
    const outgoing = 1 - easedOut
    const off = incoming + outgoing

    const y = incoming * 90 - outgoing * 90
    const z = isMobile ? 0 : -off * 340
    const rotate = isMobile ? 0 : incoming * -4 + outgoing * -4
    const rotX = isMobile ? 0 : incoming * 12 - outgoing * 12
    const blur = isMobile ? off * 3 : off * 8
    const brightness = isMobile ? 1 - off * 0.2 : 1 - off * 0.45
    const scale = 1 - off * (isMobile ? 0.15 : 0.28)

    return {
      opacity,
      incoming,
      outgoing,
      transform:
        `translate3d(0px, ${y}px, ${z}px) ` +
        `rotateX(${rotX}deg) rotateY(${rotate}deg) scale(${scale})`,
      filter: `blur(${blur}px) brightness(${brightness})`,
      zIndex: Math.round(opacity * 100),
    }
  }

  return (
    <Routes>
      <Route path="/" element={
    <div className="container">
      <Navbar />

      <main className="hero">
        <div className="hero-content" ref={heroRef}>
          <h1 className="hero-title reveal-title">
            <span className="white-text">
              <Letters text="SHARP DESIGN" />
            </span>
            <span className="lightning" style={{ '--d': '360ms' }}>
              <img src="/thunder.png" alt="Thunder" className="thunder-img" />
            </span>
            <span className="purple-text">
              <Letters text="SCALABLE" start={12} />
            </span>
            <span className="line-break" />
            <span className="profile-circle reveal-media" style={{ '--d': '600ms' }}>
              <img src="/profile.jpg" alt="Developer" />
            </span>
            <span className="white-text">
              <Letters text="DEVELOPMENT" start={21} />
            </span>
            <span className="white-text line-break">
              <Letters text="BUILT FOR STARTUPS" start={32} />
            </span>
            <span className="white-text">
              <Letters text="BRANDS" start={50} />
            </span>
          </h1>
          <p className="hero-subtitle reveal-subtitle">
            <Letters text="We help startups and growing businesses launch faster with" start={40} />
            <br />
            <Letters text="clean UI/UX design and full-stack web development — no fluff, no delays, just results." start={98} />
          </p>
          <div className="hero-bottom">
            <img
              src="/hero-bottom.jpg"
              alt="Hero bottom"
              onLoad={() => setHeroBottomLoaded(true)}
              className={heroBottomLoaded ? 'loaded' : ''}
            />
          </div>
        </div>
      </main>

      <section className={`marquee-section ${marqueeVisible ? 'visible' : ''}`} ref={marqueeRef}>
        <div className="marquee-band purple-band">
          <div className="marquee-track scroll-left">
            {renderItems(marqueeItems1, 'purple-item')}
          </div>
          <div className="marquee-track scroll-left">
            {renderItems(marqueeItems1, 'purple-item')}
          </div>
        </div>
        <div className="marquee-band dark-band">
          <div className="marquee-track scroll-right">
            {renderItems(marqueeItems2, 'dark-item')}
          </div>
          <div className="marquee-track scroll-right">
            {renderItems(marqueeItems2, 'dark-item')}
          </div>
        </div>
      </section>

      <section id="about" className="about-section" ref={aboutSectionRef}>
        <p className={`hello-text ${isInView ? 'slide-in' : ''}`}>(hello)</p>
        <h2 className="about-heading">
          <span className="word white-word">WE'RE BOLTZ — A DESIGN AND DEVELOPMENT STUDIO</span>
          <span className="word white-word">HELPING</span>
          {grayWords.map((item, index) => (
            <span
              key={index}
              className={`word gray-word ${isInView ? 'revealed' : ''}`}
              style={{ transitionDelay: isInView ? `${item.delay}ms` : '0ms' }}
            >
              {item.text}
            </span>
          ))}
        </h2>
        <div className={`tags-container ${isInView ? 'slide-in' : ''}`}>
          {tags.map((tag, index) => (
            <span key={index} className="tag">
              <span className="tag-icon">{tag.icon}</span>
              {tag.label}
            </span>
          ))}
        </div>
      </section>

      <section className={`testimonials-section ${testimonialsVisible ? 'visible' : ''}`} ref={testimonialsRef}>
        <p className="why-text">(Why clients love us)</p>
        <h2 className="testimonials-title">TESTIMONIALS</h2>
        <div className="testimonials-content">
          <div className="stats-card">
            <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=600&h=700&fit=crop" alt="Stats background" className={`stats-bg ${testimonialsVisible ? 'img-visible' : ''}`} />
            <div className="stats-overlay">
              <div className="stat-item">
                <span className="stat-number">26+</span>
                <span className="stat-label">Finalized Projects</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">400%</span>
                <span className="stat-label">Increased Conversion Rate</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">20</span>
                <span className="stat-label">Organic Traffic</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop" alt="Laptop on sand" className={`testimonial-bg ${testimonialsVisible ? 'img-visible' : ''}`} />
            <div className="testimonial-overlay">
              <span className="slide-counter">01 / 03</span>
              <div className="testimonial-text-container">
                <p className="testimonial-quote">
                  "FRANKLIN TURNED OUR IDEAS INTO A SHARP, CLEAN BRAND. FAST, EASY, AND RIGHT ON POINT."
                </p>
                <div className="testimonial-author">
                  <span className="author-name">Ethan Moore</span>
                  <span className="author-role">Co-founder, NovaTech</span>
                </div>
              </div>
              <div className="nav-arrows">
                <button className="arrow-btn">&lt;</button>
                <button className="arrow-btn">&gt;</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="works" className="works-section">
        <div className="works-header">
          <p className="selected-text">(Selected Work)</p>
          <h2 className="works-title">RECENT WORKS</h2>
        </div>
        <div className="works-stack" ref={worksRef}>
          <div className="works-sticky">
            <div className="case-pin">
              <div className="case-bg">
                <div
                  className="case-light"
                  style={{ transform: `translateY(${scrollProgress * 140 - 70}px)` }}
                />
                <div className="case-vignette" />
                <div className="case-grain" />
              </div>

              <div className="case-scene">
                {projects.map((project, index) => {
                  const s = getCaseStyle(index)
                  const shift = 1 - s.opacity
                  return (
                    <div
                      key={project.id}
                      className="case-card"
                      style={{
                        opacity: s.opacity,
                        transform: s.transform,
                        filter: s.filter,
                        zIndex: s.zIndex,
                        visibility: s.opacity > 0.02 ? 'visible' : 'hidden',
                      }}
                    >
                      <span className="case-counter">
                        <span className="case-counter-num">0{index + 1}</span>
                        <span className="case-counter-total">/ 0{projects.length}</span>
                      </span>

                      <div className="case-body">
                        <div className="case-info">
                          <div className="case-title-mask">
                            <h3
                              className="case-title"
                              style={{ transform: `translateY(${shift * 60}px)` }}
                            >
                              {project.title}
                            </h3>
                          </div>
                          <p
                            className="case-desc"
                            style={{ transform: `translateY(${shift * 26}px)` }}
                          >
                            {project.description}
                          </p>
                          <a href="#contact" className="case-link">
                            View Case Study
                            <span className="case-link-arrow">→</span>
                          </a>
                        </div>

                        <div className="case-image-frame">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="case-image"
                          />
                          {projects[index + 1] && (() => {
                            const peek = getCaseStyle(index + 1).incoming
                            return (
                              <img
                                src={projects[index + 1].image}
                                alt=""
                                className="case-image-peek"
                                style={{
                                  transform: `translateY(${peek * 70}px) scale(${0.85 + (1 - peek) * 0.15})`,
                                  filter: `blur(${peek * (window.innerWidth <= 768 ? 6 : 15)}px)`,
                                  opacity: `${0.35 + (1 - peek) * 0.65}`,
                                }}
                              />
                            )
                          })()}
                        </div>

                        <div className="case-meta">
                          <div
                            className="case-meta-item"
                            style={{ transform: `translateY(${shift * 22}px)` }}
                          >
                            <span className="case-meta-label">Year</span>
                            <span className="case-meta-value">{project.year}</span>
                          </div>
                          <div
                            className="case-meta-item"
                            style={{ transform: `translateY(${shift * 28}px)` }}
                          >
                            <span className="case-meta-label">Role</span>
                            <span className="case-meta-value">{project.role}</span>
                          </div>
                          <div
                            className="case-meta-item"
                            style={{ transform: `translateY(${shift * 34}px)` }}
                          >
                            <span className="case-meta-label">Services</span>
                            <div className="case-services">
                              {project.services.map((service, i) => (
                                <span key={i} className="case-service">{service}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="services-section" ref={servicesRef}>
        <div className={`services-header ${servicesVisible ? 'visible' : ''}`}>
          <p className="services-kicker">(Services)</p>
          <h2 className="services-title"><Letters text="WHAT WE DO" /></h2>
          <div className="services-divider" />
        </div>

        <div className={`services-tabs ${servicesVisible ? 'visible' : ''}`}>
          {services.map((s, i) => (
            <button
              key={i}
              className={`service-tab ${activeService === i ? 'active' : ''}`}
              onClick={() => setActiveService(i)}
            >
              {activeService === i && <span className="tab-dot" />}
              {s.label}
            </button>
          ))}
        </div>

        <div className="services-showcase">
          <div className={`services-marquee-bg ${servicesVisible ? 'visible' : ''}`} key={activeService}>
            <div className="services-marquee-row">
              <div className="services-marquee-track">
                {[0, 1, 2, 3].map((j) => (
                  <span key={j} className="services-marquee-text">
                    {services[activeService].marquee}
                    <span className="services-marquee-sep"> — </span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={`services-preview ${servicesVisible ? 'visible' : ''}`}>
            <img
              src={services[activeService].image}
              alt={services[activeService].label}
            />
          </div>
        </div>

        <p className="services-desc" key={`desc-${activeService}`}>
          {services[activeService].description}
        </p>

        <div className="services-tags" key={`tags-${activeService}`}>
          {services[activeService].tags.map((tag, i) => (
            <span key={i} className="services-tag">{tag}</span>
          ))}
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

      <section id="contact" className="contact-section" ref={contactRef}>
        <h2 className={`contact-heading ${contactVisible ? 'visible' : ''}`}>LET'S CONNECT</h2>

        <div id="contact-card" className="contact-card">
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
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-field">
                  <label>Your Name</label>
                  <input type="text" placeholder="Enter your Name" />
                </div>
                <div className="form-field">
                  <label>Your Email</label>
                  <input type="email" placeholder="Enter the Email" />
                </div>
                <div className="form-field">
                  <label>Project Description</label>
                  <textarea
                    placeholder="Type Here..."
                    rows="1"
                    onInput={(e) => {
                      e.target.style.height = 'auto'
                      e.target.style.height = e.target.scrollHeight + 'px'
                    }}
                  />
                </div>
                <button type="submit" className="contact-submit">SEND NOW!</button>
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
              <a href="#services">SERVICES</a>
            </nav>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Social</h4>
            <nav className="footer-links">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">TWITTER(X)</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
              <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer">DRIBBLE</a>
            </nav>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Legals</h4>
            <nav className="footer-links">
              <a href="#privacy">PRIVACY POLICY</a>
              <a href="#terms">TERM OF SERVICE</a>
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
          sizes="(min-width: 1440px) calc(max(min(100vw, 1920px) - 16px, 1px) - 296px), (min-width: 810px) and (max-width: 1439.98px) calc(max(min(100vw, 1920px) - 16px, 1px) - 60px), (max-width: 809.98px) calc(max(min(100vw, 1920px) - 16px, 1px) - 40px)"
          style={{ display: 'block', width: '100%', height: '100%', borderRadius: 'inherit', cornerShape: 'inherit', objectPosition: '30% bottom', objectFit: 'contain' }}
        />
      </div>
    </div>
    } />
      <Route path="/services" element={<Services />} />
    </Routes>
  )
}

export default App
