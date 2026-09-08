import ContactPage from './ContactPage'
import { SiteHeader, SiteFooter, HeroArt } from './SiteChrome'
import { useEffect, useRef } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import './Enhancements.css'
import AboutPage from './AboutPage'
import ProjectsPage from './ProjectsPage'
import './SharedUpdates.css'

const activities = [
  ['01', '業務アプリの開発', '日々の仕事を支える機能を設計し、使えるかたちに。'],
  ['02', 'システムの改善・保守', '不具合の原因を調べ、周りへの影響も確かめて改善。'],
  ['03', '品質確認の自動化', '動作確認を自動化し、継続して品質を確かめる仕組みづくり。'],
  ['04', '日々の作業を効率化', '勤怠入力やメール送信など、繰り返す作業の負担を軽減。'],
]

function ActivityIcon({ number }: { number: string }) {
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {number === '01' && <><rect x="4" y="5" width="24" height="18" rx="2" /><path d="M2 27h28M12 11l-4 3 4 3m8-6 4 3-4 3m-3-7-2 8" /></>}
    {number === '02' && <><circle cx="13" cy="13" r="8" /><path d="m19 19 9 9M10 13h6m-3-3v6" /></>}
    {number === '03' && <><path d="m16 3 11 4v8c0 7-11 14-11 14S5 22 5 15V7Z" /><path d="m10 15 4 4 8-9" /></>}
    {number === '04' && <><path d="m18 2-12 17h9l-1 11 12-18h-9Z" /></>}
  </svg>
}

function Home() {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!root.current || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })
    const elements = root.current.querySelectorAll('.profile-grid, .activity, .connection')
    elements.forEach((element) => {
      element.classList.add('reveal')
      observer.observe(element)
    })
    return () => {
      observer.disconnect()
      elements.forEach((element) => element.classList.remove('reveal'))
    }
  }, [])
  return <div ref={root} className="home">
    <a className="skip-link" href="#main">本文へ移動</a>
    <SiteHeader />
    <main id="main">
      <section className="hero" id="top">
        <div className="hero-content">
          <p className="eyebrow">AI ENGINEER</p>
          <h1><span>AIエンジニアと</span><span>だからできる</span><span>品質と感動を</span></h1>
          <p className="lead">アイデアをかたちに。<br />安心して使える仕組みを、一緒につくる。</p>
          <div className="hero-actions"><a className="button" href="/contact">お問い合わせ <span aria-hidden="true">↗</span></a><Link className="sub-link" to="/about">プロフィールを見る <span aria-hidden="true">→</span></Link></div>
        </div>
        <HeroArt />

      </section>
      <section className="profile section" id="profile">
        <p className="eyebrow">PROFILE</p>
        <div className="profile-grid"><div className="portrait-frame"><img src="/wataru-profile.png" alt="手塚航のプロフィール写真" width="1152" height="1536" loading="lazy" decoding="async" /></div><div><h2>つくる力と、<br className="mobile-break" />確かめる力。</h2><p className="profile-name">手塚 航</p></div>
        <div className="profile-copy"><p>仕事を支えるアプリづくりから、不具合の改善、日々の作業の自動化まで。開発と品質確認の経験を生かし、使う人の困りごとを仕組みで解決します。</p><p>AIも開発のパートナーに。目的と品質は人が確かめ、安心して使い続けられるかたちへ仕上げます。</p></div></div>
      </section>
      <section className="section work" id="work"><p className="eyebrow">WORK</p><h2>主な活動</h2>
        <div className="activity-list">{activities.map(([number, title, body], index) => <Link className="activity activity-link" key={number} to={'/projects#' + ['app-development', 'maintenance', 'quality', 'automation'][index]}><span className="activity-icon"><ActivityIcon number={number} /></span><div><h3>{title}</h3><p>{body}</p></div></Link>)}</div>
      </section>
      <section className="section connections" aria-label="発信とお問い合わせ">
        <a className="connection note-card" href="https://note.com/just_eagle7298" target="_blank" rel="noopener noreferrer"><span className="eyebrow">JOURNAL</span><h2>考えや活動を、noteで。</h2><span className="connection-action">noteを読む <span aria-hidden="true">↗</span></span></a>
        <div className="connection contact-card" id="contact"><span className="eyebrow">CONTACT</span><h2>ご相談は、ここから。</h2><p>開発のご相談・お仕事や採用のご連絡をお待ちしています。</p><a className="connection-action" href="/contact">お問い合わせ <span aria-hidden="true">↗</span></a><a className="email" href="/contact">agtmpwd992@gmail.com</a></div>
      </section>
    </main>
    <SiteFooter />
  </div>
}

export default function App() {
  return <BrowserRouter><Routes><Route path="/" element={<Home />} /><Route path="/about" element={<AboutPage />} /><Route path="/projects" element={<ProjectsPage />} /><Route path="/contact" element={<ContactPage />} /><Route path="*" element={<><SiteHeader /><main className="section"><h1>ページが見つかりません</h1><Link to="/">ホームへ戻る</Link></main><SiteFooter /></>} /></Routes></BrowserRouter>
}
