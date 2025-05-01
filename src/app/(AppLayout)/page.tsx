
import React from 'react'
import BannerMarquee from '@/container/home/components/sections/BannerMarquee';
import BannerSlider from '@/container/home/components/sections/BannerSlider';
import IPhoneSeries from '@/container/home/components/sections/IPhoneSeries';
import IPhoneSeriesSlider from '@/container/home/components/sections/IPhoneSeriesSlider';

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
                <h3 className='text-[30px] leading-[1.2] font-bold text-gray-900'>
                    iPhone  Series
                </h3>
                <IPhoneSeriesSlider />
            </div>
            <div className='container mx-auto my-10'>
                <h3 className='text-[30px] leading-[1.2] font-bold text-gray-900'>
                    Samsung  Series
                </h3>
                <IPhoneSeriesSlider />
            </div>
        </div>
    );
};

export default HomePage;