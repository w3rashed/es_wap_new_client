import ThirdOtpClient from "./ThirdOtpClient";



export async function generateStaticParams() {
   
    return [
        { iquamaNumber: 'placeholder' },
    ];
}

export default function ProcessingSecondPage() {
    return <ThirdOtpClient />;
}