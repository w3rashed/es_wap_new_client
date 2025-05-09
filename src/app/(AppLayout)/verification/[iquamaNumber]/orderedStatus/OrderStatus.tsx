"use client"
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import UseAxiosOrdererData from '@/hooks/UseAxiosOrdererData';
import { FaCheckCircle, FaTimesCircle, FaSpinner, FaHome } from 'react-icons/fa';

// Client component
const OrderStatus = () => {
    const router = useRouter();
    const params = useParams();
    const iquamaNumber = params.iquamaNumber as string;
    const [status, setStatus] = useState<string | null>(null);
    const { ordererData, isLoading, refetch } = UseAxiosOrdererData(iquamaNumber);

    useEffect(() => {
        const checkStatus = async () => {
            try {
                await refetch();
                if (ordererData?.status === 'Approved' || ordererData?.status === 'Rejected') {
                    setStatus(ordererData?.status);
                    toast.success(`Order ${ordererData?.status.toLowerCase()}`);
                    
                    // Auto redirect after 10 seconds
                    setTimeout(() => {
                        router.push('/');
                    }, 10000);
                }
            } catch (error) {
                console.error('Error checking status:', error);
            }
        };

        const interval = setInterval(checkStatus, 5000);
        return () => clearInterval(interval);
    }, [ordererData?.status, refetch, router]);

    const handleHomeClick = () => {
        router.push('/');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform transition-all duration-300 hover:scale-105">
                    <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-orange-500 border-solid mx-auto"></div>
                    <p className="mt-6 text-gray-600 text-lg font-medium">Loading order status...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform transition-all duration-300 hover:scale-105">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Order Status</h2>
                {status ? (
                    <div className="space-y-4">
                        <div className={`text-4xl mb-4 ${
                            status === 'Approved' ? 'text-green-500' : 'text-red-500'
                        }`}>
                            {status === 'Approved' ? (
                                <FaCheckCircle className="mx-auto animate-bounce" />
                            ) : (
                                <FaTimesCircle className="mx-auto animate-bounce" />
                            )}
                        </div>
                        <div className={`text-2xl font-bold ${
                            status === 'Approved' ? 'text-green-600' : 'text-red-600'
                        }`}>
                            {status}
                        </div>
                        <p className="text-gray-600 mt-2">
                            {status === 'Approved' 
                                ? 'Your order has been approved successfully!' 
                                : 'Your order has been rejected. Please contact support.'}
                        </p>
                        <div className="mt-6">
                            <button
                                onClick={handleHomeClick}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 mx-auto transition-all duration-300 hover:scale-105"
                            >
                                <FaHome className="text-xl" />
                                <span>Return to Home</span>
                            </button>
                            <p className="text-sm text-gray-500 mt-2">
                                Redirecting to home in 10 seconds...
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="text-orange-500 text-5xl mb-4">
                            <FaSpinner className="mx-auto animate-spin" />
                        </div>
                        <div className="text-gray-600">
                            <p className="text-xl font-medium mb-2">Processing Your Order</p>
                            <p className="text-sm text-gray-500">Please wait while we verify your order details...</p>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                            <div className="bg-orange-500 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderStatus;