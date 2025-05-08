'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaStar, FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import UseGetConsumerProducts from '@/hooks/UseGetConsumerProducts';

interface Product {
    _id: string;
    BrandName: string;
    ModelName: string;
    rating: number;
    OfferPrice: number;
    RegularPrice: number;
    status: 'In Stock' | 'Stock Out';
    color: string;
    mobileImg: string;
}

const colors = [
    { name: 'Black', value: 'black', bgClass: 'bg-black' },
    { name: 'Pink', value: 'pink', bgClass: 'bg-pink-300' },
    { name: 'Blue', value: 'blue', bgClass: 'bg-blue-300' },
    { name: 'White', value: 'white', bgClass: 'bg-white border' },
    { name: 'Green', value: 'green', bgClass: 'bg-green-200' }
];

const storageOptions = [
    { name: '64GB', value: '64' },
    { name: '128GB', value: '128' },
    { name: '256GB', value: '256' },
    { name: '512GB', value: '512' },
    { name: '1TB', value: '1024' }
];

const nationalities = [
    "Afghanistan", "Bahrain", "Bangladesh", "China", "Egypt", "Ethiopia", "Ghana", "Hong Kong", "India", "Indonesia", "Jordan", "Kenya", "Macao", "Myanmar", "Namibia", "Nepal", "Niger", "Nigeria", "Pakistan", "Papua New Guinea", "Peru", "Philippines", "Saudi Arabia", "Slovakia", "Somalia", "South Sudan", "Sri Lanka", "Sudan", "Suriname", "Syrian", "Turkey", "Uganda", "Uruguay", "Yemen", "Zambia", "Zimbabwe"
];

const ProductDetails = () => {
    const router = useRouter();
    const { ConsumerProducts, isLoading, error } = UseGetConsumerProducts();
    const searchParams = useSearchParams();
    const [nationality, setNationality] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedStorage, setSelectedStorage] = useState('');
    const [product, setProduct] = useState<Product | null>(null);

    const productId = searchParams.get('id');

    useEffect(() => {
        if (ConsumerProducts && productId) {
            const foundProduct = ConsumerProducts.find((p: Product) => p._id === productId);
            setProduct(foundProduct || null);
        }
    }, [ConsumerProducts, productId]);

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
        toast.success(`Selected color: ${colors.find(c => c.value === color)?.name}`);
    };

    const handleStorageSelect = (storage: string) => {
        setSelectedStorage(storage);
        toast.success(`Selected storage: ${storageOptions.find(s => s.value === storage)?.name}`);
    };

    const handleBuyNow = () => {
        if (!birthDate) {
            toast.error('Please select your birth date');
            return;
        }
        if (!nationality) {
            toast.error('Please select your nationality');
            return;
        }
        if (!selectedColor) {
            toast.error('Please select a color');
            return;
        }
        if (!selectedStorage) {
            toast.error('Please select storage capacity');
            return;
        }
        if (!product) return;
        const formData = {
            birthDate,
            nationality,
            color: selectedColor,
            storage: selectedStorage,
            id: product._id,
            ModelName: product.ModelName,
            OfferPrice: product.OfferPrice
        };
        const encoded = encodeURIComponent(JSON.stringify(formData));
        toast.success('Order placed successfully!');
        router.push(`/userInfo?product_details=${encoded}`);
    };

    if (isLoading) {
        return (
            <div className="w-full flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="w-full text-center py-8 text-red-500">
                Error loading product: {error.message}
            </div>
        );
    }
    if (!product) {
        return (
            <div className="w-full text-center py-8">
                Product not found
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                {/* Product Image */}
                <div className="bg-white p-6 rounded-xl shadow-lg flex justify-center items-center">
                    <div className="relative w-full h-[400px] md:w-[400px] md:h-[400px] bg-gray-50 rounded-lg flex items-center justify-center">
                        <Image
                            src={`data:image/jpeg;base64,${product.mobileImg}`}
                            alt={product.ModelName}
                            fill
                            className="object-contain p-4"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    </div>
                </div>

                {/* Product Details */}
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        {product.BrandName} {product.ModelName}
                    </h1>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-gray-700 font-medium">Status:</span>
                        <span className={product.status === 'In Stock' ? 'text-green-600' : 'text-red-600'}>{product.status}</span>
                        <span className="flex items-center ml-4">
                            {[...Array(5)].map((_, index) => (
                                <FaStar key={index} className={`${index < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                            ))}
                            <span className="ml-1 text-gray-700 font-medium">({product.rating.toFixed(1)})</span>
                        </span>
                    </div>
                    <div className="text-3xl font-bold text-orange-600 mb-1">
                        Tk. {product.OfferPrice.toLocaleString()}
                    </div>
                    <div className="text-lg text-gray-400 line-through mb-1">
                        Tk. {product.RegularPrice.toLocaleString()}
                    </div>
                    
                    {/* Color Selection */}
                    <div className="mb-4">
                        <span className="font-semibold text-gray-700">Color :</span>
                        <div className="flex gap-3 mt-2">
                            {colors.map((color) => (
                                <button
                                    key={color.value}
                                    type="button"
                                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center focus:outline-none ${color.bgClass} ${selectedColor === color.value ? 'ring-2 ring-orange-500 border-orange-500' : 'border-gray-300'}`}
                                    aria-label={color.name}
                                    onClick={() => handleColorSelect(color.value)}
                                >
                                    {selectedColor === color.value && <span className="block w-3 h-3 bg-orange-500 rounded-full"></span>}
                                </button>
                            ))}
                        </div>
                        <div className="mt-1 text-sm text-gray-600">Selected: {selectedColor ? colors.find(c => c.value === selectedColor)?.name : 'None'}</div>
                    </div>

                    {/* Storage Selection */}
                    <div className="mb-4">
                        <span className="font-semibold text-gray-700">Storage :</span>
                        <div className="flex flex-wrap gap-3 mt-2">
                            {storageOptions.map((storage) => (
                                <button
                                    key={storage.value}
                                    type="button"
                                    className={`px-4 py-2 rounded-lg border-2 focus:outline-none ${selectedStorage === storage.value ? 'bg-orange-100 text-orange-600 border-orange-500' : 'border-gray-300 text-gray-700'}`}
                                    onClick={() => handleStorageSelect(storage.value)}
                                >
                                    {storage.name}
                                </button>
                            ))}
                        </div>
                        <div className="mt-1 text-sm text-gray-600">Selected: {selectedStorage ? storageOptions.find(s => s.value === selectedStorage)?.name : 'None'}</div>
                    </div>

                    {/* Warranty */}
                    <div className="mb-2">
                        <span className="font-semibold text-gray-700">Warranty:</span>
                        <div className="text-orange-600 font-medium">1 year Apple Official International Warranty</div>
                    </div>
                    {/* Payment Info */}
                    <div className="mb-4">
                        <div className="border border-orange-400 rounded-lg p-4">
                            <div className="text-xl font-bold text-orange-600 mb-1">Tk. {product.OfferPrice.toLocaleString()}</div>
                            <div className="text-gray-700 text-sm">Cash Discount Price</div>
                            <div className="text-gray-500 text-xs">Online / Cash Payment</div>
                        </div>
                    </div>
                    {/* Birth Date */}
                    <div className="mb-3">
                        <label className="block text-gray-700 font-medium mb-1">Birth of Day</label>
                        <input
                            type="date"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-orange-500"
                            value={birthDate}
                            onChange={e => setBirthDate(e.target.value)}
                        />
                    </div>
                    {/* Nationality */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-1">Nationality</label>
                        <select
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-orange-500"
                            value={nationality}
                            onChange={e => setNationality(e.target.value)}
                        >
                            <option value="">Select Nationality</option>
                            {nationalities.map((nation) => (
                                <option key={nation} value={nation}>{nation}</option>
                            ))}
                        </select>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <button
                            onClick={handleBuyNow}
                            className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors text-lg font-semibold disabled:bg-gray-400"
                            disabled={product.status === 'Stock Out'}
                        >
                            Buy Now
                        </button>
                        <a
                            href={`https://wa.me/?text=I'm%20interested%20in%20${encodeURIComponent(product.BrandName + ' ' + product.ModelName)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors text-lg font-semibold"
                        >
                            <FaWhatsapp className="text-2xl" /> Chat on WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;