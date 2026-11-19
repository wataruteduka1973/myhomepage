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
import './HomeStory.css'

const activities = [
  ['01', '業務アプリの開発', '日々の仕事を支える機能を設計し、使えるかたちに。'],
  ['02', 'システムの改善・保守', '不具合の原因を調べ、周りへの影響も確かめて改善。'],
  ['03', '品質確認の自動化', '動作確認を自動化し、継続して品質を確かめる仕組みづくり。'],
  ['04', '日々の作業の自動化', '繰り返す業務を自動化し、人が考える時間をつくる。'],
  ['05', 'AI活用', '社内資料の検索や質問応答など、業務へのAI活用を小さく試す。'],
]
const aiStory = [
  ['ai-story-before.jpg', 'BEFORE', '探しているうちに、一日が終わっていく。', '朝いちばんに届く、規程についての問い合わせ。改定されたことは覚えているのに、どこに書いてあったかが思い出せない。共有フォルダには「最新版」「最新版_修正」「確定」と似た名前のファイルが並び、棚の資料をめくっても見つからない。確認して折り返すと伝えるのは、今日もう三回目。資料はあるのに、見つからない。自分の仕事に手をつけられるのは、いつも夕方からだった。', '資料の山の前で頭を抱える社員と、答えを待つ同僚'],
  ['ai-story-with-ai.jpg', 'WITH AI', '答えと一緒に、「どこに書いてあるか」がわかる。', 'まずは問い合わせの多い規程だけを、AIに読み込ませて試すことにした。普段の言葉で聞くと、答えと一緒に、根拠になった資料と該当する箇所が示される。半信半疑で開いてみると、たしかにそこに書いてある。資料にないことを聞けば、無理に答えず「見つからない」と返してくる。AIが探し、人が確かめて判断する。役割を分けたことで、安心して任せられるようになった。', '資料から関係する箇所を集めたAIの回答画面を見る社員と同僚'],
  ['ai-story-after.jpg', 'AFTER', '探す仕事から、前に進める仕事へ。', '数か月後、同僚はまずAIに聞き、出典を確かめてから相談に来るようになった。届くのは「どこにあるか」ではなく、「どう判断するか」という相談だ。机に積まれていた資料の山は棚に戻り、空いた時間で、後回しにしていた業務マニュアルの見直しが進んでいる。打ち合わせの話題も、次に何を良くするかへ。探すことに使っていた時間を、考えることに。AIは、そのための道具になった。', '片付いたデスクで笑顔で作業する社員と、親指を立てる同僚'],
]
const flowSteps =[['ご相談', '固まっていなくて大丈夫。困りごとをお送りください。'], ['ヒアリング', '目的や今の作業の流れをお伺いします。'], ['ご提案', '進め方・範囲・期間の目安をご提案します。'], ['開発・改善', '途中で動くものを確認しながら進めます。'], ['お引き渡し', '動作を一緒に確認し、使い方をご案内します。']]

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
    const elements = root.current.querySelectorAll('.profile-grid, .activity, .story-step, .connection')
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
      <section className="section ai-story" id="ai-story" aria-labelledby="ai-story-title"><p className="eyebrow">AI STORY</p><h2 id="ai-story-title">「あの資料、どこだっけ」から<br className="mobile-break" />始まる一日が、変わるまで。</h2><p className="story-lead">どこの職場にもある、ちょっとした「困った」が変わっていく物語です。</p>
        <ol className="story-steps">{aiStory.map(([image, label, title, body, alt], index) => <li className="story-step" key={label}><figure className="story-image"><img src={'/' + image} alt={alt} width="1200" height="896" loading="lazy" decoding="async" /></figure><div className="story-copy"><p className="story-label"><span>0{index + 1}</span>{label}</p><h3>{title}</h3><p>{body}</p></div></li>)}</ol>
        <div className="story-footer"><p>あなたの職場の「あの資料、どこだっけ」も、まずは小さく試すところから。</p><Link className="sub-link" to="/projects#ai-rag">AI活用について詳しく見る <span aria-hidden="true">→</span></Link><small>※物語と画像はイメージです。</small></div>
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
