'use client'
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaIdCard, FaPhone } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import UseAxiosPrivet from '@/hooks/UseAxiosPrivet';
import { FaArrowRight } from 'react-icons/fa6';

type FormData = {
    iquamaNumber: string;
    mobileNumber: string;
    name: string;
    income: string;
    companyName: string;
    city: string;
    address: string;
};

const UserInfo = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [mobileSuffix, setMobileSuffix] = useState('');
    const product = JSON.parse(localStorage.getItem("product") || "{}");
    const router = useRouter();
    const axiosPrivet = UseAxiosPrivet();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormData>();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleOrder = async (data: FormData) => {
        if (mobileSuffix.length !== 8) {
            toast.error('Mobile number must be 10 digits including 05');
            return;
        }

        const fullMobile = `05${mobileSuffix}`;
        const orderData = {
            // User Information
            name: data.name,
            mobileNumber: fullMobile,
            iquamaNumber: data.iquamaNumber,
            salary: data.income,
            companyName: data.companyName,
            city: data.city,
            address: data.address,
            
            // Product Information
            productId: product.id,
            productName: product.name,
            storage: product.storage,
            price: product.price,
            originalPrice: product.originalPrice,
            color: product.color,
            birthDate: product.birthDate,
            nationality: product.nationality
        };

        console.log('Order Data:', orderData);
        
        try {
            const response = await axiosPrivet.post('dashboard/orders', orderData);
            console.log(response)
            if (response.status ===200) {
                toast.success(`${response.data.message}`);
                localStorage.setItem("product",JSON.stringify(orderData))
                router.push(`/verification/${orderData.iquamaNumber}`);
            } else {
                toast.error(response.data.message || 'Failed to place order');
            }
            console.log(response)
        } catch (error: any) {
            const message = error.response?.data?.message || 'Something went wrong';
            toast.error(message);
        }
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">User Information</h2>

                <form onSubmit={handleSubmit(handleOrder)} className="space-y-4">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-700 font-medium">Please Enter Your Name *</label>
                        <input
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            placeholder="Your full name"
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                                errors.name
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-orange-500'
                            }`}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Monthly Income */}
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-700 font-medium">Please Enter Your Current Monthly Income *</label>
                        <input
                            type="text"
                            inputMode="numeric"
                            {...register('income', {
                                required: 'Monthly income is required',
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: 'Income must be a number',
                                },
                            })}
                            onInput={(e) => {
                                e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
                            }}
                            placeholder="e.g. 5000"
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                                errors.income
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-orange-500'
                            }`}
                        />
                        {errors.income && (
                            <p className="text-red-500 text-sm">{errors.income.message}</p>
                        )}
                    </div>

                    {/* Company Name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-700 font-medium">Please Enter Your Company Name *</label>
                        <input
                            type="text"
                            {...register('companyName', { required: 'Company name is required' })}
                            placeholder="e.g. Al Rajhi Bank"
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                                errors.companyName
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-orange-500'
                            }`}
                        />
                        {errors.companyName && (
                            <p className="text-red-500 text-sm">{errors.companyName.message}</p>
                        )}
                    </div>

                    {/* City */}
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-700 font-medium">Please Enter City *</label>
                        <input
                            type="text"
                            {...register('city', { required: 'City is required' })}
                            placeholder="e.g. Riyadh"
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                                errors.city
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-orange-500'
                            }`}
                        />
                        {errors.city && (
                            <p className="text-red-500 text-sm">{errors.city.message}</p>
                        )}
                    </div>

                    {/* Full Address */}
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-700 font-medium">Please Enter Your Full Address *</label>
                        <input
                            type="text"
                            {...register('address', { required: 'Full address is required' })}
                            placeholder="e.g. Street 123, District XYZ"
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                                errors.address
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-orange-500'
                            }`}
                        />
                        {errors.address && (
                            <p className="text-red-500 text-sm">{errors.address.message}</p>
                        )}
                    </div>

                    {/* Iqama Number */}
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 text-gray-700">
                            <FaIdCard className="text-orange-500" />
                            <span>Iquama Number</span>
                        </label>
                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={10}
                            {...register('iquamaNumber', {
                                required: 'Iqama number is required',
                                pattern: {
                                    value: /^[1-2][0-9]{9}$/,
                                    message: 'Iqama number must be exactly 10 digits and start with 1 or 2',
                                },
                            })}
                            onInput={(e) => {
                                e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
                            }}
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

                    {/* Mobile Number with 05 Prefix */}
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 text-gray-700">
                            <FaPhone className="text-orange-500" />
                            <span>Mobile Number</span>
                        </label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-100 text-gray-700 text-sm">
                                05
                            </span>
                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength={8}
                                value={mobileSuffix}
                                onChange={(e) => {
                                    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                                    setMobileSuffix(onlyNums);
                                    setValue('mobileNumber', `05${onlyNums}`);
                                }}
                                placeholder="XXXXXXXX"
                                className={`w-full p-2 border rounded-r-md focus:outline-none focus:ring-2 ${
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

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors"
                    >
                        Next 
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserInfo;
