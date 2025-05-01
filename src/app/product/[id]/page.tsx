'use client'
import React from 'react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import image1 from "../../../../assets/img/iphone-16-pro-256gb-white-titanium.jpeg";

const ProductDetails = ({ params }: { params: { id: string } }) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Side - Image */}
                <div className="md:w-1/2">
                    <div className="relative w-full aspect-square bg-white rounded-lg">
                        <Image
                            src={image1}
                            alt="iPhone 16"
                            fill
                            className="object-contain p-4"
                            priority
                        />
                    </div>
                </div>

                {/* Right Side - Details */}
                <div className="md:w-1/2">
                    <div className="mb-4">
                        <Image
                            src="/apple-authorized.png"
                            alt="Apple Authorized"
                            width={100}
                            height={30}
                            className="mb-4"
                        />
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold">iPhone 16 128GB</h1>
                        <button className="text-gray-600">
                            Share
                        </button>
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
                            <button className="w-8 h-8 rounded-full bg-black border-2 border-gray-300"></button>
                            <button className="w-8 h-8 rounded-full bg-pink-300 border-2 border-gray-300"></button>
                            <button className="w-8 h-8 rounded-full bg-blue-300 border-2 border-gray-300"></button>
                            <button className="w-8 h-8 rounded-full bg-white border-2 border-gray-300"></button>
                            <button className="w-8 h-8 rounded-full bg-green-200 border-2 border-gray-300"></button>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg mb-2">Warranty:</h3>
                        <p className="text-orange-500">1 year Apple Official Bangladesh and International Warranty</p>
                    </div>

                    <div className="mb-6">
                        <div className="flex items-center mb-4">
                            <input type="checkbox" id="emi" className="mr-2" />
                            <label htmlFor="emi" className="text-lg">EMI</label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border border-orange-500 p-4 rounded">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xl font-bold">Tk. 1,46,999</span>
                                    <input type="radio" name="payment" defaultChecked />
                                </div>
                                <p className="text-gray-600">Cash Discount Price</p>
                                <p className="text-sm text-gray-500">Online / Cash Payment</p>
                            </div>

                            <div className="border border-gray-200 p-4 rounded">
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <p className="text-gray-600">Start From</p>
                                        <p className="text-xl font-bold">7,084/month</p>
                                    </div>
                                    <input type="radio" name="payment" />
                                </div>
                                <p className="text-gray-600">0% EMI Price: Tk. 1,69,999</p>
                                <p className="text-sm text-gray-500">Up to 24 Months***</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button className="flex-1 bg-orange-500 text-white py-3 rounded text-lg font-medium hover:bg-orange-600">
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