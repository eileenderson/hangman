let wordToGuess = ''; 
let errors = 0;


drawGallows();
fetchText();

// Add Enter action functionality
var input = document.getElementById("txtGuess");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        playGame();
    }
});

async function fetchText() {
    let response = await fetch('https://random-word-api.herokuapp.com/word?number=1');
    let data = await response.text();
   
    wordToGuess = data;


}

function buildWord() {
    let myWord = document.getElementById('correctWord');

    for (let i = 0; i < wordToGuess.length; i++) {
       
        if ((/[a-zA-Z]/).test(wordToGuess[i])) {
            
            console.log(wordToGuess[i])
            var cell = document.createElement(wordToGuess[i]);
            cell.classList.add("guessBox");
            cell.tagName = wordToGuess[i];
             cell.innerText = "_";
            myWord.appendChild(cell);
        }
    }
}

function showDiv(divName) {
    if (errors > 0) {
        window.location.reload();

    }
    let gameDiv = document.getElementById('gameDiv');
    gameDiv.style.display = "block";
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

    let lettersGuessed = document.getElementById('lettersGuessed');
    
    //check that this is a letter first
    if (/[^a-zA-Z]/.test(letter.value)) {
        alert('Please enter only a letter');
        
        //clear out bad value
        letter.value = ""; 
    }
    //check that this is not a letter already guessed
    if (lettersGuessed.value.length>0 && lettersGuessed.value.includes(letter.value.toLowerCase())) {
        alert('Please choose a letter not already guessed');
       

        //clear out bad value
        letter.value = "";
    }
     else
    {
        
            //add to letters guessed:
            let letterList = lettersGuessed.value;

            lettersGuessed.value = letterList + letter.value;

        if (wordToGuess.includes(letter.value.toLowerCase())) {
                fillLetter(letter.value);
            } else {
                errors++;
                drawBody();

            }
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