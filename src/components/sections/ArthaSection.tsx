import { useEffect, useRef, type CSSProperties } from 'react'
import { links } from '../../content/links'
import { startArthaTour } from '../../lib/tours'
import { IPhoneBezel } from '../devices/Bezels'

const BASE = import.meta.env.BASE_URL

// Artha on iPhone 18 Pro (Apple's bezel): a four-chapter tour beside the
// copy, the same engine as the Mac tour.
export function ArthaSection() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => (ref.current ? startArthaTour(ref.current) : undefined), [])

  return (
    <section className="sec" id="artha" ref={ref}>
        <div className="duo">
          <div>
            <div className="appname"><img src={`${BASE}press/artha-icon.webp`} alt="" loading="lazy" decoding="async" /><span><b>Artha</b><small>Know what&rsquo;s safe to spend.</small></span></div>
            <h2 className="h2">One number, kept honest.</h2>
            <p className="lead">Artha opens on what you can spend today and still end the month on plan, with the bills still to come already counted. No bank login, ever.</p>
            <div className="tour" id="artha-tour">
              <button type="button" className="tour-item on" data-ch="today"><span className="bar"><i></i></span><b>Safe to spend</b><span>One number for today, worked out from your budget and the bills still to come.</span></button>
              <button type="button" className="tour-item" data-ch="assist"><span className="bar"><i></i></span><b>Asks before it saves</b><span>Tell the assistant about a purchase; nothing is saved until you say so.</span></button>
              <button type="button" className="tour-item" data-ch="plan"><span className="bar"><i></i></span><b>A plan for the month</b><span>Bills, everyday spending and what&rsquo;s left, with limits from your own spending.</span></button>
              <button type="button" className="tour-item" data-ch="import"><span className="bar"><i></i></span><b>Statements you review</b><span>Every row checked by you before it&rsquo;s saved. The file is never kept.</span></button>
            </div>
            <div className="links"><a className="tlink" href={links.artha}>arthaapp.com &rarr;</a><a className="tlink" href={links.arthaBeta}>Join the beta &rarr;</a><button type="button" className="tlink" data-artha-pause>Pause</button></div>
          </div>
          <div>
            <div className="dev iphone aphone" style={{ '--ip-w': 'min(300px, 100vw - 56px)', margin: '0 auto' } as CSSProperties} id="artha-phone" data-ch="today" role="img" aria-label="A tour of Artha on iPhone with sample figures: $64 safe to spend today and on pace; the assistant proposes adding a $32 lunch and waits for confirmation, leaving $32; the month's plan with a $3,200 budget; and a card statement whose rows are reviewed before saving.">
              <div className="screen"><div className="ascreen"><div className="sbar"><span>9:41</span><span className="icons"><svg viewBox="0 0 18 12" aria-hidden="true"><rect x="0" y="8" width="3" height="4" rx="1" fill="currentColor"/><rect x="5" y="5.5" width="3" height="6.5" rx="1" fill="currentColor"/><rect x="10" y="3" width="3" height="9" rx="1" fill="currentColor"/><rect x="15" y="0" width="3" height="12" rx="1" fill="currentColor"/></svg><svg viewBox="0 0 16 12" aria-hidden="true"><path d="M8 11.6 10.4 9a3.4 3.4 0 0 0-4.8 0L8 11.6Zm-4.3-4.6 1.4 1.5a4.2 4.2 0 0 1 5.8 0l1.4-1.5a6.2 6.2 0 0 0-8.6 0ZM.8 4l1.4 1.5a8.3 8.3 0 0 1 11.6 0L15.2 4A10.3 10.3 0 0 0 .8 4Z" fill="currentColor"/></svg><svg viewBox="0 0 27 12" aria-hidden="true"><rect x=".5" y=".5" width="23" height="11" rx="3.5" fill="none" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="18" height="8" rx="2" fill="currentColor"/><path d="M25 4v4a2 2 0 0 0 0-4Z" fill="currentColor" opacity=".45"/></svg></span></div>
                <div className="aviews">
                  <div className="aview av-today">
                    <div className="acard">
                      <div className="alabel">Safe to spend today</div>
                      <div className="big" aria-hidden="true"><span>$</span><span className="digit"><span></span></span><span className="digit"><span></span></span></div>
                      <span className="apill"><i></i>On pace</span>
                      <p className="asent" data-sentence>You can spend $64 a day until the 31st and still finish October on plan.</p>
                    </div>
                    <div className="acard">
                      <div className="alabel">October so far</div>
                      <svg className="chart" viewBox="0 0 300 110" style={{ width: '100%', display: 'block', marginTop: '6px' }} aria-hidden="true">
                        <line x1="6" y1="100" x2="294" y2="12" stroke="var(--a-line)" strokeWidth="2.5" strokeDasharray="4 6"/>
                        <path className="line" pathLength="1" d="M6 100 L40 94 L74 88 L108 77 L142 71 L176 63 L200 58" fill="none" stroke="var(--a-accent)" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="200" cy="58" r="5.5" fill="var(--a-accent)"/>
                      </svg>
                    </div>
                    <div className="acard" style={{ padding: '4px 14px' }}>
                      <div className="arows">
                        <div className="newrow"><div><div className="arow"><span>Lunch<small>Eating out · just now</small></span><span className="afig">$32.00</span></div></div></div>
                        <div className="arow"><span>Groceries<small>Corner Market · yesterday</small></span><span className="afig">$58.20</span></div>
                        <div className="arow"><span>Phone<small>Bill paid Oct 24</small></span><span className="afig">$45.00</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="aview av-assist">
                    <div className="ahead">Assistant</div>
                    <div className="bub me" data-me></div>
                    <div className="bub it">I&rsquo;ll add <b>$32.00</b> to <b>Eating out</b> for today. That leaves <b>$32</b> safe to spend today.
                      <div className="aconfirm"><span className="add">Add it</span><span>Change</span></div>
                    </div>
                    <div className="bub ok">Added to Eating out. You can still spend $32 today.</div>
                  </div>
                  <div className="aview av-plan">
                    <div className="acard">
                      <div className="alabel">October plan</div>
                      <div className="afig" style={{ fontSize: '1.9rem', margin: '6px 0 4px' }}>$3,200</div>
                      <div className="split"><div><b className="afig">$1,840</b><small>Bills</small></div><div><b className="afig">$1,050</b><small>Everyday</small></div><div><b className="afig good">$310</b><small>Left</small></div></div>
                    </div>
                    <div className="acard">
                      <div className="mrow"><span>Groceries</span><span className="afig">$312 <small>of $450</small></span></div><div className="meter"><i style={{ '--w': '69%' } as CSSProperties}></i></div>
                      <div className="mrow"><span>Eating out</span><span className="afig over">$214 <small>of $180</small></span></div><div className="meter over"><i style={{ '--w': '100%' } as CSSProperties}></i></div>
                      <div className="mrow"><span>Transport</span><span className="afig">$96 <small>of $160</small></span></div><div className="meter"><i style={{ '--w': '60%' } as CSSProperties}></i></div>
                    </div>
                  </div>
                  <div className="aview av-import">
                    <div className="acard">
                      <div className="alabel">From a card statement</div><div style={{ fontWeight: '700', fontSize: '15px', margin: '4px 0 6px', color: 'var(--a-ink)' }}>Review 14 transactions</div>
                      <div className="irow"><span>Corner Market<small>Groceries · suggested</small></span><span className="afig">$58.20</span></div>
                      <div className="irow"><span>Transit card<small>Transport · suggested</small></span><span className="afig">$40.00</span></div>
                      <div className="irow"><span>Noodle bar<small>Eating out · suggested</small></span><span className="afig">$23.75</span></div>
                      <div className="irow"><span>Bookshop<small>Shopping · suggested</small></span><span className="afig">$18.50</span></div>
                      <div className="aconfirm"><span className="add">Save 14</span><span>Edit first</span></div>
                    </div>
                    <div className="saved">Saved 14 transactions. The statement file wasn&rsquo;t kept.</div>
                  </div>
                </div>
                <span className="homebar"></span>
              </div></div><IPhoneBezel />
            </div>
          </div>
        </div>
      </section>
  )
}
