//console.log(document.getElementById("heading").innerText);
//console.log(document.getElementById("basic").innerText);

//var ele= document.getElementsByClassName("items");
//console.log(ele)

var output=document.getElementById("Output")
var textarea=document.getElementById("textarea")
var btn=document.getElementById("button")

btn.addEventListener("click",even)

function even(){
    const value=textarea.value;
    output.innerText=value;
}