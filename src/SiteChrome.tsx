import { Link, useLocation } from 'react-router-dom'

export function SiteHeader() {
  const { pathname } = useLocation()
  return <header className="site-header">
    <Link className="brand" to="/">手塚 航<small>WATARU TEZUKA</small></Link>
    <nav aria-label="メインナビゲーション">
      <Link to="/" aria-current={pathname === '/' ? 'page' : undefined}>ホーム</Link>
      <Link to="/about" aria-current={pathname === '/about' ? 'page' : undefined}>私について</Link>
      <Link to="/projects" aria-current={pathname === '/projects' ? 'page' : undefined}>主な活動</Link><Link to="/contact" aria-current={pathname === '/contact' ? 'page' : undefined}>お問い合わせ</Link>
    </nav>
  </header>
}

export function SiteFooter() {
  return <footer className="site-footer"><Link to="/">ホーム</Link><a href="https://note.com/just_eagle7298" target="_blank" rel="noopener noreferrer"><SocialLogo kind="note" />note ↗</a><a href="https://x.com/JPAUEngineer" target="_blank" rel="noopener noreferrer"><SocialLogo kind="x" />X ↗</a><a href="/contact">お問い合わせ ↗</a></footer>
}

export function HeroArt() {
  return <div className="hero-art" aria-hidden="true"><div className="hero-glow" /><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" /><div className="light-dot dot-one" /><div className="light-dot dot-two" /><div className="light-dot dot-three" /></div>
}
export function SocialLogo({ kind }: { kind: 'note' | 'x' }) {
  return <svg className="social-logo" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    {kind === 'x' ? <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l8.2-9.4L.8 2h6.5l4.5 6.8L18.9 2Zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20Z" /> : <path d="M4 5h8.5C18 5 21 8.2 21 13.5V21h-6v-7.2c0-2.5-1-3.7-3.2-3.7H10V21H4V5Z" />}
  </svg>
}
export function SocialCard() {
  return <div className="connection note-card"><span className="eyebrow">JOURNAL / SOCIAL</span><h2>考えや活動を、発信しています。</h2><p>まとまった記事はnoteで、日々の気づきはXで。</p><div className="social-links"><a href="https://note.com/just_eagle7298" target="_blank" rel="noopener noreferrer"><SocialLogo kind="note" />noteを読む <span aria-hidden="true">↗</span></a><a href="https://x.com/JPAUEngineer" target="_blank" rel="noopener noreferrer"><SocialLogo kind="x" />Xを見る <span aria-hidden="true">↗</span></a></div></div>
}
