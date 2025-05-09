'use client'

import React, { Suspense } from 'react';
import ProductsDetailsClient from './ProductsDetailsClient';

// Loading component for the Suspense fallback
const Loading = () => (
  <div className="w-full flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
  </div>
);

export default function DetailsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ProductsDetailsClient />
    </Suspense>
  );
}