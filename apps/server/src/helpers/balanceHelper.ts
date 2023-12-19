import axios from 'axios';

const getBalance = async (wallet: string): Promise<number> => {
  try {
    const url: string = `https://api.etherscan.io/api?module=account&action=balance&address=${wallet}&tag=latest&apikey=${process.env.ETHERSCAN_API_KEY}`;
    const response = await axios.get(url);
    const weiToEther = Number(BigInt(response.data.result) / BigInt(1e18));
    return weiToEther;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getIsOld = async (wallet: string): Promise<boolean> => {
  try {
    const response = await axios.get(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${wallet}&startblock=0&endblock=99999999&page=1&offset=1&sort=desc&apikey=${process.env.ETHERSCAN_API_KEY}`,
    );
    const transaction = response.data.result;
    if (transaction.length === 0) {
      return false;
    }
    const timeStamp = transaction[0].timeStamp;
    const oneYearInSeconds = 365 * 24 * 60 * 60; // Milliseconds in one year
    const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);
    const oneYearAgo = currentTimeInSeconds - oneYearInSeconds;
    return timeStamp < oneYearAgo;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getRates = async (): Promise<{ usd: number; eur: number }> => {
  try {
    const url =
      'https://min-api.cryptocompare.com/data/price?fsym=eth&tsyms=usd,eur';
    const response = await axios.get(url);

    return {
      usd: response.data.USD,
      eur: response.data.EUR,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export { getBalance, getIsOld, getRates };
