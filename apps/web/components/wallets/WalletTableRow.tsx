import { IWallet } from '@/types/Wallet'
import React, { useState } from 'react'
import ModalDetails from './ModalDetails';

interface Props {
    wallet: IWallet;
}

const WalletTableRow = ({wallet}: Props) => {
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [showRemove, setShowRemove] = useState<boolean>(false);
    
  return (
      <tr key={wallet.id} className="bg-white">
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
              <button className="text-white mr-2 border py-2 px-5 bg-yellow-500 hover:bg-yellow-700  rounded">
                  Edit
              </button>
              <button className="text-white mr-2 border py-2 px-5 bg-red-500 hover:bg-red-700 rounded ">
                  Remove
              </button>
          </td>
          <td>
              <ModalDetails name={wallet.name} showModalDetails={showDetails} setShowModalDetails={setShowDetails} id={parseInt(wallet.id)} />
          </td>
      </tr>
  )
}

export default WalletTableRow