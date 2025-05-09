'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';

const CheckMailPage = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="bg-[#e55c00] bg-opacity-10 p-4 rounded-full">
                            <FaEnvelope className="text-[#e55c00] text-4xl" />
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                        Check Your Email
                    </h1>

                    <p className="text-gray-600 mb-6">
                        We have sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.
                    </p>

                    <div className="space-y-4">
                        <button
                            onClick={() => router.push('/adminLogin')}
                            className="w-full h-12 bg-[#e55c00] text-white rounded-md hover:bg-[#d15400] transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                            <FaArrowLeft />
                            <span>Back to Login</span>
                        </button>

                        <p className="text-sm text-gray-500">
                            Didn't receive the email? Check your spam folder or{' '}
                            <button
                                onClick={() => router.push('/forgot-password')}
                                className="text-[#e55c00] hover:text-[#d15400] font-medium"
                            >
                                try again
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckMailPage; 