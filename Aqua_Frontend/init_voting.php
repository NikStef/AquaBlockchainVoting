<!DOCTYPE html>
<html>
<head>
<style>
body  {
  background-image: url("img/wtc1.png");
  background-repeat:no-repeat;
  background-attachment: fixed;
  background-position: center;  
}

</style>
</head>
<body>
<?php include 'u_map_aqua.php';?>

<button id="setCandidateButton">Set Candidate</button>
<label for ="setCandidate">Address</label>
<input id="_addressCandidate" placeholder="0x00"/>
<input id="_nameCandidate" placeholder="Name"/>

<button id="setVoterButton">Set Voter</button>
<label for ="setVoter">Address</label>
<input id="_addressVoter" placeholder="0x00"/>
<input id="_nameVoter" placeholder="Name"/>

<button id="CandidateLength">CandidateLength</button>
</body>
<script src = "./init-voting.js" type="module"></script>
</html>