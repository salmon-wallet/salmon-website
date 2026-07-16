import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Why from '@/components/Why';
import WhatMattersFirst from '@/components/sections/WhatMattersFirst';
// import Ecosystem from '@/components/sections/Ecosystem';
import Powerups from '@/components/sections/Powerups';
// import WhoItsFor from '@/components/sections/WhoItsFor';
import Manifesto from '@/components/Manifesto';
import ValidatorStats from '@/components/sections/ValidatorStats';
import FAQ from '@/components/FAQ';
import GetSalmon from '@/components/GetSalmon';
import Footer from '@/components/Footer';
import ParticlesBackground from '@/components/ui/ParticlesBackground';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ParticlesBackground />
      <Navbar />
      <main>
        <Hero />
        <Why />
        <WhatMattersFirst />
        {/* <Ecosystem /> */}
        <Powerups />
        {/* <WhoItsFor /> */}
        <Manifesto />
        <ValidatorStats />
        <FAQ />
        <GetSalmon />
      </main>
      <Footer />
    </>
  );
}
