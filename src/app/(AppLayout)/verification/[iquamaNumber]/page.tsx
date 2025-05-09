import Verification from "./Verification";


// This function is required for static site generation with dynamic routes
export async function generateStaticParams() {
  // Provide all possible iquamaNumber values for static generation
  return [
    { iquamaNumber: 'placeholder' },
    // Add more known iquamaNumbers if available
  ];
}

export default function Page() {
  return <Verification />;
}