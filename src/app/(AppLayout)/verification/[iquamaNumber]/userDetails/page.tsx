import UserDetailsClient from "./UserDetailsClient";




export async function generateStaticParams() {
   
    return [
        { iquamaNumber: 'placeholder' },
    ];
}

export default function ProcessingSecondPage() {
    return <UserDetailsClient />;
}