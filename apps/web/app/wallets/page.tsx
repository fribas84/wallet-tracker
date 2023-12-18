'use client';
import ModalNewWallet from '@/components/ModalNewWallet';
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
    const [showModal, setShowModal] = useState<boolean>(false);
    const [newWallet, setNewWallet] = useState<boolean>(false);

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
    }, [router, newWallet]);
    return (
        <>
            <ModalNewWallet showModal={showModal} setShowModal={setShowModal} setNewWallet={setNewWallet}/>
            <div className='bg-white m-5 p-5 rounded-lg shadow-xl'>
                <div className='mx-2 flex justify-between items-center'>
                    <h1 className='text-3xl font-bold'>Wallets</h1>
                    <button onClick={()=>setShowModal(true)}className='bg-teal-500 px-10 hover:bg-teal-700 text-white font-bold py-2 rounded'>New</button>
                </div>
                {wallets.length > 0 ? (
                    <div className="relative overflow-x-auto mt-5">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 rounded-lg">
                            <thead className="text-xs text-gray-900 uppercase bg-gray-200 rounded-lg">
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
                                    <tr key={wallet.id} className="bg-white">
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
        </>
    );
}

export default Wallet