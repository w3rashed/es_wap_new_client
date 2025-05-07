import ProductDetails from './ProductDetails';

type Props = {
  params: {
    id: string
  }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params, searchParams }: Props) {
  const id = searchParams?.id;
console.log("Product ID:", id);

  return <ProductDetails params={params} searchParams={searchParams} />;
}