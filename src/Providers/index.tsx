'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const Providers = ({children}: {children: React.ReactNode}) => {
    const queryClient =  new QueryClient();
    return (
        // all providers will be here
        <QueryClientProvider client={queryClient}>
        <div>
            {children}
        </div>
        </QueryClientProvider>
    );
};

export default Providers;