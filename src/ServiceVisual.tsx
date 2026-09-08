const symbols = [
  <><rect x="4" y="5" width="24" height="22" rx="3" /><path d="M4 12h24M12 12v15M17 17h6m-6 5h6" /></>,
  <><circle cx="13" cy="13" r="8" /><path d="m19 19 9 9M9 13h8m-4-4v8" /></>,
  <><path d="m16 3 11 4v8c0 7-11 14-11 14S5 22 5 15V7Z" /><path d="m10 15 4 4 8-9" /></>,
  <><path d="M5 9h17l-4-4m4 4-4 4M27 23H10l4-4m-4 4 4 4" /><circle cx="5" cy="23" r="2" /><circle cx="27" cy="9" r="2" /></>,
]
export function ServiceIcon({ index }: { index: number }) {
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{symbols[index]}</svg>
}
const transformations = [
  ['あちこちに分かれた作業', '仕事の流れを、ひとつに', ['入力', '共有', '確認']],
  ['使いづらさ・不具合', '安心して使い続ける', ['調査', '修正', '確認']],
  ['毎回の手作業で確認', '自動チェック＋人の確認', ['自動確認', '結果整理', '人が判断']],
  ['繰り返しに時間がかかる', '考える仕事に時間を', ['定型作業', '自動実行', '結果確認']],
] as const
export function ServiceVisual({ index }: { index: number }) {
  const [before, after, steps] = transformations[index]
  return <figure className={'service-visual service-theme-' + index}>
    <figcaption>改善のイメージ</figcaption>
    <div className="visual-before">{before}</div><span className="visual-arrow" aria-hidden="true">↓</span>
    <div className="visual-result"><span className="service-emblem"><ServiceIcon index={index} /></span><strong>{after}</strong></div>
    <ol className="visual-steps">{steps.map(step => <li key={step}>{step}</li>)}</ol>
  </figure>
}
