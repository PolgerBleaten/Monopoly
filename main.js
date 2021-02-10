//math.random tärning, variabel för vart pjäserna är, hur mycket pengar som spelaren har, hur mycket pengar som banken har, vilka gator vilken spelare har
let DiceButton = document.querySelector("[data-rolldicebutton]");
DiceButton.style.display = "none";
let dice = 0;
let ready = 0;
document.querySelectorAll("[player]").forEach(item => {
    item.addEventListener('submit', (s) => {
        s.preventDefault();
    })
  })
var Player1 = ["", 550, "", 0];
var Player2 = ["", 550,"",0];
let turn = 0;
DiceButton.addEventListener("click", rollDice);
function rollDice(){
    dice = Math.floor(Math.random() * 6) + 1;
    document.getElementById("dice").innerHTML = dice;
    turn++;
    document.getElementById("round").innerHTML = turn;
    if (turn%2 == 1){
        Player1[3] += dice;
    }
    else{
        Player2[3] += dice;
    }
    if (Player2[3] >= 40 && !Player1[3] >= 40){
        Player2[3] -= 40;
    }
    else if(Player1[3] >= 40 && !Player2[3] >= 40){
        Player1[3] -= 40;
    }
    else if(Player1[3] >= 40 && Player2[3] >= 40){
        Player1[3] -= 40;
        Player2[3] -= 40;
    }
    document.getElementById("Steps1").innerHTML = Player1[3];
    document.getElementById("Steps2").innerHTML = Player2[3];
}

function createPlayer(person){
    if (person == 1){
        Player1[0] = document.getElementById("name1").value;
        var piece = document.getElementsByName("piece1");
        var player = document.getElementById("player1");
        for(i = 0; i < piece.length; i++)
        {
            if(piece[i].checked)
            Player1[2] = piece[i].value;
        }
        player.style.display = "none";
        document.getElementById("Name1").innerHTML = "Spelare 1: " + Player1[0]
        document.getElementById("Piece1").innerHTML = Player1[2];
        document.getElementById("Money1").innerHTML = Player1[1] + " mk";
        ready++;
    }
    else{
        Player2[0] = document.getElementById("name2").value;
        var piece = document.getElementsByName("piece2");
        var player = document.getElementById("player2");
        for(i = 0; i < piece.length; i++)
        {
            if(piece[i].checked)
            Player2[2] = piece[i].value;
        }
        player2.style.display = "none";
        document.getElementById("Name2").innerHTML = "Spelare 2: " + Player2[0]
        document.getElementById("Piece2").innerHTML = Player2[2];
        document.getElementById("Money2").innerHTML = Player2[1] + " mk";
        ready++;
    }
    if (ready == 2){
        DiceButton.style.display = "initial";
    }
}
//function 
//movePiece(player, numberofsteps);
//giveMoney();
//tryPay(player, money);
