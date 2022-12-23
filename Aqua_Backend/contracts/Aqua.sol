//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Aqua {
    address private immutable i_votingInitiator;
    uint256 private Candidate_Id = 0;
    uint256 private Voter_Id = 0;
    address private vacant;

    uint256 private white;

    uint256[] private endingVoteCounts;
    uint pseudo_winnerVoteCount = 0;
    uint _winner1 = 0;
    uint _winner2 = 0;
    uint256[] private winners;

    string[] private candidatesNames;

    enum Period {
        Initialize,
        Register,
        Voting,
        End
    }
    Period private period = Period.Initialize;

    //Candidate Data ---START---
    struct Candidate {
        uint256 candidateId;
        string name;
        uint256 voteCount;
        address candidateAddress;
    }

    address[] private candidateAddress;

    mapping(uint => Candidate) private candidates;
    //Candidate Data ---END---

    //Voter Data ---START---
    struct Voter {
        uint256 voterId;
        uint256 voter_allowed;
        address voter_address;
        bool voter_voted;
        uint256 voter_vote1;
        uint256 voter_vote2;
    }

    address[] private votedVoters;
    address[] private voterAddress;
    mapping(address => Voter) private voters;

    //Voter Data ---END---

    constructor() {
        i_votingInitiator = msg.sender;
        period = Period.Register;
        candidateAddress.push(vacant);
        candidatesNames.push("");
    }

    modifier onlyInitiator() {
        require(i_votingInitiator == msg.sender, "Only initiator can do this");
        _;
    }

    //Functions
    function changePeriod() public onlyInitiator {
        if (uint(period) == 3) {
            revert("You are in the last stage");
        }
        period = Period(uint(period) + 1);
    }

    //--Candidate--
    function setCandidate(
        address _address,
        string memory _name
    ) public onlyInitiator {
        require(period == Period.Register, "It's not the registration period");

        for (uint i = 0; i < candidateAddress.length; i++) {
            if (candidateAddress[i] == _address) {
                revert("Candidate already exists");
            }
        }

        Candidate_Id++;

        Candidate storage candidate = candidates[Candidate_Id];

        candidate.candidateId = Candidate_Id;
        candidate.name = _name;
        candidate.voteCount = 0;
        candidate.candidateAddress = _address;
        candidateAddress.push(_address);

        candidatesNames.push(_name);
    }

    function getCandidateLength() public view returns (uint256) {
        return candidateAddress.length - 1;
    }

    //--Voter--
    function setVoter(address _address) public onlyInitiator {
        require(period == Period.Register, "It's not the registration period");
        for (uint i = 0; i < voterAddress.length; i++) {
            if (voterAddress[i] == _address) {
                revert("The voter already exists.");
            }
        }
        Voter storage voter = voters[_address];

        voter.voter_address = _address;
        voter.voterId = Voter_Id;

        voter.voter_allowed = 1;

        voter.voter_vote1 = 1000; //Edo tha mpei to id aytou pou pshfhse
        voter.voter_vote2 = 1000;
        voter.voter_voted = false;
        voterAddress.push(_address);

        Voter_Id++;
    }

    function vote(
        uint256 _candidate1VoteId,
        uint256 _candidate2VoteId
    ) external {
        require(period == Period.Voting, "It's not the voting period");
        Voter storage voter = voters[msg.sender];

        require(!voter.voter_voted, "You have already voted");
        require(voter.voter_allowed != 0, "You have no right to vote");

        if (!(_candidate1VoteId == _candidate2VoteId)) {
            voter.voter_vote1 = _candidate1VoteId;
            candidates[_candidate1VoteId].voteCount =
                candidates[_candidate1VoteId].voteCount +
                1;

            voter.voter_vote2 = _candidate2VoteId;
            candidates[_candidate2VoteId].voteCount =
                candidates[_candidate2VoteId].voteCount +
                1;
        } else {
            voter.voter_vote1 = _candidate1VoteId;
            candidates[_candidate1VoteId].voteCount =
                candidates[_candidate1VoteId].voteCount +
                1;
        }

        voter.voter_voted = true;
        votedVoters.push(msg.sender);
    }

    function getVoterLength() public view returns (uint256) {
        return voterAddress.length;
    }

    function getVotedVoterList() public view returns (address[] memory) {
        require(period == Period.End, "It's not the ending period");
        return votedVoters;
    }

    function getWinner() public onlyInitiator {
        require(period == Period.End, "It's not the ending period");
        white = candidates[0].voteCount;
        candidates[0].voteCount = 0;
        for (uint x = 0; x < candidateAddress.length; x++) {
            endingVoteCounts.push(candidates[x].voteCount);
            if (candidates[x].voteCount > pseudo_winnerVoteCount) {
                pseudo_winnerVoteCount = candidates[x].voteCount;
                _winner1 = x;
            }
        }
        winners.push(_winner1);
        pseudo_winnerVoteCount = 0;
        endingVoteCounts[_winner1] = 0;
        for (uint x = 0; x < candidateAddress.length; x++) {
            if (endingVoteCounts[x] > pseudo_winnerVoteCount) {
                pseudo_winnerVoteCount = endingVoteCounts[x];
                _winner2 = x;
            }
        }
        winners.push(_winner2);
    }

    function getInformation(
        uint256 _index
    ) public view onlyInitiator returns (Candidate memory) {
        require(period == Period.End, "It's not the ending period");
        return candidates[_index];
    }

    function getWinnersbyId(
        uint256 _index
    ) public view onlyInitiator returns (uint) {
        return winners[_index];
    }

    function getCandidateName(
        uint256 _index
    ) public view returns (string memory) {
        return candidatesNames[_index];
    }

    function getState() public view returns (Period) {
        return period;
    }
}
