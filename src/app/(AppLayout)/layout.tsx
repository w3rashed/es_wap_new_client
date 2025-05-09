import Footer from '@/components/ui/Footer';
import Navmenu from '@/components/ui/Navmenu';
import Providers from '@/Providers';
import { AuthProvider } from '@/Providers/auth/AuthContext';
import React from 'react';

const layout = ({children}: {children: React.ReactNode}) => {
    return (
        <Providers>
            <AuthProvider>

            <div className="min-h-screen flex flex-col">         
                {/* <Navmenu /> */}
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </div>
            </AuthProvider>
        </Providers>
    );
};

export default layout;