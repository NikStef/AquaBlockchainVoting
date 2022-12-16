<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>

 <style>
 body {font-family: Arial, Helvetica, sans-serif;}

button {
    
	width: 10%;
	margin-left: 600px;  
  margin-top: 150px;
	background-color: blue;
	color: white;
	padding: 10px 21px;
	border: none;
	cursor: pointer;
	
}
button:hover {
  opacity: 0.9;
}
label {
    display: inline-block;
    width: 10em; 
}
</style>
</head>
<body>
<?php include 'map_aqua.php';?>
<?php session_start();
if(!($_SESSION['hasUser'])){
    header('Location: connect.php');  
}?>

<button  id="connectButton" onclick="connect()">Συνδεση στο Metamask</button>

</body>
<script>
async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await ethereum.request({ method: "eth_requestAccounts" })
        window.location="u_index.php";
      } catch (error) {
        console.log(error)
      }
    } else {
      connectButton.innerHTML = "Please install MetaMask"
    }
  }</script>
</html>