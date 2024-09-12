var btns=document.getElementsByClassName("btn");
var Display=document.getElementById("display");
for(let i=0;i<btns.length;i++)
{
    btns[i].addEventListener("click",operation)
}
function operation(e)
{

   var t=e.target;
   if(t.innerText=="=")
   {
      display.value=eval(display.value);
   }
   else if(t.innerText=="C")
   {
    display.value=' ';
   }
   else{
    display.value+=t.innerText;

   }
}