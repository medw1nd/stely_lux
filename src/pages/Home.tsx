import React from 'react';
import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import Materials from '../components/sections/Materials';
import Portfolio from '../components/sections/Portfolio';
import Contact from '../components/sections/Contact';

const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <Features />
            <Materials />
            <Portfolio />
            <Contact />
        </>
    );
};

export default Home;
