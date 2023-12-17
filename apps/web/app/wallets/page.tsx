'use client';
import { useAuth } from '@/context/authContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface wallet {
    id: string,
    name: string,
    address: string
}

type Props = {}

const Wallet = (props: Props) => {
    const [wallets, setWallets] = useState<wallet[]>([]);
    const router = useRouter(); 

    useEffect(() => {
        const fecthWallets = async () => {
            try {
                const url = `http://localhost:4000/api/v1/wallets`
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push('/login');
                    return
                }
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                const response = await axios.get(url, config);
                console.log(response.data)
                const walletsData = response.data;
                console.log(walletsData);
                setWallets(walletsData);
            } catch (error) {
                console.log(error);
            }
        }
        fecthWallets();
        }, [router]);
    return (
        <div className='bg-white m-5 p-5 rounded-ll shadow-xl'>
            <h1 className='text-3xl font-bold'>Wallets</h1>
            {wallets.length > 0 ? (
                <div className="relative overflow-x-auto mt-5">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 font-bold text-lg">
                                    Wallet Name
                                </th>
                                <th scope="col" className="px-6 py-3 font-bold text-lg">
                                    Address
                                </th>
                                <th scope="col" className="px-6 py-3 font-bold text-lg">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {wallets.map((wallet) => (
                                <tr key={wallet.id} className="bg-white dark:bg-gray-700">
                                    <td className="px-6 py-3 text-lg font-semibold">
                                        {wallet.name}
                                    </td>
                                    <td className="px-6 py-3 text-lg font-semibold">
                                        {wallet.address}
                                    </td>
                                    <td className="px-6 py-3 text-lg font-semibold">
                                        {/* Wallet balance or additional data */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <h2 className='text-2xl font-bold'>No Wallets Found</h2>
            )}
        </div>
    );
}

export default Wallet