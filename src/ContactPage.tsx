import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SiteHeader, SiteFooter } from './SiteChrome'
import './ContactPage.css'

const templates: Record<string, { title: string; prompts: string[] }> = {
  'app-development': { title: '業務アプリの開発', prompts: ['つくりたいアプリ・実現したいこと', '使う方・利用する場面', '現在の作業と困っていること', '必要な機能・参考にしたいもの'] },
  maintenance: { title: 'システムの改善・保守', prompts: ['改善したいアプリ・仕組み', '困っていること・発生している不具合', '問題が起こる場面や頻度', '改善後に実現したいこと'] },
  quality: { title: '品質確認の自動化', prompts: ['確認したいアプリ・仕組み', '現在行っている確認作業', '確認の頻度・負担になっていること', '自動化したい確認・心配なこと'] },
  automation: { title: '日々の作業を効率化', prompts: ['効率化したい作業', '現在の作業の流れ・使っているもの', '作業の頻度・おおよその所要時間', '減らしたい負担・実現したいこと'] },
}
function ContactForm({ category }: { category: string }) {
  const template = Object.hasOwn(templates, category) ? templates[category] : undefined
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState(template ? template.title + 'についてのご相談' : '')
  const initial = template ? [...template.prompts, '希望時期・ご予算（未定でも構いません）', 'その他お伝えしたいこと'].map(prompt => '【' + prompt + '】\n\n').join('\n') : ''
  const [message, setMessage] = useState(initial)
  const [status, setStatus] = useState('')
  const [mailReady, setMailReady] = useState(false)
  const body = 'お名前: ' + name.trim() + '\nメールアドレス: ' + email.trim() + '\n\n' + message.trim()
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!name.trim() || !subject.trim() || !message.trim() || message.trim() === initial.trim()) {
      setStatus('お名前・件名・お問い合わせ内容をご記入ください。テンプレートにご相談を追記してください。')
      return
    }
    setMailReady(true)
    setStatus('メールアプリで内容を確認し、送信してください。サイトからはまだ送信されていません。')
    window.location.href = 'mailto:agtmpwd992@gmail.com?subject=' + encodeURIComponent(subject.trim()) + '&body=' + encodeURIComponent(body)
  }
  async function copyMessage() {
    try {
      await navigator.clipboard.writeText('宛先: agtmpwd992@gmail.com\n件名: ' + subject.trim() + '\n\n' + body)
      setStatus('コピーしました。ご利用のメールサービスに貼り付けて送信してください。')
    } catch { setStatus('コピーできませんでした。入力欄から内容をコピーし、agtmpwd992@gmail.comへ送信してください。') }
  }
  return <form className="contact-form" onSubmit={submit}>
    {template && <p className="template-notice">{template.title}の記入用テンプレートを用意しました。わかる範囲でご記入ください。見出しも自由に編集できます。</p>}
    <div className="contact-fields"><label htmlFor="contact-name">お名前 <span>必須</span><input id="contact-name" name="name" autoComplete="name" required maxLength={100} value={name} onChange={event => setName(event.target.value)} /></label>
    <label htmlFor="contact-email">メールアドレス <span>必須</span><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={event => setEmail(event.target.value)} /></label></div>
    <label htmlFor="contact-subject">件名 <span>必須</span><input id="contact-subject" name="subject" required maxLength={150} value={subject} onChange={event => setSubject(event.target.value)} /></label>
    <label htmlFor="contact-message">お問い合わせ内容 <span>必須</span><textarea id="contact-message" name="message" rows={16} required maxLength={5000} aria-describedby="message-help" value={message} onChange={event => setMessage(event.target.value)} /></label>
    <p id="message-help">まだ決まっていない項目は「未定」で大丈夫です。パスワードなどの機密情報は記入しないでください。</p>
    <p>メールアプリで内容を確認して送信してください。メールアプリが開かない場合や長文が反映されない場合は、内容をコピーしてご利用のメールサービスから送信できます。</p>
    <p role="status">{status}</p><button type="submit" className="button">メールを作成する →</button>{mailReady && <button type="button" onClick={copyMessage}>メールの内容をコピーする</button>}
  </form>
}
export default function ContactPage() {
  const [params] = useSearchParams()
  const category = params.get('service') || ''
  useEffect(() => {
    const previous = document.title
    document.title = 'お問い合わせ | 手塚 航'
    window.scrollTo({ top: 0, behavior: 'instant' })
    return () => { document.title = previous }
  }, [])
  return <><a className="skip-link" href="#contact-main">本文へ移動</a><SiteHeader /><main id="contact-main" className="section contact-page"><p className="eyebrow">CONTACT</p><h1>まずは、困っていることから。</h1><p className="contact-introduction">開発のご相談や、お仕事・採用に関するご連絡をお待ちしています。<br />具体的な形が決まっていなくても、お気軽にお聞かせください。</p><div className="contact-layout"><aside className="contact-guide"><p className="eyebrow">LET’S TALK</p><h2>まだ決まっていなくても<br />大丈夫です。</h2><p>「この作業が大変」「こんなことができたら」。まずは普段の言葉でお聞かせください。</p><ol><li>困っていることを書く</li><li>できたら嬉しいことを添える</li><li>メールアプリで確認して送信</li></ol><p className="contact-guide-note">時期や予算は未定でも構いません。入力内容からメールの下書きを作成します。</p></aside><ContactForm key={category} category={category} /></div></main><SiteFooter /></>
}
