'use client';
import useAxiosPublic from '@/hooks/UseAxiosPublic';
import UseGetBanner from '@/hooks/UseGetBanner';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

const BannerImageUpload = () => {
    const { register, handleSubmit, watch, reset } = useForm();
    const [preview, setPreview] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    const axiosPublic = useAxiosPublic();
    const { bannerImage, isLoading, error, refetch } = UseGetBanner();

    // Function to check the file size
    const isFileSizeValid = (file: File) => {
        return file.size <= MAX_FILE_SIZE;
    };

    const handleBannerUpload = async (data: any) => {
        const file = data.banner[0];
        if (!file) {
            toast.error("Please select an image.");
            return;
        }

        // Check file size
        if (!isFileSizeValid(file)) {
            toast.error("File size should not exceed 5MB.");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64Image = reader.result;

            try {
                const response = await axiosPublic.post("/dashboard/banner/banner-img-upload", {
                    bannerImg: base64Image,
                });

                toast.success("Banner uploaded successfully!");
                reset();
                setPreview(null);
                setShowModal(false);
                refetch();
            } catch (error) {
                toast.error("Upload failed. Please try again.");
                console.error("Upload failed:", error);
            }
        };

        reader.readAsDataURL(file);
    };

    const handleDelete = async (id: string) => {
        try {
            await axiosPublic.delete(`/dashboard/banner/banner-img-delete/${id}`);
            toast.success("Banner deleted successfully!");
            refetch();
        } catch (error) {
            toast.error("Delete failed.");
            console.error("Delete failed:", error);
        }
    };

    const bannerWatch = watch("banner");

    useEffect(() => {
        if (bannerWatch && bannerWatch.length > 0) {
            const file = bannerWatch[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    }, [bannerWatch]);

    return (
        <div className='mt-10 max-w-3xl mx-auto relative'>
            <h2 className='text-2xl font-semibold mb-4 text-[#e55c00] text-center'>Manage Banner</h2>

            {/* Add New Banner Button - Top Right */}
            <div className="absolute top-0 right-0">
                <button
                    onClick={() => setShowModal(true)}
                    className='bg-[#e55c00] text-white px-4 py-2 rounded-md hover:bg-[#cf5000] transition text-sm'
                >
                    Add New Banner
                </button>
            </div>

            {/* Show Existing Banners */}
            {Array.isArray(bannerImage) && bannerImage.length > 0 && !isLoading && (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                    {bannerImage.map((banner: any) => (
                        <div key={banner._id} className='text-center border p-4 rounded-lg shadow-sm'>
                            <img
                                src={banner.bannerImg}
                                alt='Banner'
                                className='w-full h-auto rounded-md border border-gray-300 mb-2'
                            />
                            <button
                                onClick={() => handleDelete(banner._id)}
                                className='bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition text-sm'
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal for Banner Upload */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative">
                        {/* Close Button */}
                        <button
                            onClick={() => {
                                setShowModal(false);
                                reset();
                                setPreview(null);
                            }}
                            className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
                        >
                            &times;
                        </button>

                        <h3 className="text-lg font-semibold mb-4 text-[#e55c00] text-center">Upload New Banner</h3>

                        <form onSubmit={handleSubmit(handleBannerUpload)} className='space-y-4'>
                            <input
                                type="file"
                                accept="image/*"
                                {...register("banner", { required: true })}
                                className='block w-full text-sm text-gray-500
                                           file:mr-4 file:py-2 file:px-4
                                           file:rounded-full file:border-0
                                           file:text-sm file:font-semibold
                                           file:bg-[#ffe7d8] file:text-[#e55c00]
                                           hover:file:bg-[#ffd8b8]'
                            />
                            {preview && (
                                <div>
                                    <p className='text-sm text-gray-600 mb-1'>Preview:</p>
                                    <img src={preview} alt="Preview" className='w-full h-auto rounded-md border border-gray-200' />
                                </div>
                            )}
                            <button
                                type="submit"
                                className='w-full bg-[#e55c00] text-white py-2 px-4 rounded-md hover:bg-[#cf5000] transition'
                            >
                                Upload Banner
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BannerImageUpload;
