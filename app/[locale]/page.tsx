import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Chains from '@/components/Chains';
import Why from '@/components/Why';
import ForProtocols from '@/components/ForProtocols';
import CardSection from '@/components/CardSection';
import ProofStrip from '@/components/sections/ProofStrip';
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
        <Why />
        <ForProtocols />
        <CardSection id="features" />
        <CardSection id="security" />
        <ValidatorStats />
        <Manifesto />
        <FAQ />
        <GetSalmon />
      </main>
      <Footer />
    </>
  );
}
