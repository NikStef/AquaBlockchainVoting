//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Aqua {
    address private votingInitiator;
    uint256 private Candidate_Id = 0;
    uint256 private Voter_Id = 0;

    //Candidate Data ---START---
    struct Candidate {
        uint256 candidateId;
        string name;
        uint256 voteCount;
        address candidateAddress;
    }

    address[] public candidateAddress;

    mapping(uint => Candidate) public prop;

    //Candidate Data ---END---

    //Voter Data ---START---
    struct Voter {
        uint256 voterId;
        string voter_name;
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
        votingInitiator = msg.sender;
    }

    modifier onlyInitiator() {
        require(
            votingInitiator == msg.sender,
            "Only initiator can create the voters"
        );
        _;
    }

    //Functions
    //--Candidate--
    function setCandidate(
        address _address,
        string memory _name
    ) public onlyInitiator {
        for (uint i = 0; i < candidateAddress.length; i++) {
            if (candidateAddress[i] == _address) {
                revert();
            }
        }

        Candidate_Id++;

        Candidate storage candidate = prop[Candidate_Id];

        candidate.candidateId = Candidate_Id;
        candidate.name = _name;
        candidate.voteCount = 0;
        candidate.candidateAddress = _address;
        candidateAddress.push(_address);
    }

    function getCandidateLength() public view returns (uint256) {
        return candidateAddress.length;
    }

    //--Voter--
    function setVoter(
        address _address,
        string memory _name
    ) public onlyInitiator {
        Voter storage voter = voters[_address];

        voter.voter_name = _name;
        voter.voter_address = _address;
        voter.voterId = Voter_Id;
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
        Voter storage voter = voters[msg.sender];

        require(!voter.voter_voted, "You have already voted");
        if (!(_candidate1VoteId == _candidate2VoteId)) {
            voter.voter_vote1 = _candidate1VoteId;
            prop[_candidate1VoteId].voteCount =
                prop[_candidate1VoteId].voteCount +
                1;

            voter.voter_vote2 = _candidate2VoteId;
            prop[_candidate2VoteId].voteCount =
                prop[_candidate2VoteId].voteCount +
                1;
        } else {
            voter.voter_vote1 = _candidate1VoteId;
            prop[_candidate1VoteId].voteCount =
                prop[_candidate1VoteId].voteCount +
                1;
        }

        voter.voter_voted = true;
        votedVoters.push(msg.sender);
    }

    function getVoterLength() public view returns (uint256) {
        return voterAddress.length;
    }

    function getVotedVoterList() public view returns (address[] memory) {
        return votedVoters;
    }
}
