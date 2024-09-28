import React, { Fragment, useState } from "react";
import { useConnection } from "../context/connectcontext";
import { networkDetails } from "../constants/constants";
import { trimString } from "../utils/helpers";
import { ethers } from "ethers";

const WalletConnect = () => {
  const { account, chainId, provider, connect } = useConnection();

  const [inputAddress, setInputAddress] = useState("");

  const [balance, setBalance] = useState("0");

  const handleCheckBalance = () => {
    if (inputAddress == ""){
      setBalance("0");
      return;
    }
    provider
      .getBalance(inputAddress)
      .then((res) => setBalance(ethers.formatEther(res)))
      .catch((err) => console.error(err));
  };
  return (
    <div className="cont">
      <h1>Wallet Connect</h1>

      {account ? (
        <div className="">
          <div className="">
            <h2>
              Current Chain:{" "}
              {networkDetails[chainId] ? networkDetails[chainId] : chainId}
            </h2>
          </div>
          <div className="input">
            <input
              type="text"
              name=""
              id=""
              placeholder="0x823923yjhdgfhgy3ed"
              value={inputAddress}
              onChange={(event) => setInputAddress(event.target.value)}
            />
            <button type="button" onClick={handleCheckBalance}>
              Check Account Balance
            </button>
          </div>
          <div className="result">
            <h4>Account: {trimString(inputAddress)}</h4>
            <h3>Balance: {Number(balance).toFixed(2)}</h3>
          </div>
        </div>
      ) : (
        <button onClick={connect} className="">
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnect;
