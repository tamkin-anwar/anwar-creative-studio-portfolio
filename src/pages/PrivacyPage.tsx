import { PageShell } from '../components/PageShell'
import { company } from '../content/company'
import { links } from '../content/links'

export function PrivacyPage() {
  return (
    <PageShell eyebrow="Privacy" backHref={import.meta.env.BASE_URL}>
      <div className="prose-page flex flex-col gap-[var(--space-3)]">
        <h1 className="leading-[1.1]" style={{ fontSize: 'var(--text-display)' }}>
          Privacy on this website.
        </h1>
        <p className="font-mono" style={{ fontSize: 'var(--text-label)' }}>Effective October 23, 2026</p>
        <p>
          This policy covers anwarcreativestudio.com, run by {company.legalName} (&ldquo;we&rdquo;). Our
          apps have their own policies, linked at the end, which apply when you use them.
        </p>

        <h2>What this site collects</h2>
        <p>
          Nothing about you. There are no cookies, no analytics, no advertising and no tracking scripts.
          Fonts and images are served from this site itself, so visiting doesn&rsquo;t send a request to
          any font or tracking service.
        </p>
        <p>
          The site is hosted on GitHub Pages. Like any web host, GitHub receives technical information
          such as your IP address when your browser asks for a page, and may keep it briefly for security.
          GitHub&rsquo;s handling of that is described in the{' '}
          <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noreferrer">
            GitHub Privacy Statement
          </a>
          .
        </p>

        <h2>If you email us</h2>
        <p>
          We receive your name, address and whatever you write, and use them only to reply. Email is kept
          in our Google Workspace account. We don&rsquo;t add you to a mailing list or share your message.
          Ask us to delete it at any time.
        </p>

        <h2>Selling or sharing</h2>
        <p>
          We don&rsquo;t sell or share personal information, as those terms are used in California privacy
          law, and we don&rsquo;t use it for advertising.
        </p>

        <h2>Our apps</h2>
        <ul>
          <li>
            Corres: <a href="https://corres.app/privacy/" target="_blank" rel="noreferrer">corres.app/privacy</a>
          </li>
          <li>
            Artha: <a href="https://arthaapp.com/privacy" target="_blank" rel="noreferrer">arthaapp.com/privacy</a>
          </li>
        </ul>

        <h2>Changes and contact</h2>
        <p>
          If this policy changes, the new version will appear here with a new date. Questions go to{' '}
          <a href={`mailto:${links.email}`}>{links.email}</a>.
        </p>
      </div>
    </PageShell>
  )
}
