import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"

export default function LotteryEntrance() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const [entranceFee, setEntranceFee] = useState("0")
    const [numPlayers, setNumPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")
    const lotteryAddress =
        chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const dispatch = useNotification()

    const {
        runContractFunction: enterLottery,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "enterLottery",
        params: {},
        msgValue: entranceFee,
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "getEntranceFee",
        params: {},
        msgValue: "",
    })

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "getNumberOfPlayers",
        params: {},
        msgValue: "",
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "getRecentWinner",
        params: {},
        msgValue: "",
    })

    async function updateUI() {
        const entranceFeeFromContract = (await getEntranceFee()).toString()
        const numPlayersFromContract = (await getNumberOfPlayers()).toString()
        const winnerFromContract = await getRecentWinner()
        setEntranceFee(entranceFeeFromContract)
        setNumPlayers(numPlayersFromContract)
        setRecentWinner(winnerFromContract)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    const handleSuccess = async (tx) => {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI()
    }

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction complete",
            tittle: "Tx notification",
            position: "topR",
        })
    }

    return (
        <div className="p-16 bg-gradient-to-r from-gray-900  via-gray-900 to-emerald-900 mt-6 mx-4 rounded-lg">
            {lotteryAddress ? (
                <div className="flex">
                    <div>
                        <h1 className="text-5xl font-bold w-2/3">
                            New Crypto Lottery - Win your first price with ETH
                            Lottery
                        </h1>
                        <button
                            className="bg-emerald-700 hover:bg-emerald-900 text-white font-bold py-2 px-4 rounded mt-32"
                            onClick={async () => {
                                await enterLottery({
                                    onSuccess: handleSuccess,
                                    onError: (error) => console.log(error),
                                })
                            }}
                            disabled={isLoading || isFetching}
                        >
                            {isLoading || isFetching ? (
                                <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                            ) : (
                                "Enter Lottery"
                            )}
                        </button>
                    </div>
                    <div className="grid justify-items-center grid-rows-3 gap-6 w-2/3 px-6">
                        <div className="w-1/2 self-center border-2 border-emerald-900 rounded-lg p-4">
                            <h2 className="text-xl">Entrance Fee:</h2>
                            {ethers.utils.formatUnits(entranceFee, "ether")} ETH
                        </div>
                        <div className="w-1/2 self-center border-2 border-emerald-900 rounded-lg p-4">
                            <h2 className="text-2xl">Players:</h2>
                            {numPlayers}
                        </div>
                        <div className="w-1/2 self-center border-2 border-emerald-900 rounded-lg p-4">
                            <h2 className="text-2xl"> Recent Winner:</h2>
                            {recentWinner.slice(0, 5)}...
                            {recentWinner.slice(recentWinner.length - 4)}
                        </div>
                    </div>
                </div>
            ) : (
                <div>No lottery address detected</div>
            )}
        </div>
    )
}
