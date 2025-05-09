import React from 'react';

const SectionContainer = ({children}: {children: React.ReactNode}) => {
    return (
        <div className='container mx-auto'>
            {children}
        </div>
    );
};

export default SectionContainer;