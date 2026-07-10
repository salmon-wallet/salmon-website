import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Chains from '@/components/Chains';
import Why from '@/components/Why';
import ForProtocols from '@/components/ForProtocols';
import Ecosystem from '@/components/sections/Ecosystem';
import Security from '@/components/Security';
import ProofStrip from '@/components/sections/ProofStrip';
import WhatMattersFirst from '@/components/sections/WhatMattersFirst';
import CapabilityBento from '@/components/sections/CapabilityBento';
import Manifesto from '@/components/Manifesto';
import FAQ from '@/components/FAQ';
import GetSalmon from '@/components/GetSalmon';
import Footer from '@/components/Footer';
import ValidatorStats from '@/components/sections/ValidatorStats';
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
        <ProofStrip />
        {/* <Chains /> */}
        <WhatMattersFirst />
        <Why />
        <ForProtocols />
        <Ecosystem />
        <CapabilityBento />
        <Security />
        <ValidatorStats />
        <Manifesto />
        <FAQ />
        <GetSalmon />
      </main>
      <Footer />
    </>
  );
}
