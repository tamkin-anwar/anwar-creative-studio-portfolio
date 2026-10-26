import { useEffect, useRef, type CSSProperties } from 'react'
import { links } from '../../content/links'
import { startCorresPhone } from '../../lib/tours'
import { IPhoneBezel } from '../devices/Bezels'

const BASE = import.meta.env.BASE_URL

// Corres on iPhone 18 Pro (Apple's bezel): a new email that needs you arrives
// as a notification and joins Due soon, with its reason.
export function CorresSection() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => (ref.current ? startCorresPhone(ref.current) : undefined), [])

  return (
    <section className="sec" id="corres" ref={ref}>
        <div className="duo flip">
          <div>
            <div className="appname"><img src={`${BASE}press/corres-icon.webp`} alt="" loading="lazy" decoding="async" /><span><b>Corres</b><small>Email, considered.</small></span></div>
            <h2 className="h2">Opens on what needs you.</h2>
            <p className="lead">Most email asks nothing of you. Corres finds the few that do, says why, and lets the rest wait. It reads and sorts on your own device, using Apple Intelligence where your device has it, so your mail never goes to us or an AI company.</p>
            <ul className="ticks"><li>Gmail, Outlook, iCloud and IMAP in one inbox</li><li>Summaries checked against the email, replies in your words</li><li>iPhone, iPad, Mac and Apple Watch, in nine languages</li></ul>
            <div className="links"><a className="tlink" href={links.corres}>corres.app →</a><a className="tlink" href={links.corresBeta}>Join the beta →</a><button type="button" className="tlink" data-replay>Play again</button></div>
          </div>
          <div className="devices"><div className="dev iphone" style={{ '--ip-w': 'min(300px, 100vw - 56px)' } as CSSProperties} role="img" aria-label="Corres on iPhone, Needs You with sample mail. A notification for James Okafor's partnership proposal arrives, and his email joins Due soon with its reason.">
      <div className="screen cphone">
        <div className="sbar"><span>9:41</span><span className="icons"><svg viewBox="0 0 18 12" aria-hidden="true"><rect x="0" y="8" width="3" height="4" rx="1" fill="currentColor"/><rect x="5" y="5.5" width="3" height="6.5" rx="1" fill="currentColor"/><rect x="10" y="3" width="3" height="9" rx="1" fill="currentColor"/><rect x="15" y="0" width="3" height="12" rx="1" fill="currentColor"/></svg><svg viewBox="0 0 16 12" aria-hidden="true"><path d="M8 11.6 10.4 9a3.4 3.4 0 0 0-4.8 0L8 11.6Zm-4.3-4.6 1.4 1.5a4.2 4.2 0 0 1 5.8 0l1.4-1.5a6.2 6.2 0 0 0-8.6 0ZM.8 4l1.4 1.5a8.3 8.3 0 0 1 11.6 0L15.2 4A10.3 10.3 0 0 0 .8 4Z" fill="currentColor"/></svg><svg viewBox="0 0 27 12" aria-hidden="true"><rect x=".5" y=".5" width="23" height="11" rx="3.5" fill="none" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="18" height="8" rx="2" fill="currentColor"/><path d="M25 4v4a2 2 0 0 0 0-4Z" fill="currentColor" opacity=".45"/></svg></span></div>
        <div className="notif" aria-hidden="true"><img src={`${BASE}press/corres-icon.webp`} alt="" loading="lazy" decoding="async" /><div><b>James Okafor</b><span>Partnership proposal</span><small>Needs You · asked for the revised scope by Friday</small></div><time>now</time></div>
        <div className="cp-top"><span className="cp-btn"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 6h12M4 10h12M4 14h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/></svg></span><span className="cp-pill">Select</span><span style={{ flex: '1' }}></span><span className="cp-btn"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M9 4H5.5A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16h9a1.5 1.5 0 0 0 1.5-1.5V11" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round"/><path d="m8.5 11.5 7-7 1.4 1.4-7 7-2 .6Z" fill="currentColor"/></svg></span><span className="cp-av"></span></div>
        <div className="cp-title">Mail</div>
        <div className="cp-sub">4 conversations · 3 due soon</div>
        <div className="cp-tabs"><b>Needs You</b><span>Primary</span><span>Everything</span><span>Unread</span></div>
        <div className="cp-wait"><span style={{ display: 'inline-flex', gap: '6px', alignItems: 'center' }}><span style={{ width: '14px', display: 'inline-block' }}><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.6" fill="none"/><path d="M10 6v4l2.5 2" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round"/></svg></span>Waiting on <b>2 replies</b></span><span>Longest 5 days ›</span></div>
        <div className="cp-g">Due soon</div>
        <div className="cp-fold"><div><div className="cp-row"><span className="av">JO</span><div><div className="t"><b>James Okafor</b><span>now</span></div><div className="s">Partnership proposal</div><div className="w">↳ James asked for the revised scope by Friday</div></div></div></div></div>
        <div className="cp-row"><span className="av">SL</span><div><div className="t"><b>Sofia Laurent</b><span>10:31</span></div><div className="s">A place at the table</div><div className="w">↳ Sofia asked you to confirm Thursday</div></div></div>
        <div className="cp-row"><span className="av">MC</span><div><div className="t"><b>Maya Chen</b><span>9:45</span></div><div className="s">The next chapter</div><div className="w">↳ Maya asked you to approve the creative direction</div></div></div>
        <div className="cp-g">When you can</div>
        <div className="cp-row"><span className="av">OG</span><div><div className="t"><b>Oliver Grant</b><span>8:27</span></div><div className="s">A moment before we move forward</div><div className="w">↳ Oliver is waiting for your choice between two options</div></div></div>
        <div className="cp-search"><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="9" cy="9" r="5" stroke="currentColor" strokeWidth="1.8" fill="none"/><path d="m13 13 3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>Search, or ask a question</div>
        <span className="homebar"></span>
      </div>
      <IPhoneBezel />
    </div></div>
        </div>
      </section>
  )
}
