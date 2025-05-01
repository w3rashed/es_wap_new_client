import React from 'react';

const SectionContainer = ({children}: {children: React.ReactNode}) => {
    return (
        <div className='max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8'>
            <div>
            {children}
            </div>
        </div>
    );
};

export default SectionContainer;