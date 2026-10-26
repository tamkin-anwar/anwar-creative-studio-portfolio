import { PageShell } from '../components/PageShell'
import { company } from '../content/company'
import { links } from '../content/links'

export function TermsPage() {
  return (
    <PageShell eyebrow="Terms" backHref={import.meta.env.BASE_URL}>
      <div className="prose-page flex flex-col gap-[var(--space-3)]">
        <h1 className="leading-[1.1]" style={{ fontSize: 'var(--text-display)' }}>
          Terms for this website.
        </h1>
        <p className="font-mono" style={{ fontSize: 'var(--text-label)' }}>Effective October 23, 2026</p>
        <p>
          These terms cover your use of anwarcreativestudio.com, run by {company.legalName}, as {company.name}. Each of our
          apps has its own terms, which apply when you use that app. For Corres, see{' '}
          <a href="https://corres.app/terms/" target="_blank" rel="noreferrer">corres.app/terms</a>.
        </p>

        <h2>Using the site</h2>
        <p>
          You&rsquo;re welcome to read, link to and share pages from this site. Please don&rsquo;t try to
          disrupt it, or copy it wholesale to present as your own.
        </p>

        <h2>Names and marks</h2>
        <p>
          Anwar Creative Studio, Corres, Artha and their logos and icons belong to {company.legalName}. The
          text, images and design of this site are ours unless credited otherwise. Apple, iPhone, iPad,
          Mac and Apple Watch are trademarks of Apple Inc. Other names belong to their owners.
        </p>

        <h2>Accuracy and links</h2>
        <p>
          We work to keep this site accurate, but it&rsquo;s provided as it is, and details about products
          in development can change before release. Links to other sites are for convenience; we
          aren&rsquo;t responsible for their content.
        </p>

        <h2>Liability</h2>
        <p>
          To the extent the law allows, {company.legalName} isn&rsquo;t liable for indirect or consequential
          loss arising from your use of this website.
        </p>

        <h2>Governing law and contact</h2>
        <p>
          These terms are governed by the laws of the State of California, United States. Questions go to{' '}
          <a href={`mailto:${links.email}`}>{links.email}</a>.
        </p>
      </div>
    </PageShell>
  )
}
