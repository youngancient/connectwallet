import React, { Fragment } from "react";
import { useConnection } from "../context/connection";
import { shortenAccount } from "../utils";
import { networkInfoMap, supportedChains } from "../constants";
import useBalance from "../hooks/useBalance";

const Connection = () => {
  const { account, chainId, isActive, connect, switchToChain } =
    useConnection();
  const ethBalance = useBalance(account);

  if (!account)
    return (
      <button
        onClick={connect}
        className=""
      >
        Connect
      </button>
    );
  return (
    <div className="flex gap-2 items-center">
      <div className="flex gap-2 items-center font-bold">
        <h2>{`${Number(ethBalance).toFixed(2)}ETH`}</h2>
        <h4>{shortenAccount(account)}</h4>
      </div>
      <div className="flex gap-2 items-center">
        <div className="relative text-right">
          <h4>{isActive ? networkInfoMap[chainId]?.chainName : "Networks"}</h4>
          <div>
            <div>
              {({ active }) => (
                <button
                  onClick={() => switchToChain(supportedChains[0])}
                  className={`${
                    active ? "bg-blue-400 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {networkInfoMap[supportedChains[0]].chainName}
                </button>
              )}
            </div>
            <div>
              {({ active }) => (
                <button
                  onClick={() => switchToChain(supportedChains[1])}
                  className={`${
                    active ? "bg-blue-400 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {networkInfoMap[supportedChains[1]].chainName}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connection;
