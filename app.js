document.querySelector("body").style.cursor = "not-allowed";
document.getElementById("gamebox").style.cursor = "crosshair";

const gamebox = document.getElementById("gamebox");

const target = document.querySelector(".target");


//skóre
let score = 0;
//pokusy
let attempts = 0;
//přesnost
let ranks = ["Kopeček", "Dement", "Slepec", "Střelec", "Sniper", "Blend"];

//vytvořit nový target
function createNewTarget() {
    let maxX = gamebox.offsetWidth - 100;
    let maxY = gamebox.offsetHeight - 100;
    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);
    let newTarget = document.createElement("div");
    newTarget.style.left = `${randomX}px`;
    newTarget.style.top = `${randomY}px`;
    newTarget.classList.add("target");
    gamebox.appendChild(newTarget);
}

//hit text show
// function showHitText(event) {
//     const x = event.clientX;
//     const y = event.clientY;
//     console.log(x, y);

//     let hit = document.createElement("div");
//     hit.classList.add("hit");
//     hit.style.left = `${x - 240}px`;
//     hit.style.top = `${y - 160}px`;
//     hit.innerText = "HIT!!";
//     gamebox.appendChild(hit);
//     setTimeout(() => {
//         hit.remove();
//     }, 110);

// }

//miss text show
// function showMissText(event) {
//     const x = event.clientX;
//     const y = event.clientY;
    
//     console.log(x, y);

//     let hit = document.createElement("div");
//     hit.classList.add("miss");
//     hit.style.left = `${x}px`;
//     hit.style.top = `${y}px`;
//     hit.innerText = "MISS!!";
//     gamebox.appendChild(hit);
//     setTimeout(() => {
//         hit.remove();
//     }, 110);

// }


//remove target
function removeTarget() {
    const target = document.querySelector(".target");
    target.remove();
}

//funkce přidání skóre
function addScore() {
    const skore = document.getElementById("score");
    skore.innerText = score;
}
//funkcve přidání přesnosti
function addAccuracy() {
    const accuracy = document.getElementById("accuracy");
    accuracy.innerText = Math.floor((score / attempts) * 100) + "%";
}

//funkce pro HODNOST
function addRank() {
    const rank = document.getElementById("rank");
    if (score < 10) {
        rank.innerText = ranks[0];
    } else if (score < 20) {
        rank.innerText = ranks[1];
    } else if (score < 30) {
        rank.innerText = ranks[2];
    } else if (score < 40) {
        rank.innerText = ranks[3];
    } else if (score < 50) {
        rank.innerText = ranks[4];
    } else {
        rank.innerText = ranks[5];
    }
}

//SHOOT funkce
function shoot(e) {
    if (e.target.classList == "target") {
        removeTarget();
        createNewTarget();
        // showHitText(e);
        score++;
        addScore();
        
    } else {
    // showMissText(e);
    setTimeout(() => {
        gamebox.style.backgroundColor = "lightgrey";
    }, 50);
    setTimeout(() => {
        gamebox.style.backgroundColor = "white";
    }, 150);
    }
    attempts++;
    addAccuracy();
    console.clear();
    console.log(`Pokusy: ${attempts}`);
    console.log(`score: ${score}`);
    console.log(accuracy.innerText);
    addRank();
}

gamebox.addEventListener("click", shoot);


