import { IWallet } from '@/types/Wallet'
import React, { useState } from 'react'
import ModalDetails from './ModalDetails';
import DeleteModal from './DeleteModal';
interface Props {
    wallet: IWallet;
    moveUp: (preference: number) => void;
    moveDown: (preference: number) => void;
    walletCount: number;
    deleteWallet: (address: string) => void;
}

const WalletTableRow = ({ wallet, moveUp, moveDown, walletCount, deleteWallet }: Props) => {
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [showRemove, setShowRemove] = useState<boolean>(false);

    return (
        <tr key={wallet.preference} className="bg-white">
            <td className="px-6 py-3 text-lg font-semibold">
                {wallet.name}
            </td>
            <td className="px-6 py-3 text-lg font-semibold">
                {wallet.address}
            </td>
            <td className="px-6 py-3 text-lg font-semibold">
                <button onClick={() => setShowDetails(true)} className="text-white mr-2 border py-2 px-5 bg-teal-500 hover:bg-teal-700 rounded ">
                    Details
                </button>

                <button className="text-white mr-2 border py-2 px-5 bg-red-500 hover:bg-red-700 rounded " onClick={()=>setShowRemove(true)} >
                    Remove
                </button>
                {wallet.preference > 0 && (
                    <button onClick={() => moveUp(wallet.preference)} className="text-white mr-2 border py-2 px-5 bg-blue-500 hover:bg-blue-700 rounded">
                        ↑
                    </button>
                )}

                {wallet.preference + 1 < walletCount && (
                    <button onClick={() => moveDown(wallet.preference)} className="text-white mr-2 border py-2 px-5 bg-blue-500 hover:bg-blue-700 rounded" >
                        ↓
                    </button>
                )}
          </td>
            <td>
                <ModalDetails name={wallet.name} showModalDetails={showDetails} setShowModalDetails={setShowDetails} address={wallet.address} />
                <DeleteModal name={wallet.name} showModal={showRemove} setShowModal={setShowRemove} address={wallet.address} deleteWallet={deleteWallet}/>
            </td>
        </tr>
    )
}

export default WalletTableRow