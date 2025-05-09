"use client"

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./UseAxiosPublic";

const UseGetConsumerProducts = () => {
    const axiosPublic = useAxiosPublic();
    const { data: ConsumerProducts, isLoading, error, refetch } = useQuery({
        queryKey: ["ConsumerProducts"],
        queryFn: async () => {
            const response = await axiosPublic.get("/dashboard/products/get-products");
            return response.data;
        },
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
        staleTime: 0,
        gcTime: 0
    });

    return { ConsumerProducts, isLoading, error, refetch };
};

export default UseGetConsumerProducts; 