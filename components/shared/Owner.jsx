"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { publicClient } from "@/utils/client";
import { RocketIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { parseAbiItem } from "viem";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { contractAbi, contractAddress } from "../../constants/index";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import OneYmmo from "./OneYmmo";

const Owner = () => {
  const { address } = useAccount();
  const [currentValueYmmo, setCurrentValueYmmo] = useState("");
  const [IRLAddress, setIRLAddress] = useState("");
  const [APY, setAPY] = useState("");
  const [listAddressContract, setListAddressContract] = useState([]);
  const { data: hash, error, isPending, writeContract } = useWriteContract({});
  const { isLoading: isConfirming, isSuccess, error: errorConfirmation } = useWaitForTransactionReceipt({ hash });

  const createYmmo = async () => {
    writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: "createYmmo",
      args: [currentValueYmmo],
      overrides: {
        gasLimit: 3000000,
      },
    });

    getEvents();

    if (isSuccess) {
      setCurrentValueYmmo("");
      setIRLAddress("");
      setAPY("");
    }
  };

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
  }, [address, isSuccess]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-4 flex flex-col">
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

      {/* Main content */}
      <div className="flex-1 p-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left column - Add Ymmo */}
            <div className="col-span-1 bg-white p-4 rounded-lg shadow-md">
              <p className="text-2xl font-semibold text-gray-800">Créer Nouveau Ymmo</p>
              <Input
                className="w-full p-2 border border-gray-300 rounded mt-2"
                placeholder="Valeur"
                onChange={(e) => setCurrentValueYmmo(e.target.value)}
                value={currentValueYmmo}
              />
              <Input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mt-2"
                placeholder="Adresse"
                onChange={(e) => setIRLAddress(e.target.value)}
                value={IRLAddress}
              />
              <Input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mt-2"
                placeholder="APY"
                onChange={(e) => setAPY(e.target.value)}
                value={APY}
              />
              <Button
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2"
                onClick={createYmmo}
                disabled={isPending}
              >
                {isPending ? "Création..." : "Créer Ymmo"}
              </Button>
              <div>
                {hash && (
                  <Alert className="mb-4 bg-lime-200">
                    <RocketIcon className="h-4 w-4" />
                    <AlertTitle>Information</AlertTitle>
                    <AlertDescription>Transaction Hash: {hash}</AlertDescription>
                  </Alert>
                )}

                {isSuccess && (
                  <Alert className="mb-4 bg-lime-200">
                    <RocketIcon className="h-4 w-4" />
                    <AlertTitle>Information</AlertTitle>
                    <AlertDescription>Transaction confirmed.</AlertDescription>
                  </Alert>
                )}
                {errorConfirmation && (
                  <Alert className="mb-4 bg-red-400">
                    <RocketIcon className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{errorConfirmation.shortMessage || errorConfirmation.message}</AlertDescription>
                  </Alert>
                )}
                {error && (
                  <Alert className="mb-4 bg-red-400">
                    <RocketIcon className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error.shortMessage || error.message}</AlertDescription>
                  </Alert>
                )}
              </div>
            </div>

            {/* Right column - List of Ymmo contracts */}
            <div className="col-span-2">
              <p className="text-xl font-semibold text-gray-800 mb-4">Les biens disponibles</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {listAddressContract.map((contract, index) => (
                  <OneYmmo key={index} addressContract={contract} IRLAddress="12 Rue de France" APY="7%" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Owner;
