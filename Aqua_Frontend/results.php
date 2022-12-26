<!DOCTYPE html>
<html>
<head>
<style>
 body {font-family: Arial, Helvetica, sans-serif;}
 .democlass { text-align : left; }
h2{
    font-weight: bold;
    margin-left: 350px;
}
table {
  border-collapse: collapse;
  margin-left: 350px;
}


table {
    text-align: center;
    margin-left: 350px;
    margin-bottom: 60px;
    border-collapse: collapse;
}
 
thead tr {
    font-weight: bold;
    font-size: 15px;
    background: #eee;
}



td, th{
    border: 1px solid #777;
}

canvas{
  margin-left: 350px;
}
</style>

</head>
<body>
<?php include 'u_map_aqua.php';?>
<h2>Νικητές Ψηφοφορίας</h2>
<table class="styled-table">
<thead>
 
<tr>
<td>Όνομα:</td>
<td>Id κωδικός:</td>
</tr>
</thead>
<tbody>
<tr>
    <td colspan=2><img height="100" src="./img/Metal-gold-blue-icon.png" width="100"></td>
  </tr>
  <tr>
    <td id="win1name" class="democlass"></td>
    <td id="win1"></td>
  </tr>
  <tr>
    <td id="win2name" class="democlass"></td>
    <td id="win2"></td>
  </tr>
</tbody>
</table>

<h2>Αποτελέσματα Ψηφοφορίας</h2>

<table class="styled-table" id="poll">
<thead>
  <tr>
    <td>Όνομα Υποψηφίου</td>
    <td>Συνολικοί ψήφοι</td>
    <td>Ψήφοι επί τοις 100%</td>
  </tr>
  </thead>
  
</table>

<canvas id="myChart" style="width:100%;max-width:600px"></canvas>

</body>
<script src = "results.js" type="module"></script>
</html>
