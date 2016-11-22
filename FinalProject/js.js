/**
 * Created by jeremiah on 11/9/2016.
 */

var numPacks      =    4;
var numShuffles   =   10;

var minBet        =    5;
var maxBet        =  100;
var initCredit    = 500;
var initBet       =   5;

var dealTimeDelay =  750;



var deck;
var burnCard;

var dealer;
var player = new Array(+1);
var curPlayerHand, numPlayerHands;

var credits, defaultBet;
var creditsTextNode, defaultTextNode;

var dealRoundCounter;



window.onload = initGame;

function initGame() {

    var i;

    myFunction();

    creditsTextNode = document.getElementById("credits").firstChild;
    defaultTextNode = document.getElementById("default").firstChild;



    credits    = initCredit;
    defaultBet = initBet;
    changeBet(0);
    updateBetDisplay(0);


    deck = new Stack();
    newDeck();



    dealer = new Hand("dealer");
    for (i = 0; i < player.length; i++)
        player[i] = new Hand("player" + i);
}


Hand.prototype.leftIncr  =  2.5;
Hand.prototype.topIncr   =  0.2;
Hand.prototype.rollEvery =  5;

function Hand(id) {

    this.cards = new Array();


    this.fieldNode     = document.getElementById(id);
    this.cardsNode     = document.getElementById(id + "Cards");
    this.scoreTextNode = document.getElementById(id + "Score").firstChild;
    if (id != "dealer") {
        this.betTextNode    = document.getElementById(id + "Bet").firstChild;
        this.resultTextNode = document.getElementById(id + "Result").firstChild;
    }

    this.reset      = handReset;
    this.addCard    = handAddCard;
    this.removeCard = handRemoveCard;
    this.getScore   = handGetScore;
    this.clearCards = handClearCards;



    this.reset();
}




function updateBetDisplay(n) {

    var s;


    if (player[n]) {
        if (player[n].bet != null)
            s = "Bet: " + formatDollar(player[n].bet);
        else
            s = "\u00a0";
        player[n].betTextNode.nodeValue = s;
    }


    creditsTextNode.nodeValue = "Credits: " + formatDollar(credits);
}

function formatDollar(n) {

    var a, b;


    a = Math.abs(n);
    b = 100 * (a - Math.floor(a));
    if (b < 10)
        b = "0" + b;
    return (n < 0 ? "-" : "" ) + "$" + Math.floor(a) + "." + b;
}

function changeBet(n) {

    defaultBet += n;
    defaultBet = Math.max(Math.min(defaultBet, maxBet), minBet);
    defaultTextNode.nodeValue = "Default Bet: " + formatDollar(defaultBet);



    EnableBetButtons();
}
function myFunction() {

    var x = document.getElementById("Username").value;

    if (x == "Enter Username Here") {
        alert("Please enter a username!");
        document.getElementById("Username").focus();
        document.getElementById("Username").disabled = false;
        var y =document.getElementById("inputt").style.display="";
        document.getElementById("deal").disabled= true
    } else {document.getElementById("Username").disabled = true;
        document.getElementById("inputt").style.display="none";
        document.getElementById("deal").disabled= false
    }
}

function EnableBetButtons() {

    document.forms["controls"].elements["increase"].disabled = (defaultBet >= maxBet);
    document.forms["controls"].elements["increase25"].disabled = (defaultBet >= maxBet);
    document.forms["controls"].elements["increase50"].disabled = (defaultBet >= maxBet);
    document.forms["controls"].elements["increase100"].disabled = (defaultBet >= maxBet);
    document.forms["controls"].elements["decrease"].disabled = (defaultBet <= minBet);
    if ( defaultBet == credits){
        document.getElementById("riskitall").style.display = "none";
        document.getElementById("chckRisk").style.display = "none";
        document.forms["controls"].elements["decrease"].disabled = (defaultBet = credits)
}
}


function Enablerisk() {
    var ischecked = document.getElementById("chckRisk").checked;
    if (ischecked == true) {
        maxBet = 500;
        document.getElementById("riskitall").disabled = false;
    }
    else {
            document.getElementById("riskitall").disabled = true;
            maxBet = 100;
        }

}
function Card(rank, suit) {

    this.rank = rank;
    this.suit = suit;

    this.createNode = cardCreateNode;
}


var cardImg0 = new Image(); cardImg0.src= "images/soccer.gif";
var cardImg1 = new Image(); cardImg1.src= "images/jack.gif";
var cardImg2 = new Image(); cardImg2.src= "images/queen.gif";
var cardImg3 = new Image(); cardImg3.src= "images/king.gif";

function cardCreateNode() {

    var cardNode, frontNode, indexNode, spotNode, tempNode, textNode;
    var indexStr, spotChar;


    cardNode = document.createElement("DIV");
    cardNode.className = "card";



    frontNode = document.createElement("DIV");
    frontNode.className = "front";


    spotChar = "\u00a0";
    switch (this.suit) {
        case "C" :
            spotChar = "\u2663";
            break;
        case "D" :
            frontNode.className += " red";
            spotChar = "\u2666";
            break;
        case "H" :
            frontNode.className += " red";
            spotChar = "\u2665";
            break;
        case "S" :
            spotChar = "\u2660";
            break;
    }


    indexStr = this.rank;
    if (this.toString() == "")
        indexStr = "\u00a0";
    spotNode = document.createElement("DIV");
    spotNode.className = "index";
    textNode = document.createTextNode(indexStr);
    spotNode.appendChild(textNode);
    spotNode.appendChild(document.createElement("BR"));
    textNode = document.createTextNode(spotChar);
    spotNode.appendChild(textNode);
    frontNode.appendChild(spotNode);

    // Create and add spots based on card rank (Ace thru 10).

    spotNode = document.createElement("DIV");
    textNode = document.createTextNode(spotChar);
    spotNode.appendChild(textNode);
    if (this.rank == "A") {
        spotNode.className = "ace";
        tempNode = spotNode.cloneNode(true);
        frontNode.appendChild(tempNode);
    }
    if (this.rank == "3" || this.rank == "5" || this.rank == "9") {
        spotNode.className = "spotB3";
        tempNode = spotNode.cloneNode(true);
        frontNode.appendChild(tempNode);
    }
    if (this.rank == "2" || this.rank == "3") {
        spotNode.className = "spotB1";
        tempNode = spotNode.cloneNode(true);
        frontNode.appendChild(tempNode);
    }
    if (this.rank == "2" || this.rank == "3") {
        spotNode.className = "spotB5";
        tempNode = spotNode.cloneNode(true);
        frontNode.appendChild(tempNode);
    }
    if (this.rank == "4" || this.rank == "5" || this.rank == "6" ||
        this.rank == "7" || this.rank == "8" || this.rank == "9" ||
        this.rank == "10") {
        spotNode.className = "spotA1";
        tempNode = spotNode.cloneNode(true);
        frontNode.appendChild(tempNode);
        spotNode.className = "spotA5";
        tempNode = spotNode.cloneNode(true);
        frontNode.appendChild(tempNode);
        spotNode.className = "spotC1";
        tempNode = spotNode.cloneNode(true);
        frontNode.appendChild(tempNode);
        spotNode.className = "spotC5";
        tempNode = spotNode.cloneNode(true);
        frontNode.appendChild(tempNode);
    }
    if (this.rank == "6" || this.rank == "7" || this.rank == "8") {
        spotNode.className = "spotA3";
        tempNode = spotNode.cloneNode(true);
        frontNode.appendChild(tempNode);
        spotNode.className = "spotC3";
        tempNode = spotNode.cloneNode(true);
        frontNode.appendChild(tempNode);
    }
    if (this.rank == "7" || this.rank == "8" || this.rank == "10") {
        spotNode.className = "spotB2";
        tempNode = spotNode.cloneNode(true);
        frontNode.appendChild(tempNode);
    }
    if (this.rank == "8" || this.rank == "10") {
        spotNode.className = "spotB4";
        tempNode = spotNode.cloneNode(true);
        frontNode.appendChild(tempNode);
    }
    if (this.rank == "9" || this.rank == "10") {
        spotNode.className = "spotA2";
        tempNode = spotNode.cloneNode(true);
        frontNode.appendChild(tempNode);
        spotNode.className = "spotA4";
        tempNode = spotNode.cloneNode(true);
        frontNode.appendChild(tempNode);
        spotNode.className = "spotC2";
        tempNode = spotNode.cloneNode(true);
        frontNode.appendChild(tempNode);
        spotNode.className = "spotC4";
        tempNode = spotNode.cloneNode(true);
        frontNode.appendChild(tempNode);
    }



    tempNode = document.createElement("IMG");
    tempNode.className = "face";
    if (this.rank == "J")
        tempNode.src = "images/jack.gif";
    if (this.rank == "Q")
        tempNode.src = "images/queen.gif";
    if (this.rank == "K")
        tempNode.src = "images/king.gif";


    if (this.rank == "J" || this.rank == "Q" || this.rank == "K") {
        frontNode.appendChild(tempNode);
        spotNode.className = "spotA1";
        tempNode = spotNode.cloneNode(true);
        frontNode.appendChild(tempNode);
        spotNode.className = "spotC5";
        tempNode = spotNode.cloneNode(true);
        frontNode.appendChild(tempNode);
    }



    cardNode.appendChild(frontNode);



    return cardNode;
}


function Stack() {


    this.cards = new Array();

    this.makeDeck  = stackMakeDeck;
    this.shuffle   = stackShuffle;
    this.deal      = stackDeal;
    this.cardCount = stackCardCount;
}

function stackMakeDeck(n) {

    var ranks = new Array("A", "2", "3", "4", "5", "6", "7", "8", "9",
        "10", "J", "Q", "K");
    var suits = new Array("C", "D", "H", "S");
    var i, j, k;
    var m;

    m = ranks.length * suits.length;


    this.cards = new Array(n * m);


    for (i = 0; i < n; i++)
        for (j = 0; j < suits.length; j++)
            for (k = 0; k < ranks.length; k++)
                this.cards[i * m + j * ranks.length + k] = new Card(ranks[k], suits[j]);
}


function stackShuffle(n) {

    var i, j, k;
    var temp;


    for (i = 0; i < n; i++)
        for (j = 0; j < this.cards.length; j++) {
            k = Math.floor(Math.random() * this.cards.length);
            temp = this.cards[j];
            this.cards[j] = this.cards[k];
            this.cards[k] = temp;
        }
}


function stackDeal() {

    if (this.cards.length > 0)
        return this.cards.shift();
    else
        return null;
}

function stackCardCount() {

    return this.cards.length;
}


function handReset() {



    this.clearCards();

    this.cards     = new Array();
    this.blackjack = false;
    this.split     = false;
    this.doubled   = false;
    this.surrender = false;
    this.left      = 0;
    this.top       = 0;

    this.scoreTextNode.nodeValue  = "\u00a0";
    if (this.betTextNode) {
        this.betTextNode.parentNode.className = "textBox dollars";
        this.betTextNode.nodeValue = "\u00a0";
    }
    if (this.resultTextNode)
        this.resultTextNode.nodeValue = "\u00a0";
}

function handAddCard(card, down) {

    var n;
    var node;



    n = this.cards.length;
    this.cards[n] = card;



    node = this.cards[n].createNode();
    if (down)
        node.firstChild.style.visibility = "hidden";


    node.style.left = this.left + "em";
    node.style.top  = this.top  + "em";
    this.cardsNode.appendChild(node);
    this.left += this.leftIncr;
    if (this.cards.length % this.rollEvery == 0)
        this.top = 0;
    else
        this.top += this.topIncr;
}

function handRemoveCard() {

    var card;


    card = null;
    if (this.cards.length > 0) {
        card = this.cards.pop();

        this.cardsNode.removeChild(this.cardsNode.lastChild);
        this.left -= this.leftIncr;
        this.top  -= this.topIncr;
    }



    return card;
}

function handGetScore() {

    var i, total;

    total = 0;



    for (i = 0; i < this.cards.length; i++)
        if (this.cards[i].rank == "A")
            total++;
        else {
            if (this.cards[i].rank == "J" || this.cards[i].rank == "Q" ||
                this.cards[i].rank == "K")
                total += 10;
            else
                total += parseInt(this.cards[i].rank, 10);
        }


    for (i = 0; i < this.cards.length; i++)
        if (this.cards[i].rank == "A" && total <= 11)
            total += 10;

    return total;
}

function handClearCards() {


    while (this.cardsNode.lastChild)
        this.cardsNode.removeChild(this.cardsNode.lastChild);
}

function newDeck() {


    deck.makeDeck(numPacks);
    deck.shuffle(numShuffles);


    burnCard = Math.round(Math.random() * 26) + 26;
}

function getNextCard() {


    if (deck.cardCount() == 0) {
        alert("New Deck");
        newDeck();
    }

    return deck.deal();
}

function startRound() {

    var i;

    myFunction();

    dealer.reset();
    for (i = 0; i < player.length; i++) {
        player[i].reset();
        if (i > 0)
            player[i].fieldNode.style.display = "none";
    }



    curPlayerHand  = 0;
    numPlayerHands = 1;


    document.forms["controls"].elements["deal"].disabled      = true;
    document.forms["controls"].elements["increase"].disabled  = true;
    document.forms["controls"].elements["increase25"].disabled  = true;
    document.forms["controls"].elements["increase50"].disabled  = true;
    document.forms["controls"].elements["increase100"].disabled  = true;
    document.forms["controls"].elements["decrease"].disabled  = true;
    DisablePlayButtons();


    if (deck.cardCount() < burnCard) {
        alert("New deck.");
        newDeck();
    }

    player[0].bet = defaultBet;
    credits -= player[0].bet;
    updateBetDisplay(0);

    // Start dealing the cards.
    dealRoundCounter = 1;
    dealRound();
}

function dealRound()
{


    switch(dealRoundCounter)
    {
        case 1:
            player[0].addCard(getNextCard(), false);
            break;

        case 2:
            dealer.addCard(getNextCard(), true);
            break;

        case 3:
            player[0].addCard(getNextCard(), false);
            break;

        case 4:
            dealer.addCard(getNextCard(), false);
            break;

        default:


            playRound();
            return;
            break;
    }

    // Update the player's score.

    if (player[0].getScore() == 21) {
        player[0].blackjack = true;
        player[0].scoreTextNode.nodeValue = "Blackjack";
    }
    else
        player[0].scoreTextNode.nodeValue = player[0].getScore();



    dealRoundCounter++;
    setTimeout(dealRound, dealTimeDelay);
}
function playerDouble() {

    player[curPlayerHand].bet *= 2;
    credits -= defaultBet;
    updateBetDisplay(curPlayerHand);
    player[curPlayerHand].doubled = true;
    player[curPlayerHand].top = 0;
    playerHit();
}
function playRound() {



    if (dealer.getScore() == 21) {
        dealer.blackjack = true;
        dealer.scoreTextNode.nodeValue = "Blackjack";
    }


    if (player[0].blackjack || dealer.blackjack) {
        endRound();
        return;
    }

    // Enable/disable buttons.


    document.forms["controls"].elements["double"].disabled    = false;
    document.forms["controls"].elements["hit"].disabled       = false;
    document.forms["controls"].elements["stand"].disabled     = false;

    addClassName(player[0].fieldNode, "activeField");
}







function playerStand() {


    startNextHand();
}

function startNextHand() {


    removeClassName(player[curPlayerHand].fieldNode, "activeField");

    // Go on to the next player hand or the dealer.

    curPlayerHand++;
    if (curPlayerHand >= numPlayerHands) {
        startDealer();
        return;
    }
    else {
        addClassName(player[curPlayerHand].fieldNode, "activeField");


        DisablePlayButtons();


    }
}

function startDealer() {

    var i, allBusts;


    DisablePlayButtons();


    allBusts = true;
    for (i = 0; i < numPlayerHands; i++)
        if (player[i].getScore() <= 21)
            allBusts = false;
    if (allBusts) {
        endRound();
        return;
    }


    addClassName(dealer.fieldNode, "activeField");
    dealer.cardsNode.firstChild.firstChild.style.visibility = "";
    dealer.scoreTextNode.nodeValue = dealer.getScore();
    setTimeout(playDealer, dealTimeDelay);
}

function playDealer() {

    var d;


    d = dealer.getScore();
    dealer.scoreTextNode.nodeValue = d;


    if (d < 17) {
        setTimeout(dealToDealer, dealTimeDelay);
        return;
    }


    if (d > 21)
        dealer.scoreTextNode.nodeValue = "Busted (" + d + ")";

    removeClassName(dealer.fieldNode, "activeField");
    endRound();
}

function dealToDealer() {

    dealer.addCard(getNextCard(), false);
    playDealer();
}

function endRound() {

    var i, d, p, tmp;


    document.forms["controls"].elements["deal"].disabled = false;
    EnableBetButtons();
    DisablePlayButtons();



    if (navigator.userAgent.indexOf("MSIE 6") >= 0) {
        dealer.cardsNode.firstChild.style.backgroundImage = "none";
        dealer.cardsNode.firstChild.style.backgroundColor = "white";
    }


    dealer.cardsNode.firstChild.firstChild.style.visibility = "";
    d = dealer.getScore();
    if (!dealer.blackjack && d <= 21)
        dealer.scoreTextNode.nodeValue = d;


    for (i = 0; i < numPlayerHands; i++) {
        p = player[i].getScore();
        if (player[i].surrender) {
            player[i].resultTextNode.nodeValue = "Surrendered";
            player[i].bet /= 2;
            credits += player[i].bet;
        }
        else if ((player[i].blackjack && !dealer.blackjack) ||
            (p <= 21 && d > 21) || (p <= 21 && p > d)) {
            player[i].resultTextNode.nodeValue = "Your a winner";
            tmp = 2 * player[i].bet;



            if (player[i].blackjack)
                tmp += player[i].bet / 2;

            player[i].bet = tmp;
            credits += player[i].bet;
        }
        else if ((dealer.blackjack && !player[i].blackjack) ||
            p > 21 || p < d) {
            player[i].resultTextNode.nodeValue = "you lost" +" "+ document.getElementById("Username").value;
            addClassName(player[i].betTextNode.parentNode, "lost");
        }
        else {
            player[i].resultTextNode.nodeValue = "Push";
            credits += player[i].bet;
        }
        updateBetDisplay(i);
    }
}




function DisablePlayButtons(){

}




function addClassName(el, name)
{

    removeClassName(el, name);



    if (el.className.length > 0)
        name = " " + name;
    el.className += name;
}

function removeClassName(el, name)
{

    if (el.className == null)
        return;



    var newList = new Array();
    var curList = el.className.split(" ");
    for (var i = 0; i < curList.length; i++)
        if (curList[i] != name)
            newList.push(curList[i]);
    el.className = newList.join(" ");
}
