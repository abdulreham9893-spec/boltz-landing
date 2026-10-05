import LegalPage from '../components/LegalPage.jsx'

const sections = [
  {
    heading: 'Who We Are',
    paragraphs: [
      'BOLTZ is an independent design and development studio. We design brands, websites, products and motion work for clients around the world.',
      'This Privacy Policy explains what happens to the personal information you share with us, whether you send it through a contact form on this website, email us directly, or work with us on a project. We keep our process simple: we collect the minimum we need, we use it only to serve you, and we never sell your information.',
    ],
    list: null,
  },
  {
    heading: 'Information We Collect',
    paragraphs: [
      'We only collect information that you choose to give us, plus the limited technical data our hosting provider records automatically.',
    ],
    list: [
      'Information you provide: your name, email address, company or brand name, the budget range and project type you select, and any message you write in a contact form or email.',
      'Project information: files, content, brand assets, and access credentials you share with us while we are working on your project.',
      'Technical information: standard server logs such as browser type, device type, approximate region, the pages you requested, and the time of the visit. We do not collect precise location data.',
    ],
  },
  {
    heading: 'How We Use Your Information',
    paragraphs: [
      'We use your information for the following purposes:',
    ],
    list: [
      'Responding to your enquiry and preparing a quote or proposal.',
      'Delivering, supporting and invoicing the work you commission from us.',
      'Managing our ongoing business relationship with you and our contractors.',
      'Sending you updates about your project, or about our services where you have asked us to.',
      'Improving this website and understanding which pages and services are most useful.',
      'Meeting legal, tax and accounting obligations that apply to us.',
    ],
  },
  {
    heading: 'Cookies and Tracking',
    paragraphs: [
      'This website does not use advertising cookies, tracking pixels, or third-party marketing trackers. We do not build behavioural profiles of visitors and we do not sell or share browsing data with advertisers.',
      'If any technical storage is used on the site, it is limited to what is needed for the page to function correctly, such as remembering where you were in the document. We do not use cookies to identify you personally across other websites.',
    ],
  },
  {
    heading: 'How We Protect Your Information',
    paragraphs: [
      'All information you send to us is transmitted over an encrypted connection (HTTPS). Once it reaches us it is stored on access-controlled systems: our hosting provider, our email provider, and the project tools we use for active work.',
      'Access is limited to the people working on your project who need it. Where a service requires access to do its job, such as a hosting provider serving the site, that access is limited to serving your request. We do not sell, rent or trade your personal information to anyone for marketing purposes.',
      'No transmission or storage method is completely secure, so we cannot guarantee absolute security. If a breach affects your information, we will take reasonable steps to contain it and will tell you where we are legally required to do so.',
    ],
  },
  {
    heading: 'Service Providers We Work With',
    paragraphs: [
      'To operate this website and deliver our work, we rely on a small number of third-party providers. They process information only on our instructions and for the purpose we specify:',
    ],
    list: [
      'Hosting: the provider whose servers deliver this website and store its public files.',
      'Email: the provider that carries messages between you and us, including anything you send from a contact form.',
      'Project tools: the software we use to manage files, design work and communication during your project.',
    ],
  },
  {
    heading: 'Your Rights',
    paragraphs: [
      'Depending on where you live, you may have the following rights over your personal information:',
    ],
    list: [
      'Ask for a copy of the information we hold about you.',
      'Ask us to correct information that is inaccurate or incomplete.',
      'Ask us to delete information we no longer have a reason to keep.',
      'Object to, or ask us to pause, how we use your information.',
      'Ask us to transfer your information to another provider in a portable format.',
      'Withdraw your consent at any time, where we relied on consent to process your information.',
      'Complain to your local data protection authority if you believe we have handled your information improperly.',
    ],
    note:
      'To exercise any of these rights, email us with the request. We will confirm your identity and respond within a reasonable period, normally within 30 days.',
  },
  {
    heading: 'How Long We Keep Your Information',
    paragraphs: [
      'We keep information for as long as we have a reason to. Enquiries that do not become projects are kept only while we are in conversation with you and for a short period afterwards, so we can pick a thread back up. Project information is kept for the duration of the commercial relationship and for a reasonable archiving period afterwards, so we can support past work or meet legal and accounting requirements. When information is no longer needed we delete it or make it anonymous.',
    ],
  },
  {
    heading: 'International Transfers',
    paragraphs: [
      'We are a global studio and our providers are located in different countries. This means your information may be processed in a country other than your own. Where that happens, transfers are made under the safeguards our providers put in place, such as standard contractual clauses, and we limit access to what is needed to deliver the service.',
    ],
  },
  {
    heading: 'Children’s Privacy',
    paragraphs: [
      'This website and our services are not directed at children under 16, and we do not knowingly collect personal information from them. If you believe a child has sent us information, contact us and we will delete it.',
    ],
  },
  {
    heading: 'Changes to This Policy',
    paragraphs: [
      'We may update this Privacy Policy as our website, services, or legal obligations change. The date at the top of this page shows when the current version took effect. If we make a material change that affects how we use information you have already given us, we will tell you before the change takes effect.',
    ],
  },
]

function Privacy() {
  return (
    <LegalPage
      label="(Privacy)"
      title="Privacy Policy"
      updated="October 2, 2026"
      intro="This policy explains what personal information BOLTZ collects when you contact us or work with us, why we collect it, and the choices you have. It is written to be read, not to be skipped."
      sections={sections}
    />
  )
}

export default Privacy