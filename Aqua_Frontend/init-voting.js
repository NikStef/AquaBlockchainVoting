import { ethers } from "./ethers-5.1.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const CandidateLength = document.getElementById("CandidateLength")
CandidateLength.onclick = getCandidateLength

const VoterLength = document.getElementById("VoterLength")
VoterLength.onclick = getVoterLength

const setCandidateButton = document.getElementById("setCandidateButton")
setCandidateButton.onclick = setCandidate

const setVoterButton = document.getElementById("setVoterButton")
setVoterButton.onclick = setVoter

const ChangePeriod = document.getElementById("ChangePeriod")
ChangePeriod.onclick = ChangePrd

const Winner = document.getElementById("Winner")
Winner.onclick = getWinner

async function setCandidate() {
    //console.log("no idea")
    const address = document.getElementById("_addressCandidate").value
    const name = document.getElementById("_nameCandidate").value
    if (typeof window.ethereum !== "undefined") {
        console.log(
            `trying to set ${address} as a candidate with the name ${name}`
        )
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const transactionResponse = await contract.setCandidate(
                address,
                name
            )
        } catch (error) {
            console.log(error)
        }
    }
}

async function setVoter() {
    const address = document.getElementById("_addressVoter").value
    const name = document.getElementById("_nameVoter").value
    //console.log("hi")
    if (typeof window.ethereum !== "undefined") {
        console.log(`trying to set ${address} as a voter with the name ${name}`)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const transactionResponse = await contract.setVoter(address, name)
        } catch (error) {
            console.log(error)
        }
    }
}

async function getCandidateLength() {
    //console.log(`Passing`)
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const length = await contract.getCandidateLength()
            // console.log(length.toString())
            // document.getElementById("CandidateLength").innerHTML =
            //     length.toString()

            document.getElementById("view-only").elements[
                "candidatelengthresult"
            ].value = `O αριθμός των υποψηφίων είναι:${length.toString()}`

            // document.getElementById("candidatelengthresult").innerHTML =
            //     length.toString()
        } catch (error) {
            console.log(error)
        }
    }
}

async function getVoterLength() {
    //console.log(`Passing`)
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const length = await contract.getVoterLength()
            //console.log(length.toString())
            document.getElementById("view-only").elements[
                "voterlengthresult"
            ].value = `O αριθμός των ψηφοφόρων είναι:${length.toString()}`
        } catch (error) {
            console.log(error)
        }
    }
}

async function ChangePrd() {
    //console.log(`Passing`)
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            await contract.changePeriod()
        } catch (error) {
            console.log(error)
        }
    }
}

async function getWinner() {
    //console.log(`Passing`)
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            contractResponse = await contract.getWinner()
        } catch (error) {
            console.log("Not the correct Period")
            console.log(error)
        }
    }
}
