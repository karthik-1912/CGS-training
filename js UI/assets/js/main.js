function incScore1() {
    var score1 = document.getElementById("vote-ysrcp")
    var currentVotes = parseInt(score1.innerText)
    console.log(currentVotes+1)
    score1.innerText=currentVotes+1

}

var btn1 = document.getElementById("ysrcp-votes");
var btn2 = document.getElementById("vote-tdp");
var btn3 = document.getElementById("vote-congress");
var btn4 = document.getElementById("vote-janasena");

btn1.addEventlistener("click",incScore1);
