import { useWeb3Contract } from "react-moralis"

export default function LotteryEntrance() {
    const { runContractFunction: enterLottery } = useWeb3Contract({
        abi: "",
        contractAddress: "",
        functionName: "",
        params: {},
        msgValue: "",
    })

    return <div>Lottery Entrance</div>
}
