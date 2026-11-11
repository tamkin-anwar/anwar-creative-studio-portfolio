import { links } from '../../content/links'

// The questions people ask before trying either app, like the "Questions?
// Answers." list that closes Apple's Final Cut Pro page. Facts match each
// app's own site; prices are US prices.
const faq = [
  {
    app: 'Artha',
    items: [
      { q: 'Is Artha free?', a: 'Yes. Safe to spend, budgets, bills, accounts, receipts and statement files are free with no time limit. Artha Pro adds the assistant, receipts and scans read for you, scenarios and longer reports. Pro isn’t on sale yet: during the beta everyone has it, and anyone who joins before it goes on sale keeps it free.' },
      { q: 'Which devices does it work on?', a: 'Any current web browser, and the apps for iPhone, iPad, Mac and Apple Watch, all on one account.' },
      { q: 'Does it connect to my bank?', a: 'No, and it never will ask for a bank login. You add spending yourself, import a statement you check row by row, or let Apple Pay and your bank’s texts log purchases for you.' },
      { q: 'Where is my data?', a: 'In one database used only by Artha. It’s yours alone, you can export all of it at any time, and deleting your account erases it.' },
      { q: 'When does the beta end?', a: 'When the app is on the App Store. There’s no date yet. The website is ready to use now.' },
    ],
  },
  {
    app: 'Corres',
    items: [
      { q: 'Is Corres free?', a: 'Mail is free: every account, reading, writing, search and organizing. Corres Pro adds Needs You, Waiting, answers in Search, summaries and suggested replies. Everyone on the TestFlight beta gets Pro free.' },
      { q: 'Which devices does it work on?', a: 'iPhone, iPad, Mac and Apple Watch. One Corres Pro covers all of them, and the accounts you add follow you through iCloud Keychain.' },
      { q: 'Which email accounts work?', a: 'Gmail, Google Workspace, Outlook, Microsoft 365, iCloud Mail and almost any other email with IMAP, such as Yahoo or Fastmail, together in one inbox.' },
      { q: 'Where is my email?', a: 'On your devices. Corres downloads it from your email provider and sorts it on your iPhone, iPad or Mac. Our servers never receive it.' },
      { q: 'When does the beta end?', a: 'When Corres is on the App Store. There’s no date yet. The build planned as 1.0 is with testers now.' },
    ],
  },
]

export function Faq() {
  return (
    <section className="sec" id="questions" aria-labelledby="questions-title">
      <p className="kicker">Questions</p>
      <h2 className="h2" id="questions-title">Before you try them.</h2>
      <div className="faq">
        {faq.map((group) => (
          <div key={group.app}>
            <h3>{group.app}</h3>
            {group.items.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        ))}
      </div>
      <div className="links">
        <a className="tlink" href={`${links.artha}/support`}>More Artha answers →</a>
        <a className="tlink" href={`${links.corres}/support/`}>More Corres answers →</a>
      </div>
    </section>
  )
}
