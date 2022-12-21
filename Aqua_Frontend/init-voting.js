import { ethers } from "./ethers-5.1.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const CandidateLength = document.getElementById("CandidateLength")
CandidateLength.onclick = getCandidateLength

// const setCandidateButton = document.getElementById("setCandidateButton")
// setCandidateButton.onclick = setCandidate

// async function setCandidate() {
//     const address = document.getElementById("_address").value
//     const name = document.getElementById("_name").value
//     if (typeof window.ethereum !== "undefined") {
//         console.log(
//             `trying to set ${address} as a candidate with the name ${name}`
//         )
//         const provider = new ethers.providers.Web3Provider(window.ethereum)
//         const signer = provider.getSigner()
//         const contract = new ethers.Contract(contractAddress, abi, signer)
//         try {
//             const transactionResponse = await contract.setCandidate({
//                 _address,
//                 _name,
//             })
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }
async function getCandidateLength() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const length = await provider.getCandidateLength(contractAddress)
        console.log(ethers.utils.formatEther(length))
    }
}

function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}`)
    return new Promise((resolve, reject) => {
        try {
            provider.once(transactionResponse.hash, (transactionReceipt) => {
                console.log(
                    `Completed with ${transactionReceipt.confirmations} confirmations. `
                )
                resolve()
            })
        } catch (error) {
            reject(error)
        }
    })
}
