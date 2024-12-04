import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import PopularDeals from '../components/PopularDeals';
import Categories from '../components/Categories';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import DownloadApp from '../components/DownloadApp';

const Home = () => {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <PopularDeals />
      <Categories />
      <Testimonials />
      <FAQ />
      <DownloadApp />
    </main>
  );
};

export default Home;