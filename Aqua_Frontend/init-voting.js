import { ethers } from "./ethers-5.1.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const CandidateLength = document.getElementById("CandidateLength")
CandidateLength.onclick = getCandidateLength

const VoterLength = document.getElementById("VoterLength")
VoterLength.onclick = getVoterLength

const period = document.getElementById("period")
period.onclick = getState

const setCandidateButton = document.getElementById("setCandidateButton")
setCandidateButton.onclick = setCandidate

const setVoterButton = document.getElementById("setVoterButton")
setVoterButton.onclick = setVoter

const ChangePeriod = document.getElementById("ChangePeriod")
ChangePeriod.onclick = ChangePrd

const Winner = document.getElementById("Winner")
Winner.onclick = getWinner

async function setCandidate() {
    document.getElementById("error_code").innerHTML = ""
    //console.log("no idea")
    const address = document.getElementById("_addressCandidate").value
    const name = document.getElementById("_nameCandidate").value
    if (typeof window.ethereum !== "undefined") {
        // console.log(
        //     `trying to set ${address} as a candidate with the name ${name}`
        // )
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const contractResponse = await contract.setCandidate(address, name)
        } catch (error) {
            errorFinder(error)
        }
    }
}

async function setVoter() {
    document.getElementById("error_code").innerHTML = ""
    const address = document.getElementById("_addressVoter").value
    //console.log("hi")
    if (typeof window.ethereum !== "undefined") {
        // console.log(`trying to set ${address} as a voter with the name ${name}`)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const contractResponse = await contract.setVoter(address)
        } catch (error) {
            //console.log(error)
            errorFinder(error)
        }
    }
}

async function getCandidateLength() {
    document.getElementById("error_code").innerHTML = ""
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
            //console.log(error)
            console.log(error)
        }
    }
}

async function getState() {
    document.getElementById("error_code").innerHTML = ""
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            var per
            const stage = await contract.getState()

            if (stage == 0) {
                per = "Αρχικοποίηση"
            } else if (stage == 1) {
                per = "Εγγραφής"
            } else if (stage == 2) {
                per = "Ψηφοφορίας"
            } else {
                per = "Λήξης"
            }

            document.getElementById("view-only").elements[
                "periodResult"
            ].value = `Βρισκόμαστε στην περίοδο:${per}`
        } catch (error) {
            console.log(error)
        }
    }
}

async function getVoterLength() {
    document.getElementById("error_code").innerHTML = ""
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
    document.getElementById("error_code").innerHTML = ""
    //console.log(`Passing`)
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            await contract.changePeriod()
        } catch (error) {
            //console.log("hiiiiiiii")
            //var particular_error = error.toString()
            //errorFinder(particular_error)
            //const substr = "User denied transaction"
            // console.log(error.includes(substr))
            //console.log(error)
            errorFinder(error)
        }
    }
}

async function getWinner() {
    document.getElementById("error_code").innerHTML = ""
    //console.log(`Passing`)
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            await contract.getWinner()
            window.location.href = "./results.php"
        } catch (error) {
            //console.log(error)
            errorFinder(error)
        }
    }
}

async function errorFinder(particular_error) {
    //const substr = "User denied transaction"
    var substr0 = "User denied"
    var substr1 = "It's not the ending period"
    var substr2 = "Only initiator"
    var substr3 = "It's not the registration period"
    var substr4 = "Candidate already exists"
    var substr5 = "The voter already exists."
    var substr6 = "You are in the last stage"
    var substr7 = "Already calculated"

    // var p1
    // var p2

    // if ((p1 = particular_error.data.message)) {
    //     p1 = particular_error.data.message
    // }

    // if ((p2 = particular_error.message)) {
    //     p2 = particular_error.message
    // }

    try {
        var p1 = particular_error.data.message
    } catch {}
    try {
        var p2 = particular_error.message
    } catch {}

    // console.log(particular_error)
    // console.log(p1)
    // console.log(p2)

    //console.log(particular_error.includes(substr1))
    if (p2.includes(substr0)) {
        document.getElementById("error_code").innerHTML =
            "Ο χρήστης απέρριψε την συναλλαγή."
        //console.log("Ο χρήστης απέρριψε την συναλλαγή.")
    }
    if (p1.includes(substr1)) {
        document.getElementById("error_code").innerHTML =
            "Δεν είναι η περίοδος λήξης."
        //console.log("Δεν είναι η περίοδος λήξης.")
    }
    if (p1.includes(substr2)) {
        document.getElementById("error_code").innerHTML =
            "Mόνο αυτός που έκανε deploy το συμβόλαιο έχει αυτό το δικαίωμα."
        // console.log(
        //     "Mόνο αυτός που έκανε deploy το συμβόλαιο έχει αυτό το δικαίωμα."
        // )
    }
    if (p1.includes(substr3)) {
        document.getElementById("error_code").innerHTML =
            "Δεν είναι η περίοδος εγγραφής."
    }
    if (p1.includes(substr4)) {
        document.getElementById("error_code").innerHTML =
            "Ο υποψήφιος υπάρχει ήδη."
    }
    if (p1.includes(substr5)) {
        document.getElementById("error_code").innerHTML =
            "Ο ψηφοφόρος υπάρχει ήδη."
    }
    if (p1.includes(substr6)) {
        document.getElementById("error_code").innerHTML =
            "Είμαστε στη τελευταία περίοδο."
    }
    if (p1.includes(substr7)) {
        document.getElementById("error_code").innerHTML =
            "Τα αποτελέσματα έχουν ήδη υπολογιστεί."
    }
}
