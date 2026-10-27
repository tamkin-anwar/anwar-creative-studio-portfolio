import { useEffect, useRef, type CSSProperties } from 'react'
import { links } from '../../content/links'
import { startMacTour } from '../../lib/tours'
import { MacBezel } from '../devices/Bezels'

// The headline, then Corres for Mac in Apple's own MacBook Pro bezel: a live,
// four-chapter tour of sample mail laid out at the 14-inch "Larger Text"
// resolution (1352 x 878 pt) and scaled to fit, like a real display.
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => (ref.current ? startMacTour(ref.current) : undefined), [])

  return (
    <section className="hero" ref={ref}>
        <h1><span className="sr-only">Anwar Creative Studio. Looked for it. Didn&rsquo;t love it. Built it.</span><span className="ln" aria-hidden="true"><span>Looked for it.</span></span><span className="ln" aria-hidden="true"><span>Didn&rsquo;t love it.</span></span><span className="ln" aria-hidden="true"><span>Built it<span className="gp">.</span></span></span></h1>
        <div className="hero-row">
          <p className="lede">Anwar Creative Studio is an independent software company making apps for iPhone, iPad, Mac and Apple Watch. Corres for your email. Artha for your money.</p>
          <div>
            <div className="cta"><a className="btn" href={links.corresBeta}>Join the Corres beta</a><a className="tlink" href="#artha">See Artha →</a></div>
            <div className="fine">Free during the beta · TestFlight on iPhone, iPad, Mac and Apple Watch</div>
          </div>
        </div>

        <div className="stage">
                <div className="dev mbp"><div className="screen"><div className="macos"><div className="desk"></div><div className="menubar" aria-hidden="true"><span className="l"><svg viewBox="0 0 14 17" aria-hidden="true"><path fill="currentColor" d="M11.6 9c0-2 1.6-3 1.7-3-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7C3.4 4.4 2.1 5.2 1.4 6.5c-1.5 2.6-.4 6.4 1 8.5.7 1 1.5 2.1 2.6 2.1 1 0 1.4-.7 2.7-.7 1.2 0 1.6.7 2.6.7 1.1 0 1.8-1 2.5-2 .8-1.1 1.1-2.2 1.1-2.3 0 0-2.3-.9-2.3-3.8ZM9.6 3c.6-.7 1-1.6.9-2.6-.8 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.5.9.1 1.9-.5 2.5-1.2Z"/></svg><b>Corres</b><span>File</span><span>Edit</span><span>View</span><span>Mailbox</span><span>Message</span><span>Window</span><span>Help</span></span><span className="r"><svg viewBox="0 0 16 12" aria-hidden="true"><path d="M8 11.6 10.4 9a3.4 3.4 0 0 0-4.8 0L8 11.6Zm-4.3-4.6 1.4 1.5a4.2 4.2 0 0 1 5.8 0l1.4-1.5a6.2 6.2 0 0 0-8.6 0ZM.8 4l1.4 1.5a8.3 8.3 0 0 1 11.6 0L15.2 4A10.3 10.3 0 0 0 .8 4Z" fill="currentColor"/></svg><svg viewBox="0 0 27 12" aria-hidden="true"><rect x=".5" y=".5" width="23" height="11" rx="3.5" fill="none" stroke="currentColor" opacity=".45"/><rect x="2" y="2" width="18" height="8" rx="2" fill="currentColor"/><path d="M25 4v4a2 2 0 0 0 0-4Z" fill="currentColor" opacity=".45"/></svg><span>Sun Oct 25&nbsp;&nbsp;9:41 AM</span></span></div>
          <div className="win" id="corres-mac" data-ch="sort" role="img" aria-label="A tour of Corres for Mac with sample mail, in four chapters: it sorts eight emails into the three that need you, each with its reason; answers a question about a flight from your own mail and cites the email; summarizes an email, checks the summary, and drafts a reply in your words; and shows an order email with the key details at the top and its trackers blocked.">
            <div className="side" aria-hidden="true">
              <div className="lights"><i></i><i></i><i></i></div>
              <div className="sitem" data-s="needs"><span>Needs You</span><span className="n" data-need-count>0</span></div>
              <div className="sitem"><span>Waiting</span><span className="n">2</span></div>
              <div className="shead">Mail</div>
              <div className="sitem"><span>Primary</span></div>
              <div className="sitem on" data-s="all"><span>Everything</span><span className="n">8</span></div>
              <div className="sitem"><span>Promotions</span></div>
              <div className="sitem" data-s="updates"><span>Updates</span><span className="n">3</span></div>
              <div className="shead">Mailboxes</div>
              <div className="sitem"><span>Drafts</span></div>
              <div className="sitem"><span>Sent</span></div>
              <div className="sitem"><span>Archive</span></div>
            </div>
            <div className="list" aria-hidden="true">
              <div className="lhead"><div className="swap"><div className="a"><b>Everything</b><span>8 conversations</span></div><div className="b"><b>Needs You</b><span>3 conversations · 2 due soon</span></div><div className="c"><b>Updates</b><span>3 conversations</span></div></div></div>
              <div className="status"><i></i>Reading on this Mac</div>
              <div className="rows">
                <div className="fold closed reveal"><div><div className="waiting"><span>Waiting on <b>2 replies</b></span><span>Longest 5 days ›</span></div></div></div>
                <div className="fold closed reveal"><div><div className="ghead">Due soon</div></div></div>
                <div className="fold other"><div><div className="row"><span className="av">WE</span><span className="who">The Weekly Edit</span><span className="time">11:12</span><span className="subj">Ten things worth reading this weekend</span><span className="prev">Long reads, one recipe and a very good map</span></div></div></div>
                <div className="fold"><div><div className="row" data-sofia><span className="av">SL</span><span className="who">Sofia Laurent<span className="chip">Tomorrow</span></span><span className="time">10:31</span><span className="subj">A place at the table</span><span className="prev">Could you confirm Thursday&rsquo;s conversation?</span><span className="why" style={{ '--d': '.3s' } as CSSProperties}><span>↳ Sofia asked you to confirm Thursday</span></span></div></div></div>
                <div className="fold other"><div><div className="row"><span className="av">NG</span><span className="who">Northwind Goods</span><span className="time">10:03</span><span className="subj">Your order is on its way</span><span className="prev">Arriving Tuesday · Track your package</span></div></div></div>
                <div className="fold"><div><div className="row" data-maya><span className="av">MC</span><span className="who">Maya Chen<span className="chip">Today</span></span><span className="time">9:45</span><span className="subj">The next chapter</span><span className="prev">Your approval on the final direction is the last piece</span><span className="why" style={{ '--d': '.35s' } as CSSProperties}><span>↳ Maya asked you to approve the creative direction</span></span></div></div></div>
                <div className="fold other"><div><div className="row"><span className="av">LA</span><span className="who">Lumen Air</span><span className="time">9:19</span><span className="subj">Your trip to Lisbon is coming up</span><span className="prev">Everything you need before you fly</span></div></div></div>
                <div className="fold other"><div><div className="row"><span className="av">FH</span><span className="who">Fieldhouse</span><span className="time">8:40</span><span className="subj">20% off, this week only</span><span className="prev">Our autumn collection, now on sale</span></div></div></div>
                <div className="fold closed reveal"><div><div className="ghead">When you can</div></div></div>
                <div className="fold"><div><div className="row"><span className="av">OG</span><span className="who">Oliver Grant</span><span className="time">8:27</span><span className="subj">A moment before we move forward</span><span className="prev">Two options for the launch. One decision to make.</span><span className="why" style={{ '--d': '.4s' } as CSSProperties}><span>↳ Oliver is waiting for your choice between two options</span></span></div></div></div>
                <div className="fold other"><div><div className="row"><span className="av">SN</span><span className="who">Studio Notes</span><span className="time">7:02</span><span className="subj">The October roundup</span><span className="prev">What we shipped, read and listened to</span></div></div></div>
              </div>
              <div className="rows rows-updates">
                <div className="row"><span className="av">WE</span><span className="who">The Weekly Edit</span><span className="time">11:12</span><span className="subj">Ten things worth reading this weekend</span><span className="prev">Long reads, one recipe and a very good map</span></div>
                <div className="row sel"><span className="av">NG</span><span className="who">Northwind Goods</span><span className="time">10:03</span><span className="subj">Your order is on its way</span><span className="prev">$86.40 · Arriving Tuesday</span></div>
                <div className="row"><span className="av">LA</span><span className="who">Lumen Air</span><span className="time">9:19</span><span className="subj">Your trip to Lisbon is coming up</span><span className="prev">Check-in opens tomorrow</span></div>
              </div>
            </div>
            <div className="pane" aria-hidden="true">
              <div className="tbar"><span className="ti"></span><span className="ti"></span><span className="ti"></span><span style={{ flex: '1' }}></span><div className="search"><svg viewBox="0 0 20 20"><circle cx="9" cy="9" r="5" stroke="currentColor" strokeWidth="1.8" fill="none"/><path d="m13 13 3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg><span className="ph">Search, or ask a question</span><span className="q" data-ask></span><span className="caret"></span></div></div>
              <div className="views">
                <div className="view v-sofia">
                  <div className="msg">
                    <div className="mh">A place at the table</div>
                    <div className="from"><span className="av">SL</span><span>Sofia Laurent<small>to you · 10:31</small></span></div>
                    <div className="short"><em>Needs You</em>Sofia asked you to confirm Thursday&rsquo;s conversation by tomorrow.</div>
                    <div className="body"><p>Hi,</p><p>We&rsquo;re setting the table for Thursday&rsquo;s conversation and would love to have you there. Could you let me know by tomorrow that you can make it? Once you do, I&rsquo;ll send the details.</p><p>Thank you,<br />Sofia</p></div>
                  </div>
                </div>
                <div className="view v-ask">
                  <div className="seek"><i></i>Looking through your mail on this Mac</div>
                  <div className="answer">
                    <div className="a-label"><span className="ondevice"></span>Answered on this Mac</div>
                    <p className="a-text">Your flight to Lisbon is <b>Tuesday, October 27 at 9:40 AM</b>, from San Francisco. Lumen Air flight LA 238, seat 14A. Check-in opens tomorrow at 9:40 AM.</p>
                    <div className="a-src"><span>From 1 email</span><span className="cite"><span className="av sm">LA</span>Lumen Air · Your trip to Lisbon is coming up</span></div>
                  </div>
                </div>
                <div className="view v-maya">
                  <div className="msg">
                    <div className="mh">The next chapter</div>
                    <div className="from"><span className="av">MC</span><span>Maya Chen<small>to you · 9:45</small></span></div>
                    <div className="short"><em>In short</em>Maya needs your approval on the final direction before tomorrow&rsquo;s review.<span className="checked">✓ Checked against the email</span></div>
                    <div className="body"><p>Hello,</p><p>Your approval on the final direction is the last piece. We have taken time to consider the details and would appreciate your perspective. Everything you need for this conversation is here.</p><p>Warmly,<br />Maya</p></div>
                    <div className="replies"><span className="pick">Approve the direction</span><span>Ask for one more round</span></div>
                    <div className="draft"><div className="d-label">Reply · drafted on this Mac, in your words</div><div className="d-text" data-draft></div><div className="d-foot"><span>Your greeting, sign-off and length, learned from mail you&rsquo;ve sent</span><span className="send">Send</span></div></div>
                  </div>
                </div>
                <div className="view v-order">
                  <div className="msg">
                    <div className="mh">Your order is on its way</div>
                    <div className="from"><span className="av">NG</span><span>Northwind Goods<small>orders@northwind.example · 10:03</small></span></div>
                    <div className="guard"><span>Images off</span><span className="g-hit">2 trackers blocked</span><span>Unsubscribe</span></div>
                    <div className="keys"><div><small>Total</small><b>$86.40</b></div><div><small>Arrives</small><b>Tuesday, Oct 27</b></div><div><small>Order</small><b>NW-20481</b></div></div>
                    <div className="imgs"><span>Image not loaded</span><span>Image not loaded</span></div>
                    <div className="body"><p>Good news: your order has shipped and is on its way. You can track your package any time from your account.</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div></div><MacBezel /></div>
          <div className="mac-close" aria-hidden="true" inert></div>
          <div className="chapters"><div className="ch-row"><button type="button" className="ch-tab on" data-ch="sort" aria-pressed="true"><span className="bar"><i></i></span><b>Sorts what needs you</b><span>Only the emails that ask something of you, each with the reason it&rsquo;s there.</span></button><button type="button" className="ch-tab" data-ch="ask" aria-pressed="false"><span className="bar"><i></i></span><b>Answers from your mail</b><span>Ask a question in plain words; Corres finds the answer in your email and shows where it came from.</span></button><button type="button" className="ch-tab" data-ch="reply" aria-pressed="false"><span className="bar"><i></i></span><b>Replies in your words</b><span>A summary checked against the email, and a reply drafted in your own voice.</span></button><button type="button" className="ch-tab" data-ch="private" aria-pressed="false"><span className="bar"><i></i></span><b>Keeps your mail private</b><span>The details you need at the top, trackers blocked, all on your Mac.</span></button></div><button type="button" className="ch-pause"  aria-pressed="false">Pause</button></div>
        </div>
      </section>
  )
}
