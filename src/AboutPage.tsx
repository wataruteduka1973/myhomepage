import { SiteHeader, SiteFooter, HeroArt } from './SiteChrome'
import { useEffect, useRef } from 'react'
import './AboutPage.css'

const steps = [
  ['整理', 'AIが要望や課題を整理し、人が優先順位と完成条件を決めます。'],
  ['試作', '人が決めた方針に沿って、AIが小さな単位で試作します。'],
  ['確認', 'AIによる動作確認と、人による使いやすさ・影響の確認を重ねます。'],
  ['改善', 'AIが修正案を作成し、人が確認して次の試作へつなげます。'],
]

function StepIcon({ index }: { index: number }) {
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {index === 0 && <><rect x="7" y="5" width="20" height="24" rx="2" /><path d="M12 3h10v5H12zM12 14h10m-10 6h10m-10 5h6" /></>}
    {index === 1 && <><rect x="3" y="5" width="26" height="20" rx="2" /><path d="M1 29h30M12 11l-4 4 4 4m8-8 4 4-4 4" /></>}
    {index === 2 && <><path d="m16 2 11 5v8c0 7-11 14-11 14S5 22 5 15V7Z" /><path d="m10 15 4 4 8-9" /></>}
    {index === 3 && <><path d="M26 11a11 11 0 0 0-19-4L3 11m0-7v7h7M6 21a11 11 0 0 0 19 4l4-4m0 7v-7h-7" /></>}
  </svg>
}

export default function AboutPage() {
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const title = document.title
    document.title = '私について | 手塚 航'
    window.scrollTo({ top: 0, behavior: 'instant' })
    return () => { document.title = title }
  }, [])

  return <div className="about-page">
    <a className="skip-link" href="#about-main">本文へ移動</a>
    <SiteHeader />
    <main id="about-main">
      <section className="section hero about-intro"><HeroArt /><div className="about-intro-content">
        <p className="eyebrow">ABOUT ME</p><h1>日々の「困った」を、<br />使いやすい仕組みに。</h1>
        <div className="about-profile">
          <div className="about-prose"><p className="about-name">はじめまして、手塚航です。</p><p>繰り返しの作業に時間がかかる。使っている仕組みに不便がある。改善したいけれど、何から始めればよいかわからない。そんな仕事の困りごとを、アプリや仕組みの改善で解決することに取り組んでいます。</p><p>これまで、業務を支えるアプリづくり、不具合の調査・改善、日々の作業の自動化に携わってきました。大切にしているのは、今の使い方や周りへの影響まで理解し、安心して使い続けられるかたちに整えることです。</p></div>
        </div>
        </div>
      </section>
      <section className="about-process"><div className="section">
        <p className="eyebrow">HOW I WORK</p><h2>つくり、確かめ、よりよくする。</h2>
        <p className="about-description">AIに情報の整理、試作、動作確認、修正案の作成を任せ、人が目的と結果を確認する。この役割分担で、品質を確かめながら開発を効率化しています。</p>
        <div className="role-grid"><article className="ai-role"><span>AI / 作業を進める</span><h3>試す・整理する・確かめる</h3><p>試作や繰り返しの確認を任せ、改善を重ねやすくします。</p></article><article className="human-role"><span>HUMAN / 判断する</span><h3>目的・使いやすさ・品質を確認</h3><p>何を解決するかを決め、結果を見て次に進むか判断します。</p></article></div><ol className="process-steps">{steps.map(([title, body], index) => <li key={title}><span className="process-icon"><StepIcon index={index} /></span><span className="step-number">0{index + 1}</span><h3>{title}</h3><p>{body}</p></li>)}</ol>
        <p className="process-return">↻ 改善から次の試作へ。AIが作業を進め、人が判断するループで、品質と効率を両立します。</p>
        <p className="about-description">AIが提案した内容も、目的に合っているか、既存の機能に影響しないかを人が確認します。動作確認の自動化も組み合わせ、品質を継続して確かめられる開発を目指しています。</p>
      </div></section>
      <section className="section current-project" id="current"><p className="eyebrow">CURRENT PROJECT</p><span className="development-label">開発中</span><h2>市場分析ツール「システマ」</h2>
        <p className="about-description">商品の価格や売れ行きに関する情報を整理し、購入や出品を考える際の判断を支えるアプリケーションを開発しています。</p><p className="about-description">目指しているのは、情報を探して比較する負担を減らし、相場を理解しやすくすること。検索から分析までの流れを整えながら、使いやすさと品質の改善を進めています。</p>
        <div className="project-guide"><article><span>01</span><h3>情報を探す</h3><p>気になる商品の相場を検索。</p></article><article><span>02</span><h3>比べて理解する</h3><p>価格や売れ行きの情報を整理。</p></article><article><span>03</span><h3>判断に役立てる</h3><p>購入・出品を考える材料に。</p></article></div><figure className="project-figure"><button className="project-preview" type="button" onClick={() => dialog.current?.showModal()} aria-haspopup="dialog" aria-label="システマの画面全体を拡大して見る"><img src="/systema-preview.png" alt="システマの開発画面。相場検索、価格分析、ターゲット分析などのメニューが並ぶ。" width="1920" height="1992" loading="lazy" /><span>画面全体を見る ↗</span></button><figcaption>開発中の画面です。公開時には内容やデザインが変わる場合があります。</figcaption></figure>
      </section>
      <section className="section connections" id="about-contact" aria-label="発信とお問い合わせ"><a className="connection note-card" href="https://note.com/just_eagle7298" target="_blank" rel="noopener noreferrer"><span className="eyebrow">JOURNAL</span><h2>考えや活動を、noteで。</h2><p>日々の気づきや取り組みは、noteでも発信しています。</p><span className="connection-action">noteを読む ↗</span></a><div className="connection contact-card"><span className="eyebrow">CONTACT</span><h2>ご相談は、ここから。</h2><p>開発のご相談や、お仕事・採用に関するご連絡をお待ちしています。</p><a className="connection-action" href="/contact">お問い合わせ ↗</a><a className="email" href="/contact">agtmpwd992@gmail.com</a></div></section>
    </main>
    <SiteFooter />
    <dialog ref={dialog} className="project-dialog" aria-labelledby="preview-title"><div className="dialog-heading"><h2 id="preview-title">システマ — 開発中の画面</h2><button type="button" onClick={() => dialog.current?.close()} autoFocus>閉じる ×</button></div><img src="/systema-preview.png" alt="システマの開発中の画面全体" width="1920" height="1992" /></dialog>
  </div>
}
