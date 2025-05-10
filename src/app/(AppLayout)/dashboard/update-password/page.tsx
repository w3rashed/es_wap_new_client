'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '@/hooks/UseAxiosPublic';
import toast from 'react-hot-toast';

interface PasswordForm {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const UpdatePasswordPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm<PasswordForm>();

    const onSubmit = async (data: PasswordForm) => {
        if (data.newPassword !== data.confirmPassword) {
            toast.error('New password and confirm password do not match');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axiosPublic.patch('/dashboard/update-password', {
                currentPassword: data.currentPassword,
                newPassword: data.newPassword
            });

            if (response.status === 200) {
                toast.success('Password updated successfully');
                reset();
            }
        } catch (error: any) {
            const message = error.response?.data?.message || 'Failed to update password';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Update Password</h1>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Current Password
                            </label>
                            <input
                                type="password"
                                {...register('currentPassword', {
                                    required: 'Current password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters'
                                    }
                                })}
                                className="w-full h-12 px-4 rounded-md border-2 border-[#e55c00] shadow-sm focus:border-[#e55c00] focus:ring-[#e55c00] focus:ring-opacity-50 transition-colors"
                                placeholder="Enter your current password"
                            />
                            {errors.currentPassword && (
                                <p className="mt-1 text-sm text-red-600">{errors.currentPassword.message}</p>
                            )}
                        </div>

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

                        <div className="pt-4">
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
                                    'Update Password'
                                )}
                            </button>
                        </div>
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

export default UpdatePasswordPage; 