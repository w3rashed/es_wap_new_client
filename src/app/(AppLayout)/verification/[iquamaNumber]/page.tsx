import Verification from "./Verification";

// This function is required for static site generation with dynamic routes
export async function generateStaticParams() {
  // Return an empty array to enable dynamic route generation
  return [];
}

// Enable dynamic route generation
export const dynamic = 'force-dynamic';

export default function Page() {
  return <Verification />;
}