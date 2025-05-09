'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '@/hooks/UseAxiosPublic';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FaLock } from 'react-icons/fa';

interface ResetPasswordForm {
    newPassword: string;
    confirmPassword: string;
}

const ResetPasswordPage = ({ params }: { params: { token: string } }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isValidToken, setIsValidToken] = useState(true);
    const router = useRouter();
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, formState: { errors }, watch } = useForm<ResetPasswordForm>();

    useEffect(() => {
        // Validate token when component mounts
        const validateToken = async () => {
            try {
                const response = await axiosPublic.get(`/auth/validate-reset-token/${params.token}`);
                if (response.status !== 200) {
                    setIsValidToken(false);
                    toast.error('Invalid or expired reset link');
                }
            } catch (error) {
                setIsValidToken(false);
                toast.error('Invalid or expired reset link');
            }
        };

        validateToken();
    }, [params.token, axiosPublic]);

    const onSubmit = async (data: ResetPasswordForm) => {
        if (data.newPassword !== data.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axiosPublic.post('/auth/reset-password', {
                token: params.token,
                newPassword: data.newPassword
            });

            if (response.status === 200) {
                toast.success('Password reset successfully');
                router.push('/adminLogin');
            }
        } catch (error: any) {
            const message = error.response?.data?.message || 'Failed to reset password';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isValidToken) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full">
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">
                            Invalid Reset Link
                        </h1>
                        <p className="text-gray-600 mb-6">
                            This password reset link is invalid or has expired. Please request a new password reset link.
                        </p>
                        <button
                            onClick={() => router.push('/forgot-password')}
                            className="w-full h-12 bg-[#e55c00] text-white rounded-md hover:bg-[#d15400] transition-colors duration-200"
                        >
                            Request New Reset Link
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-lg shadow-sm p-8">
                    <div className="flex justify-center mb-6">
                        <div className="bg-[#e55c00] bg-opacity-10 p-4 rounded-full">
                            <FaLock className="text-[#e55c00] text-4xl" />
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Reset Password
                    </h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                New Password
                            </label>
                            <input
                                type="password"
                                {...register('newPassword', {
                                    required: 'New password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters'
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                                        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
                                    }
                                })}
                                className="w-full h-12 px-4 rounded-md border-2 border-[#e55c00] shadow-sm focus:border-[#e55c00] focus:ring-[#e55c00] focus:ring-opacity-50 transition-colors"
                                placeholder="Enter new password"
                            />
                            {errors.newPassword && (
                                <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                {...register('confirmPassword', {
                                    required: 'Please confirm your password',
                                    validate: value => value === watch('newPassword') || 'Passwords do not match'
                                })}
                                className="w-full h-12 px-4 rounded-md border-2 border-[#e55c00] shadow-sm focus:border-[#e55c00] focus:ring-[#e55c00] focus:ring-opacity-50 transition-colors"
                                placeholder="Confirm new password"
                            />
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full h-12 bg-[#e55c00] text-white rounded-md hover:bg-[#d15400] transition-colors duration-200 flex items-center justify-center ${
                                isLoading ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        >
                            {isLoading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                            ) : (
                                'Reset Password'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 p-4 bg-gray-50 rounded-md">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</h3>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• At least 6 characters long</li>
                            <li>• At least one uppercase letter</li>
                            <li>• At least one lowercase letter</li>
                            <li>• At least one number</li>
                            <li>• At least one special character</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage; 