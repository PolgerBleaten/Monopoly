//math.random tärning, variabel för vart pjäserna är, hur mycket pengar som spelaren har, hur mycket pengar som banken har, vilka gator vilken spelare har
let DiceButton = document.querySelector("[data-rolldicebutton]");
let BuyButton = document.querySelector("[data-buystreetbutton]");
let NotBuyButton = document.querySelector("[data-donotbuystreetbutton]");
DiceButton.style.display = "none";
BuyButton.style.display = "none";
NotBuyButton.style.display = "none";
let dice = 0;
let ready = 0;
document.querySelectorAll("[player]").forEach(item => {
    item.addEventListener('submit', (s) => {
        s.preventDefault();
    })
  })
var Player1 = ["", 550, "", 0];
var Player2 = ["", 550, "", 0];
let turn = 0;
BuyButton.addEventListener("click", tryPay);
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
    buyStreet(turn, Player1[3], Player2[3]);
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
function buyStreet(turn, tile1, tile2){
    if (turn %2 == 1){
        tile = tile1;
    }
    else{
        tile = tile2;
    }
    if (tile%10 == 0)
    {
        document.getElementById("tilevalue").innerHTML = "Inget";
    }
    else if(tile == 5 || tile == 12 || tile == 28 || tile == 32)
    {

    }
    else if(tile == 19 || tile == 38)
    {
        document.getElementById("playerinfo").innerHTML = "Matkorten gick ut! Du förlorade 100 matkort.";
        if (turn%2 == 1)
        {
            Player1[1] -=100;
        }
        else{
            Player2[1] -=100;
        }
    }
    else if(tile == 3 || tile == 17 || tile == 23 || tile == 36)
    {
        
    }
    else{
        var streetname = document.getElementById("n" + tile).innerHTML;
        if(tile < 12){
            var pricetext = document.getElementById("t" + tile).innerHTML;
            var price = pricetext.substring(0,2);
        }
        else{
            var pricetext = document.getElementById("t" + tile).innerHTML;
            var price = pricetext.substring(0,3);
        }
        document.getElementById("playerinfo").innerHTML = "Vill du köpa " + streetname + " för " + price + " matkort?";
    }
}
//function 
//giveMoney();
function tryPay(player, price, tile)
{
    var streetname = document.getElementById("n" + tile).innerHTML;
    if (player == 1) {
        var money = Player1[1];
    }
    else{
        var money = Player2[1]; 
    }
    if (price > money){
        document.getElementById("playerinfo").innerHTML = "Du har inte nog med pengar för att köpa " + streetname +"!";
    }
    else{
        money -= price;
        document.getElementById("playerinfo").innerHTML = "Du köpte " + streetname + "! Du har nu " + money + " matkort kvar.";
        document.getElementById("n" + tile).style.borderTop = "5px solid #0000FF";
    }
}
