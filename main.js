//math.random tärning, variabel för vart pjäserna är, hur mycket pengar som spelaren har, hur mycket pengar som banken har, vilka gator vilken spelare har
let DiceButton = document.querySelector("[data-rolldicebutton]");
let BuyButton = document.querySelector("[data-buystreetbutton]");
let NotBuyButton = document.querySelector("[data-donotbuystreetbutton]");
DiceButton.style.display = "none";
hideButton()
let dice = 0;
let ready = 0;
document.querySelectorAll("[player]").forEach(item => {
    item.addEventListener('submit', (s) => {
        s.preventDefault();
    })
  })
var Player1 = ["", 550, "", 0, 0];
var Player2 = ["", 550, "", 0, 0];
let turn = 0;
BuyButton.addEventListener("click", tryPay);
NotBuyButton.addEventListener("click", hideButton);
DiceButton.addEventListener("click", rollDice);
function updatePlayers(){
    document.getElementById("Money1").innerHTML = Player1[1] + " mk";
    document.getElementById("Money2").innerHTML = Player2[1] + " mk";
}
function getPlayer(){
    turn = parseInt(document.getElementById("round").innerHTML)
    if (turn % 2 == 1)
    {
        return 1;
    }
    else{
        return 2;
    }
}
function rollDice(){
    hideButton()
    turn++;
    document.getElementById("round").innerHTML = turn;
    if(Player1[4] > 0 && getPlayer() == 1){
        Player1[4] -= 1
        document.getElementById("playerinfo").innerHTML = Player1[0] + " stod över en runda och måste stå över " + Player1[4] + " till";
        return;
    }
    if(Player2[4] > 0 && getPlayer() == 2){
        Player2[4] -= 1
        document.getElementById("playerinfo").innerHTML = Player2[0] + " stod över en runda och måste stå över " + Player2[4] + " till";
        return;
    }
    dice = Math.floor(Math.random() * 6) + 1;
    document.getElementById("dice").innerHTML = dice;
    if (getPlayer() == 1){
        Player1[3] += dice;
    }
    else{
        Player2[3] += dice;
    }
    if (Player1[3] >= 40){
        Player1[3] -= 40;
        Player1[1] += 150;
    }
    if(Player2[3] >= 40){
        Player2[3] -= 40;
        Player1[1] += 150;
    }
    document.getElementById("Steps1").innerHTML = Player1[3];
    document.getElementById("Steps2").innerHTML = Player2[3];
    buyStreet();
    updatePlayers();
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
function hideButton(){
    BuyButton.style.display = "none";
    NotBuyButton.style.display = "none";
}
function showButton(){
    BuyButton.style.display = "initial";
    NotBuyButton.style.display = "initial";
}
function buyStreet(){
    if (getPlayer() == 1){
        tile = Player1[3];
    }
    else{
        tile = Player2[3];
    }
    if (tile%10 == 0)
    {
        if (tile == 0){
            document.getElementById("playerinfo").innerHTML = "Du passerade start";
        }
        if (tile == 10 || tile == 30){
            if(getPlayer() == 1){
                Player1[3] = 10
                Player1[4] = 3 
            }
            else{
                Player2[3] = 10
                Player2[4] = 3
            }
            document.getElementById("playerinfo").innerHTML = "Du hamnade i lärforum! Stå över tre rundor, eller betala 100 mk";
            
        }
    }
    else if(tile == 5 || tile == 12 || tile == 28 || tile == 32)
    {
        let character = "";
        let event = Math.floor(Math.random() * 4) + 1;
        if (event == 1)
        {
            character = "Estetare";
        }
        else if (event == 2)
        {
            character = "Teknikare";
        }
        else if (event == 3)
        {
            character = "El och energi-are";
        }
        else
        {
            character = "Källargrabb";
        }
        document.getElementById("playerinfo").innerHTML = "Elevrådet beslutade att alla som är " + character + " skulle få mer resurser. Alla som är " + character + " fick 100 matkort. Alla andra förlorade 50.";
        if (Player1[2] == character){
            Player1[1] += 100;
        }
        else{
            Player1[1] -= 50;
        }
        if (Player2[2] == character){
            Player2[1] += 100;
        }
        else{
            Player2[1] -= 50;
        }
    }
    else if(tile == 19 || tile == 38)
    {
        document.getElementById("playerinfo").innerHTML = "Matkorten gick ut! Du förlorade 100 matkort.";
        if (getPlayer() == 1)
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
        getOwner(tile)
    }
}
function getAlignment(tile){
    if (tile > 10 && tile < 20){
        return 2
    }
    else if(tile < 10 ){
        return 1
    }
    else if(tile > 20 && tile < 30){
        return 1
    }
    else{
        return 3
    }
}
function getPrice(tile){
    if(tile < 12){
        var pricetext = document.getElementById("t" + tile).innerHTML
        return price = pricetext.substring(0,2)
    }
    else{
        var pricetext = document.getElementById("t" + tile).innerHTML
        return price = pricetext.substring(0,3)
    }
}
function getTile(){
    if (getPlayer() == 1){
        return document.getElementById("Steps1").innerHTML
    }
    else{
        return document.getElementById("Steps2").innerHTML
    }
}
function getOwner(tile){
    price = parseInt(getPrice(tile))/5
    color = ""
    var streetname = document.getElementById("n" + tile).innerHTML
    var s = document.getElementById("n" + tile).style.borderTop
    var color = s.slice(14, 25)
    if (color == "(0, 0, 255)"){
        if(getPlayer() == 1){
            document.getElementById("playerinfo").innerHTML = "Eftersom " + Player1[0] + " äger restaurangen behöver han inte betala för att damma där."
        }
        else{
            document.getElementById("playerinfo").innerHTML = "Du förlorade " + price + " matkort när du damma på " + streetname;
            Player2[1] -= price
        }
    }
    else if (color == "(255, 0, 0)"){
        if(getPlayer() == 2){
            document.getElementById("playerinfo").innerHTML = "Eftersom " + Player2[0] + " äger restaurangen behöver han inte betala för att damma där."
        }
        else{
            document.getElementById("playerinfo").innerHTML = "Du förlorade " + price + " matkort när du damma på " + streetname;
            Player1[1] -= price
        }
    }
    else{
        price *= 5
        document.getElementById("playerinfo").innerHTML = "Vill du köpa " + streetname + " för " + price + " matkort?";
        showButton()
    }
}
function tryPay()
{
    var tile = getTile()
    var price = getPrice(tile)
    var streetname = document.getElementById("n" + tile).innerHTML;
    if (getPlayer() == 1) {
        var money = Player1[1];
        var color = "#0000FF"
    }
    else{
        var money = Player2[1];
        var color = "#FF0000"
    }
    if (price > money){
        document.getElementById("playerinfo").innerHTML = "Du har inte nog med pengar för att köpa " + streetname +"!";
    }
    else{
        if (getAlignment(tile) == 1){
            document.getElementById("n" + tile).style.borderTop = color + " solid 10px";
        }
        else if (getAlignment(tile) == 2){
            document.getElementById("n" + tile).style.borderRight = color + " solid 10px";
        }
        else{        
            document.getElementById("n" + tile).style.borderLeft = color + " solid 10px";
        }
        if(getPlayer() == 1){
            Player1[1] -= price
        }
        else{
            Player2[1] -= price
        }
        document.getElementById("playerinfo").innerHTML = "Du köpte " + streetname + "! Du har nu " + money + " matkort kvar.";
    }
    hideButton()
}
