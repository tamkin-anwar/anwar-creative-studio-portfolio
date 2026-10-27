// The studio's journal: dated, newest first, and only things that happened.
export type JournalEntry = {
  date: string // ISO, for <time>
  title: string
  body: string
  product?: 'Corres' | 'Artha' | 'Studio'
  link?: { label: string; href: string }
}

export const journal: JournalEntry[] = [
  {
    date: '2026-10-26',
    product: 'Artha',
    title: 'Money the way you write it',
    body:
      'Amounts get their commas as you type, rupees and taka are written in lakhs, and a phone set to Bengali or Hindi can type its own digits. Adding a house you already owned no longer shows as net worth jumping overnight.',
  },
  {
    date: '2026-10-25',
    product: 'Artha',
    title: 'Artha on Apple Watch',
    body:
      'Safe to spend in a pace ring on your wrist, a number pad for a cash purchase, and complications for the watch face. Search now reads months in eight languages, and a refund counts against what it refunds.',
    link: { label: 'Join the beta', href: 'https://testflight.apple.com/join/hj61wEUG' },
  },
  {
    date: '2026-10-25',
    product: 'Corres',
    title: 'Deadlines in every language',
    body:
      'Corres now reads deadlines, receipts, deliveries, sign-in codes and questions in all nine of its languages, follows your region\u2019s weekend for Snooze and Send Later, and shows mail in older Japanese, Chinese and Korean encodings in full. An optional Brief at the top of Needs You lists what\u2019s due today, and Corres for Mac gained Undo Send.',
  },
  {
    date: '2026-10-23',
    product: 'Studio',
    title: 'A proper home for the studio',
    body:
      'anwarcreativestudio.com is now the company site of Anwar Creative Studio: who we are, what we make, how to reach us, and the legal pages to go with it. Artha gained a public front page and its own terms on the same day.',
  },
  {
    date: '2026-10-23',
    product: 'Corres',
    title: 'Thirty-six builds in',
    body:
      'The newest Corres betas keep what you do offline: mail written without signal is kept and sent the moment you are back online, and your moves, snoozes and rules merge between your devices. Search is about ten times faster on a big mailbox.',
  },
  {
    date: '2026-10-22',
    product: 'Corres',
    title: 'Corres on Apple Watch',
    body:
      'Read what needs you on your wrist and reply by voice. Send Later and today’s deliveries also reach the Lock Screen, and Siri can write and send an email in Corres.',
  },
  {
    date: '2026-10-21',
    product: 'Artha',
    title: 'Artha for iPhone, iPad and Mac, in beta',
    body:
      'The native Artha app went to TestFlight, with a Mac version a day later. It opens on what’s safe to spend, and shares one design language with the website.',
    link: { label: 'Join the beta', href: 'https://testflight.apple.com/join/hj61wEUG' },
  },
  {
    date: '2026-10-21',
    product: 'Corres',
    title: 'Nine languages',
    body:
      'Corres now speaks Japanese, Chinese, German, Korean, French, Spanish, Portuguese and Bengali as well as English.',
  },
  {
    date: '2026-10-19',
    product: 'Corres',
    title: 'corres.app, and Corres for Mac',
    body:
      'Corres got its own website, and a native Mac app joined the iPhone and iPad versions on TestFlight.',
    link: { label: 'Visit corres.app', href: 'https://corres.app' },
  },
  {
    date: '2026-10-17',
    product: 'Corres',
    title: 'iCloud Mail and any IMAP account',
    body: 'A new mail engine of our own brings iCloud Mail and other IMAP accounts into the same inbox as Gmail and Outlook.',
  },
  {
    date: '2026-10-12',
    product: 'Corres',
    title: 'Outlook joins Gmail',
    body: 'One mail app across Gmail and Outlook, with every account in a single inbox or one at a time.',
  },
  {
    date: '2026-10-08',
    product: 'Corres',
    title: 'Corres reaches its first testers',
    body: 'The first Corres beta went out on TestFlight, less than three weeks after the first line of code.',
  },
  {
    date: '2026-09-20',
    product: 'Corres',
    title: 'Work on Corres begins',
    body: 'An email app that answers the first question of the morning: which of these need me?',
  },
  {
    date: '2026-01-04',
    product: 'Artha',
    title: 'Artha begins',
    body: 'The first version of Artha, a personal finance dashboard, built because no budgeting app would say how much was safe to spend.',
  },
]
