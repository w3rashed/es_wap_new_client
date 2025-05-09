"use client"

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./UseAxiosPublic";
import { useAuth } from "@/Providers/auth/AuthContext";

const UseGetProducts = () => {
    const { user } = useAuth(); 
    const axiosPublic = useAxiosPublic();
    const {data:products,isLoading,error,refetch} = useQuery({
        queryKey:["products"],
        queryFn:async()=>{
            const response = await axiosPublic.get("/dashboard/products/get-products")
            return response.data
        },
        enabled:!!user?.access
    })
    return {products,isLoading,error,refetch}
};

export default UseGetProducts;