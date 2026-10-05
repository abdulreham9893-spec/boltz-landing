import LegalPage from '../components/LegalPage.jsx'

const sections = [
  {
    heading: 'Agreement to These Terms',
    paragraphs: [
      'These Terms of Service govern your use of this website and any design, development or consultancy services you commission from BOLTZ. By using this website or instructing us to do work, you accept these terms. If you do not accept them, please do not use the site or commission work.',
    ],
  },
  {
    heading: 'About Our Services',
    paragraphs: [
      'BOLTZ is a design and development studio. The services we offer include brand identity design, website design, UI/UX design, motion design, and front-end and development work.',
      'Specific engagements are always set out in a written proposal, quote, or agreement. Where that document conflicts with these terms, the document prevails for that engagement. Nothing in these terms replaces a signed agreement.',
    ],
  },
  {
    heading: 'Quotes, Estimates and Pricing',
    paragraphs: [
      'Quotes and estimates are based on the scope you describe and the information available at the time. A price becomes binding only when it is confirmed in writing by both sides.',
      'Unless a proposal states a fixed price, we work on an estimate basis, and we tell you early if the estimate needs to change. Prices quoted exclude third-party costs unless we state otherwise. These include domain and hosting fees, paid fonts, stock footage or imagery, printing, shipping, software licences, and any platform or marketplace fees charged to us on your behalf.',
    ],
  },
  {
    heading: 'Deposits, Milestones and Payment',
    paragraphs: [
      'Most projects begin with a deposit, typically 50% of the agreed total, and the balance is split into agreed milestones or paid on delivery. The exact schedule is set out in your proposal.',
      'Invoices are payable within the period stated on them. We pause work on any project with an invoice more than 14 days overdue until it is settled. Final files, source files, and full handover of a project are released once the project has been paid in full.',
    ],
  },
  {
    heading: 'Refunds and Cancellation',
    paragraphs: [
      'If you cancel before any design or development work has started, we refund your deposit in full.',
      'Once work has started, any refund is calculated proportionally to the milestones already completed and approved, minus any costs we have already committed to, including work already performed. Items we have already purchased for you, such as licences, printing or shipping, are non-refundable once bought.',
      'If we cannot deliver for reasons within our control, we refund the remaining balance for work not started.',
    ],
  },
  {
    heading: 'Your Responsibilities',
    paragraphs: [
      'Timelines depend on what we need from you. We expect you to:',
    ],
    list: [
      'Provide content, copy, images, and brand materials, or tell us clearly that they still need to be written or sourced.',
      'Confirm that you have the right to use every file, image, font and brand asset you send us.',
      'Give feedback in one consolidated round per stage, and approve work within the agreed timeframe.',
      'Nominate one person who can approve decisions so feedback does not conflict.',
    ],
    note:
      'If these things are late, work is rescheduled accordingly and we are not liable for the resulting delay. We are not responsible for the consequences of using material you supplied without having the rights to it.',
  },
  {
    heading: 'Reviews, Revisions and Scope Changes',
    paragraphs: [
      'Each stage in your proposal includes a set number of revision rounds, so you can see progress without the cost spiralling. Feedback that falls within the agreed scope is included. Once that number is used up, further revisions are billed at our hourly rate, quoted before we start.',
      'New pages, features, or a change of direction after a direction is approved is treated as a change request. We price it separately and begin only once you approve it, because we do not want you paying for work that is no longer what you want.',
    ],
  },
  {
    heading: 'Timelines and Delivery',
    paragraphs: [
      'Estimates assume timely feedback, content, and approvals. They are not guarantees, and delays on your side, or caused by third parties such as hosting providers, platform review queues, or supply of third-party services, will move the delivery date. We will tell you as soon as we know a date is at risk and agree a new plan with you.',
      'Work is considered delivered when we hand over the agreed files and assets, or when the project goes live, as described in your proposal.',
    ],
  },
  {
    heading: 'Intellectual Property',
    paragraphs: [
      'On full payment, ownership of the final approved deliverables produced for you as part of the engagement transfers to you. This includes the design files, source code, and exported assets listed in your proposal.',
      'We keep ownership of our own tools, techniques, code libraries, editable source files, fonts, and third-party licensed assets, unless transferring those rights is agreed in writing. Payment of a licence fee grants you the right to use those materials for your project, not the right to resell or redistribute them.',
      'We are also free to show finished work in our portfolio, on our website, and in marketing or awards submissions, unless you ask us in writing to keep a specific project confidential. We never publish your confidential information, unreleased product details, or work you have not approved for release.',
      'Materials you provide remain yours. We claim no rights over them beyond the licence needed to use them for your project.',
    ],
  },
  {
    heading: 'Confidentiality',
    paragraphs: [
      'Each of us keeps the other’s non-public information confidential and uses it only for the work in hand. This does not apply to information that is already public, already known to us, independently developed by us, or that we are required to disclose by law, in which case we will tell you first unless that is not allowed.',
    ],
  },
  {
    heading: 'Warranties and Disclaimers',
    paragraphs: [
      'We perform our services with reasonable skill and care, and we will tell you honestly if something is not going to work. Beyond that:',
    ],
    list: [
      'We do not guarantee that a website, design, or deliverable will be entirely free of errors, or that it will remain available without interruption. Anything we build depends on infrastructure we do not control.',
      'We do not guarantee the availability, security, or behaviour of third-party services such as hosting, content management systems, social platforms, app stores, payment providers, or advertising networks.',
      'You are responsible for backups of content stored on third-party platforms. If a platform loses or limits content, that is outside our control.',
      'You are responsible for keeping any website, account, or content you control lawful, and for having the rights to everything you publish through it.',
    ],
  },
  {
    heading: 'Limitation of Liability',
    paragraphs: [
      'To the extent permitted by law, our total liability to you for any claim arising out of a project is limited to the fees you paid us for that project in the 12 months before the claim. We are not liable for indirect or consequential loss, including lost profit, lost revenue, lost data, wasted expenditure, or business interruption, even if we were told such a loss was possible.',
      'Nothing in these terms limits liability for death or personal injury caused by negligence, for fraud, or for anything else that cannot lawfully be limited.',
    ],
  },
  {
    heading: 'Indemnities',
    paragraphs: [
      'You agree to cover us against claims, losses, and reasonable costs arising from content you provide that infringes someone else’s rights, from your misuse of the deliverables, or from your breach of these terms. We will tell you about any such claim and give you a reasonable chance to handle it. Where we handle it, we will not settle anything that admits fault on your part without asking you first.',
    ],
  },
  {
    heading: 'Ending an Engagement',
    paragraphs: [
      'Either of us may end an engagement if the other materially breaches these terms and does not fix it within 14 days of written notice. Either of us may end immediately if the other becomes insolvent or enters any equivalent process.',
      'If an engagement ends for any reason, you pay for work completed up to that point, we hand over what has been paid for, and we keep the rights described under Intellectual Property for anything already delivered. We may also suspend or close accounts that are being abused, or that we are legally required to act on.',
    ],
  },
  {
    heading: 'Third-Party Links',
    paragraphs: [
      'This site links to our social media pages and may link to sites we do not control. We are not responsible for their content, products, or privacy practices. Following an external link is at your own risk.',
    ],
  },
  {
    heading: 'Governing Law and Disputes',
    paragraphs: [
      'These terms are governed by the laws of the jurisdiction in which BOLTZ is registered, without regard to conflict-of-law rules. Where you deal with us as a consumer, any mandatory consumer protections of your country still apply to you.',
      'If something goes wrong, contact us first. We would always rather resolve a problem directly than through a process, and most issues are resolved in a conversation within days.',
    ],
  },
  {
    heading: 'Changes to These Terms',
    paragraphs: [
      'We may update these terms from time to time. The date at the top of this page shows when the current version took effect. Work already under way stays governed by the terms that applied when the engagement began.',
    ],
  },
]

function Terms() {
  return (
    <LegalPage
      label="(Terms)"
      title="Term of Service"
      updated="October 2, 2026"
      intro="These terms explain the ground rules for working with BOLTZ: what we commit to, what we need from you, who owns what, and how we handle problems. They are written in plain language so there are no surprises later."
      sections={sections}
    />
  )
}

export default Terms