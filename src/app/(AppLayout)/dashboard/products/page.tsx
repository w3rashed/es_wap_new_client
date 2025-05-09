'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '@/hooks/UseAxiosPublic';
import toast from 'react-hot-toast';
import UseGetProducts from '@/hooks/UseGetProducts';
import { FaCloudUploadAlt } from 'react-icons/fa';
import UseGetConsumerProducts from '@/hooks/UseGetConsumerProducts';

interface Product {
    _id?: string;
    BrandName: string;
    ModelName: string;
    rating: number;
    OfferPrice: number;
    RegularPrice: number;
    status: 'In Stock' | 'Stock Out';
    color: string;
    mobileImg: string; // String to store base64
}

const brands = [
    'Apple','Samsung','OnePlus'
];

const ProductsPage = () => {
    const { ConsumerProducts, isLoading, error, refetch } = UseGetConsumerProducts();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const axiosPublic = useAxiosPublic();

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<Product>();

    const handleAddProduct = async (data: Product) => {
        try {
            // No need for FormData conversion - we're sending JSON
            const productData = {
                BrandName: data.BrandName,
                ModelName: data.ModelName,
                rating: Number(data.rating),
                RegularPrice: Number(data.RegularPrice),
                OfferPrice: Number(data.OfferPrice),
                status: data.status,
                color: data.color,
                mobileImg: data.mobileImg // Already a base64 string
            };

            const response = await axiosPublic.post('/dashboard/products/add-products', productData);
            
            if (response.status === 200 || response.status === 201) {
                toast.success('Product added successfully!');
                setIsAddModalOpen(false);
                reset();
                refetch();
            }
        } catch (error: any) {
            const message = error.response?.data?.message || 'Failed to add product';
            toast.error(message);
        }
    };

    const handleUpdateProduct = async (data: Product) => {
        if (!editingProduct) return;

        // Prepare the product data for update
        const updatedProduct: {
            BrandName: string;
            ModelName: string;
            rating: number;
            RegularPrice: number;
            OfferPrice: number;
            status: 'In Stock' | 'Stock Out';
            color: string;
            mobileImg?: string;
        } = {
            BrandName: data.BrandName,
            ModelName: data.ModelName,
            rating: Number(data.rating),
            RegularPrice: Number(data.RegularPrice),
            OfferPrice: Number(data.OfferPrice),
            status: data.status,
            color: data.color
        };

        // Only include mobileImg if a new image was selected
        if (data.mobileImg && data.mobileImg !== editingProduct.mobileImg) {
            updatedProduct.mobileImg = data.mobileImg;
        }

        try {
            const response = await axiosPublic.patch(`/dashboard/products/update-product/${editingProduct._id}`,updatedProduct);
            
            if (response.status === 200) {
                toast.success('Product updated successfully!');
                setIsEditModalOpen(false);
                setEditingProduct(null);
                reset();
                refetch();
            }
        } catch (error: any) {
            const message = error.response?.data?.message || 'Failed to update product';
            toast.error(message);
        }
    };

    const handleDeleteProduct = async (_id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const response = await axiosPublic.delete(`/dashboard/products/delete-product/${_id}`);
            
            if (response.status === 200) {
                toast.success('Product deleted successfully!');
                refetch();
            }
        } catch (error: any) {
            const message = error.response?.data?.message || 'Failed to delete product';
            toast.error(message);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                // Display image preview
                const preview = document.getElementById(e.target.id === 'editMobileImg' ? 'editImagePreview' : 'imagePreview');
                if (preview) {
                    preview.innerHTML = `
                        <img src="${event.target?.result}" alt="Preview" class="mx-auto h-32 w-32 object-cover rounded" />
                    `;
                }
                
                // Store only the base64 data part (remove "data:image/jpeg;base64," prefix)
                const base64String = (event.target?.result as string).split(',')[1];
                
                // Set the value for the form
                setValue('mobileImg', base64String, { shouldValidate: true });
            };
            reader.readAsDataURL(file);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-500">Error loading products: {error.message}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <h1 className="text-2xl font-bold text-gray-800">Products Management</h1>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="w-full md:w-auto bg-[#e55c00] text-white px-6 py-2.5 rounded-md hover:bg-[#d15400] transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                            <span>Add New Product</span>
                        </button>
                    </div>

                    {/* Products Table */}
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Regular Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Offer Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {ConsumerProducts?.map((product: Product) => (
                                    <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {product.mobileImg && (
                                                <img 
                                                    src={`data:image/jpeg;base64,${product.mobileImg}`}
                                                    alt={product.ModelName} 
                                                    className="h-16 w-16 object-cover rounded-lg"
                                                />
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.BrandName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.ModelName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.rating}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.RegularPrice}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.OfferPrice}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                product.status === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                                {product.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.color}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => {
                                                        setEditingProduct(product);
                                                        setIsEditModalOpen(true);
                                                    }}
                                                    className="text-[#e55c00] hover:text-[#d15400] transition-colors"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProduct(product._id!)}
                                                    className="text-red-600 hover:text-red-800 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add Product Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Add New Product</h2>
                            <button
                                onClick={() => {
                                    setIsAddModalOpen(false);
                                    reset();
                                    const preview = document.getElementById('imagePreview');
                                    if (preview) preview.innerHTML = '';
                                }}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(handleAddProduct)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Brand</label>
                                <select
                                    {...register('BrandName', { required: 'Brand is required' })}
                                    className="mt-1 block w-full h-12 px-4 rounded-md border-2 border-[#e55c00] shadow-sm focus:border-[#e55c00] focus:ring-[#e55c00] focus:ring-opacity-50 transition-colors"
                                >
                                    <option value="">Select Brand</option>
                                    {brands.map(brand => (
                                        <option key={brand} value={brand}>{brand}</option>
                                    ))}
                                </select>
                                {errors.BrandName && <p className="text-red-500 text-sm mt-1">{errors.BrandName.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Model Name</label>
                                <input
                                    type="text"
                                    {...register('ModelName', { required: 'Model name is required' })}
                                    className="mt-1 block w-full h-12 px-4 rounded-md border-2 border-[#e55c00] shadow-sm focus:border-[#e55c00] focus:ring-[#e55c00] focus:ring-opacity-50 transition-colors"
                                />
                                {errors.ModelName && <p className="text-red-500 text-sm mt-1">{errors.ModelName.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Rating</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    {...register('rating', { 
                                        required: 'Rating is required',
                                        min: { value: 0, message: 'Rating must be at least 0' },
                                        max: { value: 5, message: 'Rating cannot exceed 5' }
                                    })}
                                    className="mt-1 block w-full h-12 px-4 rounded-md border-2 border-[#e55c00] shadow-sm focus:border-[#e55c00] focus:ring-[#e55c00] focus:ring-opacity-50 transition-colors"
                                />
                                {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Regular Price</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    {...register('RegularPrice', { 
                                        required: 'Regular price is required',
                                        min: { value: 0, message: 'Price must be positive' }
                                    })}
                                    className="mt-1 block w-full h-12 px-4 rounded-md border-2 border-[#e55c00] shadow-sm focus:border-[#e55c00] focus:ring-[#e55c00] focus:ring-opacity-50 transition-colors"
                                />
                                {errors.RegularPrice && <p className="text-red-500 text-sm mt-1">{errors.RegularPrice.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Offer Price</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    {...register('OfferPrice', { 
                                        required: 'Offer price is required',
                                        min: { value: 0, message: 'Price must be positive' }
                                    })}
                                    className="mt-1 block w-full h-12 px-4 rounded-md border-2 border-[#e55c00] shadow-sm focus:border-[#e55c00] focus:ring-[#e55c00] focus:ring-opacity-50 transition-colors"
                                />
                                {errors.OfferPrice && <p className="text-red-500 text-sm mt-1">{errors.OfferPrice.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <select
                                    {...register('status', { required: 'Status is required' })}
                                    className="mt-1 block w-full h-12 px-4 rounded-md border-2 border-[#e55c00] shadow-sm focus:border-[#e55c00] focus:ring-[#e55c00] focus:ring-opacity-50 transition-colors"
                                >
                                    <option value="">Select Status</option>
                                    <option value="In Stock">In Stock</option>
                                    <option value="Stock Out">Stock Out</option>
                                </select>
                                {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Color</label>
                                <input
                                    type="text"
                                    {...register('color', { required: 'Color is required' })}
                                    className="mt-1 block w-full h-12 px-4 rounded-md border-2 border-[#e55c00] shadow-sm focus:border-[#e55c00] focus:ring-[#e55c00] focus:ring-opacity-50 transition-colors"
                                />
                                {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Mobile Image</label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <FaCloudUploadAlt className="mx-auto h-12 w-12 text-gray-400" />
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="mobileImg"
                                                className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    id="mobileImg"
                                                    type="file"
                                                    accept="image/*"
                                                    className="sr-only"
                                                    onChange={handleFileChange}
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, WebP up to 5MB</p>
                                    </div>
                                </div>
                                <div id="imagePreview" className="mt-2"></div>
                                {errors.mobileImg && (
                                    <p className="text-red-500 text-sm mt-1">{errors.mobileImg.message}</p>
                                )}
                            </div>

                            <div className="flex justify-end space-x-2">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                                >
                                    Add Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Product Modal */}
            {isEditModalOpen && editingProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Edit Product</h2>
                            <button
                                onClick={() => {
                                    setIsEditModalOpen(false);
                                    setEditingProduct(null);
                                    reset();
                                    const preview = document.getElementById('editImagePreview');
                                    if (preview) preview.innerHTML = '';
                                }}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(handleUpdateProduct)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Brand</label>
                                <select
                                    defaultValue={editingProduct.BrandName}
                                    {...register('BrandName', { required: 'Brand is required' })}
                                    className="mt-1 block w-full h-12 px-4 rounded-md border-2 border-[#e55c00] shadow-sm focus:border-[#e55c00] focus:ring-[#e55c00] focus:ring-opacity-50 transition-colors"
                                >
                                    <option value="">Select Brand</option>
                                    {brands.map(brand => (
                                        <option key={brand} value={brand}>{brand}</option>
                                    ))}
                                </select>
                                {errors.BrandName && <p className="text-red-500 text-sm mt-1">{errors.BrandName.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Model Name</label>
                                <input
                                    type="text"
                                    defaultValue={editingProduct.ModelName}
                                    {...register('ModelName', { required: 'Model name is required' })}
                                    className="mt-1 block w-full h-12 px-4 rounded-md border-2 border-[#e55c00] shadow-sm focus:border-[#e55c00] focus:ring-[#e55c00] focus:ring-opacity-50 transition-colors"
                                />
                                {errors.ModelName && <p className="text-red-500 text-sm mt-1">{errors.ModelName.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Rating</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    defaultValue={editingProduct.rating}
                                    {...register('rating', { 
                                        required: 'Rating is required',
                                        min: { value: 0, message: 'Rating must be at least 0' },
                                        max: { value: 5, message: 'Rating cannot exceed 5' }
                                    })}
                                    className="mt-1 block w-full h-12 px-4 rounded-md border-2 border-[#e55c00] shadow-sm focus:border-[#e55c00] focus:ring-[#e55c00] focus:ring-opacity-50 transition-colors"
                                />
                                {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Regular Price</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    defaultValue={editingProduct.RegularPrice}
                                    {...register('RegularPrice', { 
                                        required: 'Regular price is required',
                                        min: { value: 0, message: 'Price must be positive' }
                                    })}
                                    className="mt-1 block w-full h-12 px-4 rounded-md border-2 border-[#e55c00] shadow-sm focus:border-[#e55c00] focus:ring-[#e55c00] focus:ring-opacity-50 transition-colors"
                                />
                                {errors.RegularPrice && <p className="text-red-500 text-sm mt-1">{errors.RegularPrice.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Offer Price</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    defaultValue={editingProduct.OfferPrice}
                                    {...register('OfferPrice', { 
                                        required: 'Offer price is required',
                                        min: { value: 0, message: 'Price must be positive' }
                                    })}
                                    className="mt-1 block w-full h-12 px-4 rounded-md border-2 border-[#e55c00] shadow-sm focus:border-[#e55c00] focus:ring-[#e55c00] focus:ring-opacity-50 transition-colors"
                                />
                                {errors.OfferPrice && <p className="text-red-500 text-sm mt-1">{errors.OfferPrice.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <select
                                    defaultValue={editingProduct.status}
                                    {...register('status', { required: 'Status is required' })}
                                    className="mt-1 block w-full h-12 px-4 rounded-md border-2 border-[#e55c00] shadow-sm focus:border-[#e55c00] focus:ring-[#e55c00] focus:ring-opacity-50 transition-colors"
                                >
                                    <option value="">Select Status</option>
                                    <option value="In Stock">In Stock</option>
                                    <option value="Stock Out">Stock Out</option>
                                </select>
                                {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Color</label>
                                <input
                                    type="text"
                                    defaultValue={editingProduct.color}
                                    {...register('color', { required: 'Color is required' })}
                                    className="mt-1 block w-full h-12 px-4 rounded-md border-2 border-[#e55c00] shadow-sm focus:border-[#e55c00] focus:ring-[#e55c00] focus:ring-opacity-50 transition-colors"
                                />
                                {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Mobile Image</label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <div id="editImagePreview" className="mb-3">
                                            {editingProduct.mobileImg && (
                                                <img 
                                                    src={`data:image/jpeg;base64,${editingProduct.mobileImg}`}
                                                    alt={editingProduct.ModelName} 
                                                    className="mx-auto h-32 w-32 object-cover rounded"
                                                />
                                            )}
                                        </div>
                                        <FaCloudUploadAlt className="mx-auto h-12 w-12 text-gray-400" />
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="editMobileImg"
                                                className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    id="editMobileImg"
                                                    type="file"
                                                    accept="image/*"
                                                    className="sr-only"
                                                    onChange={handleFileChange}
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, WebP up to 5MB</p>
                                    </div>
                                </div>
                                <div id="imagePreview" className="mt-2"></div>
                                {errors.mobileImg && (
                                    <p className="text-red-500 text-sm mt-1">{errors.mobileImg.message}</p>
                                )}
                            </div>

                            <div className="flex justify-end space-x-2">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                                >
                                    Update Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsPage;