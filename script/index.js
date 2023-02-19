var cardBox = document.querySelectorAll(".flip-card");
var card = document.querySelectorAll(".flip-card-inner");
var front = document.querySelectorAll(".flip-card-front");
var back = document.querySelectorAll(".flip-card-back");
var cardID = Math.random()+1;
var tries = 0;
var cardsFlipped=[];
var cardsRight=[];
var index=0;
var numberofFlippedCards=0;


function prepareGame(){
    for(let i=0;i<cardBox.length;i++){
        cardBox[i].style.order=Math.floor(Math.random() * cardBox.length) + 1;
    }
    
    for(let i=0;i<card.length;i++){
        card[i].className="is-disabled";
    }
    document.getElementById("reload").style.visibility="hidden";
}

prepareGame();


var name;
function Start(){
    var name = prompt("Welcome\nWhat is your name?");
    document.getElementById("name").textContent=name;
    document.getElementById("start").style.display="none";
    let counter=[1,2,3,"Go"];
    let counterIndex=0;
    var count;
    for(let i=0;i<card.length;i++){
        card[i].className="is-clicked";
    }
    count=setInterval(function(){
        document.getElementById("counter").textContent = counter[counterIndex++];
    },1000)
    setTimeout(function(){
        clearInterval(count);
        for(let i=0;i<card.length;i++){
            card[i].className="flip-card-inner";
        }
        document.getElementById("counter").style.display="none";
    },5000);
}


for(let i=0;i<card.length;i++){   
        front[i].addEventListener('click',function(){
            if(!cardsRight.includes(card[i].id)){
                card[i].className = "is-clicked";
                card[i].id=cardID;
                cardsFlipped[index++]=card[i].id;
                cardID++;
                check();
            }
            else{
                card[i].className="is-true";
            }
        });    
}

function DisableClick(){
    for(let i=0;i<card.length;i++){
        if(!cardsFlipped.includes(card[i].id)){
            card[i].className="is-disabled";
        }
    }
}

function removeDisability(){
    for(let i=0;i<card.length;i++){
        if(!cardsRight.includes(card[i].id)){
            card[i].className="flip-card-inner";
        }
    }
}

function check(){
    if(cardsFlipped.length>=2){
        DisableClick();
        var card1 = document.getElementById(cardsFlipped[0]);
        var card2 = document.getElementById(cardsFlipped[1]);
        if(card1&&card2){
            if(card1.dataset.technology!=card2.dataset.technology){
                tries++;
                document.getElementById("tries").innerHTML=tries;
                setTimeout(function(){
                    removeDisability();
                },1000);
                index=0;
                cardsFlipped=[];   
            }
            else{
                numberofFlippedCards+=2;
                cardsRight=cardsRight.concat(cardsFlipped);
                setTimeout(function(){
                    removeDisability();
                },1000);
                index=0;
                cardsFlipped=[]; 
            }
                   
        }
    }
}

setInterval(function(){
    for(let x =0;x<card.length;x++){
        if(cardsRight.includes(card[x].id)){
            card[x].className="is-true";
        }
    }
},20)

setInterval(function(){
    if(numberofFlippedCards==20){
        document.getElementById("end").textContent="Congratulations";
        let effects=document.getElementsByClassName("confetti"); 
        for(let i=0;i<effects.length;i++){
            effects[i].className="confettiEffect";
        }
        document.getElementById("reload").style.visibility="visible";
    }
},1000);






