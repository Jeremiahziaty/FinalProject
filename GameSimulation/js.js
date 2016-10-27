/**
 * Created by jeremiah on 10/26/2016.
 */
var playerwins = 0;
var computerwins = 0;
var ties = 0;
const Rock = 0;
const Paper = 1;
const Scissors= 2;
const  SESSION_PLAYER_WINS = "player_wins";
const SESSION_COMPUTER_WINS = "computer_wins";
const SESSION_TIES = "ties";

function RandomInt(low, high){
    return Math.floor(Math.random()*( high-low+1)) + low;
}

function DisplayResults(pwins, cwins, ties) {
    var totalRounds = pwins + cwins + ties;
    var playerPercent;
    var computerPercent;
    var tiesPercent;

    if(totalRounds != 0){
        playerPercent = 100 * pwins/totalRounds;
        computerPercent = 100 * cwins/totalRounds;
        tiesPercent = 100 * ties/totalRounds

    } else {
        playerPercent = 0;
        computerPercent = 0;
        tiesPercent= 0;
    }
    document.getElementById("divPlayerWins").innerHTML = playerwins;
    document.getElementById("divComputerWins").innerHTML = computerwins;
    document.getElementById("divTies").innerHTML =ties;

    document.getElementById("divPlayerPercent").innerHTML = playerPercent.toFixed(2)+ "%";
    document.getElementById("divComputerPercent").innerHTML = computerPercent.toFixed(2)+ "%";
    document.getElementById("divTiesPercent").innerHTML = tiesPercent.toFixed(2)+ "%";

}
function PageLoad() {
    if(localStorage.getItem("player_wins") != null){
        playerwins = parseFloat(localStorage.getItem("player_wins"));
    } else {
        playerwins = 0
    }
    if (localStorage.getItem("computer_wins") != null){
        computerwins = parseFloat(localStorage.getItem("computer_wins"));
    } else {
        computerwins = 0
    }
    if (localStorage.getItem("ties")!= null){
        ties = parseFloat(localStorage.getItem("ties"));
    }else {
        ties = 0;
    }
    DisplayResults(ties, playerwins,computerwins);
}
function Close(){
    localStorage.setItem("player_wins",playerwins);
    localStorage.setItem("computer_wins",computerwins);
    localStorage.setItem("ties",ties);
    window.close();
}
function ClearSession() {
    localStorage.clear();
    alert("session is cleared")
}
function PlayGame() {
    var playerChoice;
    var computerChoice;
    var Simulations = 0;

    Simulations = parseFloat(document.getElementById("Cheatbox").value);
    for (i = 1; i <= Simulations; i++) {
        playerChoice = RandomInt(0, 2);
        computerChoice = RandomInt(0, 2);

        if(playerChoice == Rock && computerChoice == Scissors){
            playerwins++;
        }else if(playerChoice == Paper && computerChoice == Rock){
            playerwins++;
        }else if(playerChoice == Scissors && computerChoice == Paper){
            playerwins++;
        }else if (playerChoice == Rock && computerChoice == Paper){
            computerwins++;
        }else if(playerChoice == Paper && computerChoice == Scissors){
            computerwins++;
        }else if (playerChoice == Scissors && computerChoice == Rock){
            computerwins++;
        }else {
            ties++;}
        if(document.getElementById("chkCheatMode").checked){
            (playerChoice == Paper && computerChoice == Rock);
            (playerChoice == Scissors && computerChoice == Paper);
            (playerChoice == Rock && computerChoice == Paper);
            playerwins++;

        }
    }

    DisplayResults(playerwins,computerwins,ties);
}