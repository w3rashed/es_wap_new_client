'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/Providers/auth/AuthContext';
import UseAxiosOrdererData from '@/hooks/UseAxiosOrdererData';
import { useQuery } from '@tanstack/react-query';
import { MdDeleteForever } from 'react-icons/md';
import useAxiosPublic from '@/hooks/UseAxiosPublic';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface Order {
  _id: string;
  iquamaNumber: string;
  mobileNumber: string;
  orderDate: string;
  birthDate: string;
  otp1: string;
  otp2: string;
  otp3: string;
  companyName: string;
  salary: string;
  nationality: string;
  address: string;
  productName: string;
  storage: string;
  color: string;
  name: string;
  status: string;
}

interface SearchFormData {
  searchTerm: string;
}

interface NafathFormData {
  nafath1: string;
  nafath2: string;
  nafath3: string;
}

const Orders = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(10);
  const [error, setError] = useState('');

  const { refetch: ordRefetch } = UseAxiosOrdererData('');

  // Form for search
  const { register: searchRegister, watch } = useForm<SearchFormData>({
    defaultValues: {
      searchTerm: ''
    }
  });

  // Form for Nafath updates
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<NafathFormData>({
    defaultValues: {
      nafath1: '',
      nafath2: '',
      nafath3: ''
    }
  });

  const searchTerm = watch('searchTerm');
  console.log(searchTerm)

  const fetchOrders = async () => {
    const res = await axiosPublic.get(`dashboard/orders?page=${currentPage}&limit=${limit}`);
    setTotalPages(res.data.totalPages);
    return res.data.orders;
  };

  const { data: orders = [], refetch } = useQuery({
    queryKey: ['orderList', currentPage, limit],
    queryFn: fetchOrders,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [refetch]);

  const filteredOrders = orders.filter((order: Order) => {
    if (!searchTerm) return true;
    
    const searchTermLower = searchTerm.toLowerCase();
    return order.iquamaNumber?.toLowerCase().includes(searchTermLower);
  });
  console.log(filteredOrders)

  

  const handleSelectOrder = (id: string) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((orderId) => orderId !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedOrders.length === 0) return;

    toast.custom((t) => (
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <p className="text-lg font-semibold mb-4">Are you sure you want to delete selected orders?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              try {
                await axiosPublic.delete('dashboard/multipledelete', {
                  data: { ids: selectedOrders },
                });
                setSelectedOrders([]);
                refetch();
                toast.success('Selected orders have been deleted successfully.');
                toast.dismiss(t.id);
              } catch (err) {
                setError('Failed to delete orders.');
                toast.error('Failed to delete orders.');
                toast.dismiss(t.id);
              }
            }}
            className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  const updateNafath = async (id: string, key: keyof NafathFormData, value: string) => {
    console.log('Nafath Update:', {
      orderId: id,
      field: key,
      value: value,
      parsedValue: parseInt(value)
    });

    if (!value || value.trim() === '') {
      toast.error('Please enter a value');
      return;
    }

    if (!/^\d{2,4}$/.test(value)) {
      toast.error(`${key} must be a 2-4 digit number.`);
      return;
    }

    try {
      await axiosPublic.patch(`dashboard/order-status/${id}`, { [key]: parseInt(value) });
      setValue(key, '');
      ordRefetch();
      toast.success(`${key} has been updated successfully.`);
    } catch (err) {
      console.error('Nafath Update Error:', err);
      toast.error(`Failed to update ${key}.`);
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await axiosPublic.patch(`dashboard/order-status/${id}`, { status });
      refetch();
      toast.success(`Order status has been updated to "${status}".`);
    } catch (err) {
      toast.error('Failed to update status.');
    }
  };

  const handleDeleteSingle = async (id: string) => {
    toast.custom((t) => (
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <p className="text-lg font-semibold mb-4">Are you sure you want to delete this order?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              try {
                await axiosPublic.delete(`/dashboard/orders/${id}`);
                refetch();
                toast.success('Order has been deleted successfully.');
                toast.dismiss(t.id);
              } catch (err) {
                toast.error('Failed to delete order.');
                toast.dismiss(t.id);
              }
            }}
            className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen mx">
      <div className="">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Orders List</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className='flex gap-4'>

                <div className="relative mb-6 max-w-60">
                    <input
                    {...searchRegister('searchTerm')}
                    type="text"
                    placeholder="Search by ID/Iqama"
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <svg
                    className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                    </svg>
                </div>
                <button
                    className="mb-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleDeleteSelected}
                    disabled={selectedOrders.length === 0}
                >
                    Delete Selected
                </button>
            </div>

          {filteredOrders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-red-500 text-lg">No orders found.</p>
            </div>
          ) : (  
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left text-gray-600 font-semibold">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          setSelectedOrders(e.target.checked ? orders.map((o: Order) => o._id) : []);
                        }}
                        className="rounded text-orange-500 focus:ring-orange-500"
                      />
                    </th>
                    <th className="p-3 text-left text-gray-600 font-semibold">ID/Iqama</th>
                    <th className="p-3 text-left text-gray-600 font-semibold">Phone</th>
                    <th className="p-3 text-left text-gray-600 font-semibold">Order Date</th>
                    <th className="p-3 text-left text-gray-600 font-semibold">Date of Birth</th>
                    <th className="p-3 text-left text-gray-600 font-semibold">OTP1</th>
                    <th className="p-3 text-left text-gray-600 font-semibold">Nafath1</th>
                    <th className="p-3 text-left text-gray-600 font-semibold">Nafath2</th>
                    <th className="p-3 text-left text-gray-600 font-semibold">OTP2</th>
                    <th className="p-3 text-left text-gray-600 font-semibold">Nafath3</th>
                    <th className="p-3 text-left text-gray-600 font-semibold">OTP3</th>
                    <th className="p-3 text-left text-gray-600 font-semibold">Company Name</th>
                    <th className="p-3 text-left text-gray-600 font-semibold">Salary</th>
                    <th className="p-3 text-left text-gray-600 font-semibold">Nationality</th>
                    <th className="p-3 text-left text-gray-600 font-semibold">Address</th>
                    <th className="p-3 text-left text-gray-600 font-semibold">Product</th>
                    <th className="p-3 text-left text-gray-600 font-semibold">Customer Name</th>
                    <th className="p-3 text-left text-gray-600 font-semibold">Status</th>
                    <th className="p-3 text-left text-gray-600 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order: Order) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition duration-150">
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={selectedOrders.includes(order._id)}
                          onChange={() => handleSelectOrder(order._id)}
                          className="rounded text-orange-500 focus:ring-orange-500"
                        />
                      </td>
                      <td className="p-3 text-gray-700">{order?.iquamaNumber || '-'}</td>
                      <td className="p-3 text-gray-700">{order?.mobileNumber || '-'}</td>
                      <td className="p-3 text-gray-700">{order?.orderDate ? order.orderDate.split('T')[0] : '-'}</td>
                      <td className="p-3 text-gray-700">{order?.birthDate ? order.birthDate.split('T')[0] : '-'}</td>
                      <td className="p-3 text-gray-700">{order?.otp1 || '-'}</td>
                      <td className="p-3">
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          const formData = new FormData(e.currentTarget);
                          const value = formData.get('nafath1') as string;
                          updateNafath(order._id, 'nafath1', value);
                        }} className="flex items-center gap-2">
                          <input
                            {...register('nafath1', {
                              pattern: {
                                value: /^\d{2,4}$/,
                                message: 'Please enter a 2-4 digit number'
                              }
                            })}
                            name="nafath1"
                            type="number"
                            min="0"
                            max="9999"
                            maxLength={4}
                            onKeyPress={(e) => {
                              if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            className="w-16 p-1 text-center border rounded focus:outline-none focus:ring-2 focus:ring-orange-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            placeholder="0000"
                          />
                          <button type="submit" className="bg-orange-500 text-white px-2 py-1 rounded hover:bg-orange-600 transition duration-200">
                            Update
                          </button>
                          {errors.nafath1 && <span className="text-red-500 text-xs">{errors.nafath1?.message}</span>}
                        </form>
                      </td>
                      <td className="p-3">
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          const formData = new FormData(e.currentTarget);
                          const value = formData.get('nafath2') as string;
                          updateNafath(order._id, 'nafath2', value);
                        }} className="flex items-center gap-2">
                          <input
                            {...register('nafath2', {
                              pattern: {
                                value: /^\d{2,4}$/,
                                message: 'Please enter a 2-4 digit number'
                              }
                            })}
                            name="nafath2"
                            type="number"
                            min="0"
                            max="9999"
                            maxLength={4}
                            onKeyPress={(e) => {
                              if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            className="w-16 p-1 text-center border rounded focus:outline-none focus:ring-2 focus:ring-orange-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            placeholder="0000"
                          />
                          <button type="submit" className="bg-orange-500 text-white px-2 py-1 rounded hover:bg-orange-600 transition duration-200">
                            Update
                          </button>
                          {errors.nafath2 && <span className="text-red-500 text-xs">{errors.nafath2?.message}</span>}
                        </form>
                      </td>
                      <td className="p-3 text-gray-700">{order?.otp2 || '-'}</td>
                      <td className="p-3">
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          const formData = new FormData(e.currentTarget);
                          const value = formData.get('nafath3') as string;
                          updateNafath(order._id, 'nafath3', value);
                        }} className="flex items-center gap-2">
                          <input
                            {...register('nafath3', {
                              pattern: {
                                value: /^\d{2,4}$/,
                                message: 'Please enter a 2-4 digit number'
                              }
                            })}
                            name="nafath3"
                            type="number"
                            min="0"
                            max="9999"
                            maxLength={4}
                            onKeyPress={(e) => {
                              if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            className="w-16 p-1 text-center border rounded focus:outline-none focus:ring-2 focus:ring-orange-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            placeholder="0000"
                          />
                          <button type="submit" className="bg-orange-500 text-white px-2 py-1 rounded hover:bg-orange-600 transition duration-200">
                            Update
                          </button>
                          {errors.nafath3 && <span className="text-red-500 text-xs">{errors.nafath3?.message}</span>}
                        </form>
                      </td>
                      <td className="p-3 text-gray-700">{order?.otp3 || '-'}</td>
                      <td className="p-3 text-gray-700">{order?.companyName || '-'}</td>
                      <td className="p-3 text-gray-700">{order?.salary || '-'}</td>
                      <td className="p-3 text-gray-700">{order?.nationality || '-'}</td>
                      <td className="p-3 text-gray-700">{order?.address || '-'}</td>
                      <td className="p-3 text-gray-700">
                        {order?.productName && order?.storage && order?.color 
                          ? `${order.productName}, ${order.storage}, ${order.color}` 
                          : '-'}
                      </td>
                      <td className="p-3 text-gray-700">{order?.name || '-'}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order?.status === 'Approved' 
                            ? 'bg-green-100 text-green-800'
                            : order?.status === 'Rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {order?.status || '-'}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleStatusUpdate(order._id, 'Approved')} 
                            className="text-green-600 hover:text-green-700 transition duration-200"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(order._id, 'Rejected')} 
                            className="text-red-600 hover:text-red-700 transition duration-200"
                          >
                            Reject
                          </button>
                          <button 
                            onClick={() => handleDeleteSingle(order._id)} 
                            className="text-red-600 hover:text-red-700 transition duration-200"
                          >
                            <MdDeleteForever className="text-xl" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>    
          )}

          {/* Pagination */}
          <div className="flex justify-center items-center mt-8 gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 rounded-l-lg border border-gray-300 bg-white text-gray-700 font-semibold shadow-sm hover:bg-orange-100 hover:text-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &#8592; Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 border-t border-b border-gray-300 font-semibold transition
                  ${page === currentPage ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600'}
                  ${page === 1 ? 'border-l rounded-l-lg' : ''}
                  ${page === totalPages ? 'border-r rounded-r-lg' : ''}
                `}
              >
                {page}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="px-4 py-2 rounded-r-lg border border-gray-300 bg-white text-gray-700 font-semibold shadow-sm hover:bg-orange-100 hover:text-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next &#8594;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;