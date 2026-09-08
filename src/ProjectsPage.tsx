import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { HeroArt, SiteFooter, SiteHeader } from './SiteChrome'
import './ProjectsPage.css'

const services = [
  { id: 'app-development', title: '業務アプリの開発', description: '「こんな仕組みがあったら便利」を、使えるアプリへ。ご要望を整理し、仕事の流れに合ったかたちを一緒に考えます。', examples: ['業務に合うアプリをつくりたい', 'アイデアを試作品にしてみたい'] },
  { id: 'maintenance', title: 'システムの改善・保守', description: '今あるアプリの不便や不具合を見直し、使い続けやすい仕組みへ整えます。', examples: ['使っているアプリを改善したい', '不具合や使いづらさを相談したい'] },
  { id: 'quality', title: '品質確認の自動化', description: '繰り返し必要な動作確認を自動化し、安心して改善を続けられる仕組みをつくります。', examples: ['確認作業の負担を減らしたい', 'アプリを更新するときの不安を減らしたい'] },
  { id: 'automation', title: '日々の作業を効率化', description: '日々の業務を見直し、自動化や操作の簡略化で、手間のかかる作業を減らします。', examples: ['繰り返す作業を自動化したい', 'どこを効率化できるか、一緒に考えてほしい'] },
]
const experiences = [
  ['社内向けアプリケーション開発', '業務を支えるアプリの開発や、日々の業務の自動化に取り組みました。'],
  ['お客様の社内アプリケーション改善', 'お客様が使うアプリの更新や改善、不具合の調査・修正に携わりました。'],
  ['自社開発', 'アプリの機能づくりと、品質を継続して確認する仕組みの整備に取り組みました。'],
]

export default function ProjectsPage() {
  const [paused, setPaused] = useState(false)
  const { hash } = useLocation()
  useEffect(() => {
    const previous = document.title
    document.title = '制作・取り組み | 手塚 航'
    return () => { document.title = previous }
  }, [])
  useEffect(() => {
    const target = services.find(service => '#' + service.id === hash)
    if (target) document.getElementById(target.id)?.scrollIntoView({ behavior: 'instant', block: 'start' })
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [hash])
  return <div className={paused ? 'projects-page motion-paused' : 'projects-page'}>
    <a className="skip-link" href="#projects-main">本文へ移動</a><SiteHeader />
    <main id="projects-main">
      <section className="hero projects-hero"><HeroArt /><div className="hero-content"><p className="eyebrow">PROJECTS / 制作・取り組み</p><h1>仕事の「こうなったらいい」を、<br />かたちに。</h1><p className="projects-lead">新しい仕組みづくりから、今あるアプリの改善、日々の業務の自動化まで。<br />使う人の困りごとに向き合い、仕事が進めやすくなる仕組みをつくっています。</p></div><button className="motion-toggle" type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? '動きを再開' : '動きを一時停止'}</button></section>
      <section className="section"><p className="eyebrow">EXPERIENCE</p><h2>私の経歴</h2><div className="experience-grid">{experiences.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>
      <section className="section services-section"><p className="eyebrow">HOW I CAN HELP</p><h2>ご相談いただけること</h2>
        <nav className="service-navigation" aria-label="相談内容から探す">{services.map(service => <a key={service.id} href={'#' + service.id}>{service.title} ↓</a>)}</nav>
        {services.map((service, index) => <section className="service-detail" id={service.id} key={service.id} aria-labelledby={service.id + '-title'}><div className="service-heading"><span className="service-number">0{index + 1}</span><h3 id={service.id + '-title'}>{service.title}</h3></div><div className="service-body"><p>{service.description}</p><ul>{service.examples.map(example => <li key={example}>{example}</li>)}</ul><a className="service-consult" href={'/contact?service=' + service.id}>{service.title}について相談する <span aria-hidden="true">↗</span></a></div></section>)}
      </section>
      <section className="section connections" id="about-contact" aria-label="発信とお問い合わせ"><a className="connection note-card" href="https://note.com/just_eagle7298" target="_blank" rel="noopener noreferrer"><span className="eyebrow">JOURNAL</span><h2>考えや活動を、noteで。</h2><p>日々の気づきや取り組みは、noteでも発信しています。</p><span className="connection-action">noteを読む ↗</span></a><div className="connection contact-card"><span className="eyebrow">CONTACT</span><h2>ご相談は、ここから。</h2><p>開発のご相談や、お仕事・採用に関するご連絡をお待ちしています。</p><a className="connection-action" href="/contact">お問い合わせ ↗</a><a className="email" href="/contact">agtmpwd992@gmail.com</a></div></section>
    </main><SiteFooter />
  </div>
}
