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
              <strong className="text-text-primary">Last updated:</strong> May 15, 2024
            </p>

            <p>
              Please read these Terms of Use (&quot;Terms&quot;, &quot;Terms of Use&quot;) carefully before using the software app provided at https://salmonwallet.io, AppStore &amp; Playstore, as well as subdomain for Salmon&apos;s product offering (hereinafter the &quot;Site&quot;).
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
              Salmon makes available to you a software service, including Salmon&apos;s unhosted wallet application and browser extension (hereinafter the &quot;Wallet&quot; or the &quot;App&quot; respectively). The Wallet enables you to (i) store in the blockchain tokens, cryptocurrencies and other crypto or blokchain-based digital assets (collectively, &quot;Digital Assets&quot;); (ii) link to decentralized applications, including, without limitation, decentralized exchanges (collectively &quot;Dapp(s)&quot;; (iii) from the App user interface,swap assets on a peer-to-peer basis via third-party Dapps (hereinafter &quot;Swapper&quot;); (iv) view addresses and information that are part of digital asset networks and broadcast transactions; (v) a bridge service that will allow you to move a particular token from one blockchain to another (i.g. Solana to Near or vice versa); and (vi) additional functionality as may be added to the App from time to time (collectively the &quot;Services&quot;).
            </p>

            <p>
              You may use the Services if you are of the age of majority in your jurisdiction of residence, or older, and are nor barred from using the Services under applicable law. By using the Site or Services and agreeing to these Terms, you represented and warrant that: (i) You are of lawful age, and are lawfully able, to enter into contracts; and (ii) Neither you nor any person that owns or control you is subject to sanctions or otherwise designated on any list of prohibited or restricted parties.
            </p>

            <p>
              To use certain Services, you may be asked to have or to create an account (hereinafter &quot;Account&quot;). To the extent you create an account, you agree that you won&apos;t disclose your Account credentials to anyone. You are absolutely aware that, as the Services are a non-custodial service we are not liable of any kind of misuse that you, or any other authorized or unauthorized third party may do on your Account. You&apos;re responsible for all activities that occur under your Account, or are otherwise referable to your Account credentials, whether or not you know about them, and you are solely responsible for your conduct, and the task and activities you undertake, on or utilizing the Site or Services.
            </p>

            <p>
              You acknowledge and understand that, in certain circumstances, such as if you lose or forget your password for your Wallet, you will need to use a recovery phrase to access any Digital Asset stored in your Wallet (the &quot;Seed Phrase&quot;). You are solely responsible for the retention and security of your Seed Phrase. Your Seed Phrase is the only way to restore access to the Digital Assets stored in your Wallet if you lose access to it. Anyone who knows your Seed Phrase can access, transfer or spend your Digital Assets. You acknowledge and agree that Salmon does not store and is not responsible for your Digital Asset as you are aware and acknowledge that Salmon is a non-custodial wallet, this is to say that all your Digital Assets are stored directly in the blockchain, and Salmon is just a technological integrator that ease your way to your Digital Assets. Considering this, you bear sole responsibility for any loss of your Digital Assets due to failure to retain and/or secure your Seed Phrase.
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
              You must not use the Services in any unlawful or fraudulent manner, or in a way that could damage or compromise our systems or security. And you must not access the Services by any means other than our publicly supported interfaces.
            </p>

            <h2 className="text-xl font-semibold text-text-primary mt-8">
              Copyright, Trademarks, and other Intellectual Property
            </h2>
            <p>
              All content and other materials available on our websites and presented as part of the Service, including, without limitation, trademarks, service marks, trade names, images, audio, text, software, and the &quot;look and feel&quot; of https://salmonwallet.io and its associated lower-level webpages (collectively, &quot;Site Content&quot;) are protected by copyright, trademark, and other intellectual property laws. Such Site Content includes Salmon and related stylized &quot;Salmon&quot; designs, which are common law trademarks of Salmon. You may not reproduce, republish, distribute, display, perform, transmit, sell, or otherwise use any Site Content without our express written permission, except when such actions occur in connection with bona fide uses of the Service through our publicly supported interfaces. In this regard, users are prohibited from downloading, republication, retransmission, reproduction, or other use of any image (and other similar content) as a stand-alone file. Furthermore, Site Content may not be used in any manner that is likely to cause confusion among consumers. The only exception to the aforementioned is to enter into a{' '}
              <a href="https://github.com/salmon-wallet/salmon-wallet-v2/blob/main/CONTRIBUTION-AGREEMENT.md" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80">Contribution Agreement</a>.
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
              The original source code is made freely available and may be redistributed and modified by any users as long as it is made with legal purposes, and in accordance with the{' '}
              <a href="https://github.com/salmon-wallet/salmon-wallet-v2/blob/main/CONTRIBUTION-AGREEMENT.md" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80">Contribution Agreement</a>.
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
              We make no representations or warranties that the Service is appropriate or available for use in all geographic locations. If you access or use the Service from outside the United States of America, you are solely responsible for compliance with all applicable laws, including without limitation, export and import regulations of other countries.
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
              The Service is created and controlled by Salmon Inc. in the British Virgin Island. You agree that these Terms of Use will be governed by and construed in accordance with the laws of the British Virgin Island, without regard to its conflicts of law provisions. You agree that all legal proceedings arising out of or in connection with these Terms of Use or the Service must be brought in a federal or state court located in a, and that your claim(s) will be forever waived and barred unless filed within one year of the time in which the event(s) giving rise to such claim(s) began. You expressly submit to the exclusive jurisdiction of said courts and consent to extraterritorial service of process.
            </p>

            <h2 className="text-xl font-semibold text-text-primary mt-8">
              General Provisions
            </h2>
            <p>
              If any provision of these Terms of Use are found to be invalid or unenforceable, such provision shall be severed from the remainder of the Terms of Use, which shall remain in full force and effect. No waiver of any breach or default of the Terms of Use shall be deemed to be a waiver of any preceding or subsequent breach or default. You may be required to agree to additional terms and conditions to access particular sections or functions of the Service. We reserve the right, in our sole discretion and without consent or notice, to transfer, assign, sublicense, or pledge the Service or these Terms of Use, in whole or in part, to any person or entity. You may not assign, sublicense, or otherwise transfer in any manner any of your rights or obligations under the Terms of Use. The section headings used in the Terms of Use are for convenience only.
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
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
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
