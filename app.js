document.querySelector("body").style.cursor = "not-allowed";
document.getElementById("gamebox").style.cursor = "crosshair";

const gamebox = document.getElementById("gamebox");

const target = document.querySelector(".target");


//skóre
let score = 0;
//pokusy
let attempts = 0;
//přesnost
let ranks = ["Kopeček", "Slepec", "Střelec", "Sniper", "Blend"];
//přestnost hodnota
let přesnostHodnota = 0;
//počet střel
let shots = 0;
//výchozí stav hry
let shootingEnabled = true;
//poslední target
let latestTarget = null;
//gamestart
let gamestart = false;

let previousWidth = 110;
let previousHeight = 110;

//vytvořit nový target
function createNewTarget() {
    let maxX = gamebox.offsetWidth - 100;
    let maxY = gamebox.offsetHeight - 100;
    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);
    let newTarget = document.createElement("div");
    newTarget.style.left = `${randomX}px`;
    newTarget.style.top = `${randomY}px`;
    previousWidth -= 4;
    previousHeight -= 4;
    newTarget.style.width = `${previousWidth}px`;
    newTarget.style.height = `${previousHeight}px`;
    newTarget.classList.add("target");
    gamebox.appendChild(newTarget);

    latestTarget = newTarget;
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
//funkce počítání počtu střel
function countShots() {
    shots++;
    document.getElementById("střely").innerText = shots;
    console.log(shots);
}

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
    //přesnostHodnota je pro accuracy
    const rank = document.getElementById("rank");
    if (score < 5) {
        rank.innerText = ranks[0];
    } else if (score >= 5 && score < 10) {
        rank.innerText = ranks[1];
    } else if (score >= 10 && score < 15) {
        rank.innerText = ranks[2];
    } else if (score > 25) {
        rank.innerText = ranks[4];
    } else if (score > 20 && score < 25) {
        rank.innerText = ranks[3];
    }
    // } else {
    //     rank.innerText = ranks[5];
    // }
}

//poslední target pro zvětšení moona


//SHOOT funkce
function shoot(e) {
    if (!shootingEnabled) {
        return;
    }

    if (e.target.classList == "target") {
        removeTarget();
        createNewTarget();
        score++;
        addScore();
        playSound();
        
    } else {
    // showMissText(e);
    setTimeout(() => {
        gamebox.style.backgroundColor = "red";
    }, 1);
    setTimeout(() => {
        gamebox.style.backgroundColor = "white";
    }, 50);
    playShiet();
    }
    attempts++;
    addAccuracy();
    console.clear();
    console.log(`Pokusy: ${attempts}`);
    console.log(`score: ${score}`);
    console.log(accuracy.innerText);
    let accuracyText = accuracy.innerText;
    přesnostHodnota = parseInt(accuracyText.replace("%", ""));
    console.log(přesnostHodnota);
    addRank();
    countShots();
    console.log(shots);

    setTimeout(() => {
        shootingEnabled = false;
        document.getElementById("gamebox").style.cursor = "not-allowed";
        document.getElementById("gamebox").style.pointerEvents = "none";
        // latestTarget.classList.add("bigpes");¨
        gamebox.classList.add("pesbackground");
        gamebox.classList.add("fireanim");
        gamebox.classList.add("smoothtrans");
        gamebox.classList.add("smaller");
        // gamebox.classList.add("moveleft");

        latestTarget.style.display = "none";
        // playSound();
        gamestart = false;

    }, 15000);

    // document.getElementById("bar").classList.add("animate");
    
}

//audio sound
function playSound() {
    let audio = new Audio("bark.mp3");
    audio.loop = false;
    audio.play();
}
//shiet sound
function playShiet() {
    let audio = new Audio("shiet.mp3");
    audio.play();
}
//gameSTART


const startButton = document.getElementById("startButton");
startButton.addEventListener("click", () => {
    gamestart = true;
    if(gamestart) {
        document.getElementById("bar").classList.add("animate");

        gamebox.addEventListener("click", shoot);
    }
})

//resetButton
const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", () => {
    location.reload();
})


// gamebox.addEventListener("click", shoot);
