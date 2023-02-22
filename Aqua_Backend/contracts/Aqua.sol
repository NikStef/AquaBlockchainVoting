//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Aqua {
    address private immutable i_votingInitiator;
    uint256 private Candidate_Id = 0;
    uint256 private Voter_Id = 0;
    address private vacant;

    uint256[] private endingVoteCounts;
    uint256 private pseudo_winnerVoteCount = 0;
    uint256 private _winner1 = 0;
    uint256 private _winner2 = 0;
    uint256 private _winner3 = 0;
    uint256[] private winners;
    uint8 private results = 0;

    uint256 private totalVoterVote = 0;
    uint256 private totalOfAVScore = 0;

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
        uint256 voter_vote3;
    }

    address[] private votedVoters;
    address[] private voterAddress;
    mapping(address => Voter) private voters;

    //Voter Data ---END---

    constructor() {
        i_votingInitiator = msg.sender;
        period = Period.Register;
        candidateAddress.push(vacant);
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

        voter.voter_vote1 = 1000;
        voter.voter_vote2 = 1000;
        voter.voter_vote3 = 1000;
        voter.voter_voted = false;
        voterAddress.push(_address);

        Voter_Id++;
    }

    function vote(
        uint256 _candidate1VoteId,
        uint256 _candidate2VoteId,
        uint256 _candidate3VoteId
    ) external {
        require(period == Period.Voting, "It's not the voting period");
        Voter storage voter = voters[msg.sender];

        require(!voter.voter_voted, "You have already voted");
        require(voter.voter_allowed != 0, "You have no right to vote");

        uint wave = candidateAddress.length - 1;
        if (
            (_candidate1VoteId > wave) ||
            (_candidate2VoteId > wave) ||
            (_candidate3VoteId > wave)
        ) {
            revert("Wrong ID vote, try again");
        }
        //votes
        if (
            (_candidate1VoteId == _candidate2VoteId) &&
            (_candidate2VoteId == _candidate3VoteId)
        ) {
            voter.voter_vote1 = _candidate1VoteId;
            candidates[_candidate1VoteId].voteCount =
                candidates[_candidate1VoteId].voteCount +
                1;
            voter.voter_vote2 = 0;
            if (!(_candidate1VoteId == 0)) {
                candidates[0].voteCount = candidates[0].voteCount + 1;
            }
            voter.voter_vote3 = 0;
        } else if (_candidate1VoteId == _candidate2VoteId) {
            voter.voter_vote1 = _candidate1VoteId;
            candidates[_candidate1VoteId].voteCount =
                candidates[_candidate1VoteId].voteCount +
                1;

            voter.voter_vote2 = 0;
            if (!(_candidate1VoteId == 0)) {
                candidates[0].voteCount = candidates[0].voteCount + 1;
            }

            voter.voter_vote3 = _candidate3VoteId;
            if (!(_candidate3VoteId == 0)) {
                candidates[_candidate3VoteId].voteCount =
                    candidates[_candidate3VoteId].voteCount +
                    1;
            }
        } else if (_candidate1VoteId == _candidate3VoteId) {
            voter.voter_vote1 = _candidate1VoteId;
            candidates[_candidate1VoteId].voteCount =
                candidates[_candidate1VoteId].voteCount +
                1;

            voter.voter_vote2 = _candidate2VoteId;
            if (!(_candidate2VoteId == 0)) {
                candidates[_candidate2VoteId].voteCount =
                    candidates[_candidate2VoteId].voteCount +
                    1;
            }

            voter.voter_vote3 = 0;
            if (!(_candidate3VoteId == 0)) {
                candidates[0].voteCount = candidates[0].voteCount + 1;
            }
        } else if (_candidate2VoteId == _candidate3VoteId) {
            voter.voter_vote1 = _candidate1VoteId;
            if (!(_candidate1VoteId == 0)) {
                candidates[_candidate1VoteId].voteCount =
                    candidates[_candidate1VoteId].voteCount +
                    1;
            }

            voter.voter_vote2 = _candidate2VoteId;
            candidates[_candidate2VoteId].voteCount =
                candidates[_candidate2VoteId].voteCount +
                1;

            voter.voter_vote3 = 0;
            if (!(_candidate3VoteId == 0)) {
                candidates[0].voteCount = candidates[0].voteCount + 1;
            }
        } else {
            voter.voter_vote1 = _candidate1VoteId;
            candidates[_candidate1VoteId].voteCount =
                candidates[_candidate1VoteId].voteCount +
                1;
            voter.voter_vote2 = _candidate2VoteId;
            candidates[_candidate2VoteId].voteCount =
                candidates[_candidate2VoteId].voteCount +
                1;

            voter.voter_vote3 = _candidate3VoteId;
            candidates[_candidate3VoteId].voteCount =
                candidates[_candidate3VoteId].voteCount +
                1;
        }
        totalVoterVote++;
        voter.voter_voted = true;
        votedVoters.push(msg.sender);
    }

    function getWinner() public onlyInitiator {
        require(period == Period.End, "It's not the ending period");
        require(results == 0, "Already calculated");

        for (uint x = 0; x < candidateAddress.length; x++) {
            endingVoteCounts.push(candidates[x].voteCount);
            endingVoteCounts[0] = 0;
            totalOfAVScore = totalOfAVScore + endingVoteCounts[x];

            if ((endingVoteCounts[x] > pseudo_winnerVoteCount)) {
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

        pseudo_winnerVoteCount = 0;
        endingVoteCounts[_winner2] = 0;

        for (uint x = 0; x < candidateAddress.length; x++) {
            if (endingVoteCounts[x] > pseudo_winnerVoteCount) {
                pseudo_winnerVoteCount = endingVoteCounts[x];
                _winner3 = x;
            }
        }
        winners.push(_winner3);
        results = 1;
    }

    function getCandidateLength() public view returns (uint256) {
        return candidateAddress.length - 1;
    }

    function getVoterLength() public view returns (uint256) {
        return voterAddress.length;
    }

    function getInformation(
        uint256 _index
    ) public view returns (Candidate memory) {
        require(period == Period.End, "It's not the ending period");
        return candidates[_index];
    }

    function getState() public view returns (Period) {
        return period;
    }

    function getCandidateName(
        uint256 _index
    ) public view returns (string memory) {
        return candidates[_index].name;
    }

    function isResults() public view returns (uint8) {
        return results;
    }

    function getTotalVotersVote() public view returns (uint256) {
        return totalVoterVote;
    }

    function getTotalOfAVScore() public view returns (uint256) {
        return totalOfAVScore;
    }

    function getNumOfIncompleteVotes() public view returns (uint256) {
        return candidates[0].voteCount;
    }

    function getWinnersbyId(uint256 _index) public view returns (uint) {
        return winners[_index];
    }
}
