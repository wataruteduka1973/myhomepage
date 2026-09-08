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
  return <footer className="site-footer"><Link to="/">ホーム</Link><a href="https://note.com/just_eagle7298" target="_blank" rel="noopener noreferrer">note ↗</a><a href="/contact">お問い合わせ ↗</a></footer>
}

export function HeroArt() {
  return <div className="hero-art" aria-hidden="true"><div className="hero-glow" /><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" /><div className="light-dot dot-one" /><div className="light-dot dot-two" /><div className="light-dot dot-three" /></div>
}
