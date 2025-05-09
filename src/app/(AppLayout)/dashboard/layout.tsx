'use client'
import React from 'react';
import SideMenu from '@/components/ui/SideMenu';
import PrivateRoute from '@/components/PrivateRoute';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <PrivateRoute>
            <div className="min-h-screen bg-gray-100">
                <div className="flex">
                    <SideMenu />
                    <main className="flex-1 p-4 lg:p-8">
                        <div className="max-w-7xl mx-auto">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </PrivateRoute>
    );
} 