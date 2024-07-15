"use client";
import { useEffect, useState } from "react";

import { useAccount } from "wagmi";
import { contractAbi, contractAddress } from "../../constants/index";

import { parseAbiItem } from "viem";

import { publicClient } from "@/utils/client";

import OneYmmo from "./OneYmmo";

const User = () => {
  const { address } = useAccount();
  const [listAddressContract, setListAddressContract] = useState([]);

  const getEvents = async () => {
    const proposalChangeLog = await publicClient.getLogs({
      address: contractAddress,
      event: parseAbiItem("event NewContractYmmoDeploy(address contractAddress)"),
      fromBlock: 6307000n,
      toBlock: "latest",
    });

    const array = proposalChangeLog.map((log) => log.args.contractAddress);
    setListAddressContract(array);
  };

  useEffect(() => {
    getEvents();
  }, [address]);

  return (
    <div className=" flex">
      <div className="w-64 bg-gray-100 p-4 flex-shrink-0 h-screen">
        <nav className="flex flex-col space-y-2">
          <a href="#" className="text-gray-700 hover:bg-gray-200 p-2 rounded">
            Dashboard
          </a>
          <a href="#" className="text-gray-700 hover:bg-gray-200 p-2 rounded">
            Investissements
          </a>
          <a href="#" className="text-gray-700 hover:bg-gray-200 p-2 rounded">
            Vendre ses Ymmo
          </a>
          <a href="#" className="text-gray-700 hover:bg-gray-200 p-2 rounded">
            Collecter les rendements
          </a>
          <a href="#" className="text-gray-700 hover:bg-gray-200 p-2 rounded">
            Historique des transactions
          </a>
          <a href="#" className="text-gray-700 hover:bg-gray-200 p-2 rounded">
            Support
          </a>
          <a href="#" className="text-gray-700 hover:bg-gray-200 p-2 rounded">
            FAQ
          </a>
          <a href="#" className="text-gray-700 hover:bg-gray-200 p-2 rounded">
            Contact
          </a>
          <a href="#" className="text-gray-700 hover:bg-gray-200 p-2 rounded">
            Communauté
          </a>
          <a href="#" className="text-gray-700 hover:bg-gray-200 p-2 rounded">
            Paramètre
          </a>
        </nav>
      </div>
      <div className="col-span-2">
        <p className="text-xl font-semibold text-gray-800 mb-4">Les biens disponibles</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {listAddressContract.map((contract, index) => (
            <OneYmmo key={index} addressContract={contract} IRLAddress="12 Rue de France" APY="7%" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;
