import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SiteFooter, SiteHeader } from './SiteChrome'
import './SystemaPage.css'

type Feature = {
  id: string
  title: string
  summary: string
  points: string[]
  /** public/screens/ に置いたファイル名。画像を追加したらここに書くと画面が表示されます。 */
  image?: string
  imageAlt?: string
}

const features: Feature[] = [
  {
    id: 'market-search',
    title: '統一相場検索',
    summary: '落札済み・出品中・保存済みのデータを、ひとつの検索条件でまとめて調べられます。',
    points: ['キーワードから、直近で落札された金額の中央値などを可視化', 'よく使われるワードも確認でき、検索の切り口を見つけやすい', '検索結果は利用者ごとに保存され、他の人のデータとは分けて管理'],
  },
  {
    id: 'target-analysis',
    title: 'ターゲット分析',
    summary: '出品中の商品を落札相場と比べ、お買い得な候補を見つけます。',
    points: ['落札価格の中央値との差や商品の状態から、購入判断の材料を表示', '2〜4件の商品を並べて比較', '気になる商品はウォッチリストに登録し、価格や入札数の変化を記録', '検討中・購入済み・見送りなどの状態で候補を整理'],
  },
  {
    id: 'price-analysis',
    title: '相場分析',
    summary: '保存したデータをもとに、価格の推移やばらつきを見渡せます。',
    points: ['落札価格の推移、中央値、四分位範囲をグラフで表示', 'データが少ないときは「判断できない」と表示し、無理に傾向を示さない'],
  },
  {
    id: 'prediction',
    title: '相場予想',
    summary: '直近の相場から、先の価格の目安を出します。',
    points: ['直近90日の中央値をもとに、30日後の価格を予想', '過去の予想がどれだけ当たっていたかも検証でき、予想の信頼度を確かめられる'],
  },
  {
    id: 'inventory',
    title: '出品・在庫管理',
    summary: '購入した商品を在庫として管理し、出品前に採算を確かめます。',
    points: ['購入候補から在庫を作成し、仕入れ費用と想定利益を計算', '費用が分からない項目は「不明」として扱い、利益を過大に見せない', '販売結果と確定した利益も記録'],
  },
  {
    id: 'alerts',
    title: 'アラート・通知',
    summary: '見逃したくない変化を、条件を決めて知らせます。',
    points: ['価格の下落、終了間近、入札の停滞などの条件を設定', 'アプリ内の通知センターで、結果をまとめて確認', '同じ内容の通知を繰り返さないよう制御'],
  },
]

const principles = [
  ['決めるのは人', '自動入札・自動出品は行いません。システマは判断材料を整える道具で、取引は必ず人が実行します。'],
  ['認証情報は預からない', 'Yahoo!オークションのパスワードやログイン情報は保存しません。システマのログインとも分けて設計しています。'],
  ['利用者ごとにデータを分離', '検索結果・ウォッチ・在庫は、利用者ごとに分けて管理します。'],
]

const quality = [
  ['自動テスト', '画面の裏側の処理を、自動テストで繰り返し確認しています。'],
  ['静的解析', '書き方の乱れや型の不整合を、コードを動かす前に検出します。'],
  ['画面の動作確認', 'ブラウザ操作を自動化し、実際の画面の流れも確かめています。'],
  ['ドキュメントと自動チェック', '機能ごとの設計書を整備し、GitHub上で自動チェックを行っています。'],
]

function Shot({ feature }: { feature: Feature }) {
  const [failed, setFailed] = useState(false)
  if (!feature.image || failed) return null
  return <figure className="systema-shot">
    <img src={'/screens/' + feature.image} alt={feature.imageAlt ?? feature.title + 'の画面'} loading="lazy" onError={() => setFailed(true)} />
    <figcaption>開発中の画面です。公開時には内容やデザインが変わる場合があります。</figcaption>
  </figure>
}

export default function SystemaPage() {
  useEffect(() => {
    const previous = document.title
    document.title = 'システマ 機能紹介 | 手塚 航'
    window.scrollTo({ top: 0, behavior: 'instant' })
    return () => { document.title = previous }
  }, [])
  return <div className="systema-page">
    <a className="skip-link" href="#systema-main">本文へ移動</a><SiteHeader />
    <main id="systema-main">
      <section className="section systema-hero">
        <Link className="systema-back" to="/about#current">← 私について</Link>
        <span className="development-label">開発中</span>
        <p className="eyebrow">CURRENT PROJECT / 機能紹介</p>
        <h1>市場分析ツール「システマ」</h1>
        <p className="systema-lead">ヤフオクの購入・出品を考えるときに、相場を調べ、比べ、見通しを立てるまでを一つにまとめた分析ツールです。「安く買う・高く売る」ための判断材料を整えることを目指しています。</p>
        <dl className="systema-facts">
          <div><dt>開発期間</dt><dd>約2年（個人開発）</dd></div>
          <div><dt>技術</dt><dd>Python / Django / PostgreSQL</dd></div>
          <div><dt>状況</dt><dd>開発中・一般公開前</dd></div>
        </dl>
        <figure className="systema-shot systema-overview">
          <img src="/systema-preview.png" alt="システマのトップ画面。相場検索、価格分析、ターゲット分析、相場予想のメニューが並ぶ。" width="1920" height="1992" loading="lazy" />
          <figcaption>トップ画面（開発中）</figcaption>
        </figure>
      </section>

      <section className="section systema-flow-section">
        <p className="eyebrow">FLOW</p><h2>調べて、比べて、判断する。</h2>
        <ol className="systema-flow">
          <li><span>01</span><h3>調べる</h3><p>相場検索・相場分析</p></li>
          <li><span>02</span><h3>比べる</h3><p>ターゲット分析</p></li>
          <li><span>03</span><h3>見通す</h3><p>相場予想</p></li>
          <li><span>04</span><h3>管理する</h3><p>在庫・アラート</p></li>
        </ol>
      </section>

      <section className="section">
        <p className="eyebrow">FEATURES</p><h2>主な機能</h2>
        <nav className="systema-toc" aria-label="機能一覧">{features.map(f => <a key={f.id} href={'#' + f.id}>{f.title}</a>)}</nav>
        {features.map((f, i) => <article className="systema-feature" id={f.id} key={f.id} aria-labelledby={f.id + '-title'}>
          <div className="systema-feature-text">
            <span className="step-number">0{i + 1}</span>
            <h3 id={f.id + '-title'}>{f.title}</h3>
            <p>{f.summary}</p>
            <ul>{f.points.map(p => <li key={p}>{p}</li>)}</ul>
          </div>
          <Shot feature={f} />
        </article>)}
      </section>

      <section className="section systema-principles">
        <p className="eyebrow">DESIGN PRINCIPLES</p><h2>設計で大切にしていること</h2>
        <div className="systema-cards">{principles.map(([t, b]) => <article key={t}><h3>{t}</h3><p>{b}</p></article>)}</div>
      </section>

      <section className="section">
        <p className="eyebrow">QUALITY</p><h2>つくった後も、確かめ続ける。</h2>
        <p className="systema-note">AIに開発を手伝わせる場面でも、仕様の判断と結果の確認は人が行います。確認の手間を減らし、変更の安全性を保つ仕組みを整えています。</p>
        <div className="systema-cards">{quality.map(([t, b]) => <article key={t}><h3>{t}</h3><p>{b}</p></article>)}</div>
      </section>

      <section className="section systema-cta">
        <h2>開発のご相談はこちら</h2>
        <p>相場分析・業務アプリの開発や、既存システムの改善など、お気軽にご相談ください。</p>
        <Link className="service-consult" to="/contact">お問い合わせ <span aria-hidden="true">↗</span></Link>
      </section>
    </main><SiteFooter />
  </div>
}
