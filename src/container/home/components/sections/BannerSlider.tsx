'use client'
import React from 'react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Image from 'next/image';
import Image1 from '../../../../assets/img/iphone-16_1_1920-x-570949.png';
import SectionContainer from '@/components/shared/SectionContainer';

const BannerSlider = () => {
    const bannerImages = [
        {
            id: 1,
            imageUrl: Image1,
        },
        {
            id: 2,
            imageUrl: Image1,
        },
        {
            id: 3,
            imageUrl: Image1,
        },
    ];

    return (
        <SectionContainer>
            <div className="w-full">
                <Swiper 
                    pagination={{ 
                        clickable: true,
                        dynamicBullets: true
                    }} 
                    modules={[Pagination, Autoplay]} 
                    className="w-full"
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                >
                    {bannerImages.map((banner) => (
                        <SwiperSlide key={banner.id}>
                            <div className=" w-full" style={{ paddingTop: '40%' }}>
                                <Image
                                    src={banner.imageUrl}
                                    alt="Banner Image"
                                    fill
                                    sizes="100vw"
                                    style={{ objectFit: 'cover' }}
                                    priority
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </SectionContainer>
    );
};

export default BannerSlider;