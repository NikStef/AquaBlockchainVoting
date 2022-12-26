import { ethers } from "./ethers-5.1.esm.min.js"
import { abi, contractAddress } from "./constants.js"
import "./Chart.js.2.5.0.Chart.min.js"

const colours = [
    "#F7CAC9",
    "#92A8D1",
    "#88B04B",
    "#34568B",
    "#955251",
    "#B565A7",
    "#009B77",
    "#DD4124",
    "#D65076",
    "#45B8AC",
    "#EFC050",
    "#5B5EA6",
    "#9B2335",
    "#DFCFBE",
    "#55B4B0",
    "#E15D44",
    "#7FCDCD",
    "#BC243C",
]

window.addEventListener("load", genesisWinners)

var xValues = []
var yValues = []
var barColors = []

async function genesisWinners() {
    //console.log("hiiiii")
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
        //const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, provider)
        try {
            const winner1 = await contract.getWinnersbyId(0)
            const winner2 = await contract.getWinnersbyId(1)
            document.getElementById("win1").innerHTML = winner1
            document.getElementById("win2").innerHTML = winner2
            let winner1Name = await contract.getCandidateName(winner1)
            let winner2Name = await contract.getCandidateName(winner2)
            if (winner2 == 0) {
                winner2Name = "Λευκό"
            }
            document.getElementById("win1name").innerHTML = `${winner1Name}:`
            document.getElementById("win2name").innerHTML = `${winner2Name}:`
            genesis()
        } catch (error) {
            console.log(error)
        }
    }
}

async function genesis() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
        const contract = new ethers.Contract(contractAddress, abi, provider)
        try {
            let length = await contract.getCandidateLength()
            length = length.toString()

            let totalVotes = await contract.getTotalVotes()
            totalVotes = parseInt(totalVotes._hex, 16)

            //console.log(totalVotes)
            for (let count = 0; count <= length; count++) {
                const information = await contract.getInformation(count)

                const random = Math.floor(Math.random() * colours.length)
                //console.log(random, colours[random])
                //let name = `${count}.${information.name}`
                let name = `${information.name}:`

                if (count == 0) {
                    name = "Λευκά:"
                }
                let votecount = parseInt(information.voteCount._hex, 16)
                xValues.push(name)
                yValues.push(votecount)
                barColors.push(colours[random])
                //console.log(name, votecount)
                let percentofVotes = `${Math.round(
                    (votecount * 100) / totalVotes
                )}%`
                //console.log(name, votecount, percentofVotes)
                var table = document.getElementById("poll")
                //for (let count2 = 0; count2 <= 3; count2++) {}
                var td = document.createElement("td")
                td.appendChild(document.createTextNode(name))
                td.setAttribute("class", "democlass")
                table.appendChild(td)
                //document.getElementById("myH1").setAttribute("class", "democlass");
                var td = document.createElement("td")
                td.appendChild(document.createTextNode(votecount))
                table.appendChild(td)
                var td = document.createElement("td")
                td.appendChild(document.createTextNode(percentofVotes))
                table.appendChild(td)
                var tr = document.createElement("tr")
                table.appendChild(tr)
            }
            xValues.push("")
            yValues.push("")
            barColors.push("green")

            new Chart("myChart", {
                type: "bar",
                data: {
                    labels: xValues,
                    datasets: [
                        {
                            backgroundColor: barColors,
                            data: yValues,
                        },
                    ],
                },
                options: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: "Ψηφοφορία",
                    },
                },
            })
        } catch (error) {
            console.log(error)
        }
    }
}
