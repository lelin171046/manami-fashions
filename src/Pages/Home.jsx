import React from 'react';
import Hero from '../Components/Hero';
import Hero2 from '../Components/Hero2';
import BrandSlider from '../Components/BrandSlider';
import WorkWithUs from './WorkWithUs';
import Hero1 from '../Components/Hero1';
import Hero3 from '../Components/Hero3';
import Cer from '../Components/Cer';
import Buyer from '../Components/Buyer';

const Home = () => {
    return (
        <div>

            <Hero3></Hero3>
            <Hero></Hero>
            <Cer></Cer>
            <Hero1></Hero1>
            <Buyer></Buyer>
            <Hero2></Hero2>
            <BrandSlider></BrandSlider>
            <WorkWithUs></WorkWithUs>
           
        </div>
    );
};

export default Home;