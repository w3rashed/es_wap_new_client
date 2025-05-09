import SecondOtpClient from "./SecondOtpClient";


export async function generateStaticParams() {
   
    return [
        { iquamaNumber: 'placeholder' },
    ];
}

export default function ProcessingSecondPage() {
    return <SecondOtpClient />;
}