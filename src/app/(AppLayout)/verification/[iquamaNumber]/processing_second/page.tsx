import ProcessingSecondClient from './ProcessingSecondClient';

export async function generateStaticParams() {
    // You need to return all possible values for iquamaNumber
    // that should be pre-rendered at build time
    return [
        { iquamaNumber: 'placeholder' },
        // Add more real iquamaNumber values that users will use
    ];
}

export default function ProcessingSecondPage() {
    return <ProcessingSecondClient />;
}