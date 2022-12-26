import { ethers } from "./ethers-5.1.esm.min.js"

const connectButton = document.getElementById("connectButton")
connectButton.onclick = connect

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        try {
            //await ethereum.request({ method: "eth_requestAccounts" })
            //window.location="u_index.php";
            const provider = new ethers.providers.Web3Provider(
                window.ethereum,
                "any"
            )
            await provider.send("eth_requestAccounts", [])
            // const signer = provider.getSigner()
            // const address = await signer.getAddress()
            window.location = "u_index.php"

            // Always prints the address that I first connected with
            //console.log(address)
        } catch (error) {
            console.log(error)
            errorFinder(error)
        }
    } else {
        connectButton.innerHTML = "Παρακαλώ κατεβάστε το Metamask."
    }
}

async function errorFinder(particular_error) {
    var substr0 = "User rejected"
    var substr1 = "already pending"
    try {
        var p2 = particular_error.message
    } catch {}

    // console.log(particular_error)
    // console.log(p1)
    // console.log(p2)

    if (p2.includes(substr0)) {
        document.getElementById("error_code").innerHTML =
            "Ο χρήστης απέρριψε την συναλλαγή."
        //console.log("Ο χρήστης απέρριψε την συναλλαγή.")
    }
    if (p2.includes(substr1)) {
        document.getElementById("error_code").innerHTML =
            "Υπάρχει ήδη αίτημα τσέκαρε το Metamask extension σου."
        //console.log("Ο χρήστης απέρριψε την συναλλαγή.")
    }
}
