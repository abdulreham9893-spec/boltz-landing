const Letters = ({ text, start = 0 }) =>
  text.split('').map((ch, i) => (
    <span key={i} className="hero-letter" style={{ '--d': `${(start + i) * 30}ms` }}>
      {ch}
    </span>
  ))

export default Letters
