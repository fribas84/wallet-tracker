import axios from 'axios';

export interface WalletsBalance {
  account: string;
  balance: string;
}

const getBalances = async (wallets: string[]): Promise<WalletsBalance[]> => {
  const walletsStr: string = wallets.join();
  try {
    const response = await axios.get(
      `https://api.etherscan.io/api?module=account&action=balancemulti&address=${walletsStr}&tag=latest&apikey=YourApiKeyToken`,
    );
    return response.data.result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { getBalances };
