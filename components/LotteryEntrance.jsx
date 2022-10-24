import { useWeb3Contract } from "react-moralis"
import { abi, contractAddress } from "../constants"
import { useMoralis } from "react-moralis"

export default function LotteryEntrance() {
    const { chainId: chainIdHex } = useMoralis()
    console.log(parseInt(chainIdHex))
    // const { runContractFunction: enterLottery } = useWeb3Contract({
    //     abi: abi,
    //     contractAddress: contractAddress,
    //     functionName: "enterLottery",
    //     params: {},
    //     msgValue: "",
    // })

    return <div>Lottery Entrance</div>
}
