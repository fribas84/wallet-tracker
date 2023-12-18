import { IWallet } from '@/types/Wallet';
import React from 'react'
import WalletTableRow from './WalletTableRow';

interface Props {
    wallets: IWallet[];
}

const WalletTable = ({ wallets }: Props) => {
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
                        <WalletTableRow key={wallet.id} wallet={wallet} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default WalletTable