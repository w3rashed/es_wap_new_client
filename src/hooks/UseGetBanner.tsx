"use client"

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./UseAxiosPublic";

const UseGetBanner = () => {
    const axiosPublic = useAxiosPublic();
    const { data: bannerImage, isLoading, error, refetch } = useQuery({
        queryKey: ["bannerImage"],
        queryFn: async () => {
            const response = await axiosPublic.get("/dashboard/banner/banner-img");
            return response.data;
        },
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
        staleTime: 0,
        gcTime: 0
    });

    return { bannerImage, isLoading, error, refetch };
};

export default UseGetBanner; 