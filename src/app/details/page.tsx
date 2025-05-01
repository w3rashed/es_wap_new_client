'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';
import image1 from "../../assets/img/iphone-16-pro-256gb-white-titanium.jpeg";
import { useRouter, useSearchParams } from 'next/navigation';

const ProductDetails = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [nationality, setNationality] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [isEMI, setIsEMI] = useState(false);
    const [selectedColor, setSelectedColor] = useState('');
    
    // Get product data from URL parameters
    const productId = searchParams.get('id');
    const productName = searchParams.get('name');
    const storage = searchParams.get('storage');
    const price = searchParams.get('price');
    const originalPrice = searchParams.get('originalPrice');
    const rating = searchParams.get('rating');
    
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    const nationalities = [
        "Afghanistan",
        "Bahrain",
        "Bangladesh",
        "China",
        "Egypt",
        "Ethiopia",
        "Ghana",
        "Hong Kong",
        "India",
        "Indonesia",
        "Jordan",
        "Kenya",
        "Macao",
        "Myanmar",
        "Namibia",
        "Nepal",
        "Niger",
        "Nigeria",
        "Pakistan",
        "Papua New Guinea",
        "Peru",
        "Philippines",
        "Saudi Arabia",
        "Slovakia",
        "Somalia",
        "South Sudan",
        "Sri Lanka",
        "Sudan",
        "Suriname",
        "Syrian",
        "Turkey",
        "Uganda",
        "Uruguay",
        "Yemen",
        "Zambia",
        "Zimbabwe",
      ];

    const colors = [
        { name: 'Black', value: 'black', bgClass: 'bg-black' },
        { name: 'Pink', value: 'pink', bgClass: 'bg-pink-300' },
        { name: 'Blue', value: 'blue', bgClass: 'bg-blue-300' },
        { name: 'White', value: 'white', bgClass: 'bg-white' },
        { name: 'Green', value: 'green', bgClass: 'bg-green-200' }
    ];

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
        toast.success(`Selected color: ${colors.find(c => c.value === color)?.name}`);
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

        const formData = {
            birthDate,
            nationality,
            isEMI,
            color: selectedColor,
            id: productId,
            name: productName,
            storage,
            price,
            originalPrice,
            rating
            
        };
        console.log(formData);
        localStorage.setItem("product",JSON.stringify(formData))
        toast.success('Order placed successfully!');
        router.push('/userInfo');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="relative h-96">
                    <Image
                        src={image1}
                        alt={productName || 'Product Image'}
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Product Details */}
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold">{productName}</h1>
                    <div className="flex items-center space-x-2">
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={i < Number(rating) ? 'text-yellow-400' : 'text-gray-300'} />
                            ))}
                        </div>
                        <span className="text-gray-600">({rating} reviews)</span>
                    </div>
                    <div className="space-y-2">
                        <p className="text-2xl font-bold text-orange-500">৳{price}</p>
                        <p className="text-lg text-gray-500 line-through">৳{originalPrice}</p>
                        <p className="text-gray-600">Storage: {storage}</p>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold">iPhone 16 128GB</h1>
                        
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center">
                            <span className="text-gray-600 mr-2">Status:</span>
                            <span className="text-gray-800">In Stock</span>
                        </div>
                        <div className="flex items-center">
                            {[...Array(5)].map((_, index) => (
                                <FaStar key={index} className="text-yellow-400 w-4 h-4" />
                            ))}
                            <span className="ml-1 text-gray-600">(5.0)</span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex items-center gap-4">
                            <span className="text-3xl font-bold text-orange-500">Tk. 1,46,999</span>
                            <span className="text-lg text-gray-500 line-through">Tk. 1,69,999</span>
                        </div>
                        <p className="text-green-600 mt-2">
                            Enjoy up to BDT 45,000 discount or 0% EMI for up to 24 months.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg mb-2">Color :</h3>
                        <div className="flex gap-4">
                            {colors.map((color) => (
                                <button
                                    key={color.value}
                                    onClick={() => handleColorSelect(color.value)}
                                    className={`w-8 h-8 rounded-full ${color.bgClass} border-2 ${
                                        selectedColor === color.value 
                                            ? 'border-orange-500 scale-110 ring-2 ring-orange-200' 
                                            : 'border-gray-300'
                                    } transition-all duration-200`}
                                    title={color.name}
                                />
                            ))}
                        </div>
                        {selectedColor && (
                            <p className="mt-2 text-sm text-gray-600">
                                Selected: {colors.find(c => c.value === selectedColor)?.name}
                            </p>
                        )}
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg mb-2">Warranty:</h3>
                        <p className="text-orange-500">1 year Apple Official International Warranty</p>
                    </div>

                    <div className="mb-6">
                        

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border border-orange-500 p-4 rounded">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xl font-bold">Tk. 1,46,999</span>
                                    <input type="radio" name="payment" defaultChecked />
                                </div>
                                <p className="text-gray-600">Cash Discount Price</p>
                                <p className="text-sm text-gray-500">Online / Cash Payment</p>
                            </div>
                        </div>

                        <div className="space-y-6 mt-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-lg font-medium">Birth of Day</label>
                                <input 
                                    type="date" 
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                    className="w-full max-w-xs p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-lg font-medium">Nationality</label>
                                <select
                                    className="w-full max-w-xs p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    value={nationality}
                                    onChange={(e) => setNationality(e.target.value)}
                                >
                                    <option value="">Select Nationality</option>
                                    {nationalities.map((nation) => (
                                        <option key={nation} value={nation}>
                                            {nation}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button 
                            onClick={handleBuyNow}
                            className="flex-1 bg-orange-500 text-white py-3 rounded text-lg font-medium hover:bg-orange-600"
                        >
                            Buy Now
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-green-500 text-white py-3 px-6 rounded text-lg font-medium hover:bg-green-600">
                            <FaWhatsapp />
                            Chat on WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;