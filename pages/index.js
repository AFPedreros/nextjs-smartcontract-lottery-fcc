import Head from "next/head"
import styles from "../styles/Home.module.css"
// import ManualHeader from "../components/ManualHeader"
import Header from "../components/Header"
import LotteryEntrance from "../components/LotteryEntrance"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Lottery App</title>
                <meta name="description" content="Web3 Lottery App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            Hellooo!
            <LotteryEntrance/>
        </div>
    )
}
