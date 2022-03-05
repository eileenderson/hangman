let wordToGuess = 'worse'; //todo get random word

let btn = document.getElementById("btnYes");
buildWord();

function buildWord() {
    for (let i = 0; i < wordToGuess.length; i++) {
        let myWord = document.getElementById('correctWord');
        var cell = document.createElement('div');
        cell.classList.add("guessBox");
        cell.id = wordToGuess[i];
        console.log(wordToGuess[i]);
        cell.innerText = " __ ";
        myWord.appendChild(cell);
    }
}

function showDiv(divName) {
    let makeVis = document.getElementById(divName);
    makeVis.style.visibility = 'visible';
}

function closeWindow() {
    if (confirm("Close Window?")) {
        close();
    }
}

function fillLetter(myLetter) {
    console.log('ok');
    console.log(myLetter);
    let showLetter = document.getElementById(myLetter);
    showLetter.innerText = myLetter;


}

function playGame() {
    let letter = document.getElementById('txtGuess');
    console.log(letter.value);
    //let lowerLetter = String.toLowerCase(letter.innerText);

    if (wordToGuess.includes(letter.value)) {
        // alert(`Correct! ${letter.value} is in the word`);
        fillLetter(letter.value);
    } else {
        //alert(`Incorrect! ${letter.value} is not in the word`);
        drawBody();

    }

}

function drawBody() {
    var canvas = document.getElementById('container');

    if (canvas.getContext) {

        var ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.arc(150, 65, 50, 0, Math.PI * 2, true); // Outer circle
        ctx.stroke();
    }
}