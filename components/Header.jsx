import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <div className="flex flex-row">
            <h1 className="py-4 px-4 font-bold text-3xl">Goerli ETH Lottery</h1>
            <div className="ml-auto px-4 py-4">
                <ConnectButton moralisAuth={false} />
            </div>
        </div>
    )
}
