'use client'
import React from 'react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Image from 'next/image';
import SectionContainer from '@/components/shared/SectionContainer';
import UseGetBanner from '@/hooks/UseGetBanner';

const BannerSlider = () => {
    const { bannerImage, isLoading, error, refetch } = UseGetBanner();
    console.log(bannerImage);

    // If the data is loading, show a loader
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // If there is an error fetching the banner images, show an error message
    if (error) {
        return <div>Error fetching banner images.</div>;
    }

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
                    {/* Render banners dynamically */}
                    {Array.isArray(bannerImage) && bannerImage.length > 0 && bannerImage.map((banner: any) => (
                        <SwiperSlide key={banner._id}>
                            <div className="w-full" style={{ paddingTop: '40%' }}>
                                <Image
                                    src={banner.bannerImg} // Use the base64 banner image string
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
