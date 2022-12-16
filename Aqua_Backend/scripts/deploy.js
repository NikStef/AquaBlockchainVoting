// imports
const { ethers, run, network } = require("hardhat")

// async main
async function main() {
    const AquaFactory = await ethers.getContractFactory("Aqua")
    console.log("Deploying contract...")
    const aqua = await AquaFactory.deploy()
    await aqua.deployed()
    console.log(`Deployed contract to: ${aqua.address}`)

    // an kanei deploy sto goerli test net thelo to eherscan na to kanei verify
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for block confirmations...")
        await aqua.deployTransaction.wait(6) //perimenei kapoia blocks 4
        await verify(aqua.address, []) //edo kaloume to async verify
    }
}

// async function verify(contractAddress, args) { allos tropos g to async function
const verify = async (contractAddress, args) => {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}

// main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
