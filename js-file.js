let wordToGuess = ''; //todo get random word
let errors = 0;

//let btn = document.getElementById("btnYes");
drawGallows();
fetchText();

async function fetchText() {
    let response = await fetch('https://random-word-api.herokuapp.com/word?number=1');
    let data = await response.text();
    console.log(data);
    //document.getElementById("demo").innerHTML = data;
    wordToGuess = data;


}

function buildWord() {


    for (let i = 0; i < wordToGuess.length; i++) {
        //filter out "[]"
        if ((/[a-zA-Z]/).test(wordToGuess[i])) {
            let myWord = document.getElementById('correctWord');
            //var cell = document.createElement('div');
            var cell = document.createElement(wordToGuess[i]);
            cell.classList.add("guessBox");
            cell.tagName = wordToGuess[i];

            cell.innerText = " __ ";
            myWord.appendChild(cell);
        }
    }
}

function showDiv(divName) {
    //fetchText();
    let gameDiv = document.getElementById('gameDiv');
    // if (gameDiv.style.display !== "none") {
    // gameDiv.style.display = "none";
    // } else {
    gameDiv.style.display = "block";
    //  }
    buildWord();
}

function closeWindow() {
    if (confirm("Close Window?")) {
        close();
    }
}

function fillLetter(myLetter) {

    let showLetter = document.getElementsByTagName(myLetter);

    for (var i = 0; i < showLetter.length; i++) {
        showLetter[i].innerText = myLetter;

    }


}

function playGame() {
    let letter = document.getElementById('txtGuess');

    //add to letters guessed:
    let lettersGuessed = document.getElementById('lettersGuessed');
    let letterList = lettersGuessed.value;

    lettersGuessed.value = letterList + letter.value;

    if (wordToGuess.includes(letter.value)) {
        fillLetter(letter.value);
    } else {
        errors++;
        drawBody();

    }

}

function drawGallows() {
    var canvas = document.getElementById('container');

    if (canvas.getContext) {

        var ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.strokeRect(400, 250, 250, 100); // base rectangle/step
        ctx.stroke();

        ctx.strokeRect(425, 200, 160, 50); // second rectangle/step
        ctx.stroke();

        ctx.strokeRect(450, 150, 150, 50); // top rectangle/step
        ctx.stroke();


        ctx.moveTo(520, 150); //draw hanging apparatus
        ctx.lineTo(520, 1);
        ctx.lineTo(475, 1);
        ctx.lineTo(475, 10);

        ctx.stroke();
    }
}

function drawBody() {
    var canvas = document.getElementById('container');

    if (canvas.getContext) {

        var ctx = canvas.getContext('2d');

        ctx.beginPath();
        if (errors == 1) {
            ctx.arc(475, 25, 10, 0, Math.PI * 2, true); // draw head
            ctx.stroke();
        }
        if (errors == 2) {
            ctx.beginPath();
            ctx.moveTo(475, 100); //draw trunk
            ctx.lineTo(475, 35);
            ctx.stroke();
        }
        if (errors == 3) {
            ctx.moveTo(475, 100);
            ctx.lineTo(460, 140); //right leg
            ctx.stroke();
        }
        if (errors == 4) {
            ctx.moveTo(475, 100);
            ctx.lineTo(500, 140); //left leg
            ctx.stroke();
        }
        if (errors == 5) {
            ctx.moveTo(475, 40);
            ctx.lineTo(455, 60); //right arm
            ctx.stroke();
        }
        if (errors == 6) {
            ctx.moveTo(475, 40);
            ctx.lineTo(495, 60); //right arm
            ctx.stroke();

            ctx.font = '24px serif';
            ctx.fillText('Game Over. Click Yes to play again.', 10, 70);
            let myWord = document.getElementById('correctWord');
            myWord.innerText = wordToGuess;

        }


    }
}