// Make sure this file is at: app/verification/[iquamaNumber]/orderedStatus/page.tsx

import OrderStatus from "./OrderStatus";


// This function is required for static site generation with dynamic routes
export async function generateStaticParams() {
  // For static export, you need to provide all possible iquamaNumber values
  return [
    { iquamaNumber: 'placeholder' },
    // Add more known iquamaNumbers if available
  ];
}

export default function Page() {
  return <OrderStatus />;
}