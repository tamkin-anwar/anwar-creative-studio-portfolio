import { links } from '../../content/links'

// App by app, the way apple.com/privacy states a promise for each app: what
// each one reads, keeps and sends. Every line comes from the app's own
// privacy policy (arthaapp.com/privacy, corres.app/privacy).
const rows = [
  {
    label: 'Where your data lives',
    artha: 'On Artha’s server, in one database used only by Artha, so the website and the apps always agree.',
    corres: 'On your iPhone, iPad and Mac. Mail goes from your email provider straight to your device.',
  },
  {
    label: 'Signing in',
    artha: 'Artha never asks for a bank login. Spending comes from you, your statements, Apple Pay or your bank’s texts and emails.',
    corres: 'You sign in with Google or Microsoft directly, so Corres never sees those passwords.',
  },
  {
    label: 'What our servers see',
    artha: 'What you enter, kept to your account alone. You can export all of it at any time.',
    corres: 'Never your email. Your device’s token and account addresses for notifications, the web domain a logo comes from, and a sealed iCloud password only if you turn on Instant Notifications.',
  },
  {
    label: 'AI',
    artha: 'Off until you say yes. Then Anthropic’s Claude reads only what one job needs, and doesn’t train on it.',
    corres: 'Runs on your device with Apple Intelligence. Your mail is never sent to an AI company.',
  },
  {
    label: 'Never kept',
    artha: 'Statement files, bank texts and emails. They’re read once and never saved.',
    corres: 'Read receipts and tracking pixels. They’re blocked until you choose to show images.',
  },
  {
    label: 'Leaving',
    artha: 'Delete your account and it’s erased after 30 days, in case you change your mind.',
    corres: 'Remove an account and its mail leaves your devices. Turning off notifications deletes what our relay held.',
  },
]

export function Privacy() {
  return (
    <section className="sec" id="privacy" aria-labelledby="privacy-title">
      <p className="kicker">Privacy</p>
      <h2 className="h2" id="privacy-title">What each app sees, in plain words.</h2>
      <p className="lead">Neither app shows ads, runs trackers or sells your data. Here is what each one reads, keeps and sends.</p>
      <table className="ptable">
        <thead>
          <tr><th scope="col"><span className="sr-only">Topic</span></th><th scope="col">Artha</th><th scope="col">Corres</th></tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <th scope="row">{r.label}</th>
              <td data-app="Artha">{r.artha}</td>
              <td data-app="Corres">{r.corres}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="links">
        <a className="tlink" href={`${links.artha}/privacy`}>Artha privacy policy →</a>
        <a className="tlink" href={`${links.corres}/privacy/`}>Corres privacy policy →</a>
      </div>
    </section>
  )
}
