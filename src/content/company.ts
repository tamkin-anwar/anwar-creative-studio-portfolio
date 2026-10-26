// Facts about the company itself. Anything here appears in footers, legal
// pages and structured data, so it has to be true on the day it ships.
export const company = {
  name: 'Anwar Creative Studio',
  // Until the LLC is filed, the studio is run by its founder. When the
  // California filing is done, legalName becomes 'Anwar Creative Studio
  // LLC' and `entity` goes.
  legalName: 'Tamkin Nurul Anwar',
  entity: 'Anwar Creative Studio LLC is being formed in California',
  descriptor: 'An independent software company',
  registered: 'California, United States',
  year: 2026,
}

export const principles = [
  {
    statement: 'Your data isn’t the product.',
    support:
      'No ads, no trackers, and nothing sold. We’d rather charge for what we make than make money from what you do in it.',
  },
  {
    statement: 'Private where it counts.',
    support:
      'Corres sorts, summarizes and drafts on your iPhone with Apple Intelligence, so your mail is never sent to us or to an AI company.',
  },
  {
    statement: 'Nothing fails silently.',
    support:
      'If something doesn’t go through, you’ll know. An email sent with no signal waits and goes by itself once you’re back online, and Corres checks every summary against the email before you see it.',
  },
  {
    statement: 'Native, and finished.',
    support:
      'Corres and Artha are written in SwiftUI for iPhone, iPad and Mac, follow your text size and work with VoiceOver. The everyday parts get the most care.',
  },
]
