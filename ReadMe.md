![Logo](/Aqua_Frontend/img/AquaLogo.png)
# Aqua Blockchain Voting
Το σύστημα ψηφοφορίας Aqua πρόκειται για μια αποκεντρωμένη εφαρμογή (DApp), βασισμένη στο blockchain του Ethereum,  μιας multi-winner και approval-based ψηφοφορίας επιτροπής μεγέθους k=2 που ακολουθεί τον κανόνα AV.

Δημιουργήθηκε στα πλαίσια της διπλωματικής εργασίας μου με τίτλο **"Μελέτη της ασφάλειας των ηλεκτρονικών ψηφοφοριών μέσω τεχνολογίας blockchain."**.

## Περιεχόμενα
* [Τεχνολογίες](#Τεχνολογίες)
* [Εγκατάσταση](#Εγκατάσταση)
* [Συγγραφέας](#Συγγραφέας)

## Τεχνολογίες
Το Aqua έχει δημιουργηθεί με:

* Solidity version: 0.8.9
* Hardhat version: 2.12.4
* Node.js version: 18.12.1
* Ethers.js version: 5.1

## Εγκατάσταση
Αρχικά, για το Aqua χρησιμοποιούμε το text editor **Visual Studio Code**. 
Σε αυτό εγκαταστούμε το **WSL**(*Windows Subsystem for Linux*), που επιτρέπει να χρησιμοποιήσουμε εντολές Linux σε ενα υποσύστημα Windows. (Σημείωση: υπάρχει περίπτωση το Virtualization στα BIOS να είναι off, δηλαδή να μην μπορούμε να δημιουργήσουμε μια εικονική μηχανή Linux, μέχρι να το αλλάξουμε.)
```bash
wsl --install
```
Για να ολοκληρωθεί η εγκατάσταση χρειάζεται επανεκίνηση του υπολογιστή και στη συνέχεια συμπληρώνουμε τα στοιχεία που μας ζητάει. Τώρα στο Visual Studio Code μας χρειάζεται να εγκαταστήσουμε το extension **Remote Developement**.

Στην συνέχεια, θα εγκαταστήσουμε το εργαλείο NVM με την εντολή:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```
και την έκδοση 18.12.1 του Node.js με την εντολή:
```bash
nvm install 18.12.1
```
Παράλληλα, χρειάζεται να εγκαταστήσουμε το extension **Solidity + Hardhat** στο Visual Studio Code μας. Το extension προσθέτει υποστήριξη για τη γλώσσα Solidity και παρέχει editor για Hardhat projects.

Προσωπικά προτιμώ να χρησιμοποιώ το **yarn package manager** αλλά μπορεί να χρησιμοποιηθεί και το npm ή το npx. Το yarn προστίθεται με την εντολή:
```bash
corepack enable
```
Ένα άλλο εργαλείο που χρησιμοποιώ είναι το **Ganache**, το οποίο δημιουργεί ένα local blockchain.

Το τελευταίο βήμα για να τρέξουμε το Aqua είναι να προσθέσουμε τα directories του στο Visual Sudio Code μας και να κάνουμε install όλα τα dependencies:
```bash
git clone https://github.com/NikStef/AquaBlockchainVoting
cd AquaBlockchainVoting/
yarn
```
## Συγγραφέας

- [@NikStef](https://github.com/NikStef)

