import { PageShell } from '../components/PageShell'
import { company } from '../content/company'
import { links } from '../content/links'

const BASE = import.meta.env.BASE_URL

export function PressPage() {
  return (
    <PageShell eyebrow="Press kit" backHref={BASE}>
      <div className="prose-page flex flex-col gap-[var(--space-3)]">
        <h1 className="leading-[1.1]" style={{ fontSize: 'var(--text-display)' }}>
          Press kit.
        </h1>
        <p>
          Everything you need to write about Anwar Creative Studio, Corres or Artha. Use any of it freely
          in coverage. For anything else, including interviews or beta access for review, write to{' '}
          <a href={`mailto:${links.email}?subject=Press`}>{links.email}</a>.
        </p>
        <p>
          <a href={`${BASE}press/anwar-creative-studio-press-kit.zip`} className="hero-cta hero-cta-primary" style={{ color: 'var(--bg)' }}>
            Download the press kit (zip, 3 MB)
          </a>
        </p>

        <h2>The company</h2>
        <dl className="detail-list">
          <dt>Name</dt>
          <dd>{company.legalName}</dd>
          <dt>What it is</dt>
          <dd>An independent software company making premium apps for iPhone, iPad and Mac</dd>
          <dt>Founder</dt>
          <dd>Tamkin Anwar</dd>
          <dt>Based in</dt>
          <dd>{company.registered}</dd>
          <dt>Funding</dt>
          <dd>Independent and self-funded</dd>
        </dl>

        <h2>Corres</h2>
        <div className="press-product">
          <img src={`${BASE}press/corres-icon.png`} alt="The Corres app icon" width={96} height={96} />
          <p>
            <strong>Email, considered.</strong> Corres opens on the emails that ask something of you, with the
            reason each one is there. Gmail, Outlook, iCloud Mail and other IMAP accounts in one inbox, on
            iPhone, iPad, Mac and Apple Watch, in nine languages. Its intelligence runs on the device with
            Apple Intelligence. In beta on TestFlight; free, with Corres Pro at $20 a month or $200 a year.{' '}
            <a href={links.corres} target="_blank" rel="noreferrer">corres.app</a>
          </p>
        </div>
        <div className="press-shots">
          <img src={`${BASE}press/corres-iphone.jpg`} alt="Corres on iPhone, showing Needs You with sample mail" width={414} height={900} loading="lazy" />
          <img src={`${BASE}press/corres-mac.jpg`} alt="Corres on Mac, showing a suggested reply with sample mail" width={1400} height={875} loading="lazy" />
        </div>

        <h2>Artha</h2>
        <div className="press-product">
          <img src={`${BASE}press/artha-icon.png`} alt="The Artha app icon" width={96} height={96} />
          <p>
            <strong>Know what&rsquo;s safe to spend.</strong> Artha opens on one number: what you can spend
            today and still end the month on plan. On the web, with an app for iPhone, iPad and Mac in beta. No
            bank login, no ads, no tracking. Free.{' '}
            <a href={links.artha} target="_blank" rel="noreferrer">arthaapp.com</a>
          </p>
        </div>

        <h2>In the zip</h2>
        <ul>
          <li>A one-page fact sheet</li>
          <li>Corres and Artha app icons at 1024 &times; 1024</li>
          <li>Corres screenshots on iPhone, iPad and Mac, made with sample mail</li>
        </ul>
        <p>
          Recent news is in the <a href={`${BASE}journal/`}>journal</a>.
        </p>
      </div>
    </PageShell>
  )
}
