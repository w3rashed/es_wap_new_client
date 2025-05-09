
import React from 'react'
import BannerMarquee from '@/container/home/components/sections/BannerMarquee';
import BannerSlider from '@/container/home/components/sections/BannerSlider';
import IPhoneSeries from '@/container/home/components/sections/IPhoneSeries';
import IPhoneSeriesSlider from '@/container/home/components/sections/IPhoneSeriesSlider';
import SamsungSeriesSlider from '@/container/home/components/sections/SamsungSeriesSlider';
import OnePlusSeriesSlider from '@/container/home/components/sections/OnePlusSeriesSlider ';

const HomePage = () => {
    
    return (
        <div className='px-2'>
            <div className='container mx-auto'>
                <BannerSlider />
            </div>
            <div className='container mx-auto my-10'>
                <BannerMarquee />
            </div>
            <div className='container mx-auto my-10'>
                
                <IPhoneSeriesSlider />
            </div>
            <div className='container mx-auto my-10'>  
                <SamsungSeriesSlider />
            </div>
            <div className='container mx-auto my-10'>  
                <OnePlusSeriesSlider />
            </div>
        </div>
    );
};

export default HomePage;