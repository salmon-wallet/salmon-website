import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.privacy' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: locale === 'en' ? '/privacy' : `/${locale}/privacy`,
      languages: { 'en': '/privacy', 'es': '/es/privacy', 'pt': '/pt/privacy' },
    },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'metadata.privacy' });

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-4xl font-bold mb-8">{t('title').split(' — ')[0]}</h1>

          <div className="prose prose-invert prose-sm max-w-none space-y-6 text-text-secondary leading-relaxed">
            <p>
              <strong className="text-text-primary">Last updated:</strong> August 20, 2026
            </p>

            <p>
              Salmon (&quot;we&quot;, &quot;us&quot; or &quot;our&quot;) values your privacy. In this Privacy Policy (&quot;Policy&quot;), we describe how we collect, use, and disclose information that we obtain about visitors to our website at https://www.salmonwallet.io (the &quot;Site&quot;) and the services available through our Site, including our mobile applications, web wallet and browser extensions (collectively, the &quot;Services&quot;), and how we use and disclose that information.
            </p>

            <p>
              By visiting the Site, or using any of our Services, you agree that your personal information will be handled as described in this Policy. Your use of our Site or Services, and any dispute over privacy, is subject to this Policy (including any applicable changes).
            </p>

            <p>
              We collect information about you directly from you and from third parties, as well as automatically through your use of our Site and Services.
            </p>

            <p>
              You may browse certain areas of the Site without registering with us or providing us personal information.
            </p>

            <p>
              We collect your email address only when you give it to us — for example, when you write to us for support, or when you ask us to exercise a privacy right. We use it to reply to you and to send you information about the product. The Wallet itself never asks you for an email address, and creating or importing a wallet requires no sign-up of any kind.
            </p>

            <p>
              In addition, if you are providing personal information for third parties in connection with using our Services, you are responsible for ensuring that you have all required permissions and consents to provide such personal information to us for use in connection with the Services and that our use of such personal information to provide the Services does not violate any applicable law, rule or regulation.
            </p>

            <p>
              We may automatically collect the following information about your use of our Site through cookies and other similar technologies: your domain name; your browser type and operating system; web pages you view; links you click; your IP address; the length of time you visit our Site; and the referring URL, or the webpage that led you to our Site. In the wallet applications, automatically collected usage data is limited to the pseudonymous in-app usage data described below, and your IP address is not collected by that analytics pipeline. We may combine this information with other information that we have collected about you, including, where applicable, your name and other personal information.
            </p>

            <p>
              We use your information, including personal information, for the following purposes:
            </p>

            <p>
              (i) We use your information to communicate with you about our products and to respond to your inquiries.
            </p>

            <p>
              (ii) We use your information to tailor the content and information that we may send or display to you, and to offer personalized help and instructions.
            </p>

            <p>
              (iii) We use your information to ensure our Site and Services are working as intended, to better understand how users access and use our Site and Services, on both an aggregated and an individualized basis, to make improvements to our services, to develop new Services, and for other research and analytics purposes; in-app usage data from the wallet applications is analyzed only in pseudonymous form and is not linked to you individually.
            </p>

            <p>
              (iv) We may use your information for marketing and promotional purposes; in-app usage data from the wallet applications is not used for marketing.
            </p>

            <p>
              (v) We may use your information to enforce any applicable Terms of Use, comply with the law, legal process or legal obligations, exercise or defend legal claims, detect, prevent or address fraud, security or technical issues, or otherwise protect our property, legal rights, or that of third parties.
            </p>

            <p>
              We may share your information, including personal information, as follows:
            </p>

            <p>
              (i) Where you have provided consent, we share your information, including personal information, as described at the time of consent.
            </p>

            <p>
              (ii) We may disclose the information we collect from you to our affiliates or subsidiaries solely for the purpose of providing Services to you; however, if we do so, their use and disclosure of your personally identifiable information will be maintained by such affiliates and subsidiaries in accordance with this Policy.
            </p>

            <p>
              (iii) We may disclose the information we collect from you to third-party vendors, service providers, contractors or agents who perform functions on our behalf.
            </p>

            <p>
              (iv) If we are acquired by or merged with another company, if substantially all of our assets are transferred to another company, or as part of a bankruptcy proceeding, or are in negotiations for any of these types of transactions, we may transfer the information that we have collected from you to the other company.
            </p>

            <p>
              (v) We also may disclose the information we collect about you in order to comply with the law, a judicial proceeding, court order, or other legal process, such as in response to a subpoena.
            </p>

            <p>
              (vi) We also may disclose the information we collect about you where we believe it is necessary to investigate, prevent, or take action regarding illegal activities, suspected fraud, situations involving potential threats to the safety of any person, violation of any applicable Terms of Use or this Policy, or as evidence in litigation where we are involved.
            </p>

            <p>
              (vii) We may share aggregate or de-identified information about users and their use of the Services with third parties and publicly for marketing, advertising, research or similar purposes.
            </p>

            <p>
              We and our service providers use cookies and other tracking technologies to track information about your use of our Site and Services. We may combine this information with other personal information we collect from you (and our third party service providers may do so on our behalf).
            </p>

            <p>
              Currently, our system does not recognize browser &quot;do-not-track&quot; requests. You may, however, disable certain tracking as discussed in this section (e.g., by disabling cookies), but such disabling will impair use of the Site and the Services.
            </p>

            <p>
              Cookies are alphanumeric identifiers that we transfer to your computer&apos;s hard drive through your web browser for record-keeping purposes. Some cookies allow us to make it easier for you to navigate our Site and Services, while others are used to enable a faster log-in process or to allow us to track your activities at our Site and Services. There are two types of cookies: session and persistent cookies.
            </p>

            <p>
              Session cookies exist only during an online session. They disappear from your computer when you close your browser or turn off your computer. We do not currently use session cookies.
            </p>

            <p>
              Persistent cookies remain on your computer after you close your browser or turn off your computer. We use persistent cookies to track aggregate and statistical information about user activity.
            </p>

            <p>
              Most web browsers automatically accept cookies, but if you prefer, you can edit your browser options to block them in the future. The Help portion of the toolbar on most browsers will tell you how to prevent your computer from accepting new cookies, how to have the browser notify you when you receive a new cookie, or how to disable cookies altogether. Visitors to our Site who disable cookies may not be able to browse certain areas of the Site. The wallet applications set no cookies at all, so disabling them does not affect the Wallet.
            </p>

            <p>
              We use automated devices and applications, such as Google Analytics, to evaluate usage of our Site. We use these tools to help us improve our Services, performance and user experiences. These entities may use cookies and other tracking technologies to perform their services. We do not share your personal information with these third parties. You can opt out of this measurement on the Site by blocking cookies in your browser or by installing Google&apos;s opt-out browser add-on. Measurement in the wallet applications works differently, and is described under &quot;In-App Usage Data&quot; below: no analytics SDK, cookie or advertising tracker of any third party runs inside the wallet applications.
            </p>

            <h2 className="text-2xl font-bold text-text-primary">Information the Wallet Sends to Us</h2>

            <p>
              The Wallet is self-custodial. Your keys and your recovery phrase are generated and stored encrypted on your device and are never transmitted to us: we never receive them, we cannot access or move your assets, and we cannot recover them for you.
            </p>

            <p>
              To show you balances, transaction history, collectibles and prices, the Wallet asks our servers for public blockchain data about the addresses it holds. Those requests carry your addresses, and our servers pass them on to the providers behind them: Helius and Triton One for Solana data, Blockdaemon for Bitcoin data, and CoinGecko for prices. The underlying data is already public on the blockchain; what a request adds is the association between an address and the moment it was asked about.
            </p>

            <p>
              Part of that traffic does not pass through us at all. The Wallet opens its own connection from your device to a Solana node provider — for some reads, for live balance updates, and to broadcast the Solana transactions you sign. That provider therefore receives your addresses, your transactions and your IP address without our servers in between, and it is the provider our servers name to your device, or a public Solana endpoint if that fails. The same is true of the public gateways that serve NFT media and token logos, of the update service that delivers app updates to the mobile application, and of any block explorer you open from the Wallet: each sees a request from your device, carrying the address it is about.
            </p>

            <p>
              When you swap, the token pair, the amounts and the address that will sign reach Jupiter, the third-party aggregator that prices the trade and broadcasts it. When you use the cross-chain bridge, the assets, the amount, the destination address and the refund address you provide reach StealthEX, the third-party exchange service that performs the exchange; StealthEX handles that information under its own privacy policy rather than this one. Bitcoin transactions you sign are broadcast through our servers. In every case we relay the request — we do not attach an identity to it, because we do not have one.
            </p>

            <p>
              Our wallet API requires no account, no login and no credential of any kind, so nothing you do inside the Wallet is linked by us to you as a person. We keep no per-account records: no profile, no history of your lookups, and no record of your swaps or exchanges. What we do process is operational: your IP address, to apply rate limits, and server request logs. Those logs record the IP address a request came from together with the request itself, which for a wallet lookup contains the address it was about. They exist to operate and debug the service, not to build a profile, and they are not joined to anything else — but they are the one place where an address and an IP sit on the same line.
            </p>

            <p>
              On mobile, the Wallet asks for access to your camera only when you scan a recipient&apos;s QR code, and to your device biometrics to unlock the app and to reveal your private key or recovery phrase, where you enable that. Neither the images nor the biometric data leave your device or reach us: the camera is read on the device to decode the code, and biometric verification is performed by your operating system, which tells the app only whether it succeeded.
            </p>

            <h2 className="text-2xl font-bold text-text-primary">In-App Usage Data</h2>

            <p>
              Usage analytics in the wallet applications are disabled by default. At the end of onboarding you choose whether to enable them, and you can also enable them later in Settings; until you accept, nothing is validated or transmitted, and the only thing written to your device is the name of an event waiting to be counted, which is discarded if you decline. The data collected is pseudonymous: it is tied to a random install identifier that is not linked to your wallets or to your identity, and event payloads cannot contain addresses, balances, or exact amounts — an amount, where an event carries one at all, travels only as a broad range. You may withdraw your consent at any time in Settings, which stops collection and deletes the install identifier.
            </p>

            <p>
              What can travel is a closed list of usage events and a short allow-list of properties, checked on the device before sending and checked again on our servers on arrival, so a payload structurally cannot carry an address, a balance or an exact amount. The events are sent to our own backend, which forwards them server-side to Google Analytics 4. Because that forwarding happens server to server, Google receives the pseudonymous event without your IP address, and no analytics SDK, cookie or advertising identifier of Google or of any other third party runs inside the wallet applications.
            </p>

            <h2 className="text-2xl font-bold text-text-primary"> How Long We Keep Things</h2>

            <p>
              We keep personal information only while it serves the purpose we collected it for. Correspondence you send us is kept while the matter is open and for as long afterwards as we may need it to answer a follow-up or to meet a legal obligation. Operational records — request logs, rate-limit counters — are kept for the short period they are useful for running and debugging the service. Analytics events are kept in aggregate; the install identifier that ties them together is deleted when you withdraw consent, which breaks the link between past events and any future ones. Copies may survive briefly in backups after deletion elsewhere.
            </p>

            <p>
              One limit is worth stating plainly, because no policy can override it: information written to a blockchain is not ours to delete. Transactions, balances and addresses are public and permanent on the network itself. A request to erase your data reaches our systems and no further.
            </p>

            <h2 className="text-2xl font-bold text-text-primary"> Where Your Information Is Processed</h2>

            <p>
              Our servers run in the United States, and the third parties described above process data in their own locations. If you are elsewhere, using the Services means your information is transferred to and processed in countries whose data-protection rules may differ from those where you live. We take reasonable steps to protect it wherever it is handled.
            </p>

            <h2 className="text-2xl font-bold text-text-primary"> Selling and Children</h2>

            <p>
              We do not sell your personal information, and we do not share it for cross-context behavioural advertising. In-app usage data is never used for marketing.
            </p>

            <p>
              The Services are not directed to children, and we do not knowingly collect personal information from them. If you believe a child has provided us with personal information, write to us and we will delete it.
            </p>

            <p>
              Our Site and Services may contain links to third-party websites. Any access to or use of such linked sites is not governed by this Policy, but instead governed by the privacy policies of those third-party websites.
            </p>

            <p>
              We have implemented commercially reasonable precautions to protect the information we collect from loss, misuse, and unauthorized access, disclosure, alteration, and destruction. Please be aware that despite our effort, no data security measures can guarantee 100% security.
            </p>

            <p>
              You should take steps to protect against unauthorized access to your password, phone, and computer. Because the Wallet is self-custodial and has no account behind it, we cannot detect, reverse or recover anything done by someone who obtains your device, your password or your recovery phrase, and we are not responsible for it.
            </p>

            <p>
              You may request access, a copy, modification or deletion of your personal information that you have submitted to us by contacting us at{' '}
              <a href="mailto:help@salmonwallet.io" className="text-accent hover:text-accent/80">help@salmonwallet.io</a>.
              {' '}We will use reasonable efforts to accommodate your request to the extent required by law, provided that we may be required to retain personal information to comply with legal requirements, accounting obligations, or for business purposes. Please note that copies of information that you have updated, modified or deleted may remain viewable in cached and archived pages of the Site for a period of time.
            </p>

            <p>
              We may send you periodic promotional or informational emails. You may opt out of such communications by following the opt-out instructions contained in the email. Please note that it may take us up to 10 business days to process your opt-out requests.
            </p>

            <p>
              We may change this Policy from time to time. When we do, we update the date at the top of this page and post the current version on the Site, and where a change materially affects how we handle information already collected from you, we will also give notice through the Site or the App. This Policy is written in English; if we publish a translation and it conflicts with the English version, the English version controls.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
