'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Product {
    id: string;
    brand: string;
    modelName: string;
    reviews: number;
    offerPrice: number;
    regularPrice: number;
    status: 'in stock' | 'stock out';
    color: string;
}

const brands = [
    'Samsung',
    'Apple',
    'Xiaomi',
    'OnePlus',
    'Realme',
    'Oppo',
    'Vivo',
    'Huawei',
    'Motorola',
    'Nokia'
];

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Product>();

    const onSubmit = (data: Omit<Product, 'id'>) => {
        const product: Product = {
            id: Date.now().toString(),
            ...data
        };
        setProducts([...products, product]);
        reset();
        setIsAddModalOpen(false);
    };

    const handleUpdateProduct = (data: Omit<Product, 'id'>) => {
        if (!selectedProduct) return;
        const updatedProduct = { ...selectedProduct, ...data };
        setProducts(products.map(p => 
            p.id === selectedProduct.id ? updatedProduct : p
        ));
        setIsEditModalOpen(false);
    };

    const handleDeleteProduct = (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    return (
        <div className='p-4 md:p-6'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-2xl font-bold'>Products</h1>
                <button 
                    className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                    onClick={() => setIsAddModalOpen(true)}
                >
                    Add Product
                </button>
            </div>

            {isAddModalOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
                    <div className='bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto'>
                        <div className='p-4 md:p-6'>
                            <h2 className='text-xl font-bold mb-4'>Add New Product</h2>
                            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                                <div>
                                    <label className='block mb-1'>Brand</label>
                                    <select
                                        className='w-full p-2 border rounded'
                                        {...register('brand', { required: 'Brand is required' })}
                                    >
                                        <option value=''>Select Brand</option>
                                        {brands.map(brand => (
                                            <option key={brand} value={brand}>{brand}</option>
                                        ))}
                                    </select>
                                    {errors.brand && <p className='text-red-500 text-sm'>{errors.brand.message}</p>}
                                </div>

                                <div>
                                    <label className='block mb-1'>Model Name</label>
                                    <input
                                        type='text'
                                        className='w-full p-2 border rounded'
                                        {...register('modelName', { required: 'Model name is required' })}
                                    />
                                    {errors.modelName && <p className='text-red-500 text-sm'>{errors.modelName.message}</p>}
                                </div>

                                <div>
                                    <label className='block mb-1'>Reviews</label>
                                    <input
                                        type='number'
                                        className='w-full p-2 border rounded'
                                        {...register('reviews', { required: 'Reviews is required' })}
                                    />
                                    {errors.reviews && <p className='text-red-500 text-sm'>{errors.reviews.message}</p>}
                                </div>

                                <div>
                                    <label className='block mb-1'>Regular Price</label>
                                    <input
                                        type='number'
                                        className='w-full p-2 border rounded'
                                        {...register('regularPrice', { required: 'Regular price is required' })}
                                    />
                                    {errors.regularPrice && <p className='text-red-500 text-sm'>{errors.regularPrice.message}</p>}
                                </div>

                                <div>
                                    <label className='block mb-1'>Offer Price</label>
                                    <input
                                        type='number'
                                        className='w-full p-2 border rounded'
                                        {...register('offerPrice', { required: 'Offer price is required' })}
                                    />
                                    {errors.offerPrice && <p className='text-red-500 text-sm'>{errors.offerPrice.message}</p>}
                                </div>

                                <div>
                                    <label className='block mb-1'>Status</label>
                                    <select
                                        className='w-full p-2 border rounded'
                                        {...register('status', { required: 'Status is required' })}
                                    >
                                        <option value=''>Select Status</option>
                                        <option value='in stock'>In Stock</option>
                                        <option value='stock out'>Stock Out</option>
                                    </select>
                                    {errors.status && <p className='text-red-500 text-sm'>{errors.status.message}</p>}
                                </div>

                                <div>
                                    <label className='block mb-1'>Color</label>
                                    <input
                                        type='text'
                                        className='w-full p-2 border rounded'
                                        {...register('color', { required: 'Color is required' })}
                                    />
                                    {errors.color && <p className='text-red-500 text-sm'>{errors.color.message}</p>}
                                </div>

                                <div className='flex justify-end space-x-2 mt-4'>
                                    <button 
                                        type='button'
                                        className='px-4 py-2 border rounded hover:bg-gray-100'
                                        onClick={() => setIsAddModalOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type='submit'
                                        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                                    >
                                        Add Product
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {isEditModalOpen && selectedProduct && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
                    <div className='bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto'>
                        <div className='p-4 md:p-6'>
                            <h2 className='text-xl font-bold mb-4'>Edit Product</h2>
                            <form onSubmit={handleSubmit(handleUpdateProduct)} className='space-y-4'>
                                <div>
                                    <label className='block mb-1'>Brand</label>
                                    <select
                                        className='w-full p-2 border rounded'
                                        defaultValue={selectedProduct.brand}
                                        {...register('brand', { required: 'Brand is required' })}
                                    >
                                        <option value=''>Select Brand</option>
                                        {brands.map(brand => (
                                            <option key={brand} value={brand}>{brand}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className='block mb-1'>Model Name</label>
                                    <input
                                        type='text'
                                        className='w-full p-2 border rounded'
                                        defaultValue={selectedProduct.modelName}
                                        {...register('modelName', { required: 'Model name is required' })}
                                    />
                                </div>

                                <div>
                                    <label className='block mb-1'>Reviews</label>
                                    <input
                                        type='number'
                                        className='w-full p-2 border rounded'
                                        defaultValue={selectedProduct.reviews}
                                        {...register('reviews', { required: 'Reviews is required' })}
                                    />
                                </div>

                                <div>
                                    <label className='block mb-1'>Regular Price</label>
                                    <input
                                        type='number'
                                        className='w-full p-2 border rounded'
                                        defaultValue={selectedProduct.regularPrice}
                                        {...register('regularPrice', { required: 'Regular price is required' })}
                                    />
                                </div>

                                <div>
                                    <label className='block mb-1'>Offer Price</label>
                                    <input
                                        type='number'
                                        className='w-full p-2 border rounded'
                                        defaultValue={selectedProduct.offerPrice}
                                        {...register('offerPrice', { required: 'Offer price is required' })}
                                    />
                                </div>

                                <div>
                                    <label className='block mb-1'>Status</label>
                                    <select
                                        className='w-full p-2 border rounded'
                                        defaultValue={selectedProduct.status}
                                        {...register('status', { required: 'Status is required' })}
                                    >
                                        <option value=''>Select Status</option>
                                        <option value='in stock'>In Stock</option>
                                        <option value='stock out'>Stock Out</option>
                                    </select>
                                </div>

                                <div>
                                    <label className='block mb-1'>Color</label>
                                    <input
                                        type='text'
                                        className='w-full p-2 border rounded'
                                        defaultValue={selectedProduct.color}
                                        {...register('color', { required: 'Color is required' })}
                                    />
                                </div>

                                <div className='flex justify-end space-x-2 mt-4'>
                                    <button 
                                        type='button'
                                        className='px-4 py-2 border rounded hover:bg-gray-100'
                                        onClick={() => setIsEditModalOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type='submit'
                                        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                                    >
                                        Update Product
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <div className='overflow-x-auto'>
                <table className='w-full border-collapse'>
                    <thead>
                        <tr className='bg-gray-100'>
                            <th className='p-3 text-left border'>Brand</th>
                            <th className='p-3 text-left border'>Model</th>
                            <th className='p-3 text-left border'>Reviews</th>
                            <th className='p-3 text-left border'>Regular Price</th>
                            <th className='p-3 text-left border'>Offer Price</th>
                            <th className='p-3 text-left border'>Status</th>
                            <th className='p-3 text-left border'>Color</th>
                            <th className='p-3 text-left border'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className='hover:bg-gray-50'>
                                <td className='p-3 border'>{product.brand}</td>
                                <td className='p-3 border'>{product.modelName}</td>
                                <td className='p-3 border'>{product.reviews}</td>
                                <td className='p-3 border'>${product.regularPrice}</td>
                                <td className='p-3 border'>${product.offerPrice}</td>
                                <td className='p-3 border'>
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                        product.status === 'in stock' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {product.status}
                                    </span>
                                </td>
                                <td className='p-3 border'>{product.color}</td>
                                <td className='p-3 border'>
                                    <div className='flex space-x-2'>
                                        <button
                                            className='px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600'
                                            onClick={() => {
                                                setSelectedProduct(product);
                                                setIsEditModalOpen(true);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600'
                                            onClick={() => handleDeleteProduct(product.id)}
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
    );
};

export default ProductsPage;