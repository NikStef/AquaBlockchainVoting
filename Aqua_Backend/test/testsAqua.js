const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("Aqua", function () {
    let AquaFactory, Aqua
    beforeEach(async function () {
        AquaFactory = await ethers.getContractFactory("Aqua")
        Aqua = await AquaFactory.deploy()
    })

    //changePeriod()
    it("1.Should start with period of registration", async function () {
        const currentValue = await Aqua.getState()
        const expectedValue = "1"
        assert.equal(currentValue.toString(), expectedValue)
    })
    it("2.Should update period 1->2 with change period function", async function () {
        await Aqua.changePeriod()
        const currentValue = await Aqua.getState()
        const expectedValue = "2"
        assert.equal(currentValue.toString(), expectedValue)
    })
    it("3.Should update period 2->3 with change period function", async function () {
        await Aqua.changePeriod()
        await Aqua.changePeriod()
        const currentValue = await Aqua.getState()
        const expectedValue = "3"
        assert.equal(currentValue.toString(), expectedValue)
    })
    it("4.Should ΝΟΤ update after 3 function calls of changePeriod and should revert with you are in the last stage", async function () {
        await Aqua.changePeriod()
        await Aqua.changePeriod()
        await expect(Aqua.changePeriod()).to.be.revertedWith(
            "You are in the last stage"
        )
    })
    it("5.Should ΝΟΤ update the period if not owner account is calling", async function () {
        const [owner, otherAccount] = await ethers.getSigners()
        await expect(
            Aqua.connect(otherAccount).changePeriod()
        ).to.be.revertedWith("Only initiator can do this")
    })

    //getCandidateLength()
    it("6.Should start with 0 candidates", async function () {
        const currentValue = await Aqua.getCandidateLength()
        const expectedValue = "0"
        assert.equal(currentValue.toString(), expectedValue)
    })
    //setCandidate()
    it("7.Should update the candidate list after a successful call of setCandidate", async function () {
        const [owner] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        const currentValue = await Aqua.getCandidateLength()
        const expectedValue = "1"
        assert.equal(currentValue.toString(), expectedValue)
    })
    it("8.Should ΝΟΤ set a Candidate if the period is not Registration", async function () {
        const [owner] = await ethers.getSigners()
        await Aqua.changePeriod()
        await expect(
            Aqua.setCandidate(owner.address, "Link")
        ).to.be.revertedWith("It's not the registration period")
    })
    it("9.Should ΝΟΤ set a candidate if the candidate already exists", async function () {
        const [owner] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await expect(
            Aqua.setCandidate(owner.address, "Link")
        ).to.be.revertedWith("Candidate already exists")
    })
    it("10.Should ΝΟΤ update the candidate list if not the owner is calling the function setCandidate()", async function () {
        const [owner, otherAccount] = await ethers.getSigners()
        await expect(
            Aqua.connect(otherAccount).setCandidate(
                otherAccount.address,
                "Link"
            )
        ).to.be.revertedWith("Only initiator can do this")
    })
    //getVoterLength()
    it("11.Should start with 0 voters", async function () {
        const currentValue = await Aqua.getVoterLength()
        const expectedValue = "0"
        assert.equal(currentValue.toString(), expectedValue)
    })
    //setVoter()
    it("12.Should update the voter list after a successful call of setVoter", async function () {
        const [owner] = await ethers.getSigners()
        await Aqua.setVoter(owner.address)
        const currentValue = await Aqua.getVoterLength()
        const expectedValue = "1"
        assert.equal(currentValue.toString(), expectedValue)
    })
    it("13.Should ΝΟΤ set a voter if the period is not Registration", async function () {
        const [owner] = await ethers.getSigners()
        await Aqua.changePeriod()
        await expect(Aqua.setVoter(owner.address)).to.be.revertedWith(
            "It's not the registration period"
        )
    })
    it("14.Should ΝΟΤ set a voter if the voter already exists", async function () {
        const [owner] = await ethers.getSigners()
        await Aqua.setVoter(owner.address)
        await expect(Aqua.setVoter(owner.address)).to.be.revertedWith(
            "The voter already exists."
        )
    })
    it("15.Should ΝΟΤ update the voter list if not the owner is calling the function setVoter", async function () {
        const [owner, otherAccount] = await ethers.getSigners()
        await expect(
            Aqua.connect(otherAccount).setVoter(otherAccount.address)
        ).to.be.revertedWith("Only initiator can do this")
    })
    //getInformation
    it("16.Should ΝΟΤ getInformation if period is not ending", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setVoter(owner.address)
        await Aqua.setCandidate(user1.address, "Friv")
        await Aqua.changePeriod()
        await Aqua.vote("1", "0")
        await expect(Aqua.getInformation(1)).to.be.revertedWith(
            "It's not the ending period"
        )
    })
    //vote
    it("17.Should vote if a user has a right to vote", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setVoter(owner.address)
        await Aqua.setCandidate(user1.address, "Friv")
        await Aqua.changePeriod()
        await Aqua.vote("1", "0")
        await Aqua.changePeriod()
        const currentValue = await Aqua.getInformation(1)
        const expectedValue = "1"
        assert.equal(currentValue.voteCount.toString(), expectedValue)
    })
    it("18.Should ΝΟΤ vote twice", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setVoter(owner.address)
        await Aqua.setCandidate(user1.address, "Friv")
        await Aqua.changePeriod()
        await Aqua.vote("1", "0")
        await expect(Aqua.vote("1", "0")).to.be.revertedWith(
            "You have already voted"
        )
    })
    it("19.Should ΝΟΤ vote outside of voting period", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setVoter(owner.address)
        await Aqua.setCandidate(user1.address, "Friv")
        await expect(Aqua.vote("1", "0")).to.be.revertedWith(
            "It's not the voting period"
        )
    })
    it("20.Should ΝΟΤ vote if doesn't have a right to vote", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setCandidate(user1.address, "Friv")
        await Aqua.changePeriod()
        await expect(Aqua.vote("1", "0")).to.be.revertedWith(
            "You have no right to vote"
        )
    })
    //getCandidateName
    it("21.Should return the candidate name", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        const currentValue = await Aqua.getCandidateName("1")
        const expectedValue = "Link"
        assert.equal(currentValue, expectedValue)
    })
    //isResults
    it("22.Should start with results = 0", async function () {
        const currentValue = await Aqua.isResults()
        const expectedValue = "0"
        assert.equal(currentValue.toString(), expectedValue)
    })
    //getWinner
    it("23.Should calculate the winners", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setVoter(owner.address)
        await Aqua.setCandidate(user1.address, "Friv")
        await Aqua.changePeriod()
        await Aqua.vote("1", "0")
        await Aqua.changePeriod()
        await Aqua.getWinner()
        const currentValue = await Aqua.isResults()
        const expectedValue = "1"
        assert.equal(currentValue.toString(), expectedValue)
    })
    it("24.Should ΝΟΤ calculate the winners twice", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setVoter(owner.address)
        await Aqua.setCandidate(user1.address, "Friv")
        await Aqua.changePeriod()
        await Aqua.vote("1", "0")
        await Aqua.changePeriod()
        await Aqua.getWinner()
        await expect(Aqua.getWinner()).to.be.revertedWith("Already calculated")
    })
    it("25.Should ΝΟΤ calculate the winners outside of the correct period", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setVoter(owner.address)
        await Aqua.setCandidate(user1.address, "Friv")
        await Aqua.changePeriod()
        await Aqua.vote("1", "0")
        await expect(Aqua.getWinner()).to.be.revertedWith(
            "It's not the ending period"
        )
    })
    //getTotalVotes
    it("26.Should calculate the correct number of votes", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setVoter(owner.address)
        await Aqua.setCandidate(user1.address, "Friv")
        await Aqua.changePeriod()
        await Aqua.vote("1", "0")
        await Aqua.changePeriod()
        await Aqua.getWinner()
        const currentValue = await Aqua.getTotalVotes()
        const expectedValue = "2"
        assert.equal(currentValue.toString(), expectedValue)
    })
    it("27.Should calculate correct total votes in the extremities: example{voting with the same id}", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setVoter(owner.address)
        await Aqua.setCandidate(user1.address, "Friv")
        await Aqua.changePeriod()
        await Aqua.vote("1", "1")
        await Aqua.changePeriod()
        await Aqua.getWinner()
        const currentValue = await Aqua.getTotalVotes()
        const expectedValue = "2"
        assert.equal(currentValue.toString(), expectedValue)
    })
    it("28.Should calculate correct total votes in the extremities: example{voting with double 0}", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setVoter(owner.address)
        await Aqua.setCandidate(user1.address, "Friv")
        await Aqua.changePeriod()
        await Aqua.vote("0", "0")
        await Aqua.changePeriod()
        await Aqua.getWinner()
        const currentValue = await Aqua.getTotalVotes()
        const expectedValue = "1"
        assert.equal(currentValue.toString(), expectedValue)
    })
    //getWinnersbyId
    it("29.Should calculate the correct winners", async function () {
        const [owner, user1, user2] = await ethers.getSigners()
        await Aqua.setCandidate(owner.address, "Link")
        await Aqua.setVoter(owner.address)
        await Aqua.setVoter(user1.address)
        await Aqua.setCandidate(user1.address, "Friv")
        await Aqua.changePeriod()
        await Aqua.connect(user1).vote("1", "2")
        await Aqua.vote("1", "0")
        await Aqua.changePeriod()
        await Aqua.getWinner()
        const currentValue1 = await Aqua.getWinnersbyId(0)
        const expectedValue1 = "1"
        const currentValue2 = await Aqua.getWinnersbyId(1)
        const expectedValue2 = "2"
        assert.equal(currentValue1.toString(), expectedValue1)
        assert.equal(currentValue2.toString(), expectedValue2)
    })
})
