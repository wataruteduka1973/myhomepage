import { ServiceIcon, ServiceVisual } from './ServiceVisual'
import { SocialCard } from './SiteChrome'
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HeroArt, SiteFooter, SiteHeader } from './SiteChrome'
import './ProjectsPage.css'
import './ProjectsExtras.css'

type Service = {
  id: string
  title: string
  description: string
  cases: string[]
  approach: string
  deliverables: string[]
}

const services: Service[] = [
  {
    id: 'app-development',
    title: '業務アプリ・ウェブアプリの開発',
    description: '「こんな仕組みがあったら便利」を、使えるアプリへ。ご要望を整理し、仕事の流れに合ったかたちを一緒に考えます。',
    cases: ['Excelや紙で管理している顧客・案件・在庫の一覧を、チームで同時に使える画面にしたい', '申込み・予約・問い合わせの受付と管理を、ひとつの仕組みにまとめたい', '集めたデータを集計し、グラフで見られる画面がほしい', 'アイデアを、まず動く試作品で確かめたい'],
    approach: '最初に「誰が・いつ・何のために使うか」を整理し、必要な機能を絞って小さく作り始めます。途中で動くものを確認いただきながら、育てていきます。',
    deliverables: ['動作するアプリ', '操作方法のご案内', '今後の改善のご提案'],
  },
  {
    id: 'maintenance',
    title: '既存システムの改善・保守',
    description: '今あるアプリの不便や不具合を見直し、使い続けやすい仕組みへ整えます。',
    cases: ['不具合が起きているが、原因が分からない', '前任者が作ったシステムで、資料が少なく手を入れにくい', '小さな機能追加や画面の変更をお願いしたい', '使いづらい箇所を直して、現場の負担を減らしたい'],
    approach: 'まず、ソース・仕様・動作環境・確認方法を拝見し、対応できる内容かを判断します。この調査は、改修とは分けてご相談します。直す前に周りへの影響を確かめ、既存の機能を壊さないことを大切にします。',
    deliverables: ['調査結果のご報告', '修正した内容と確認結果', '変更点の記録'],
  },
  {
    id: 'quality',
    title: '品質確認の自動化',
    description: '繰り返し必要な動作確認を自動化し、安心して改善を続けられる仕組みをつくります。',
    cases: ['更新のたびに、同じ画面を手で何度も確認している', '機能を変えたとき、別の部分が壊れていないか不安', '確認の抜け漏れを減らし、確認にかかる時間を短くしたい'],
    approach: '今の確認作業を整理し、自動化して効果が大きい部分から着手します。画面の操作確認まで含めて、繰り返し実行できるようにします。人が見るべき確認は、人に残します。',
    deliverables: ['自動で実行できる確認の仕組み', '確認項目の一覧', '実行方法のご案内'],
  },
  {
    id: 'automation',
    title: '日々の作業の自動化・データ整理',
    description: '日々の業務を見直し、自動化や操作の簡略化で、手間のかかる作業を減らします。',
    cases: ['複数のサイトや資料から情報を集め、表にまとめる作業を毎日している', '定型のデータ整形やレポート作成に時間がかかっている', 'どこを効率化できるか分からないので、まず一緒に見てほしい'],
    approach: '現在の作業の流れを一緒に書き出し、効果の大きい部分から自動化します。うまくいかない場合や人の判断が必要な場合は、その旨を最初にお伝えします。',
    deliverables: ['自動化した作業の仕組み', '使い方・実行方法のご案内', '自動化しない部分の整理'],
  },
  {
    id: 'ai-rag',
    title: 'AI活用（社内資料の検索・質問応答など）',
    description: 'マニュアルや社内の文書をAIに参照させ、質問に答える仕組みなど、業務へのAI活用をご相談いただけます。',
    cases: ['マニュアルや規程を探す手間を減らしたい', '社内の問い合わせ対応に、AIを使えるか試したい', 'AIを使った業務の改善を考えているが、何から始めるか決まっていない'],
    approach: 'まず小さな試作で、実際の資料でどのくらい答えられるかを確かめます。本番での運用は、その結果を見て別の段階として検討します。AIの回答には限界や誤りがあるため、確認の仕組みも合わせて設計します。',
    deliverables: ['試作したAI機能', '精度の確認結果と課題の整理', '本番運用に進む場合のご提案'],
  },
]

const flow = [
  ['ご相談', 'まだ固まっていなくて大丈夫です。困っていることを、普段の言葉でお送りください。'],
  ['ヒアリング', '目的、現在の作業の流れ、使う方、希望時期などをお伺いします。'],
  ['ご提案・お見積り', '進め方、対応する範囲、期間の目安をご提案します。金額は、内容を伺ったうえでご提示します。'],
  ['開発・改善', '小さな単位で進め、途中で動くものを確認いただきます。'],
  ['確認・お引き渡し', '動作を一緒に確認し、使い方をご案内してお引き渡しします。'],
  ['運用・改善', '使い始めてからの改善や保守も、必要に応じてご相談いただけます。'],
]

const prepare = [
  ['今の作業の流れ', 'メモや箇条書きで十分です。使っているツールも教えてください。'],
  ['困っていること', '「ここに時間がかかる」「ここで間違いが起きる」など、具体的な場面があると助かります。'],
  ['画面や資料', '今の画面のスクリーンショットや、使っている表・帳票があれば添付してください。'],
  ['希望時期・使う人数', '未定でも構いません。わかる範囲でお知らせください。'],
  ['既存システムの情報', '改善のご相談では、仕様書・動作環境・ソースの有無などがわかれば教えてください。'],
]

const faqs = [
  ['予算や時期が決まっていなくても相談できますか。', 'はい。まずは困りごとの整理からお手伝いします。内容を伺ったうえで、進め方と目安をご提案します。'],
  ['紙やExcelで管理している状態でも相談できますか。', 'はい。今の管理方法を拝見し、どこから仕組みにするとよいかを一緒に考えます。'],
  ['AIを使って開発するのは、品質面で不安がありませんか。', 'AIには作業を進めてもらいますが、目的の確認、動作の確認、影響の確認は私が行います。確認する仕組みも、自動化して整えています。'],
  ['見積もりは、どのように出しますか。', 'ご相談内容を伺い、対応する範囲と期間をそろえたうえでご提示します。調査が必要な案件は、調査と本体の作業を分けてご提案する場合があります。'],
  ['どんな案件でも受けてもらえますか。', '個人で対応するため、大人数のチームが前提の大規模な案件などは、お受けできない場合があります。その場合も、適した進め方をお伝えします。'],
]

const experiences = [
  ['社内向けアプリケーション開発', '毎日の仕事を支えるアプリづくりと、業務の自動化に取り組みました。使う人の流れに合わせて、手間を減らす仕組みを考えてきました。'],
  ['お客様の社内アプリケーション改善', 'お客様が使うアプリの更新や改善、不具合の調査・修正に携わりました。今ある仕事への影響にも目を向け、使い続けられることを大切にしてきました。'],
  ['自社開発', 'アプリの機能づくりに加え、品質を繰り返し確認できる仕組みを整備しました。つくった後も確かめ、改善を重ねる視点を培ってきました。'],
]

export default function ProjectsPage() {
  const { hash } = useLocation()
  useEffect(() => {
    const previous = document.title
    document.title = 'サービス・ご依頼の流れ | 手塚 航'
    return () => { document.title = previous }
  }, [])
  useEffect(() => {
    const id = hash.replace('#', '')
    const target = id && document.getElementById(id)
    if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' })
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [hash])
  return <div className="projects-page">
    <a className="skip-link" href="#projects-main">本文へ移動</a><SiteHeader />
    <main id="projects-main">
      <section className="hero projects-hero"><HeroArt /><div className="hero-content"><p className="eyebrow">SERVICE / ご依頼できること</p><h1>仕事の「こうなったらいい」を、<br />かたちに。</h1><p className="projects-lead">新しい仕組みづくりから、今あるアプリの改善、日々の業務の自動化、AIの活用まで。<br />使う人の困りごとに向き合い、仕事が進めやすくなる仕組みをつくっています。</p><div className="hero-actions"><a className="button" href="/contact">相談してみる <span aria-hidden="true">↗</span></a><a className="sub-link" href="#flow">ご依頼の流れ <span aria-hidden="true">↓</span></a></div></div></section>

      <section className="section services-section"><p className="eyebrow">HOW I CAN HELP</p><h2>ご相談いただけること</h2>
        <p className="services-intro">「うちの場合は頼めるのだろうか」と迷ったら、下の依頼例に近いものがないかご覧ください。当てはまらなくても、まずはお聞かせください。</p>
        <nav className="service-navigation" aria-label="相談内容から探す">{services.map(service => <a key={service.id} href={'#' + service.id}>{service.title} ↓</a>)}</nav>
        {services.map((service, index) => <section className={"service-detail service-theme-" + (index % 4)} id={service.id} key={service.id} aria-labelledby={service.id + '-title'}><div className="service-heading"><span className="service-emblem"><ServiceIcon index={index} /></span><span className="service-number">0{index + 1}</span><h3 id={service.id + '-title'}>{service.title}</h3></div><div className="service-body"><ServiceVisual index={index} /><p>{service.description}</p>
          <div className="service-block"><h4>こんなご依頼の例</h4><ul>{service.cases.map(item => <li key={item}>{item}</li>)}</ul></div>
          <div className="service-block"><h4>進め方</h4><p>{service.approach}</p></div>
          <div className="service-block"><h4>主なお渡しするもの <small>（内容はご相談のうえで決めます）</small></h4><ul className="deliverables">{service.deliverables.map(item => <li key={item}>{item}</li>)}</ul></div>
          <a className="service-consult" href={'/contact?service=' + service.id}>{service.title}について相談する <span aria-hidden="true">↗</span></a></div></section>)}
      </section>

      <section className="section flow-section" id="flow"><p className="eyebrow">FLOW</p><h2>ご依頼の流れ</h2>
        <p className="services-intro">ご相談から運用まで、6つのステップで進めます。途中で内容を見直しながら進められます。</p>
        <ol className="request-flow">{flow.map(([title, text], index) => <li key={title}><span className="flow-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
      </section>

      <section className="section prepare-section" id="prepare"><p className="eyebrow">BEFORE YOU ASK</p><h2>ご相談の前に、あると進めやすいもの</h2>
        <p className="services-intro">すべて揃っていなくても問題ありません。わかる範囲で、お書きください。</p>
        <ul className="prepare-list">{prepare.map(([title, text]) => <li key={title}><h3>{title}</h3><p>{text}</p></li>)}</ul>
        <p className="prepare-note">パスワードや個人情報などの機密情報は、ご相談の段階ではお送りにならないでください。</p>
      </section>

      <section className="section faq-section" id="faq"><p className="eyebrow">FAQ</p><h2>よくあるご質問</h2>
        <div className="faq-list">{faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
      </section>

      <section className="section"><p className="eyebrow">EXPERIENCE</p><h2>私の経歴</h2><p className="experience-intro">「毎回手間がかかる」「今の仕組みを使いやすくしたい」。そんな困りごとに、開発と改善の両面から向き合ってきました。ご相談の段階から仕事の流れを整理し、必要な仕組みを一緒に考えます。</p><div className="experience-grid">{experiences.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
        <p className="experience-more"><Link to="/works/systema">開発中の自社ツール「システマ」の機能を見る →</Link></p></section>

      <section className="section connections" id="about-contact" aria-label="発信とお問い合わせ"><SocialCard /><div className="connection contact-card"><span className="eyebrow">CONTACT</span><h2>ご相談は、ここから。</h2><p>開発のご相談や、お仕事・採用に関するご連絡をお待ちしています。</p><a className="connection-action" href="/contact">お問い合わせ ↗</a><a className="email" href="/contact">agtmpwd992@gmail.com</a></div></section>
    </main><SiteFooter />
  </div>
}
