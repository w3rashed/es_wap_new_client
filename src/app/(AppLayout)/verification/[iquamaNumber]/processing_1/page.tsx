// This file should be at: app/(AppLayout)/verification/[iquamaNumber]/processing_1/page.tsx

// Make sure the filename exactly matches this import - case sensitive!
import ProcessingClient from './processing1Client';

// Server component that exports generateStaticParams
export async function generateStaticParams() {
    // Return an array of objects with the possible values for iquamaNumber
    // Use the same values as in the nafath_1 page to ensure consistency
    return [
        { iquamaNumber: 'placeholder' },
        // Add more possible iquamaNumber values if known
    ];
}

export default function Processing1Page() {
    return <ProcessingClient />;
}