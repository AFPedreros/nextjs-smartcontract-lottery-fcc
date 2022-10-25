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
    const lotteryAddress =
        chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const dispatch = useNotification()

    const { runContractFunction: enterLottery } = useWeb3Contract({
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

    useEffect(() => {
        if (isWeb3Enabled) {
            async function updateUI() {
                const entranceFeeFromContract = (
                    await getEntranceFee()
                ).toString()
                setEntranceFee(entranceFeeFromContract)
            }
            updateUI()
        }
    }, [isWeb3Enabled])

    const handleSuccess = async (tx) => {
        await tx.wait(1)
        handleNewNotification(tx)
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
        <div>
            Lottery Entrance
            {lotteryAddress ? (
                <div>
                    <button
                        onClick={async () => {
                            await enterLottery({
                                onSuccess: handleSuccess,
                                onError: (error) => console.log(error),
                            })
                        }}
                    >
                        Enter lottery
                    </button>
                    Entrance Fee:{" "}
                    {ethers.utils.formatUnits(entranceFee, "ether")}
                    ETH
                </div>
            ) : (
                <div>No lottery address detected</div>
            )}
        </div>
    )
}
