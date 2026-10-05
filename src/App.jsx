import { useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import './App.css'
import Services from './pages/Services.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'
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
  const heroRef = useRef(null)
  const faqRef = useRef(null)
  const [faqVisible, setFaqVisible] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [testimonialsVisible, setTestimonialsVisible] = useState(false)
  const [tscIndex, setTscIndex] = useState(0)
  const [openFaq, setOpenFaq] = useState(-1)
  const worksRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [heroBottomLoaded, setHeroBottomLoaded] = useState(false)
  const marqueeRef = useRef(null)
  const [marqueeVisible, setMarqueeVisible] = useState(false)
  const contactRef = useRef(null)
  const [contactVisible, setContactVisible] = useState(false)
  const servicesCarouselRef = useRef(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const shcTrackRef = useRef(null)
  const [showShcLeft, setShowShcLeft] = useState(false)
  const [showShcRight, setShowShcRight] = useState(true)
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

  const serviceCards = [
    { num: '01', icon: '◻', title: 'Framer Development', desc: 'Build fast, responsive, and visually stunning websites with expert Framer development.' },
    { num: '02', icon: '◎', title: 'Figma Design', desc: 'Create clean, modern and conversion-focused interfaces with professional Figma design.' },
    { num: '03', icon: '⬡', title: 'Website Security', desc: 'Protect your website with reliable security, monitoring and performance optimization.' },
    { num: '04', icon: '△', title: 'Web Development', desc: 'Build fast, scalable and responsive websites tailored to your business.' },
    { num: '05', icon: '◇', title: 'UI/UX Design', desc: 'Design intuitive digital experiences that are simple, modern and user-friendly.' },
    { num: '06', icon: '⬢', title: 'Website Optimization', desc: 'Improve speed, responsiveness, accessibility and overall website performance.' },
  ]

  const testimonialData = [
    {
      num: '01',
      text: 'They transformed our outdated site into a conversion machine. Professional, creative, and on-time! Communication was seamless — I felt heard and supported at every stage of the project.',
      name: 'Isa Kose',
      role: 'Founder, Hypnose Praktijk',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face',
    },
    {
      num: '02',
      text: 'They helped us bring our new brand vision to life with a full branding kit and website design. They stayed aligned with our evolving direction and were flexible throughout the process, making it easy to adapt and refine as we went. We\'d confidently partner again and would recommend.',
      name: 'Keefe Dashiell',
      role: 'Founder, After Life Initiative',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face',
    },
  ]

  function scrollServiceCards(dir) {
    const el = servicesCarouselRef.current
    if (!el) return
    const cardWidth = el.querySelector('.services-carousel-card')?.offsetWidth || 340
    const gap = 24
    el.scrollBy({ left: dir === 'right' ? cardWidth + gap : -(cardWidth + gap), behavior: 'smooth' })
  }

  function updateCarouselArrows() {
    const el = servicesCarouselRef.current
    if (!el) return
    setShowLeftArrow(el.scrollLeft > 10)
    setShowRightArrow(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  function scrollShcCards(dir) {
    const el = shcTrackRef.current
    if (!el) return
    const cardWidth = el.querySelector('.shc-card')?.offsetWidth || 380
    const gap = 20
    el.scrollBy({ left: dir === 'right' ? cardWidth + gap : -(cardWidth + gap), behavior: 'smooth' })
  }

  function updateShcArrows() {
    const el = shcTrackRef.current
    if (!el) return
    setShowShcLeft(el.scrollLeft > 10)
    setShowShcRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

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
    const el = servicesCarouselRef.current
    if (!el) return
    updateCarouselArrows()
    el.addEventListener('scroll', updateCarouselArrows, { passive: true })
    window.addEventListener('resize', updateCarouselArrows)

    let isDown = false
    let startX = 0
    let startScrollLeft = 0
    let moved = false

    const onMouseDown = (e) => {
      isDown = true
      moved = false
      startX = e.pageX - el.offsetLeft
      startScrollLeft = el.scrollLeft
      el.style.cursor = 'grabbing'
      el.style.scrollSnapType = 'none'
    }

    const onMouseLeave = () => {
      isDown = false
      el.style.cursor = ''
      el.style.scrollSnapType = 'x mandatory'
    }

    const onMouseUp = () => {
      isDown = false
      el.style.cursor = ''
      el.style.scrollSnapType = 'x mandatory'
    }

    const onMouseMove = (e) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - el.offsetLeft
      const walk = (x - startX) * 1.2
      if (Math.abs(walk) > 3) moved = true
      el.scrollLeft = startScrollLeft - walk
    }

    const onClickCapture = (e) => {
      if (moved) {
        e.preventDefault()
        e.stopPropagation()
        moved = false
      }
    }

    el.addEventListener('mousedown', onMouseDown)
    el.addEventListener('mouseleave', onMouseLeave)
    el.addEventListener('mouseup', onMouseUp)
    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('click', onClickCapture, true)

    return () => {
      el.removeEventListener('scroll', updateCarouselArrows)
      window.removeEventListener('resize', updateCarouselArrows)
      el.removeEventListener('mousedown', onMouseDown)
      el.removeEventListener('mouseleave', onMouseLeave)
      el.removeEventListener('mouseup', onMouseUp)
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('click', onClickCapture, true)
    }
  }, [location.pathname])

  useEffect(() => {
    const el = shcTrackRef.current
    if (!el) return
    updateShcArrows()
    el.addEventListener('scroll', updateShcArrows, { passive: true })
    window.addEventListener('resize', updateShcArrows)

    let isDown = false
    let startX = 0
    let startScrollLeft = 0
    let moved = false

    const onMouseDown = (e) => {
      isDown = true
      moved = false
      startX = e.pageX - el.offsetLeft
      startScrollLeft = el.scrollLeft
      el.style.cursor = 'grabbing'
      el.style.scrollSnapType = 'none'
    }

    const onMouseLeave = () => {
      isDown = false
      el.style.cursor = ''
      el.style.scrollSnapType = 'x mandatory'
    }

    const onMouseUp = () => {
      isDown = false
      el.style.cursor = ''
      el.style.scrollSnapType = 'x mandatory'
    }

    const onMouseMove = (e) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - el.offsetLeft
      const walk = (x - startX) * 1.2
      if (Math.abs(walk) > 3) moved = true
      el.scrollLeft = startScrollLeft - walk
    }

    const onClickCapture = (e) => {
      if (moved) {
        e.preventDefault()
        e.stopPropagation()
        moved = false
      }
    }

    el.addEventListener('mousedown', onMouseDown)
    el.addEventListener('mouseleave', onMouseLeave)
    el.addEventListener('mouseup', onMouseUp)
    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('click', onClickCapture, true)

    return () => {
      el.removeEventListener('scroll', updateShcArrows)
      window.removeEventListener('resize', updateShcArrows)
      el.removeEventListener('mousedown', onMouseDown)
      el.removeEventListener('mouseleave', onMouseLeave)
      el.removeEventListener('mouseup', onMouseUp)
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('click', onClickCapture, true)
    }
  }, [location.pathname])

  useEffect(() => {
    const root = worksRef.current
    if (!root) return
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const rect = root.getBoundingClientRect()
        const vh = window.innerHeight
        const total = rect.height - vh
        if (total <= 0) return
        setScrollProgress(clamp01(-rect.top / total))
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [location.pathname])

  function clamp01(v) { return Math.max(0, Math.min(1, v)) }

  function getCaseStyle(progress, i) {
    const count = 3
    const t = progress * count

    function smoothstep(edge0, edge1, x) {
      const v = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
      return v * v * (3 - 2 * v)
    }

    const enter = smoothstep(i - 0.3, i, t)
    const exit = i < count - 1 ? smoothstep(i + 0.3, i + 0.7, t) : 0
    const presence = enter * (1 - exit)

    const opacity = presence > 0.02 ? presence : 0
    const scale = 0.85 + presence * 0.15
    const y = exit * -60
    const z = presence * 200
    const brightness = 0.5 + presence * 0.5
    const zIdx = Math.round(presence * 100 + i)

    return {
      transform: `translateZ(${z}px) translateY(${y}px) scale(${scale})`,
      opacity: Math.round(opacity * 100) / 100,
      zIndex: zIdx,
      filter: `brightness(${Math.round(brightness * 10) / 10})`,
    }
  }

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
    { q: 'HOW FAST DO YOU DELIVER?', a: 'Most design projects wrap in 5–10 business days. Full website builds take 4–6 weeks depending on scope. We’ll agree on a timeline upfront.' },
    { q: 'WHAT DOES THE PROCESS LOOK LIKE?', a: 'Discovery → Design → Review → Development → Launch. You’re involved at every stage and we keep communication tight throughout.' },
    { q: "WHAT IF I DON'T LIKE THE DESIGN?", a: 'We offer revision rounds built into every project. If we’re off-track, we revisit — your satisfaction is non-negotiable.' },
    { q: 'HOW DO I GET STARTED?', a: 'Fill out the contact form or email us. We’ll schedule a quick call to understand your project and send a proposal within 24–48 hours.' },
    { q: 'ARE THERE REFUNDS?', a: 'We don’t offer full refunds after work begins, but we’re committed to getting it right. We’ll revise until you’re happy.' },
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

  const tscSlides = [
    {
      text: 'Franklin turned our ideas into a sharp, clean brand. Fast, easy, and right on point.',
      name: 'Ethan Moore',
      role: 'Co-founder, NovaTech',
      image: '/monkeytilt.jpg',
    },
    {
      text: 'They transformed our outdated site into a conversion machine. Professional, creative, and on-time!',
      name: 'Isa Kose',
      role: 'Founder, Hypnose Praktijk',
      image: '/screenrent.png',
    },
    {
      text: 'They brought our new brand vision to life — flexible, aligned, and easy to work with from start to finish.',
      name: 'Keefe Dashiell',
      role: 'Founder, After Life Initiative',
      image: '/house.jpeg',
    },
    {
      text: 'They rebuilt our site and the conversion lift showed up in the first month.',
      name: 'Marcus Lee',
      role: 'Head of Growth, Rivet Labs',
      image: '/air.jpeg',
    },
    {
      text: 'Clean process, sharp design, zero drama. Exactly what we needed from an agency.',
      name: 'Sofia Anders',
      role: 'Marketing Director, Bloomline',
      image: '/jet.jpeg',
    },
    {
      text: 'From brand to build in weeks, not months — and it still feels considered.',
      name: 'Daniel Okafor',
      role: 'CEO, NorthPeak',
      image: '/eop.jpeg',
    },
  ]

  const projects = [
    {
      id: 1,
      title: 'SCREENRENT',
      year: '2025',
      role: 'Lead Designer',
      services: ['Website Design', 'Product Design', 'Branding', 'Development'],
      description: "We’ve helped businesses across industries achieve their goals. Here are some of our selected works.",
      image: '/screenrent.png',
      glow: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.06), transparent 62%)',
    },
    {
      id: 2,
      title: 'JOMI',
      year: '2018',
      role: 'Logo Design',
      services: ['Designing', 'Branding', 'Redesigning', 'Development'],
      description: "We’ve partnered with businesses across various industries to help them achieve their goals.",
      image: '/1st-slide.png',
      glow: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.06), transparent 62%)',
    },
    {
      id: 3,
      title: 'MONKEYTILT',
      year: '2023',
      role: 'Web Designer',
      services: ['Branding', 'Revamp', 'Development', 'Designing'],
      description: "We’ve collaborated with companies from diverse sectors to turn their visions into reality. Here’s a look at some of our featured work.",
      image: '/m1.png',
      glow: 'radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.06), transparent 62%)',
    },
  ]

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
        <div className="pills-container">
          <div className="pills-row">
            <div className="pill"><img className="pill-icon pill-icon-img" src="/pill-branding.png" alt="" /><span className="pill-label">Branding</span></div>
            <div className="pill"><img className="pill-icon pill-icon-img" src="/pill-logo.png" alt="" /><span className="pill-label">Logo</span></div>
            <div className="pill"><img className="pill-icon pill-icon-img" src="/pill-website.png" alt="" /><span className="pill-label">Website</span></div>
          </div>
          <div className="pills-row">
            <div className="pill"><img className="pill-icon pill-icon-img" src="/pill-motion.png" alt="" /><span className="pill-label">Motion Design</span></div>
            <div className="pill"><img className="pill-icon pill-icon-img" src="/pill-uxui.png" alt="" /><span className="pill-label">UI/UX</span></div>
            <div className="pill"><img className="pill-icon pill-icon-img" src="/pill-cms.png" alt="" /><span className="pill-label">CMS Website</span></div>
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
              {projects.map((project, index) => {
                const style = getCaseStyle(scrollProgress, index)
                return (
                  <div className="case-card" key={project.id} style={style}>
                    <div className="case-counter">
                      <span className="case-counter-num">0{index + 1}</span>
                      <span className="case-counter-total">/0{projects.length}</span>
                    </div>
                    <div className="case-body">
                      <div className="case-info">
                        <div className="case-title-mask">
                          <h3 className="case-title">{project.title}</h3>
                        </div>
                        <p className="case-desc">{project.description}</p>
                        <a href="#contact" className="case-link">
                          VIEW CASE STUDY <span className="case-link-arrow">→</span>
                        </a>
                      </div>
                      <div className="case-image-frame">
                        <img className="case-image" src={project.image} alt={project.title} />
                        {index + 1 < projects.length && (
                          <img
                            className="case-image-peek"
                            src={projects[index + 1].image}
                            alt=""
                            style={{
                              clipPath: `inset(${Math.round(style.opacity * 100)}% 0 0 0)`,
                              opacity: (1 - style.opacity) * 0.5,
                            }}
                          />
                        )}
                      </div>
                      <div className="case-meta">
                        <div className="case-meta-item">
                          <span className="case-meta-label">Year</span>
                          <span className="case-meta-value">{project.year}</span>
                        </div>
                        <div className="case-meta-item">
                          <span className="case-meta-label">Role</span>
                          <span className="case-meta-value">{project.role}</span>
                        </div>
                        <div className="case-meta-item">
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
      </section>

      <section id="services" className="capabilities-section">
        <div className="capabilities-header visible">
          <p className="capabilities-kicker">(Services)</p>
          <h2 className="capabilities-title"><Letters text="WHAT WE DO" /></h2>
        </div>
      </section>

      <section className="services-carousel-section">
        <div className="shc-wrapper">
          <div className="service-hover-cards" ref={shcTrackRef}>
            <div className="shc-card">
            <div className="shc-image">
              <img src="/mockup.jpg" alt="UI/UX Design" loading="lazy" />
            </div>
            <div className="shc-overlay" />
            <span className="shc-num">01</span>
            <img className="shc-icon-img" src="/icon-uiux.png" alt="" />
            <div className="shc-content">
              <h3 className="shc-title">UI/UX Design</h3>
              <p className="shc-desc">We design intuitive UI &amp; UX that are visually consistent, and effortless to use.</p>
            </div>
          </div>

          <div className="shc-card">
            <div className="shc-image">
              <img src="/Service.jpg" alt="SaaS Design" loading="lazy" />
            </div>
            <div className="shc-overlay" />
            <span className="shc-num">02</span>
            <img className="shc-icon-img" src="/icon-saas.png" alt="" />
            <div className="shc-content">
              <h3 className="shc-title">SaaS Design</h3>
              <p className="shc-desc">We redesign dashboards, onboarding, and flows around the moments users drop off.</p>
            </div>
          </div>

          <div className="shc-card">
            <div className="shc-image">
              <img src="/screenrent.png" alt="Framer Website" loading="lazy" />
            </div>
            <div className="shc-overlay" />
            <span className="shc-num">03</span>
            <img className="shc-icon-img" src="/icon-framer.png" alt="" />
            <div className="shc-content">
              <h3 className="shc-title">Framer Website</h3>
              <p className="shc-desc">We build custom Framer sites with smooth animations and responsive design.</p>
            </div>
          </div>

          <div className="shc-card">
            <div className="shc-image">
              <img src="/m1.png" alt="Strategic Brand Design" loading="lazy" />
            </div>
            <div className="shc-overlay" />
            <span className="shc-num">04</span>
            <img className="shc-icon-img" src="/icon-brand.png" alt="" />
            <div className="shc-content">
              <h3 className="shc-title">STRATEGIC BRAND DESIGN</h3>
              <p className="shc-desc">We craft distinctive brand identities with strategic design and visual consistency.</p>
            </div>
          </div>
          </div>

          <button
            className={`scc-arrow shc-arrow-left ${showShcLeft ? 'visible' : ''}`}
            onClick={() => scrollShcCards('left')}
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            className={`scc-arrow shc-arrow-right ${showShcRight ? 'visible' : ''}`}
            onClick={() => scrollShcCards('right')}
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      </section>

      <section className="testimonials-section" ref={testimonialsRef}>
        <div className={`testimonials-header ${testimonialsVisible ? 'visible' : ''}`}>
          <p className="why-text">(Why clients love us)</p>
          <h2 className="testimonials-title"><Letters text="TESTIMONIALS" /></h2>
        </div>
        <div className="tsc">
          <div className="tsc-stats">
            <img className="tsc-stats-img" src="/contact-bg.jpg" alt="" />
            <div className="tsc-stats-shade" />
            <div className="tsc-stat">
              <span className="tsc-stat-num">26+</span>
              <span className="tsc-stat-label">Finalized Projects</span>
            </div>
            <div className="tsc-stat">
              <span className="tsc-stat-num">400%</span>
              <span className="tsc-stat-label">Increased Conversion Rate</span>
            </div>
            <div className="tsc-stat">
              <span className="tsc-stat-num">20</span>
              <span className="tsc-stat-label">Organic Traffic</span>
            </div>
          </div>

          <div className="tsc-slide">
            <img className="tsc-slide-img" src={tscSlides[tscIndex].image} alt="" />
            <div className="tsc-slide-shade" />
            <span className="tsc-counter">
              {String(tscIndex + 1).padStart(2, '0')} / {String(tscSlides.length).padStart(2, '0')}
            </span>
            <div className="tsc-body" key={tscIndex}>
              <p className="tsc-quote">&#x201C;{tscSlides[tscIndex].text}&#x201D;</p>
              <div className="tsc-author">
                <span className="tsc-name">{tscSlides[tscIndex].name}</span>
                <span className="tsc-role">{tscSlides[tscIndex].role}</span>
              </div>
            </div>
            <div className="tsc-arrows">
              <button type="button" className="tsc-arrow" aria-label="Previous testimonial" onClick={() => setTscIndex((i) => (i - 1 + tscSlides.length) % tscSlides.length)}>‹</button>
              <button type="button" className="tsc-arrow" aria-label="Next testimonial" onClick={() => setTscIndex((i) => (i + 1) % tscSlides.length)}>›</button>
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
          sizes="(min-width: 1440px) calc(max(min(100vw, 1920px) - 16px, 1px) - 296px), (min-width: 810px) and (max-width: 1439.98px) calc(max(min(100vw, 1920px) - 16px, 1px) - 60px), (max-width: 809.98px) calc(max(min(100vw, 1920px) - 16px, 1px) - 40px)"
          style={{ display: 'block', width: '100%', height: '100%', borderRadius: 'inherit', cornerShape: 'inherit', objectPosition: '30% bottom', objectFit: 'contain' }}
        />
      </div>
    </div>
    } />
      <Route path="/services" element={<Services />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
  )
}

export default App
