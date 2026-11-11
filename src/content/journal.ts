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
    date: '2026-11-11',
    product: 'Artha',
    title: 'A month in review, a debt plan and your subscriptions',
    body:
      'At the start of each month Artha now offers a look back: what you spent and kept, how it compared with your budget and a usual month, and where most of it went, with a picture to share that carries no amounts. Plan can now map a way out of debt, highest rate first or smallest balance first, with a slider that shows how much sooner an extra payment gets you there. It also lists your subscriptions with what each costs a year and links to the official page for cancelling the common ones. Wealth now holds the shares, funds and crypto you own, at prices you enter. On the website now, and in the beta apps.',
  },
  {
    date: '2026-11-11',
    product: 'Corres',
    title: 'Starting on the Mac, and names that read right',
    body:
      'Corres for Mac now starts the way the iPhone does: choose your email service, see what Google will show before you sign in, and watch Corres read your newest mail, then see what needs you. Over the first week, one small card a day helps you set it up. Without Pro, Needs You shows how many emails need you and why the first few do. Tap a reason and its sentence is marked in Japanese, Chinese, Korean, Arabic, Hebrew, Bengali and Ukrainian mail too, and mail sent without a name now shows who it\u2019s from, Erie County Water Authority rather than \u201cEcwa\u201d.',
  },
  {
    date: '2026-11-11',
    product: 'Artha',
    title: 'Purchases from your bank\u2019s texts',
    body:
      'Artha can now log a purchase from the text your bank sends, with no bank login and no service in between. A Shortcuts automation hands each text to Artha, and your iPhone checks it first, so anything that isn\u2019t a bank alert never leaves the phone. One shared shortcut works for any bank, including the banks in Bangladesh and India that text every card purchase, and only the purchase is saved, never the message. Logging from bank alert emails is coming next. Stopping a bill in Plan now clears its upcoming copies, renaming one keeps it a single bill, and when Artha asks to use AI it now says Allow or Don\u2019t Allow and names Anthropic\u2019s Claude. In the beta now.',
  },
  {
    date: '2026-11-11',
    product: 'Corres',
    title: 'Needs You in every language',
    body:
      'The sharper Needs You now reads mail in all 29 languages Corres speaks, so a signature request, a failed payment or a bill due comes first whichever language it\u2019s written in, and codes and support replies stay out. Pinned mail on the Mac now sits in its own section that folds away, and a crash some testers saw on opening Corres is fixed.',
  },
  {
    date: '2026-11-10',
    product: 'Artha',
    title: 'Apple Pay logging in a few taps',
    body:
      'Making every Apple Pay purchase log itself used to mean building a Shortcuts automation by hand. On iOS 27, Artha now hands you a ready-made shortcut with everything already connected: add it, turn it on, and pay once. On earlier versions the guide opens Shortcuts in the right place and walks through each step, and it tells you as soon as the first purchase arrives. The new start and setup from a statement are in testing now.',
  },
  {
    date: '2026-11-10',
    product: 'Artha',
    title: 'Start from a bank statement',
    body:
      'Getting started with Artha now asks its three questions before the account, and the account only needs a name, an email and a password. Or drop in up to three bank statements and Artha fills in your pay and bills and brings the transactions in, still with no bank login. You add a first purchase and watch your number move, the first week brings one small thing a day, and a streak of days on pace can be shared as a picture with no amounts on it.',
  },
  {
    date: '2026-11-09',
    product: 'Corres',
    title: 'The first five minutes, and a sharper Needs You',
    body:
      'Starting Corres now shows instead of tells. Choose your email service, watch Corres read your newest mail on your iPhone, see what needs you with the reason for each, then clear a practice email with your own swipe. Notifications are asked for only after that. Needs You was checked against thousands of real emails and retuned, so receipts, codes and support desks stay out and bills, signature requests and deadlines come in. Pinned mail now sits in a section you can fold, so it never pushes new mail down.',
  },
  {
    date: '2026-11-09',
    product: 'Artha',
    title: 'Your real number in about a minute',
    body:
      'Starting Artha no longer means a blank screen. Three quick questions, what you get paid, the bills that repeat and how much you want to keep, and you see what\u2019s safe to spend for the rest of the month, with no bank login. Every question can be skipped, and a Getting started card on Today keeps the rest until it\u2019s done: a first purchase, a statement or Apple Pay, a reminder, an account.',
  },
  {
    date: '2026-11-09',
    product: 'Corres',
    title: 'Ready for 1.0, and made for iPhone Duo',
    body:
      'The build we plan to send to the App Store as 1.0 is with testers. On iPhone Duo, Corres keeps the email\u2019s buttons on the side bar when it\u2019s closed, and puts your mail and the open email either side of the fold when it\u2019s open. Emails have more room to read, tapping a reason in Needs You opens the email with its sentence marked, and trackers stay blocked even after you show images. Its privacy policy now says how long every record is kept and every way to delete it, and a new switch erases Corres\u2019s choices from your iCloud.',
  },
  {
    date: '2026-11-09',
    product: 'Artha',
    title: 'The basics, before anyone has to ask',
    body:
      'Artha now works without a connection, and a purchase you add offline, Apple Pay ones included, goes through once you\u2019re back. Money moving between your own accounts can be marked as a transfer, changing your email waits for a link sent to the new address, and you can sign out of every other device. An evening reminder to log and a Sunday summary are there if you want them. Credits on a card statement now count as money back, the assistant answers from whole months of totals, and the icons and labels read more clearly.',
  },
  {
    date: '2026-11-08',
    product: 'Artha',
    title: 'Made for iPhone Duo, and your own categories',
    body:
      'Unfolded, iPhone Duo shows Artha with a sidebar like an iPad, and any iPhone now turns sideways. Make categories of your own with an emoji, hide every amount with one tap, import several statements at once with an account made from each, and choose light or dark for Artha alone.',
  },
  {
    date: '2026-11-03',
    product: 'Corres',
    title: 'Right to left, and counting properly',
    body:
      'Corres now speaks Polish, Ukrainian, Czech, Romanian, Arabic and Hebrew, twenty-nine languages in all. Arabic and Hebrew read right to left, with swipes that follow your finger, and every language counts the way it should, from Polish few and many to the Arabic dual.',
  },
  {
    date: '2026-11-03',
    product: 'Corres',
    title: 'Twenty-three languages, and a cleaner inbox',
    body:
      'Corres now speaks Italian, Dutch, Swedish, Danish, Norwegian, Turkish, Vietnamese, Indonesian, Traditional Chinese, Canadian French, European Portuguese and British, Australian and Canadian English, and reads bills and deliveries written in them. You can also move everything from a sender to Trash or the archive in one go, with an undo, and sign your mail with your logo.',
  },
  {
    date: '2026-11-02',
    product: 'Corres',
    title: 'The Brief on your Home Screen and your wrist',
    body:
      'The Daily Brief is now a widget on the Home Screen and the Mac desktop, and sits at the top of Apple Watch and on the watch face. Its morning notification no longer skips a day. Dates are read the way the sender writes them, your own last message shows what you asked, and mail is sent over Apple\u2019s own secure connection.',
  },
  {
    date: '2026-11-02',
    product: 'Corres',
    title: 'Every picture, and a Brief that reads your month',
    body:
      'Emails now open the way their sender made them, with the pictures and text that Corres used to miss. The short line at the top of each email was rebuilt and checked against thousands of real emails, and the Daily Brief now reads a month of mail for today\u2019s plans, bills, deliveries and the replies you owe.',
  },
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
