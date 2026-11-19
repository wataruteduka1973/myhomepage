import { ServiceIcon } from './ServiceVisual'
import { SocialCard } from './SiteChrome'
import ContactPage from './ContactPage'
import { SiteHeader, SiteFooter, HeroArt } from './SiteChrome'
import { useEffect, useRef } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import './Enhancements.css'
import AboutPage from './AboutPage'
import ProjectsPage from './ProjectsPage'
import SystemaPage from './SystemaPage'
import './SharedUpdates.css'
import './DesignPolish.css'
import './ProjectsExtras.css'

const activities = [
  ['01', '業務アプリの開発', '日々の仕事を支える機能を設計し、使えるかたちに。'],
  ['02', 'システムの改善・保守', '不具合の原因を調べ、周りへの影響も確かめて改善。'],
  ['03', '品質確認の自動化', '動作確認を自動化し、継続して品質を確かめる仕組みづくり。'],
  ['04', '日々の作業の自動化', '繰り返す業務を自動化し、人が考える時間をつくる。'],
  ['05', 'AI活用', '社内資料の検索や質問応答など、業務へのAI活用を小さく試す。'],
]
const flowSteps = [['ご相談', '固まっていなくて大丈夫。困りごとをお送りください。'], ['ヒアリング', '目的や今の作業の流れをお伺いします。'], ['ご提案', '進め方・範囲・期間の目安をご提案します。'], ['開発・改善', '途中で動くものを確認しながら進めます。'], ['お引き渡し', '動作を一緒に確認し、使い方をご案内します。']]

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
          <h1><span>AIエンジニア</span><span>だからできる</span><span>品質と感動を</span></h1>
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
      <section className="section work" id="work"><p className="eyebrow">WORK</p><h2>ご相談いただけること</h2>
        <div className="activity-list">{activities.map(([number, title, body], index) => <Link className={"activity activity-link service-theme-" + (index % 4)} key={number} to={'/projects#' + ['app-development', 'maintenance', 'quality', 'automation', 'ai-rag'][index]}><span className="activity-icon"><ServiceIcon index={index} /></span><div><h3>{title}</h3><p>{body}</p></div></Link>)}</div>
      </section>
      <section className="section home-flow" id="home-flow"><p className="eyebrow">FLOW</p><h2>ご依頼は、5つのステップで。</h2><ol className="request-flow">{flowSteps.map(([title, text], index) => <li key={title}><span className="flow-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol><p className="home-flow-more"><Link to="/projects#flow">ご依頼の流れと、よくある質問を見る →</Link></p></section>
      <section className="section connections" aria-label="発信とお問い合わせ">
        <SocialCard />
        <div className="connection contact-card" id="contact"><span className="eyebrow">CONTACT</span><h2>ご相談は、ここから。</h2><p>開発のご相談・お仕事や採用のご連絡をお待ちしています。</p><a className="connection-action" href="/contact">お問い合わせ <span aria-hidden="true">↗</span></a><a className="email" href="/contact">agtmpwd992@gmail.com</a></div>
      </section>
    </main>
    <SiteFooter />
  </div>
}

export default function App() {
  return <BrowserRouter><Routes><Route path="/" element={<Home />} /><Route path="/about" element={<AboutPage />} /><Route path="/projects" element={<ProjectsPage />} /><Route path="/works/systema" element={<SystemaPage />} /><Route path="/contact" element={<ContactPage />} /><Route path="*" element={<><SiteHeader /><main className="section"><h1>ページが見つかりません</h1><Link to="/">ホームへ戻る</Link></main><SiteFooter /></>} /></Routes></BrowserRouter>
}
