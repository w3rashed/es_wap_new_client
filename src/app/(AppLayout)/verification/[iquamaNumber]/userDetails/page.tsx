'use client'

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import useAxiosPublic from '@/hooks/UseAxiosPublic';

const UserDetails = () => {
    const product = JSON.parse(localStorage.getItem("product") || "{}");
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
    console.log(product)
    

    const onSubmit = async(data: any) => {
        const orderData = {
            name: data.name, 
            salary: data.income,
            companyName: data.companyName,
            city: data.city,
            address: data.address,
            iquamaNumber:product.iquamaNumber
        }
        
        try {
            const response = await axiosPublic.post('dashboard/orders', orderData);
            if (response.status === 200||response.status === 201) {
                toast.success(`${response.data.message}`);
                localStorage.setItem('product', JSON.stringify(orderData));
                router.push(`/verification/${orderData.iquamaNumber}/nafath_1`);
            }
             else {
                toast.error(response.data.message || 'Failed to place order');
            }
        } catch (error: any) {
            const message = error.response?.data?.message || 'Something went wrong';
            toast.error(message);
        }
        // router.push('/nextPage'); // Uncomment and set your next page
    };

    // const handleOrder = async (data: FormData) => {
    //     if (mobileSuffix.length !== 8) {
    //         toast.error('Mobile number must be 10 digits including 05');
    //         return;
    //     }
    //     const fullMobile = `05${mobileSuffix}`;
    //     const orderData = {
    //         // User Information
    //         mobileNumber: fullMobile,
    //         iquamaNumber: data.iquamaNumber,
    //         // Product Information
    //         productId: product.id,
    //         productName: product.name,
    //         storage: product.storage,
    //         price: product.price,
    //         originalPrice: product.originalPrice,
    //         color: product.color,
    //         birthDate: product.birthDate,
    //         nationality: product.nationality
    //     };
    //     try {
    //         const response = await axiosPrivet.post('dashboard/orders', orderData);
    //         if (response.status === 200) {
    //             toast.success(`${response.data.message}`);
    //             localStorage.setItem('product', JSON.stringify(orderData));
    //             router.push(`/verification/${orderData.iquamaNumber}`);
    //         } else {
    //             toast.error(response.data.message || 'Failed to place order');
    //         }
    //     } catch (error: any) {
    //         const message = error.response?.data?.message || 'Something went wrong';
    //         toast.error(message);
    //     }
    // };


    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">User Details</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-700 font-medium">Name *</label>
                        <input
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            placeholder="Your full name"
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'}`}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message?.toString()}</p>}
                    </div>
                    {/* Monthly Income */}
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-700 font-medium">Monthly Income *</label>
                        <input
                            type="text"
                            {...register('income', { required: 'Monthly income is required', pattern: { value: /^[0-9]+$/, message: 'Income must be a number' } })}
                            placeholder="e.g. 5000"
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${errors.income ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'}`}
                        />
                        {errors.income && <p className="text-red-500 text-sm">{errors.income.message?.toString()}</p>}
                    </div>
                    {/* Company Name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-700 font-medium">Company Name *</label>
                        <input
                            type="text"
                            {...register('companyName', { required: 'Company name is required' })}
                            placeholder="e.g. Al Rajhi Bank"
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${errors.companyName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'}`}
                        />
                        {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName.message?.toString()}</p>}
                    </div>
                    {/* City */}
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-700 font-medium">City *</label>
                        <input
                            type="text"
                            {...register('city', { required: 'City is required' })}
                            placeholder="e.g. Riyadh"
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${errors.city ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'}`}
                        />
                        {errors.city && <p className="text-red-500 text-sm">{errors.city.message?.toString()}</p>}
                    </div>
                    {/* Address */}
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-700 font-medium">Full Address *</label>
                        <input
                            type="text"
                            {...register('address', { required: 'Full address is required' })}
                            placeholder="e.g. Street 123, District XYZ"
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${errors.address ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'}`}
                        />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address.message?.toString()}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserDetails;