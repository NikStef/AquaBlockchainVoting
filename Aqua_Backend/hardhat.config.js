require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("solidity-coverage")

const GOERLI_RPC_URL =
    process.env.GOERLI_RPC_URL ||
    "https://eth-goerli.alchemyapi.io/v2/your-api-key"
const PRIVATE_KEY =
    process.env.PRIVATE_KEY ||
    "0x11ee3108a03081fe260ecdc106554d09d9d1209bcafd46942b10e02943effc4a"
const PRIVATE_KEY_GANACHE =
    process.env.PRIVATE_KEY_GANACHE ||
    "0x11ee3108a03081fe260ecdc106554d09d9d1209bcafd46942b10e02943effc4a"

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""

module.exports = {
    dafaultNerwork: "hardhat",
    networks: {
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY], //edo mporeis na prostheseis k alla accounts
            chainId: 5,
        },
        localhostgn: {
            url: "http://172.28.128.1:7545",
            accounts: [PRIVATE_KEY_GANACHE],
            chainId: 1337,
        },
        localhosthh: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
        },
    },
    solidity: "0.8.9",
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
}
