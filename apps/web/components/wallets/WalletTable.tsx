import { IWallet } from '@/types/Wallet';
import React from 'react'
import WalletTableRow from './WalletTableRow';

interface Props {
    wallets: IWallet[];
    setWallets: React.Dispatch<React.SetStateAction<IWallet[]>>;
    setChangesSaved: React.Dispatch<React.SetStateAction<boolean>>;
}

const WalletTable = ({ wallets, setWallets, setChangesSaved }: Props) => {
    
    const swapWallets = (index1: number, index2: number) => {
        let newWallets: IWallet[] = [...wallets];
        let wallet1: IWallet = newWallets[index1];
        let wallet2: IWallet = newWallets[index2];
        const tempPreference = wallet1.preference;
        wallet1.preference = wallet2.preference;
        wallet2.preference = tempPreference;
        [newWallets[index1], newWallets[index2]] = [wallet2, wallet1];
        setWallets(newWallets)
        setChangesSaved(false);
    };

    const moveUp = (preference: number) => {
        const index = wallets.findIndex(w => w.preference === preference);
        swapWallets(index, index - 1);
    }
    const moveDown = (preference: number) => {
        const index = wallets.findIndex(w => w.preference === preference);
        swapWallets(index, index + 1);
    }

    return (
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
                        <WalletTableRow key={wallet.id} wallet={wallet} moveDown={moveDown} moveUp={moveUp} walletCount={wallets.length}/>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default WalletTable