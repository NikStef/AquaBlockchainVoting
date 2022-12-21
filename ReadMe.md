<p align="center">
    <img width="300" src="Aqua_Frontend/img/AquaLogo.png" alt="logo">
</p>
<h1 align="center">Aqua Blockchain Voting</h1>
<h2><vr style="color:violet;">Version 1.0.1</vr>:H βάση του Aqua</h2>
    <h3><p><p1 style="color:blue;">[Backend]</p1>: ουσιασιαστικά περιέχει το contract και το deploy.js στα scripts απλά κάνει deploy σε όποιο από τα networks που έχω ορίσει στο hardhat.config.js. Αν το --network είναι με etherscan π.χ. goerli test net το κάνει και verify.</p>
    <p><p1 style="color:blue;">[Frontend]</p1>:PHP με το βασικό σκελετό του συστήματος. Το πρώτο username που δίνει ο χρήστης είναι σαν ψευδώνυμο δεν αποθηκεύεται κάπου πέρα απο το session. Υπάρχει button για σύνδεση στο metamask.</p></h3>
<h2 align="center" style="color:red;">[TODO]:</h2>
		<h3><p><p1 style="color:blue;">[Backend]</p1>:
        <p><tdone style="color:green;">1)Tο contract θα αλλάξει ισώς λιγο πιο απλό και πρέπει να προστεθούν χρόνος έναρξης και λήξης και εμφάνιση αποτελεσμάτων.</tdone></p>
        <p>2)Όταν αλλάξει το contract πρέπει να αρχίσουμε σιγα σιγα τα tests.</p></h3>
        
<h2>-----------------------------</h2>
<h2><vr style="color:violet;">Version 1.1.0</vr>:Update του συμβολαίου</h2>
    <h3><p>Προστέθηκε function που υπολογίζει τους νικητές και επιστρέφει τα _id τους και function που επιστρέφει αναλογα με το id εισόδου του υποψήφιου όλες τις πληροφορίες του.</p>
    <p>Ακόμα προστέθηκαν στάδια ψηφοφορίας σε μια enum που ανάλογα με τo στάδιο επιτρέπονται διαφορετικές λειτουργίες. Εξαιτίας του testing τα στάδια τα αλλάζει ο Initiator του contract, σε μια πραγματική υλοποίηση θα άλλαζαν με το χρόνο. </p></h3>
<h2>-----------------------------</h2>
<h2><vr style="color:violet;">Version 1.1.1</vr>:</h2>
    <h3><p>Διωρθόθηκε το bug που αν ήταν οι λευκοί ψήφοι περισσότεροι εφμανίζεται σαν νικητής το κενό</p><p></p></h3>
    <h3><p>Προχώρησε λίγο το Frontend με php αλλά δεν μπορώ να συνδέσω το contract με το frontend</p><p></p></h3>
    <h3><p>Δεν μπορώ να προχωρήσω με raw javascript-html-php θα προσπαθήσω να κοιτάξω το Web3.js</p><p></p></h3>