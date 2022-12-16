<?php
session_start();
$username = $_POST['username'];

if (isset($_SESSION['session_username']))
{
	echo "Έχεις εισάγει ήδη ένα username <b>".$_SESSION['session_username']."</b>! Μια φορά αρκεί.";
	echo "<br><a href='restart.php'>Θες να ξαναρχίσεις απο την αρχή;</a>";
}else{
    $_SESSION['session_username'] = $username;
    $_SESSION['hasUser'] = true;
   header('Location:connectMetamask.php');
}
?>

