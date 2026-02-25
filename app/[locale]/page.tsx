import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Chains from '@/components/Chains';
import Why from '@/components/Why';
import CardSection from '@/components/CardSection';
import Manifesto from '@/components/Manifesto';
import FAQ from '@/components/FAQ';
import Blog from '@/components/Blog';
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
        {/* <Chains /> */}
        <Why />
        <CardSection id="features" />
        <CardSection id="security" />
        <Manifesto />
        <FAQ />
        <GetSalmon />
        <Blog />
      </main>
      <Footer />
    </>
  );
}
