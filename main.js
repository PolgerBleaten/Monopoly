//math.random tärning, variabel för vart pjäserna är, hur mycket pengar som spelaren har, hur mycket pengar som banken har, vilka gator vilken spelare har
let DiceButton = document.querySelector("[data-rolldicebutton]");
let playerForm = document.querySelector("[player]")
DiceButton.addEventListener("click", rollDice);
function rollDice(){
    let dice = Math.floor(Math.random() * 6) + 1;
    document.getElementById("dice").innerHTML = dice;
}
playerForm.addEventListener("submit", (s)=> {
    s.preventDefault();
})
function createPlayer1() {
    var name = document.getElementById("name1");
    var piece = document.getElementsByName("piece1");
    var player = document.getElementById("player1");
    for(i = 0; i < piece.length; i++) 
    {
        if(piece[i].checked)
        document.getElementById("free").innerHTML = piece[i].value;
    }
    player.style.display = "none";
}
//function 
//movePiece(player, numberofsteps);
//giveMoney();
//tryPay(player, money);
