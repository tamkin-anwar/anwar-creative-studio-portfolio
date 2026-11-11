import { PageShell } from '../components/PageShell'
import { company, principles } from '../content/company'
import { links } from '../content/links'
import { EndMark } from '../components/identity/Lockup'

export function AboutPage() {
  return (
    <PageShell eyebrow="About">
      <div className="prose-page flex flex-col gap-[var(--space-3)]">
        <h1 className="leading-[1.1]" style={{ fontSize: 'var(--text-display)' }}>
          An independent software company.
        </h1>
        <p>
          Anwar Creative Studio makes apps for iPhone, iPad, Mac and Apple Watch. We make a few apps and keep
          working on them for years. We don&rsquo;t take on client work; everything we build is our own.
        </p>

        <h2>What we make</h2>
        <p>
          <strong>Artha</strong> opens on what&rsquo;s safe to spend: what&rsquo;s left for the month once the
          bills still to come are counted, and what that comes to each day. It never asks for a bank login.
          It&rsquo;s free on the web, and the app for iPhone, iPad, Mac and Apple Watch is in beta on
          TestFlight, on its way to the App Store.{' '}
          <a href={links.artha} target="_blank" rel="noreferrer">arthaapp.com</a>
        </p>
        <p>
          <strong>Corres</strong> is an email app that opens on what needs you: the emails that ask
          something of you, with the reason each one is there. Gmail, Outlook, iCloud Mail and other IMAP
          accounts share one inbox, on iPhone, iPad, Mac and Apple Watch, in 29 languages. It&rsquo;s in beta
          on TestFlight, on its way to the App Store.{' '}
          <a href={links.corres} target="_blank" rel="noreferrer">corres.app</a>
        </p>
        <p>
          Smaller things we made along the way live in{' '}
          <a href={`${import.meta.env.BASE_URL}#workshop`}>the workshop</a>: Tether, Jotfield and Doorsong.
        </p>

        <h2>Why we started</h2>
        <p>
          The studio started with a habit: looking for an app, not loving any of the ones out there, and
          building the one we wanted. Artha began because budgeting apps showed every number except how much
          you can safely spend. Corres began because no email app answered the first question of the
          morning: which of these need me?
        </p>
        <p>
          We&rsquo;re independent and self-funded. There are no investors to answer to and no advertisers
          to please, so the apps answer only to the people who use them.
        </p>

        <h2>Who builds it</h2>
        <p>
          Anwar Creative Studio was founded by Tamkin Anwar, who designs and builds every product, from the
          first sketch to the code that ships. Write to the studio at{' '}
          <a href={`mailto:${links.email}`}>{links.email}</a> and Tamkin will read it.&nbsp;<EndMark />
        </p>

        <h2>What we hold to</h2>
        <ul>
          {principles.map((p) => (
            <li key={p.statement}>
              <strong>{p.statement}</strong> {p.support}
            </li>
          ))}
        </ul>

        <h2>Company details</h2>
        <dl className="detail-list">
          <dt>Company</dt>
          <dd>{company.legalName}, {company.entity}</dd>
          <dt>Founder</dt>
          <dd>{company.founder}</dd>
          <dt>Funding</dt>
          <dd>Independent and self-funded</dd>
          <dt>Contact</dt>
          <dd>
            <a className="hit" href={`mailto:${links.email}`}>{links.email}</a>
          </dd>
          <dt>Careers</dt>
          <dd>We&rsquo;re not hiring right now.</dd>
        </dl>
      </div>
    </PageShell>
  )
}
