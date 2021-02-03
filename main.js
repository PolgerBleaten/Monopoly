//math.random tärning, variabel för vart pjäserna är, hur mycket pengar som spelaren har, hur mycket pengar som banken har, vilka gator vilken spelare har
let DiceButton = document.querySelector("[data-rolldicebutton]");
DiceButton.addEventListener("click", rollDice);
function rollDice(){
    let dice = Math.floor(Math.random() * 6) + 1;
    document.getElementById("dice").innerHTML = dice;
}
function createPlayer() {
    return{
        piece,
        money,
        position,
    };

}
//function 
//movePiece(player, numberofsteps);
//giveMoney();
//tryPay(player, money);
//var Game = function(){
 /*var game = {};
 game.tiles = [
     new tile("Coco café", 50, ""), 
     new tile(),
     new tile(),
     new tile(),
     new tile(),
     new tile(),
     new tile(),
     new tile(),
     new tile(),
     new tile(),
     new tile(),
     new tile(),
     new tile(),
     new tile(),
     new tile(),
     new tile(),
     new tile(),
     new tile(),
     new tile(),
     new tile(),
     new tile(),
     new tile(),
    ];
}*/