// This file should be located at: app/(AppLayout)/verification/[iquamaNumber]/nafath_1/page.tsx

import SecondNafathClient from "./SecondNafathClient";


// Server component that exports generateStaticParams
export async function generateStaticParams() {
    // Return an array of objects with the possible values for iquamaNumber
    return [
        { iquamaNumber: 'placeholder' },
        // Add more possible iquamaNumber values if known
    ];
}

export default function Nafath1Page() {
    // Server component that renders the client component
    return <SecondNafathClient />;
}