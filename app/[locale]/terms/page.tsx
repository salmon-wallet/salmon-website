import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.terms' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: locale === 'en' ? '/terms' : `/${locale}/terms`,
      languages: { 'en': '/terms', 'es': '/es/terms', 'pt': '/pt/terms' },
    },
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'metadata.terms' });

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
              Please read these Terms of Use (&quot;Terms&quot;, &quot;Terms of Use&quot;) carefully before using the software provided at https://www.salmonwallet.io, at the app stores where the App is published, and at the subdomains of Salmon&apos;s product offering (hereinafter the &quot;Site&quot;).
            </p>

            <p>
              Your access to and use of the Service (as is defined below) is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.
            </p>

            <p>
              By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.
            </p>

            <h2 className="text-xl font-semibold text-text-primary mt-8">
              Services
            </h2>
            <p>
              Salmon makes available to you a software service, including Salmon&apos;s self-custodial mobile application, web wallet and browser extension (each and together, the &quot;Wallet&quot; or the &quot;App&quot;). The Wallet enables you to (i) hold tokens, cryptocurrencies and other crypto or blockchain-based digital assets recorded on a blockchain (collectively, &quot;Digital Assets&quot;); (ii) connect to decentralized applications (collectively &quot;Dapp(s)&quot;) and approve the transactions and off-chain messages they request; (iii) from the App user interface, swap Solana tokens through a third-party aggregator, routed through Salmon&apos;s servers, which obtain the quote and the unsigned transaction and relay the transaction you sign back to that aggregator for broadcast (hereinafter the &quot;Swap&quot;); (iv) view addresses, balances, transaction history and collectibles that are part of digital asset networks, and broadcast transactions; (v) exchange an asset on one blockchain for an asset on another — between Solana and Bitcoin — through StealthEX, a third-party exchange service (hereinafter the &quot;Bridge&quot;); and (vi) additional functionality as may be added to the App from time to time (collectively the &quot;Services&quot;).
            </p>

            <p>
              You may use the Services if you are of the age of majority in your jurisdiction of residence, or older, and are not barred from using the Services under applicable law. By using the Site or Services and agreeing to these Terms, you represent and warrant that: (i) You are of lawful age, and are lawfully able, to enter into contracts; and (ii) Neither you nor any person that owns or controls you is subject to sanctions or otherwise designated on any list of prohibited or restricted parties, including the lists maintained by the United Nations Security Council, the United States government (among them the Specially Designated Nationals and Blocked Persons List and the Foreign Sanctions Evaders List administered by OFAC), the United Kingdom government, and the European Union or its Member States; and (iii) You are not located in, organised under the laws of, or resident in a jurisdiction subject to comprehensive sanctions or embargoes. We may restrict or refuse access to the Services in any jurisdiction, at our discretion and without notice.
            </p>

            <p>
              The Services have no server-side account. Salmon does not issue you credentials, does not authenticate you, and holds no account that you could log in to or that we could restore. Access to the Wallet on a given device is protected by a password you set locally on that device, and by the device&apos;s own biometric unlock where you enable it. You are responsible for keeping that password and that device secure, and you are responsible for all activity carried out through your Wallet, whether or not you know about it. Because the Services are self-custodial, we are not liable for any misuse that you, or any authorized or unauthorized third party, may make of your Wallet, and we cannot restore access to it.
            </p>

            <p>
              You acknowledge and understand that, in certain circumstances, such as if you lose or forget your password for your Wallet, you will need to use a recovery phrase to access any Digital Asset stored in your Wallet (the &quot;Seed Phrase&quot;). You are solely responsible for the retention and security of your Seed Phrase. Your Seed Phrase is the only way to restore access to the Digital Assets stored in your Wallet if you lose access to it. Anyone who knows your Seed Phrase can access, transfer or spend your Digital Assets. You acknowledge and agree that Salmon does not store and is not responsible for your Digital Asset as you are aware and acknowledge that Salmon is a non-custodial wallet, this is to say that all your Digital Assets are stored directly in the blockchain, and Salmon is just a technological integrator that eases your access to your Digital Assets. Considering this, you bear sole responsibility for any loss of your Digital Assets due to failure to retain and/or secure your Seed Phrase.
            </p>

            <h2 className="text-xl font-semibold text-text-primary mt-8">
              Fees
            </h2>
            <p>
              Salmon earns a fee on some Services. Those fees are taken from the assets moving through the transaction rather than billed to you separately.
            </p>
            <p>
              <strong className="text-text-primary">Bridge.</strong> Every cross-chain exchange carries a partner fee of 0.4%, which StealthEX deducts from the exchange and credits to Salmon. The estimate shown to you before you confirm is already net of that fee, and the rate is disclosed on the review screen.
            </p>
            <p>
              <strong className="text-text-primary">Swap.</strong> Every Solana-to-Solana swap carries a fee charged by the aggregator. Where the deployment you are using is configured for it, that fee is set at Salmon&apos;s referral rate and accrues to Salmon; where it is not, the aggregator applies its own base rate and keeps it. The two do not stack: one rate applies per swap, it is already reflected in the quote you are shown, and the review screen discloses it as a percentage rather than as an amount.
            </p>
            <p>
              Network fees — such as gas, rent and priority fees — are paid to the relevant blockchain and never to Salmon. We may change our fees at any time. The fee that applies is the one disclosed to you at the moment you confirm the transaction.
            </p>

            <h2 className="text-xl font-semibold text-text-primary mt-8">
              Third-Party Services and Cross-Chain Risk
            </h2>
            <p>
              Some Services depend on third parties that Salmon does not control, and using those Services exposes you to those parties.
            </p>
            <p>
              <strong className="text-text-primary">Bridge.</strong> A cross-chain exchange begins with an ordinary on-chain send from your own account to a deposit address owned by StealthEX. From that send until StealthEX pays out on the destination chain — typically minutes, and longer on Bitcoin — the funds are held by StealthEX. Salmon cannot cancel the exchange, recover the funds, or compel the payout, and has no wallet-side remedy if StealthEX fails to settle. Your recourse in that event is StealthEX&apos;s own refund process, and the App gives you the exchange identifier and the deposit address so that you can pursue it. Salmon keeps no record of your exchanges, so if you lose that identifier it has to come from StealthEX.
            </p>
            <p>
              <strong className="text-text-primary">Swap.</strong> Quotes, routing and broadcasting are performed by a third-party aggregator. We do not guarantee any price, route, execution, timing or slippage outcome.
            </p>
            <p>
              <strong className="text-text-primary">Blockchain and market data.</strong> Balances, transaction history, collectibles and prices are read from third-party blockchain-data and market-data providers — mostly through Salmon&apos;s servers, and in part directly from your device, which opens its own connection to a Solana node provider. That data may be delayed, incomplete or wrong, and you should not rely on it as the sole basis for a transaction.
            </p>
            <p>
              In no case does Salmon hold your Digital Assets, your keys or your Seed Phrase, and no transaction can be reversed, cancelled or recalled by us once it has been broadcast.
            </p>

            <h2 className="text-xl font-semibold text-text-primary mt-8">
              No Professional Advice; No Custody
            </h2>
            <p>
              Salmon is software, not a financial service. Nothing made available through the Services is legal, financial, tax or investment advice, and nothing in these Terms creates a fiduciary duty, an advisory relationship or a duty of best execution. A quote, a route, a price or a token listing is information, not a recommendation.
            </p>
            <p>
              The Wallet is self-custodial. Your keys and your recovery phrase are generated and held on your device; Salmon never holds them, never holds your Digital Assets, and cannot move, freeze, reverse or recover them. Because of that, Salmon is not an exchange, a broker or dealer, a custodian, a money transmitter or a money services business, operates no order book, and is counterparty to none of your transactions. Where a transaction is executed, it is executed by a third-party protocol or service, under its own terms.
            </p>

            <h2 className="text-xl font-semibold text-text-primary mt-8">
              Risks You Accept
            </h2>
            <p>
              <strong className="text-text-primary">Transactions are final.</strong> A transaction recorded on a blockchain cannot be cancelled, reversed or refunded by anyone, including us. Sending to a wrong address, approving a malicious transaction, or mistyping an amount is not recoverable.
            </p>
            <p>
              <strong className="text-text-primary">Your recovery phrase is the wallet.</strong> Anyone who obtains it can spend your Digital Assets, and nobody who loses it can restore them. We do not store it, cannot reconstruct it, and cannot help you if it is lost or copied. Storing it in a cloud service, a photo library or a password manager increases the risk of loss or theft.
            </p>
            <p>
              <strong className="text-text-primary">Digital Assets are volatile and experimental.</strong> Their value can fall to zero, for reasons including adoption, speculation, technical failure, security incidents and regulation. Networks can congest, halt, fork or be attacked, and a transaction may fail, stall or execute at a price different from the one quoted.
            </p>
            <p>
              <strong className="text-text-primary">Anyone can create a token.</strong> That includes tokens that imitate the name, symbol or artwork of a real project. Metadata shown in the Wallet is read from the chain and from third-party registries; displaying a token is not a statement that it is genuine, safe or valuable, and you are responsible for verifying what you are trading and what you are signing.
            </p>
            <p>
              <strong className="text-text-primary">Third parties can fail.</strong> Aggregators, exchange services, node providers and data providers can be unavailable, slow, wrong or compromised, and some of them hold your funds for a period — see the section on cross-chain risk above. Their failures are not ours to remedy.
            </p>
            <p>
              <strong className="text-text-primary">Software has defects.</strong> The Wallet is open source and published so that it can be inspected, which is a safeguard and not a guarantee. Undiscovered vulnerabilities may exist, in our code and in the code we depend on.
            </p>

            <h2 className="text-xl font-semibold text-text-primary mt-8">
              Forks and Airdrops
            </h2>
            <p>
              If a network forks, we decide at our sole discretion whether and how to support the resulting assets, and we do not guarantee that you will be able to see, access or transact either version through the Wallet. The same is true of airdrops and other distributions: we do not guarantee support for them, we do not distribute them, and assets that arrive in your wallet unsolicited may be worthless or hostile — some exist only to induce you to sign a transaction. Any tax or legal consequence of a fork or an airdrop is yours.
            </p>

            <h2 className="text-xl font-semibold text-text-primary mt-8">
              Links To Other Web Sites
            </h2>
            <p>
              Our Service may contain links to third-party web sites or services that are not owned or controlled by Salmon.
            </p>
            <p>
              We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that we shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
            </p>

            <h2 className="text-xl font-semibold text-text-primary mt-8">
              Acceptable Use
            </h2>
            <p>
              You must not use the Services in any unlawful or fraudulent manner, in a way that could damage or compromise our systems or security, or by any means other than our publicly supported interfaces.
            </p>

            <h2 className="text-xl font-semibold text-text-primary mt-8">
              Copyright, Trademarks, and other Intellectual Property
            </h2>
            <p>
              All content and other materials available on our websites and presented as part of the Service, including, without limitation, trademarks, service marks, trade names, images, audio, text, software, and the &quot;look and feel&quot; of https://salmonwallet.io and its associated lower-level webpages (collectively, &quot;Site Content&quot;) are protected by copyright, trademark, and other intellectual property laws. Such Site Content includes Salmon and related stylized &quot;Salmon&quot; designs, which are common law trademarks of Salmon. You may not reproduce, republish, distribute, display, perform, transmit, sell, or otherwise use any Site Content without our express written permission, except when such actions occur in connection with bona fide uses of the Service through our publicly supported interfaces. In this regard, users are prohibited from downloading, republication, retransmission, reproduction, or other use of any image (and other similar content) as a stand-alone file. Furthermore, Site Content may not be used in any manner that is likely to cause confusion among consumers. The only exception to the aforementioned is the use permitted by the Wallet&apos;s open-source licence and by our{' '}
              <a href="https://github.com/Salmon-HQ/salmon-wallet-frontend/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80">contribution guidelines</a>.
            </p>

            <h2 className="text-xl font-semibold text-text-primary mt-8">
              Copyright Infringement
            </h2>
            <p>
              If you believe that any Site Content infringes upon your copyright, please notify us at support@salmonwallet.io. Your notice should include (a) a description of the copyrighted work that you claim has been infringed; (b) the URL where the allegedly infringing Site Content is located; (c) your full name, postal address, telephone number, and email address; (d) a statement that you have a good faith belief that the use of the allegedly infringing material on the Site is not authorized; (e) your physical or electronic signature; and (f) a statement that you are the copyright owner or an authorized agent of the copyright owner, including any applicable United States copyright registration number(s).
            </p>

            <h2 className="text-xl font-semibold text-text-primary mt-8">
              Submissions. Open Source.
            </h2>
            <p>
              We welcome feedback on our Service. However, you agree that any ideas, suggestions, drawings, graphics, innovations, concepts, recommendations, or similar materials (&quot;Submissions&quot;) you send us are not confidential. You hereby assign such Submissions to us without compensation (or the expectation of compensation), and agree that we may disclose, reproduce, republish, modify, distribute, display, perform, transmit, sell, or otherwise use your Submissions for commercial or non-commercial purposes with no compensation to you. For any Submissions that cannot be legally assigned to us, you hereby grant us an unrestricted, perpetual, royalty-free, irrevocable, fully paid-up, and worldwide license to reproduce, republish, modify, distribute, display, perform, transmit, sell, or otherwise use your Submissions for commercial or non-commercial purposes with no compensation to you.
            </p>
            <p>
              The source code of the Wallet is published under the Apache License 2.0 at{' '}
              <a href="https://github.com/Salmon-HQ" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80">github.com/Salmon-HQ</a>, and may be used, redistributed and modified by anyone under the terms of that licence and for lawful purposes. Contributions are accepted under the same licence, in accordance with our{' '}
              <a href="https://github.com/Salmon-HQ/salmon-wallet-frontend/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80">contribution guidelines</a>.
            </p>

            <h2 className="text-xl font-semibold text-text-primary mt-8">
              Disclaimer
            </h2>
            <p className="uppercase">
              You agree that use of the Service is at your sole risk. The Service is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We expressly disclaim all warranties of any kind, express or implied, including, without limitation, any warranty of merchantability, title, quiet enjoyment, fitness for a particular purpose and non-infringement. No advice or information, whether oral or written, obtained by you from us or at or through the Service shall create any warranty not expressly made herein.
            </p>
            <p className="uppercase">
              We make no warranty that the Service will meet your requirements, be accurate, complete, current or timely, uninterrupted, secure, or error free.
            </p>
            <p className="uppercase">
              You are solely responsible for any damage to your computer, computer network, or data (including loss of data) that results from your access or use of the Service. We do not warrant that the Service is free of defects, viruses, malfunctions, or harmful components that could damage or allow unauthorized access to your computer, computer network, or data.
            </p>
            <p className="uppercase">
              We are not responsible for any loss or damage caused, or alleged to have been caused, directly or indirectly, by the information or ideas contained, suggested, or referenced at or through the Service.
            </p>
            <p className="uppercase">
              We make no representations or warranties that the Service is appropriate or available for use in all geographic locations. If you access or use the Service from outside the British Virgin Islands, you are solely responsible for compliance with all applicable laws, including without limitation, export and import regulations of other countries.
            </p>

            <h2 className="text-xl font-semibold text-text-primary mt-8">
              Limitation of Liability
            </h2>
            <p className="uppercase">
              Neither we nor our subsidiaries, or affiliates, and respective officers, directors, shareholders, employees, agents, or representatives (or their respective successors and assigns) shall be liable in contract, tort (including negligence), or otherwise for any direct, indirect, incidental, special, punitive, or consequential damages resulting from the Service or the use, attempted use or inability to use the Service, including, but not limited to, damages for lost revenue, loss of data, or other intangibles even if foreseeable or if we have been advised of the possibility of such damages. In any event, you agree that our total liability for damages, regardless of the form of action, shall not exceed the actual total amount received by us from you to access the Service. The foregoing limitations will apply even if the above stated remedy fails of its essential purpose. Some jurisdictions do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages. Therefore, the exclusions set forth above may not apply to you.
            </p>

            <h2 className="text-xl font-semibold text-text-primary mt-8">
              Indemnification
            </h2>
            <p>
              You agree to indemnify, hold harmless, and release us, our subsidiaries, our affiliates, and our respective officers, directors, shareholders, employees, agents, representatives (and their respective successors and assigns) from and against any and all claims, damages, costs and expenses, including, but not limited to, reasonable attorney&apos;s fees, arising from or related to your access, use, attempted use, inability to use, or misuse of the Service or noncompliance with these Terms of Use.
            </p>

            <h2 className="text-xl font-semibold text-text-primary mt-8">
              Governing Law, Jurisdiction, and Limitation of Actions
            </h2>
            <p>
              The Service is created and controlled by Salmon Inc. in the British Virgin Islands. You agree that these Terms of Use will be governed by and construed in accordance with the laws of the British Virgin Islands, without regard to its conflicts of law provisions. You agree that all legal proceedings arising out of or in connection with these Terms of Use or the Service must be brought in the courts of the British Virgin Islands, and that your claim(s) will be forever waived and barred unless filed within one year of the time in which the event(s) giving rise to such claim(s) began. You expressly submit to the exclusive jurisdiction of said courts and consent to extraterritorial service of process.
            </p>

            <h2 className="text-xl font-semibold text-text-primary mt-8">
              General Provisions
            </h2>
            <p>
              If any provision of these Terms of Use are found to be invalid or unenforceable, such provision shall be severed from the remainder of the Terms of Use, which shall remain in full force and effect. No waiver of any breach or default of the Terms of Use shall be deemed to be a waiver of any preceding or subsequent breach or default. You may be required to agree to additional terms and conditions to access particular sections or functions of the Service. We reserve the right, in our sole discretion and without consent or notice, to transfer, assign, sublicense, or pledge the Service or these Terms of Use, in whole or in part, to any person or entity. You may not assign, sublicense, or otherwise transfer in any manner any of your rights or obligations under the Terms of Use. The section headings used in the Terms of Use are for convenience only. These Terms are written in English. Parts of the Site and the App are available in other languages, and we may publish a translation of these Terms for convenience; if a translated version conflicts with the English version, the English version controls.
            </p>

            <h2 className="text-xl font-semibold text-text-primary mt-8">
              Termination
            </h2>
            <p>
              We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
            <p>
              All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
            </p>

            <h2 className="text-xl font-semibold text-text-primary mt-8">
              Changes
            </h2>
            <p>
              We may modify these Terms at any time. When we do, we update the date at the top of this page, and where a change is material we will also give notice through the Site or the App before it takes effect. Continuing to use the Services after a change takes effect means you accept it; if you do not, stop using the Services — your Digital Assets remain yours and reachable with your recovery phrase, with or without this agreement.
            </p>

            <h2 className="text-xl font-semibold text-text-primary mt-8">
              Contact Us
            </h2>
            <p>
              If you have any questions about these Terms, please contact us at{' '}
              <a href="mailto:help@salmonwallet.io" className="text-accent hover:text-accent/80">help@salmonwallet.io</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
