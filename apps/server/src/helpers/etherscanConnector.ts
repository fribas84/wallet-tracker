import axios from 'axios';

const getBalance = async (wallet: string): Promise<string> => {
  try {
    const response = await axios.get(
      `https://api.etherscan.io/api?module=account&action=balance&address=${wallet}&tag=latest&apikey=${process.env.ETHERSCAN_API_KEY}`,
    );
    return response.data.result;
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
export { getBalance, getIsOld };
