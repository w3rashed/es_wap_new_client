'use client'
import React from 'react';
import Marquee from 'react-fast-marquee';
import { FaApple } from 'react-icons/fa';
import { LiaGripLinesVerticalSolid } from 'react-icons/lia';
import { MdOutlineCurrencyExchange } from 'react-icons/md';
import Image from 'next/image';
import apple from '@/assets/icon/apple.png'
import productIcon from '@/assets/icon/product_icon.png'
import discount from '@/assets/icon/discount.png'
import exchange from '@/assets/icon/exchange.png'
import Delivery from '@/assets/icon/delivery.png'
import Secure from '@/assets/icon/Secure.png'


const BannerMarquee = () => {
    return (
        <div>
            <Marquee speed={50}>
                    <div className='flex items-center gap-8 px-4'>
                        {/* category 1   */}
                        <div className=''>
                            <Image src={apple} alt="Apple Icon" width={100} height={48} />
                        </div>
                        <LiaGripLinesVerticalSolid className='text-4xl' />
                        {/* category 2   */}
                        <div className='flex items-center gap-2 '>
                            <Image src={productIcon} alt="Product Icon" width={48} height={48} />
                            <h3 className='font-bold'>Official Product</h3>
                        </div>
                        <LiaGripLinesVerticalSolid className='text-4xl' />
                        {/* category 3   */}
                        <div className='flex items-center gap-2 '>
                            <Image src={discount} alt="Discount Icon" width={48} height={48} />
                            <h3 className='font-bold'>Official Product</h3>
                        </div>
                        <LiaGripLinesVerticalSolid className='text-4xl' />
                        {/* category 4   */}
                        <div className='flex items-center  gap-2'>
                            <Image src={exchange} alt="Exchange Icon" width={48} height={48} />
                            <h3 className='font-bold ' >Exchange</h3>
                        </div>
                        <LiaGripLinesVerticalSolid className='text-4xl' />
                        {/* category 5   */}
                        <div className='flex items-center gap-2 '>
                            <Image src={Delivery} alt="Delivery Icon" width={48} height={48} />
                            <h3 className='font-bold'>Fastest Delivery</h3>
                        </div>
                        <LiaGripLinesVerticalSolid className='text-4xl' />
                        {/* category 6   */}
                        <div className='flex items-center gap-2 '>
                            <Image src={Secure} alt="Secure Payment Icon" width={48} height={48} />
                            <h3 className='font-bold'>100% Secure Payment</h3>
                        </div>
                        <LiaGripLinesVerticalSolid className='text-4xl' />
                    </div>
                </Marquee>
        </div>
    );
};

export default BannerMarquee;