'use client'
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ProcessingSecondClient = () => {
    const router = useRouter();
    const params = useParams();
    const iquamaNumber = params.iquamaNumber as string;
    const [secondsLeft, setSecondsLeft] = useState(12);

    useEffect(() => {
        if (secondsLeft === 0) {
            router.push(`/verification/${iquamaNumber}/second_otp`);
            return;
        }

        const timer = setInterval(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [secondsLeft, router, iquamaNumber]);

    const formatTime = () => {
        const minutes = Math.floor(secondsLeft / 60);
        const seconds = secondsLeft % 60;
        return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
                <div 
                    role="alert" 
                    aria-live="polite" 
                    className="sr-only"
                >
                    {`Time remaining: ${formatTime()}`}
                </div>

                <div className="flex justify-center mb-6">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500 border-solid"></div>
                </div>

                <h4 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                    Processing Your Request
                </h4>
                
                <div className="text-center mb-6">
                    <div className="text-3xl font-mono text-orange-600 mb-2">
                        {formatTime()}
                    </div>
                    <p className="text-gray-600">
                        Please wait while we process your request
                    </p>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                    <div 
                        className="bg-orange-600 h-2.5 rounded-full transition-all duration-1000" 
                        style={{ width: `${(12 - secondsLeft) * (100 / 12)}%` }}
                    ></div>
                </div>

                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
                    <p className="text-sm text-orange-700">
                        Please do not press back or refresh the page during processing.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProcessingSecondClient;