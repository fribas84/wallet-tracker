'use client';
import ModalNewWallet from '@/components/wallets/ModalNewWallet';
import { useAuth } from '@/context/authContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { IWallet } from '@/types/Wallet';
import WalletTable from '@/components/wallets/WalletTable';


type Props = {}

const Wallet = (props: Props) => {
    const [wallets, setWallets] = useState<IWallet[]>([]);
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
            <ModalNewWallet showModal={showModal} setShowModal={setShowModal} setNewWallet={setNewWallet} />
            <div className='bg-white m-5 p-5 rounded-lg shadow-xl'>
                <div className='mx-2 flex justify-between items-center'>
                    <h1 className='text-3xl font-bold'>Wallets</h1>
                    <button onClick={() => setShowModal(true)} className='text-white mr-2 border py-2 px-5 bg-teal-500  text-lg font-semibold hover:bg-teal-700 rounded'>New</button>
                </div>
                {wallets.length > 0 ? (
                    < WalletTable wallets={wallets} />
                ) : (
                    <h2 className='text-2xl font-bold'>No Wallets Found</h2>
                )}
            </div>
        </>
    );
}

export default Wallet