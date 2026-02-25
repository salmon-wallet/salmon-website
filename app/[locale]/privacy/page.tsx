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
              <strong className="text-text-primary">Last updated:</strong> May 15, 2024
            </p>

            <p>
              Salmon (&quot;we&quot;, &quot;us&quot; or &quot;our&quot;) values your privacy. In this Privacy Policy (&quot;Policy&quot;), we describe how we collect, use, and disclose information that we obtain about visitors to our website at https://www.salmon.io (the &quot;Site&quot;) and the services available through our Site, including any mobile applications and browser extensions (collectively, the &quot;Services&quot;), and how we use and disclose that information.
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
              We collect email only to notify you about commercial decisions that we want you to be notified.
            </p>

            <p>
              In addition, if you are providing personal information for third parties in connection with using our Services, you are responsible for ensuring that you have all required permissions and consents to provide such personal information to us for use in connection with the Services and that our use of such personal information to provide the Services does not violate any applicable law, rule or regulation.
            </p>

            <p>
              We may automatically collect the following information about your use of our Site or Services through cookies and other similar technologies: your domain name; your browser type and operating system; web pages you view; links you click; your IP address; the length of time you visit our Site or use our Services; and the referring URL, or the webpage that led you to our Site. We may combine this information with other information that we have collected about you, including, where applicable, your user name, name, and other personal information.
            </p>

            <p>
              We use your information, including personal information, for the following purposes:
            </p>

            <p>
              (i) We use your information to communicate with you about our products, to respond to your inquiries, to fulfill your orders, and for other purposes.
            </p>

            <p>
              (ii) We use your information to tailor the content and information that we may send or display to you, to offer location customization, and personalized help and instructions, and to otherwise personalize your experience while using our products.
            </p>

            <p>
              (iii) We use your information to ensure our Site and Services are working as intended, to better understand how users access and use our Site and Services, both on and aggregated and individualized basis, to make improvements to our services, to develop new Services, and for other research and analytics purposes.
            </p>

            <p>
              (iv) We may use your information for marketing and promotional purposes.
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
              (iii) We may disclose the information we collect from you to third parties vendors, service providers, contractors or agents who perform functions on our behalf.
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
              We and our service providers use cookies and other tracking technologies to track information about your use of our Site and Services, We may combine this information with other personal information we collect from you (and our third party service providers may do so on our behalf).
            </p>

            <p>
              Currently, our system does not recognize browser &quot;do-not-track&quot; requests. You may, however, disable certain tracking as discussed in this section (e.g., by disabling cookies), but such disabling will impair use of the Site and the Services.
            </p>

            <p>
              Cookies are alphanumeric identifiers that we transfer to your computer&apos;s hard drive through your web browser for record-keeping purposes. Some cookies allow us to make it easier for you to navigate our Site and Services, while others are used to enable a faster log-in process or to allow us to track your activities at our Site and Services. There are two types of cookies: session and persistent cookies.
            </p>

            <p>
              Session cookies existe only during an online session. They disappear from your computer when you close your browser or turn off your computer. We do not currently use session cookies.
            </p>

            <p>
              Persistent cookies remain on your computer after you close your browser or turned off your computer. We use persistent cookies to track aggregate and statistical information about user activity.
            </p>

            <p>
              Most web browsers automatically accept cookies, but if you prefer, you can edit your browser options to block them in the future. The Hel portion of the toolbar on most browsers will tell you how to prevent your computer from accepting new cookies, how to have the browser notify you when you receive a new cookie, or how to disable cookies altogether. Visitors to our Site who disable cookies will not be able to browse certain areas of the Site or use the Services.
            </p>

            <p>
              We used automated devices and applications, such as Google Analytics, to evaluate usage of our Site and our Services. We also may use other analytic means to evaluate our Services. We use these tools to help us improve our Services, performance and user experiences, These entities may use cookies and other tracking technologies to perform their services. We do not share your personal information with these third parties.
            </p>

            <p>
              Our Site and Services may contain links to third-party websites. Any access to or use of such linked sites is not governed by this Policy, bus instead governed by the privacy policies of those third-party websites.
            </p>

            <p>
              We have implemented commercially reasonable precautions to protect the information we collect from loss, misuse, and unauthorized access, disclosure, alteration, and destruction. Please be aware that despite our effort, no data security measures can guarantee 100% security.
            </p>

            <p>
              You should take steps to protect against unauthorized access to your password, phone, and computer. We are not responsible for any lost, stolen, or compromised passwords or for any activity on your account via unauthorized password activity.
            </p>

            <p>
              You may request access, a copy, modification or deletion of your personal information that you have submitted to us by contacting at{' '}
              <a href="mailto:help@salmonwallet.io" className="text-accent hover:text-accent/80">help@salmonwallet.io</a>.
              {' '}We will use reasonable efforts to accommodate your request to the extent required by law, provided that we may be required to retain personal information to comply with legal requirements, accounting obligations, or for business purposes. Please note that copies of information that you have updated, modified or deleted may remain viewable in cached and archived pages of the Site for a period of time.
            </p>

            <p>
              We may send you periodic promotional or informational emails to you. You may opt-out such communications by following the opt-out instructions contained in the email. Please note that it may take us up to 10 business days to process your opt-out requests.
            </p>

            <p>
              We may change this Policy from time to time, so please be sure to check back periodically. We will post any changes to this Policy on the Site.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
