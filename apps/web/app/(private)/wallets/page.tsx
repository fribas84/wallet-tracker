'use client';
import ModalNewWallet from '@/components/wallets/ModalNewWallet';
import { useAuth } from '@/context/authContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { IWallet } from '@/types/Wallet';
import WalletTable from '@/components/wallets/WalletTable';
import Alert from '@/components/Alert';
import { axiosClient } from '@/config/axiosClient';



type Props = {}

const Wallet = (props: Props) => {
    const [wallets, setWallets] = useState<IWallet[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [alertError, setAlertError] = useState<boolean>(false);
    const [changesSaved, setChangesSaved] = useState<boolean>(true);

    const router = useRouter();


    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (showAlert) {
            timer = setTimeout(() => {
                setShowAlert(false);
            }, 5000); // 5000 milliseconds = 5 seconds
        }

        // Cleanup function to clear the timer if the component unmounts
        return () => clearTimeout(timer);
    }, [showAlert]);

    useEffect(() => {
        const fecthWallets = async () => {
            try {
                const url = `/wallets`
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
                const response = await axiosClient.get(url, config);
                const walletsData = response.data.sort((a: IWallet, b: IWallet) => a.preference - b.preference);
                setWallets(walletsData);
                setAlertError(false);
                setAlertMessage('');
                setShowAlert(false);
            } catch (error) {
                setAlertError(true);
                setAlertMessage((error as any).response.data.message  || 'Error occured while fetching wallets');
                setShowAlert(true);
            }
        }
        fecthWallets();
    }, [router]);

    const addNewWallet = (newWallet: IWallet) => {
        setWallets([...wallets, newWallet]); 
    }

    const handleSavePreference = async () => {
        try {
            const url = `/wallets/edit/multiple`
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
            const response = await axiosClient.patch(url, { wallets: wallets }, config);
            setAlertError(false);
            setAlertMessage("Preference order saved");
            setShowAlert(true);
            setChangesSaved(true);


        } catch (error) {
            setAlertError(true);
            setAlertMessage((error as any).response.data.message || 'Error occured while saving changes');
            setShowAlert(true);
        }
    }
    return (
        <>
            <ModalNewWallet showModal={showModal} setShowModal={setShowModal} addNewWallet={addNewWallet} />
            <div className='bg-white m-5 p-5 rounded-lg shadow-xl'>
                {showAlert && <Alert error={alertError} msg={alertMessage} />}
                <div className='mx-2 flex justify-between items-center'>
                    <h1 className='text-3xl font-bold'>Wallets</h1>
                    <div>
                        {!changesSaved && <button onClick={handleSavePreference} className='text-white mr-2 border py-2 px-5  bg-sky-500  text-lg font-semibold hover:bg-sky-700 rounded'>Save changes</button>}
                        <button onClick={() => setShowModal(true)} className='text-white mr-2 border py-2 px-5 bg-teal-500  text-lg font-semibold hover:bg-teal-700 rounded'>New</button>
                    </div>

                </div>
                {wallets.length > 0 ? (
                    < WalletTable wallets={wallets} setWallets={setWallets} setChangesSaved={setChangesSaved} />
                ) : (
                    <h2 className='text-2xl font-bold'>No Wallets Found</h2>
                )}
            </div>
        </>
    );
}

export default Wallet