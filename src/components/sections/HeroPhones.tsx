import type { CSSProperties } from 'react'
import { IPhoneBezel } from '../devices/Bezels'

// Both apps, side by side in the hero, each on the screen it opens on:
// Artha on what's safe to spend, Corres on what needs you. Still pictures in
// Apple's iPhone bezel (used as provided: never tilted or animated), laid
// out at 300 pt like the tours below and scaled as one piece with `zoom`.
const W = { '--ip-w': '300px' } as CSSProperties

function Sbar() {
  return (
    <div className="sbar" aria-hidden="true"><span>9:57</span><span className="icons"><svg viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="1" fill="currentColor"/><rect x="5" y="5.5" width="3" height="6.5" rx="1" fill="currentColor"/><rect x="10" y="3" width="3" height="9" rx="1" fill="currentColor"/><rect x="15" y="0" width="3" height="12" rx="1" fill="currentColor"/></svg><svg viewBox="0 0 16 12"><path d="M8 11.6 10.4 9a3.4 3.4 0 0 0-4.8 0L8 11.6Zm-4.3-4.6 1.4 1.5a4.2 4.2 0 0 1 5.8 0l1.4-1.5a6.2 6.2 0 0 0-8.6 0ZM.8 4l1.4 1.5a8.3 8.3 0 0 1 11.6 0L15.2 4A10.3 10.3 0 0 0 .8 4Z" fill="currentColor"/></svg><svg viewBox="0 0 27 12"><rect x=".5" y=".5" width="23" height="11" rx="3.5" fill="none" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="18" height="8" rx="2" fill="currentColor"/><path d="M25 4v4a2 2 0 0 0 0-4Z" fill="currentColor" opacity=".45"/></svg></span></div>
  )
}

export function HeroPhones() {
  return (
    <div className="hero-phones">
      <div className="dev iphone aphone" style={W} role="img" aria-label="Artha on iPhone, opening on what's safe to spend: $2,070 for the rest of the month, $103 a day for 20 days, on pace.">
        <div className="screen"><div className="ascreen"><Sbar />
          <div className="hero-aview">
            <div className="acard">
              <div className="alabel">Safe to spend</div>
              <div className="anum"><span>$</span><span>2,070</span></div>
              <span className="apill"><i></i>On pace</span>
              <p className="asent">$103 a day for 20 days</p>
            </div>
            <div className="acard">
              <div className="alabel">November so far</div>
              <svg className="chart" viewBox="0 0 300 110" style={{ width: '100%', display: 'block', marginTop: '6px' }} aria-hidden="true">
                <line x1="6" y1="100" x2="294" y2="12" stroke="var(--a-line)" strokeWidth="2.5" strokeDasharray="4 6"/>
                <path d="M6 100 L40 94 L74 88 L108 77 L142 71 L176 63 L200 58" fill="none" stroke="var(--a-accent)" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="200" cy="58" r="5.5" fill="var(--a-accent)" style={{ opacity: 1 }}/>
              </svg>
            </div>
            <div className="acard" style={{ padding: '4px 14px' }}>
              <div className="arows">
                <div className="arow"><span>Groceries<small>Corner Market · yesterday</small></span><span className="afig">$142.68</span></div>
                <div className="arow"><span>Phone<small>Bill paid Nov 4</small></span><span className="afig">$85.00</span></div>
                <div className="arow"><span>Dinner out<small>Eating out · Saturday</small></span><span className="afig">$64.20</span></div>
              </div>
            </div>
          </div>
          <span className="homebar"></span>
        </div></div><IPhoneBezel />
      </div>

      <div className="dev iphone" style={W} role="img" aria-label="Corres on iPhone, opening on Needs You: three emails due soon and one for when you can, each with the reason it's there.">
        <div className="screen cphone"><Sbar />
          <div className="cp-top" aria-hidden="true"><span className="cp-btn"><svg viewBox="0 0 20 20"><path d="M4 6h12M4 10h12M4 14h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/></svg></span><span className="cp-pill">Select</span><span style={{ flex: '1' }}></span><span className="cp-btn"><svg viewBox="0 0 20 20"><path d="M9 4H5.5A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16h9a1.5 1.5 0 0 0 1.5-1.5V11" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round"/><path d="m8.5 11.5 7-7 1.4 1.4-7 7-2 .6Z" fill="currentColor"/></svg></span><span className="cp-av"></span></div>
          <div className="cp-title">Mail</div>
          <div className="cp-sub">4 conversations · 3 due soon</div>
          <div className="cp-tabs"><b>Needs You</b><span>Primary</span><span>Everything</span><span>Unread</span></div>
          <div className="cp-wait"><span>Waiting on <b>2 replies</b></span><span>Longest 5 days ›</span></div>
          <div className="cp-g">Due soon</div>
          <div className="cp-row"><span className="av">JO</span><div><div className="t"><b>James Okafor</b><span>9:50</span></div><div className="s">Partnership proposal</div><div className="w">↳ James asked for the revised scope by Friday</div></div></div>
          <div className="cp-row"><span className="av">SL</span><div><div className="t"><b>Sofia Laurent</b><span>9:31</span></div><div className="s">A place at the table</div><div className="w">↳ Sofia asked you to confirm Thursday</div></div></div>
          <div className="cp-row"><span className="av">MC</span><div><div className="t"><b>Maya Chen</b><span>8:45</span></div><div className="s">The next chapter</div><div className="w">↳ Maya asked you to approve the creative direction</div></div></div>
          <div className="cp-g">When you can</div>
          <div className="cp-row"><span className="av">OG</span><div><div className="t"><b>Oliver Grant</b><span>8:27</span></div><div className="s">A moment before we move forward</div><div className="w">↳ Oliver is waiting for your choice between two options</div></div></div>
          <div className="cp-search" aria-hidden="true"><svg viewBox="0 0 20 20"><circle cx="9" cy="9" r="5" stroke="currentColor" strokeWidth="1.8" fill="none"/><path d="m13 13 3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>Search, or ask a question</div>
          <span className="homebar"></span>
        </div>
        <IPhoneBezel />
      </div>
    </div>
  )
}
