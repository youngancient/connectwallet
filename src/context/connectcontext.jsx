import { createContext, useContext, useEffect, useState } from "react";
import { getProvider } from "../utils/helpers";
import { defaultChainId } from "../constants/constants";
import { ethers } from "ethers";

const Connection = createContext();

const ConnectionProvider = ({ children }) => {
    const [account, setAccount] = useState();
    const [chainId, setChainId] = useState();
    const [isActive, setIsActive] = useState(false);
    const [provider, setProvider] = useState(
        getProvider(defaultChainId)
    );

    const ethereum  = window.ethereum;
    const alat = window.alert;

    const connect = async () => {
        if (ethereum === undefined)
            return alat("not an ethereum-enabled browser");
        try {
            return ethereum.request({
                method: "eth_requestAccounts",
            });
        } catch (error) {
            console.log("error: ", error);
        }
    };

    const handleAccountChanged = async (accounts) => {
        if (!accounts.length) {
            setAccount(undefined);
            setChainId(undefined);
            setIsActive(false);
            return setProvider(getProvider(defaultChainId));
        }
        const chain = await ethereum.request({
            method: "eth_chainId",
        });

        setAccount(accounts[0]);
        setChainId(Number(chain));
        setIsActive(true);
            setProvider(new ethers.BrowserProvider(ethereum));
    };

    const handleChainChanged = (chain) => {
        setChainId(Number(chain));
        setIsActive(true);
        setProvider(new ethers.BrowserProvider(ethereum));
    };

    const quickConnect = async () => {
        if (ethereum === undefined) return;
        const accounts = await window?.ethereum?.request({
            method: "eth_accounts",
        });

        if (!accounts.length) return;

        handleAccountChanged(accounts);
    };

    useEffect(() => {
        if (ethereum === undefined) return;
        quickConnect();
        ethereum.on("chainChanged", handleChainChanged);

        ethereum.on("accountsChanged", handleAccountChanged);

        return () => {
            ethereum.removeListener(
                "accountsChanged",
                handleAccountChanged
            );

            ethereum.removeListener("chainChanged", handleChainChanged);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

   

    return (
        <Connection.Provider
            value={{
                account,
                chainId,
                isActive,
                provider,
                connect,
            }}
        >
            {children}
        </Connection.Provider>
    );
};

export const useConnection = () => useContext(Connection);

export default ConnectionProvider;