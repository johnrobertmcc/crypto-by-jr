import { useEffect, useState, createContext, useContext } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants";

const TransactionContext = createContext();

const { ethereum } = window;

/**
 * Function used to create a contract from Ethereum..
 *
 * @return {object}     The smart contract.
 */
function createEthereumContract() {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    signer
  );

  return transactionsContract;
}

/**
 * Gets the smart contract using the signer.
 *
 * @return {object}   The smart contract.
 */
function getEthereumContract() {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    signer
  );

  return transactionContract;
}

/**
 * Returns the context state.
 *
 * @return {object}   The context of the dapp.
 */
export function useAppContext() {
  return useContext(TransactionContext);
}

/**
 * The wrapper for the dapp containing the context.
 *
 * @return {Element}   The TransactionProvider component.
 */
export function TransactionProvider({ children }) {
  const defaultForm = {
    addressTo: "",
    amount: "",
    message: "",
  };
  const [loading, setIsLoading] = useState(false);
  const [currentAccount, setCurrentAccount] = useState();
  const [transactions, setTransactions] = useState([]);
  const [metaMask, setMetaMask] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [formData, setFormData] = useState(defaultForm);

  /**
   * Returns the transactions of the logged in account number.
   *
   * @return {Array}  The transactions by account number.
   */
  async function getAllTransactions() {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions =
          await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map(
          (transaction) => ({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(
              transaction.timestamp.toNumber() * 1000
            ).toLocaleString(),
            message: transaction.message,
            amount: parseInt(transaction.amount._hex) / 10 ** 18,
          })
        );

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Checks if an account is present and sets the account number present on the window.
   *
   */
  async function checkIfWalletIsConnected() {
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (!!accounts.length) {
      setCurrentAccount(accounts[0]);
      getAllTransactions();
    } else {
      throw new Error("No Accounts Found");
    }
  }

  /**
   * Checks if any transactions have been made by the logged in account.
   *
   */
  async function checkIfTransactionsExists() {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const currentTransactionCount =
          await transactionsContract.getTransactionCount();

        window.localStorage.setItem(
          "transactionCount",
          currentTransactionCount
        );
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  }

  /**
   * Pings MetaMask extension to connect the wallet.
   *
   */
  async function connectWallet() {
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.error("Error: ", err);
    }
  }

  /**
   * Deploys a smart contract to send a transaction using form data.
   *
   */
  async function sendTransaction() {
    try {
      const { addressTo, amount, message } = formData;

      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          },
        ],
      });

      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message
      );

      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`Success - ${transactionHash.hash}`);
      const transactionCount = await transactionContract.getTransactionCount();
      setFormData(defaultForm);
      setTransactionCount(transactionCount.toNumber());
    } catch (err) {
      console.error("Error: ", err);
    }
  }

  /**
   * Sets the form data with updated values.
   *
   */
  function handleChange(e, name) {
    setFormData((prev) => {
      return { ...prev, [name]: e };
    });
  }

  useEffect(() => {
    if (ethereum) {
      setMetaMask(true);
    }
  }, []);

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExists();
    getAllTransactions();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        transactions,
        loading,
        metaMask,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
