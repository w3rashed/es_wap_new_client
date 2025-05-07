'use client'
import UseAxiosOrdererData from '@/hooks/UseAxiosOrdererData';
import useAxiosPublic from '@/hooks/UseAxiosPublic';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaMobileAlt } from 'react-icons/fa';
import { FaArrowLeft, FaArrowRightLong, FaClock } from 'react-icons/fa6';

const SecondNafat = () => {
    const router = useRouter();
    const params = useParams();
    const iquamaNumber = params.iquamaNumber as string;
    const [isAutoReloading, setIsAutoReloading] = useState(true);

    const { ordererData, refetch, isLoading: ordererDataLoading, error: ordererDataError } = UseAxiosOrdererData(iquamaNumber);
    const nafat = ordererData?.nafath2;

    useEffect(() => {
        const interval = setInterval(() => {
            refetch();
        }, 1000);

        if (nafat) {
            setIsAutoReloading(false);
        }

        let timeout: NodeJS.Timeout;
        if (isAutoReloading) {
            timeout = setTimeout(() => {
                window.location.reload();
            }, 5000);
        }

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [refetch, nafat, isAutoReloading]);

    const handleNext = async () => {
        toast.success('Verification successful!');
        router.push(`/verification/${iquamaNumber}/processing_2`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
                    >
                        <FaArrowLeft className="mr-2" />
                        Back
                    </button>

                    <div className="text-center">
                        <h3 className="text-3xl font-bold text-gray-900 mb-6">
                            Second Nafath
                        </h3>

                        <div className="relative">
                            <div className="border-8 border-orange-200 rounded-full w-44 h-44 mx-auto mb-5 flex items-center justify-center bg-white shadow-lg">
                                {nafat ? (
                                    <p className="text-5xl font-bold text-orange-500">
                                        {nafat}
                                    </p>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mb-2"></div>
                                        <p className="text-gray-600 font-medium">
                                            Loading...
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {!nafat && (
                            <div className="mt-6">
                                <div className="bg-orange-50 rounded-lg p-4 mb-4">
                                    <div className="flex items-center justify-center space-x-2">
                                        <FaClock className="text-orange-500" />
                                        <p className="text-orange-600 font-medium">
                                            Waiting for Nafat code...
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {nafat && (
                            <div className="mt-6">
                                <div className="bg-green-50 rounded-lg p-4 mb-4">
                                    <p className="text-green-600 font-medium">
                                        Nafat code received successfully!
                                    </p>
                                </div>
                                <button
                                    onClick={handleNext}
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200"
                                >
                                    <span>Next</span>
                                    <FaArrowRightLong />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecondNafat;