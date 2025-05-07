'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import image1 from "../../../../assets/img/iphone-16-pro-256gb-white-titanium.jpg"
import { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';

interface IPhoneProduct {

    id: string;
    name: string;
    storage: string;
    price: number;
    originalPrice: number;
    rating: number;
    imageUrl: StaticImageData;
}

const IPhoneSeriesSlider = () => {
    const router = useRouter();
    const products: IPhoneProduct[] = [
        {
            id: "1",
            name: 'iPhone 16 Pro Max',
            storage: '256GB',
            price: 219999,
            originalPrice: 249999,
            rating: 5.0,
            imageUrl: image1
        },
        {
            id: "2",
            name: 'iPhone 16',
            storage: '128GB',
            price: 146999,
            originalPrice: 169999,
            rating: 5.0,
            imageUrl: image1
        },
        {
            id: "3",
            name: 'iPhone 16 Pro',
            storage: '128GB',
            price: 184999,
            originalPrice: 209999,
            rating: 5.0,
            imageUrl: image1
        },
        {
            id: "4",
            name: 'iPhone 16 Pro',
            storage: '256GB',
            price: 201999,
            originalPrice: 229999,
            rating: 5.0,
            imageUrl: image1
        },
        {
            id: "5",
            name: 'iPhone 16',
            storage: '256GB',
            price: 164999,
            originalPrice: 189999,
            rating: 5.0,
            imageUrl: image1
        },
        {
            id: "6"  ,
            name: 'iPhone 16',
            storage: '256GB',
            price: 164999,
            originalPrice: 189999,
            rating: 5.0,
            imageUrl: image1
        },
        {
            id: "7",
            name: 'iPhone 16',
            storage: '256GB',
            price: 164999,
            originalPrice: 189999,
            rating: 5.0,
            imageUrl: image1
        },
        {
            id: "8",
            name: 'iPhone 16',
            storage: '256GB',
            price: 164999,
            originalPrice: 189999,
            rating: 5.0,
            imageUrl: image1
        },
    ];

   
      
      
    const handleBuyNow = (product: IPhoneProduct) => {
        const params = new URLSearchParams({
          id: product.id.toString(),
          name: product.name,
          storage: product.storage,
          price: product.price.toString(),
          originalPrice: product.originalPrice.toString(),
          rating: product.rating.toString(),
        });
      
        router.push(`/details?${params.toString()}`);
      };
      
    

    return (
        <div className="w-full relative px-4 md:px-8">
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
                {products.map((product) => (
                    <SwiperSlide key={product.id}>
                        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="relative w-full h-[280px] bg-gray-50 rounded-t-lg p-4">
                                <Image
                                    src={product.imageUrl}
                                    alt={product.name}
                                    fill
                                    className="object-contain p-4"
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                    priority
                                />
                            </div>
                            <div className="p-4 text-center">
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">{product.name} {product.storage}</h4>
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <span className="text-xl font-bold text-orange-500">${product.price.toLocaleString()}</span>
                                    <span className="text-sm text-gray-500 line-through">${product.originalPrice.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-center gap-1 mb-4">
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar key={index} className="text-yellow-400" />
                                    ))}
                                    <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleBuyNow(product)} className="flex-1 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition-colors text-sm font-medium">
                                        Buy Now
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
