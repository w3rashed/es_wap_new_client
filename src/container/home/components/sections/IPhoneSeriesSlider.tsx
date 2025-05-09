'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import UseGetConsumerProducts from '@/hooks/UseGetConsumerProducts';

interface Product {
    _id: string;
    BrandName: string;
    ModelName: string;
    rating: number;
    OfferPrice: number;
    RegularPrice: number;
    status: 'In Stock' | 'Stock Out';
    color: string;
    mobileImg: string;
}

const IPhoneSeriesSlider = () => {
    const { ConsumerProducts, isLoading, error, refetch } = UseGetConsumerProducts();
    const router = useRouter();

    // Filter only Apple products
    const appleProducts = ConsumerProducts?.filter((product: { BrandName: string; }) => product.BrandName === 'Apple') || [];

    const handleBuyNow = (product: Product) => {
        router.push(`/details?id=${product._id}`);
    };

    if (isLoading) {
        return (
            <div className="w-full flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full text-center py-8 text-red-500">
                Error loading products: {error.message}
            </div>
        );
    }

    // Don't render if no Apple products
    if (appleProducts.length === 0) {
        return null;
    }

    return (
        <div className="w-full relative px-4 md:px-8">
            <h3 className='text-[30px] leading-[1.2] font-bold text-gray-900'>
                    iPhone  Series
            </h3>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                modules={[Navigation, Autoplay]}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                loop={true}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 4,
                    },
                }}
                className="w-full py-8"
            >
                {appleProducts.map((product: Product) => (
                    <SwiperSlide key={product._id}>
                        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="relative w-full h-[280px] bg-gray-50 rounded-t-lg p-4">
                                <Image
                                    src={`data:image/jpeg;base64,${product.mobileImg}`}
                                    alt={product.ModelName}
                                    fill
                                    className="object-contain p-4"
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                    priority
                                />
                            </div>
                            <div className="p-4 text-center">
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">{product.BrandName} {product.ModelName}</h4>
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <span className="text-xl font-bold text-orange-500">${product.OfferPrice.toLocaleString()}</span>
                                    <span className="text-sm text-gray-500 line-through">${product.RegularPrice.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-center gap-1 mb-4">
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar 
                                            key={index} 
                                            className={`${index < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                        />
                                    ))}
                                    <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => handleBuyNow(product)} 
                                        className="flex-1 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition-colors text-sm font-medium"
                                        disabled={product.status === 'Stock Out'}
                                    >
                                        {product.status === 'Stock Out' ? 'Out of Stock' : 'Buy Now'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default IPhoneSeriesSlider;
