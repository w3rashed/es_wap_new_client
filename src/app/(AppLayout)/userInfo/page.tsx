'use client';
import React, { useState, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { FaIdCard, FaPhone } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FaArrowRight } from 'react-icons/fa6';
import useAxiosPublic from '@/hooks/UseAxiosPublic';
import UseAxiosOrdererData from '@/hooks/UseAxiosOrdererData';

type FormData = {
    iquamaNumber: string;
    mobileNumber: string;
};

// Separate component that uses useSearchParams
function UserInfoContent() {
    const [mobileSuffix, setMobileSuffix] = useState('');
    const router = useRouter();
    const axiosPublic = useAxiosPublic();
    
    // Use useSearchParams in this component
    const { useSearchParams } = require('next/navigation');
    const searchParams = useSearchParams();
    const productDetails = searchParams.get('product_details');
    const details = productDetails ? JSON.parse(decodeURIComponent(productDetails)) : null;
    
    const { refetch } = UseAxiosOrdererData("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const handleOrder = async (data: FormData) => {
        if (mobileSuffix.length !== 8) {
            toast.error('Mobile number must be 10 digits including 05');
            return;
        }

        const fullMobile = `05${mobileSuffix}`;
        
        // Construct order data
        const orderData = {
            mobileNumber: fullMobile,
            iquamaNumber: data.iquamaNumber,
            productName: details?.ModelName || '',
            birthDate: details?.birthDate || '',
            storage: details?.storage || '',
            color: details?.color || '',
            nationality: details?.nationality || '',
        };

        try {
            const response = await axiosPublic.post('dashboard/orders', orderData);
            
            if (response.status === 200 || response.status === 201) {
                refetch();
                toast.success(`${response.data.message}`);
                localStorage.setItem('product', JSON.stringify(orderData));
                router.push(`/verification/${orderData.iquamaNumber}`);
            } else {
                toast.error(response.data.message || 'Failed to place order');
            }
        } catch (error: any) {
            const message = error.response?.data?.message || 'Something went wrong';
            toast.error(message);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">User Information</h2>

            <form onSubmit={handleSubmit(handleOrder)} className="space-y-4">
                {/* Iqama Number */}
                <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-gray-700">
                        <FaIdCard className="text-orange-500" />
                        <span>Iquama Number</span>
                    </label>
                    <input
                        type="text"
                        maxLength={10}
                        {...register('iquamaNumber', {
                            required: 'Iqama number is required',
                            pattern: {
                                value: /^[1-2][0-9]{9}$/,
                                message: 'Iqama number must start with 1 or 2 and be exactly 10 digits',
                            },
                        })}
                        onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '')}
                        placeholder="Enter your Iqama number"
                        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                            errors.iquamaNumber
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-orange-500'
                        }`}
                    />
                    {errors.iquamaNumber && (
                        <p className="text-red-500 text-sm">{errors.iquamaNumber.message}</p>
                    )}
                </div>

                {/* Mobile Number */}
                <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-gray-700">
                        <FaPhone className="text-orange-500" />
                        <span>Mobile Number</span>
                    </label>
                    <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-gray-100 border border-gray-300 rounded-md">05</span>
                        <input
                            type="text"
                            maxLength={8}
                            value={mobileSuffix}
                            onChange={(e) => setMobileSuffix(e.target.value.replace(/[^0-9]/g, ''))}
                            placeholder="XXXXXXXX"
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                                errors.mobileNumber
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-orange-500'
                            }`}
                        />
                    </div>
                    {errors.mobileNumber && (
                        <p className="text-red-500 text-sm">{errors.mobileNumber.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                >
                    Next <FaArrowRight />
                </button>
            </form>
        </div>
    );
}

// Loader component
function LoadingUserInfo() {
    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="animate-pulse">
                <div className="h-8 w-3/4 bg-gray-200 rounded mb-6"></div>
                <div className="space-y-4">
                    <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                    <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    );
}

// Main component with Suspense boundary
const UserInfo = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <Suspense fallback={<LoadingUserInfo />}>
                <UserInfoContent />
            </Suspense>
        </div>
    );
};

export default UserInfo;