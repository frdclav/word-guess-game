//   helper functions

// returns an array containing indexes in word for the letter 
function checkForLetter(word, letter) {
    var listOfIndexes = [];
    for (let index = 0; index < word.length; index++) {
        const element = word[index];
        if (element === letter) {
            listOfIndexes.push(index);
        }



    }
    return listOfIndexes;
}


// takes in an 3 arrays: 
// x is the array that will be updated 
// y is the word that needs to be guessed
// z is the array that contains the indexes to be updated
// for example:
// if x = "____"
// and y = "dogg"
// user guess = "g", so z = "2,3"
// this function should return this array: "__gg"

function addNewGuessedLetters(x, y, z) {
    var newArr = [];
    var oldArr = x;
    if (z.length > 0) {
        for (let index = 0; index < x.length; index++) {
            var curr = y[index]
            var old = x[index]
            if (z.includes(index)) {
                newArr[index] = curr
            } else {
                newArr[index] = old
            }

        }
        return newArr;
    } else {
        return oldArr;
    }
}
// check for letters only 

function allLetter(inputtxt) {
    var letters = /^[A-Za-z]+$/;
    var check = String(inputtxt);
    console.log(inputtxt, inputtxt.type)
    if (check.match(letters) && check.length === 1) {
        console.log(inputtxt, "is a letter")
        return true;
    } else {
        console.log(inputtxt, "is not a letter")
        return false;
    }
}

// main game object
var game = {
    wordList: idols,
    currentWord: "",
    correctGuesses: [],
    wins: 0,
    remainingGuesses: 12,
    lettersAlreadyGuessed: [],
    pastWords: [],
    currentIdol: "",
    setNewCurrentWord: function() {
        var num = Math.floor(Math.random() * this.wordList.length)
        this.currentWord = this.wordList[num].name
        this.currentIdol = this.wordList[num]
        console.log("new currentWord is", this.currentWord)
    },
    setRemainingGuesses: function() {
        this.remainingGuesses = 9
        console.log("new remainingGuesses is", this.remainingGuesses)
    },
    setNewCorrectGuesses: function() {
        this.correctGuesses = []
        for (let index = 0; index < this.currentWord.length; index++) {
            const element = this.currentWord[index];
            this.correctGuesses.push("_");

        }
        console.log("new correctGuesses are:", this.correctGuesses)
    },
    setNewLettersGuessed: function() {
        this.lettersAlreadyGuessed = [];
    },
    makeGuess: function(x) {
        if (this.lettersAlreadyGuessed.includes(x)) {
            console.log(x, "has already been guessed");
            alert(x, "has already been guessed");
        } else if (this.currentWord.includes(x)) {
            console.log(x, "is included in the currentWord.");
            this.lettersAlreadyGuessed.push(x);
            this.correctGuesses = addNewGuessedLetters(this.correctGuesses, this.currentWord, checkForLetter(this.currentWord, x));
            console.log("the new correctGuesses:", this.correctGuesses);
            console.log("the new lettersAlreadyGuessed:", this.lettersAlreadyGuessed);
            // this.remainingGuesses -= 1;
        } else {
            console.log(x, "is not found in the currentWord.");
            this.lettersAlreadyGuessed.push(x);
            console.log("the new lettersAlreadyGuessed:", this.lettersAlreadyGuessed);
            this.remainingGuesses -= 1;
        }

    },
    checkForWin: function() {
        if (this.currentWord === this.correctGuesses.join("")) {
            if (this.wins === 0) {
                pastWordsDiv.innerHTML += '<div class="row p-3 card-title"><h2>Past Words!</h2></div>'
            }
            alert("You win! The word was " + this.currentWord)
            this.pastWords.push(this.currentIdol)
            pastWordsDiv.innerHTML += ' <div class = " p-3 col-md-4" > <p class="font-weight-bold"> ' + game.pastWords[game.pastWords.length - 1].displayName + ' </p><div class p-3 col-md-8>' + game.pastWords[game.pastWords.length - 1].embed + '</div></div>'

            return true;
        } else {
            return false;
        }
    },
    main: function() {
        this.setNewCurrentWord();
        this.setRemainingGuesses();
        this.setNewCorrectGuesses();
        this.setNewLettersGuessed();
    },
    checkRemainingGuesses: function() {
        if (this.remainingGuesses < 1) {
            return false
        } else {
            return true
        }
    }
};

console.log(game);
var subHeader = document.getElementById("sub-header");
var winsDisp = document.getElementById("winsDisp");
var currWordDisp = document.getElementById("currWordDisp");
var guessesDisp = document.getElementById("guessesDisp");
var subHeaderDisp = document.getElementById("sub-header-text")
var button = document.getElementById("input-button")
var userInput = document.getElementById("user-input")
var inputForm = document.getElementById("input-form")
var pastWordsDiv = document.getElementById("past-words")

game.main();

winsDisp.innerHTML += "<p>" + game.wins + "</p>";
currWordDisp.innerHTML += "<p>" + game.correctGuesses.join(" ") + "</p>";
guessesDisp.innerHTML += "<p>Remaining guesses: " + game.remainingGuesses + "</p><p>Letters guessed: " + game.lettersAlreadyGuessed + "</p>";

// button.addEventListener("keyup", function(event) {

//     })

document.onkeyup = function(event) {
        if (event.keyCode === 13) {
            button.click();
        }

        event.preventDefault();
    }
    // document.onkeyup = function(event) {
button.onclick = function() {

        var userGuess = userInput.value;
        console.log(userGuess)
        if (allLetter(userGuess)) {
            subHeaderDisp.textContent = `You guessed "${userGuess}"`
            game.makeGuess(userGuess);
            winsDisp.innerHTML = "<p>" + game.wins + "</p>";
            currWordDisp.innerHTML = "<p>" + game.correctGuesses.join(" ") + "</p>";
            guessesDisp.innerHTML = "<p>Remaining guesses: " + game.remainingGuesses + "</p><p>Letters guessed: " + game.lettersAlreadyGuessed + "</p>";
            if (game.checkForWin()) {
                game.wins += 1;
                game.main();
                winsDisp.innerHTML = "<p>" + game.wins + "</p>";
                currWordDisp.innerHTML = "<p>" + game.correctGuesses.join(" ") + "</p>";
                guessesDisp.innerHTML = "<p>Remaining guesses: " + game.remainingGuesses + "</p><p>Letters guessed: " + game.lettersAlreadyGuessed + "</p>";
            } else if (!game.checkRemainingGuesses()) {
                alert("You are out of guesses! Play again!");
                game.main();
                winsDisp.innerHTML = "<p>" + game.wins + "</p>";
                currWordDisp.innerHTML = "<p>" + game.correctGuesses.join(" ") + "</p>";
                guessesDisp.innerHTML = "<p>Remaining guesses: " + game.remainingGuesses + "</p><p>Letters guessed: " + game.lettersAlreadyGuessed + "</p>";
            }
        } else {
            alert(userGuess + " is not a letter. Please try again :)")
        }
        userInput.value = ''
    }
    // random stuff for testing
    // var word = "dogg";
    // var correct_guesses = "____";
    // console.log("testing addNewGuessedLetters")

// console.log("The word to guess is", word)
// console.log("The current known letters are:", correct_guesses)
// console.log("Lets guess with g")
// console.log("The letter g is in these indexes of the word: ", checkForLetter(word, "g"));
// console.log(addNewGuessedLetters(correct_guesses, word, checkForLetter(word, "g")))
// correct_guesses = addNewGuessedLetters(correct_guesses, word, checkForLetter(word, "g")).join("");
// console.log(correct_guesses)