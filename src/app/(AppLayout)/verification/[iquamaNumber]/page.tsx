import Verification from "./Verification";

<<<<<<< HEAD
// This function is required for static site generation with dynamic routes
export async function generateStaticParams() {
  // Return an empty array to enable dynamic route generation
  return [];
}

// Enable dynamic route generation
export const dynamic = 'force-dynamic';

=======

// This function is required for static site generation with dynamic routes
export async function generateStaticParams() {
  // Provide all possible iquamaNumber values for static generation
  return [
    { iquamaNumber: 'placeholder' },
    // Add more known iquamaNumbers if available
  ];
}

>>>>>>> 5c644dd81a4a76a30ee7185f16321fb3932e5407
export default function Page() {
  return <Verification />;
}