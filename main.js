//math.random tärning, variabel för vart pjäserna är, hur mycket pengar som spelaren har, hur mycket pengar som banken har, vilka gator vilken spelare har
let DiceButton = document.querySelector("[data-rolldicebutton]");
let BuyButton = document.querySelector("[data-buystreetbutton]");
let NotBuyButton = document.querySelector("[data-donotbuystreetbutton]");
var info =  document.getElementById("playerinfo")
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
NotBuyButton.addEventListener("click", hideInfo)
DiceButton.addEventListener("click", rollDice);
function updatePlayers(){
    document.getElementById("Steps1").innerHTML = Player1[3];
    document.getElementById("Steps2").innerHTML = Player2[3];
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
    updatePlayers();
    hideButton()
    turn++;
    removeImage(turn)
    document.getElementById("round").innerHTML = turn;
    if(Player1[4] > 0 && getPlayer() == 1){
        Player1[4] -= 1
        info.innerHTML = Player1[0] + " stod över en runda och måste stå över " + Player1[4] + " till";
        return;
    }
    if(Player2[4] > 0 && getPlayer() == 2){
        Player2[4] -= 1
        info.innerHTML = Player2[0] + " stod över en runda och måste stå över " + Player2[4] + " till";
        return;
    }
    if(turn > 1){
        document.getElementById("face").remove()
    }
    dice = Math.floor(Math.random() * 6) + 1;
    var img = new Image()
    img.src = dice + ".png"
    img.width = 40
    img.height = 40
    img.setAttribute("id", "face")
    document.getElementById("dicefaces").appendChild(img);
    document.getElementById("dice").innerHTML = dice;
    if (getPlayer() == 1){
        if(Player1[1] < 0){
            info.innerHTML = Player1[0] + " är pank, och dog av svält under svenskagenomgången. " + Player2[0] + " har monopol på matkorten.";
            hideDice()
            return;
        }
        Player1[3] += dice;
    }
    else{
        if(Player2[1] < 0){
            info.innerHTML = Player2[0] + " är pank, och dog av svält under svenskagenomgången. " + Player1[0] + " har monopol på matkorten.";
            hideDice()
            return;
        }
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
function hideDice(){
    DiceButton.style.display = "none"
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
    BuyButton.removeEventListener("click", buyStreet)
    BuyButton.addEventListener("click", tryPay)
    if (getPlayer() == 1){
        tile = Player1[3];
    }
    else{
        tile = Player2[3];
    }
    if (tile%10 == 0)
    {
        if (tile == 0){
            info.innerHTML = "Du passerade start.";
        }
        else if (tile == 10 || tile == 30){
            if(getPlayer() == 1){
                Player1[3] = 10
                Player1[4] = 3 
            }
            else{
                Player2[3] = 10
                Player2[4] = 3
            }
            streetButton("Muta", "Stå över", true)
            info.innerHTML = "Du hamnade i lärforum! Stå över tre rundor, eller muta läraren med 50 mk";   
        }
        else{
            info.innerHTML = "Du dammade gratis";
        }
    }
    else if(tile == 5 || tile == 13 || tile == 28 || tile == 32)
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
        info.innerHTML = "Elevrådet beslutade att alla som är " + character + " skulle få mer resurser. Alla som är " + character + " fick 100 matkort. Alla andra förlorade 50.";
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
        info.innerHTML = "Matkorten gick ut! Du förlorade 100 matkort.";
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
        addPiece()
        var random = Math.floor(Math.random() * 3) + 1;
        if(random == 1 || random == 2){
            if(random == 1){
                var street = 18
                var streetname = "La grande"
            }
            else{
                var street = 27
                var streetname = "thai fast"
            }
            info.innerHTML = "Matkorten var på under studiedagen! Du gick till " + streetname + " för takeaway. Ta 150 mk om du passerade gå och köp restaurangen om du har råd.";
            if(tile > street){
                if(getPlayer() == 1){
                    Player1[1] += 150
                }
                else{
                    Player2[1] += 150
                }
            }
            if(getPlayer() == 1){
                Player1[3] = street
            }
            else{
                Player2[3] = street
            }
        }
        else{
            info.innerHTML = "Matkorten var avstängda under studiedagen! Du svalt hemma och fick F i matte för att du svimmade under provet. Gå direkt till lärforum utan att passera gå.";
            if(getPlayer() == 1){
                Player1[3] = 10
            }
            else{
                Player2[3] = 10
            }
        }
        BuyButton.removeEventListener("click", tryPay);
        BuyButton.addEventListener("click", buyStreet);
        streetButton("Ok", "", false)
        return;
    }
    else{
        getOwner(tile)
    }
    addPiece()
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
    if(tile < 12 && tile != 7){
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
        return Player1[3]
    }
    else{
        return Player2[3]
    }
}
function getOwner(tile){
    price = parseInt(getPrice(tile))/5
    color = ""
    var streetname = document.getElementById("n" + tile).innerHTML
    if(getAlignment(tile) == 1){
        var s = document.getElementById("n" + tile).style.borderTop
    }
    else if(getAlignment(tile) == 2){
        var s = document.getElementById("n" + tile).style.borderRight
    }
    else{
        var s = document.getElementById("n" + tile).style.borderLeft
    }
    var color = s.slice(14, 25)
    if (color == "(0, 0, 255)"){
        if(getPlayer() == 1){
            info.innerHTML = "Eftersom " + Player1[0] + " äger restaurangen behöver han inte betala för att damma där."
        }
        else{
            info.innerHTML = "Du förlorade " + price + " matkort när du damma på " + streetname;
            Player2[1] -= price
        }
    }
    else if (color == "(255, 0, 0)"){
        if(getPlayer() == 2){
            info.innerHTML = "Eftersom " + Player2[0] + " äger restaurangen behöver han inte betala för att damma där."
        }
        else{
            info.innerHTML = "Du förlorade " + price + " matkort när du damma på " + streetname;
            Player1[1] -= price
        }
    }
    else{
        price *= 5
        streetButton("Köp!", "Köp inte!", true)
        info.innerHTML = "Vill du köpa " + streetname + " för " + price + " matkort?";
        showButton()
    }
}
function tryPay()
{
    if (getPlayer() == 1) {
        if(Player1[4] > 0){
            if(checkMoney(50) == true){
                Player1[1] -= 50
                info.innerHTML = "Du mutade dig ur lärforum, du har en ljus framtid på donken!";
                Player1[4] = 0
                hideButton()
                return;
            }
        }
        var money = Player1[1];
        var color = "#0000FF"
    }
    else{
        if(Player2[4] > 0){
            if(checkMoney(50) == true){
                Player2[1] -= 50
                Player2[4] = 0
                info.innerHTML = "Du mutade dig ur lärforum, du har en ljus framtid på donken!";
                hideButton()
                return;
            }
        }
        var money = Player2[1];
        var color = "#FF0000"
    }
    var tile = getTile()
    var price = getPrice(tile)
    var streetname = document.getElementById("n" + tile).innerText;
    if (price > money){
        info.innerHTML = "Du har inte nog med pengar för att köpa " + streetname +"!";
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
        money -= price
        info.innerHTML = "Du köpte " + streetname + "! Du har nu " + money + " matkort kvar.";
    }
    hideButton()
}
function streetButton(button1, button2, both){
    BuyButton.style.display = "initial";
    NotBuyButton.style.display = "none";
    if(both == true){
        NotBuyButton.innerHTML = button2
        showButton()
    }
    BuyButton.innerHTML = button1
}
function checkMoney(money){
    if(getPlayer() == 1){
        if(money > Player1[1]){
            return false;
        }
        else{
            return true;
        }
    }
    else{
        if(money > Player2[1]){
            return false;
        }
        else{
            return true;
        }
    }
}

function addPiece(){
    var img = new Image()
    img.src = getPiece()
    img.width = 20
    img.height = 20
    if(getPlayer() == 1){
        img.setAttribute("id", "image1")
    }
    else{
        img.setAttribute("id", "image2")
    }
    tile = getTile()
    document.getElementById("n" + tile).appendChild(img);
}
function removeImage(turn){
    if(document.getElementById("image1") && turn > 2 && turn%2 == 1){
        document.getElementById("image1").remove()
    }
    else if(document.getElementById("image2") && turn > 2 && turn%2 == 0){
        document.getElementById("image2").remove()
    }
    else{
        return;
    }
}
function getPiece(){
    if (getPlayer() == 1){
        if(Player1[2] == "Estetare"){
            return "Painter.png"
        }
        else if(Player1[2] == "Teknikare"){
            return "Engineer.png"
        }
        else if(Player1[2] == "Källargrabb(INIT)"){
            return "BasementMan.png"
        }
        else{
            return "ElectricalEngineer.jpg"
        }
    }
    else{
        if(Player2[2] == "Estetare"){
            return "Painter.png"
        }
        else if(Player2[2] == "Teknikare"){
            return "Engineer.png"
        }
        else if(Player2[2] == "Källargrabb(INIT)"){
            return "BasementMan.png"
        }
        else{
            return "ElectricalEngineer.jpg"
        }
    }
}
function hideInfo(){
    info.innerHTML = "";
}