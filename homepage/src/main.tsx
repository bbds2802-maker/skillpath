import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { TextureCard } from '@/components/ui/texture-card'
import splashStyles from './styles.css?inline'

function App({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    // Hold only the explicit local design preview. Production always enters the app.
    if (import.meta.env.DEV && new URLSearchParams(location.search).get('preview') === 'splash') return
    const timer = window.setTimeout(onReady, 1000)
    return () => window.clearTimeout(timer)
  }, [onReady])

  return <main className="splash-shell" aria-label="SkillPath 启动页">
    <div className="splash-content">
      <TextureCard className="identity-module">
        <div className="identity-face" aria-hidden="true">
          <span className="module-light"/>
          <div className="emblem-inset">
            <svg viewBox="0 0 96 96" fill="none">
              <path className="path-shadow" d="M25 73h15V55h18V37h17V20"/>
              <path className="path-track" d="M25 73h15V55h18V37h17V20"/>
              <path className="path-signal" d="M25 73h15V55h18V37h17V20"/>
              <path className="path-tip" d="M61 20h14v14"/>
            </svg>
          </div>
          <div className="module-grooves"><i/><i/><i/></div>
        </div>
      </TextureCard>
      <h1>SkillPath</h1>
      <p className="tagline">在被算法决定之前，<br/>先决定自己。</p>
      <div className="entry-status" role="status" aria-live="polite">
        <div className="entry-progress" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/></div>
        <span>正在进入</span>
      </div>
    </div>
    <span className="splash-signature" aria-hidden="true">LEARN AT YOUR OWN PACE</span>
  </main>
}

const host = document.querySelector<HTMLElement>('[data-skillpath-launch]')
if (host) {
  // Isolate launch-page styles so the existing Demo keeps its exact layout.
  const shadow = host.attachShadow({ mode: 'open' })
  const style = document.createElement('style')
  style.textContent = splashStyles.replaceAll(':root', ':host')
  const mount = document.createElement('div')
  mount.id = 'root'
  shadow.append(style, mount)
  const phone = document.querySelector<HTMLElement>('.phone')
  if (phone && !phone.hasAttribute('inert')) {
    phone.setAttribute('inert', '')
    phone.setAttribute('data-launch-inert', '')
  }
  const root = createRoot(mount)
  const enterDemo = () => {
    if (phone?.hasAttribute('data-launch-inert')) {
      phone.removeAttribute('inert')
      phone.removeAttribute('data-launch-inert')
    }
    root.unmount()
    host.remove()
  }
  root.render(<App onReady={enterDemo}/>)
} else if (import.meta.env.DEV && new URLSearchParams(location.search).get('preview') === 'splash') {
  const style = document.createElement('style')
  style.textContent = splashStyles
  document.head.append(style)
  createRoot(document.getElementById('root')!).render(<App onReady={() => {}}/>)
} else {
  location.replace(new URL(`./learn.html${location.search}${location.hash}`, location.href).href)
}
