<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>

 <style>
 body {font-family: Arial, Helvetica, sans-serif;}


.us{
  margin-top:90px;
  margin-left: 150px;
  margin-bottom: 30px;  
}
input[type=text]{
  width: 50%;
  padding: 12px 20px;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box; 
}

button {
	width: 10%;
	margin-left: 150px;  
	background-color: #04AA6D;
	color: white;
	padding: 10px 21px;
	border: none;
	cursor: pointer;
	
}
.metmaskbtn {
  width: 10%;
  padding: 10px 21px;
  background-color: #1C71E4;
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
<?php session_start();?>

<center>
   <form class ="dt" name="choosing_username" method="POST" action="user.php">  
      <div class="us">
			  <label for="username">Ψευδώνυμο Χρήστη:</label>
			  <input type="text" id="username" name="username"  placeholder="Είσαγεται ένα ψευδώνυμο." required>
		  </div>
		<button type="submit">Συνέχεια</button>
    <a href=connectMetamask.php><button type="button"  class="metmaskbtn">Έχω ήδη session.</button>
   </form> 
</center>

</body>
</html>
