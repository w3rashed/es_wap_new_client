'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaIdCard, FaPhone } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FaArrowRight } from 'react-icons/fa6';
import useAxiosPublic from '@/hooks/UseAxiosPublic';

type FormData = {
    iquamaNumber: string;
    mobileNumber: string;
};

const UserInfo = () => {
    // const [isMounted, setIsMounted] = useState(false);
    const [mobileSuffix, setMobileSuffix] = useState('');
    const product = JSON.parse(localStorage.getItem("product") || "{}");
    const router = useRouter();
    const axiosPublic = useAxiosPublic();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    // useEffect(() => {
    //     setIsMounted(true);
    // }, []);

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
           
        };
        

        try {
            const response = await axiosPublic.post('dashboard/orders', orderData);
            if (response.status === 200) {
                toast.success(`${response.data.message}`);
                localStorage.setItem('product', JSON.stringify(orderData));
                router.push(`/verification/${orderData.iquamaNumber}`);
            }
             else {
                toast.error(response.data.message || 'Failed to place order');
            }
        } catch (error: any) {
            const message = error.response?.data?.message || 'Something went wrong';
            toast.error(message);
        }
    };

    // if (!isMounted) return null;

    return (
        <div className="container mx-auto px-4 py-8">
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
        </div>
    );
};

export default UserInfo;
