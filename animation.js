// const initial = document.createElement("img");
// initial.src = "img/playing.jpg";
// const final = document.createElement("img");
// final.src = "img/roc.jpeg";
// initial.classList.add("initial");
// final.classList.add("final");

// initial.addEventListener('click',rotate);


// function rotate(){
//     initial.classList.add("rotate_initial");
//     document.body.appendChild(final);
//     setTimeout(rotateFinal,1000);
// }

// function rotateFinal(){
//     document.body.removeChild(initial);
//     final.classList.add("rotate_final");
// }

// document.body.appendChild(initial);

const card1 = document.createElement("img");
const card2 = document.createElement("img");
const card3 = document.createElement("img");

card1.src = "img/rock.png";
card2.src = "img/paper.png";
card3.src = "img/scissor.png";

card1.classList.add("card1");
card2.classList.add("card2");
card3.classList.add("card3");

document.body.appendChild(card1);
document.body.appendChild(card2);
document.body.appendChild(card3);

card3.addEventListener("mouseenter",pop);

function pop(){
    card3.classList.add("pop");
}

card3.addEventListener("mouseleave",removePop);

function removePop(){
    card3.classList.remove("pop");
}
