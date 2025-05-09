import ThirdNafathClient from "./ThirdNafathClient";


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
    return <ThirdNafathClient />;
}