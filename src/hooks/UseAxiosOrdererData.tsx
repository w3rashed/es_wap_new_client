'use client'

import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './UseAxiosPublic';

interface OrdererData {
    _id: string;
    BrandName: string;
    ModelName: string;
    rating: number;
    RegularPrice: number;
    OfferPrice: number;
    status: 'In Stock' | 'Stock Out';
    color: string;
   
}

const UseAxiosOrdererData = (iquamaNumber: string) => {
    const axiosPublic = useAxiosPublic();

    const { data: ordererData, isLoading, error,refetch } = useQuery({
        queryKey: ['ordererData', iquamaNumber],
        queryFn: async () => {
            if (!iquamaNumber) return null;
            const response = await axiosPublic.get(`/dashboard/orders/iqama/${iquamaNumber}`);
            return response.data;
        },
        enabled: !!iquamaNumber, 
    });

    return {
        ordererData,
        isLoading,
        error,
        refetch
    };
};

export default UseAxiosOrdererData;