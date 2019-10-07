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

// main game object
var game = {
    wordList: ["dogg", "rodson", "cat"],
    currentWord: "",
    correctGuesses: [],
    wins: 0,
    remainingGuesses: 12,
    lettersAlreadyGuessed: [],
    setNewCurrentWord: function () {
        this.currentWord = this.wordList[Math.floor(Math.random() * this.wordList.length)]
        console.log("new currentWord is", this.currentWord)
    },
    setRemainingGuesses: function () {
        this.remainingGuesses = 9 + this.currentWord.length
        console.log("new remainingGuesses is", this.remainingGuesses)
    },
    setNewCorrectGuesses: function () {
        this.correctGuesses = []
        for (let index = 0; index < this.currentWord.length; index++) {
            const element = this.currentWord[index];
            this.correctGuesses.push("_");

        }
        console.log("new correctGuesses are:", this.correctGuesses)
    },
    setNewLettersGuessed: function () {
        this.lettersAlreadyGuessed = [];
    },
    makeGuess: function (x) {
        if (this.lettersAlreadyGuessed.includes(x)) {
            console.log(x, "has already been guessed");
        } else if (this.currentWord.includes(x)) {
            console.log(x, "is included in the currentWord.");
            this.lettersAlreadyGuessed.push(x);
            this.correctGuesses = addNewGuessedLetters(this.correctGuesses, this.currentWord, checkForLetter(this.currentWord, x));
            console.log("the new correctGuesses:", this.correctGuesses);
            console.log("the new lettersAlreadyGuessed:", this.lettersAlreadyGuessed);
        } else {
            console.log(x, "is not found in the currentWord.");
            this.lettersAlreadyGuessed.push(x);
            console.log("the new lettersAlreadyGuessed:", this.lettersAlreadyGuessed);
        }
        this.remainingGuesses -= 1;
    },
    checkForWin: function () {
        if (this.currentWord === this.correctGuesses.join("")) {
            return true;
        } else {
            return false;
        }
    },
    main: function () {
        this.setNewCurrentWord();
        this.setRemainingGuesses();
        this.setNewCorrectGuesses();
        this.setNewLettersGuessed();
    }
};

console.log(game);
var subHeader = document.getElementById("sub-header");
var winsDisp = document.getElementById("winsDisp");
var currWordDisp = document.getElementById("currWordDisp");
var guessesDisp = document.getElementById("guessesDisp");

game.main();

winsDisp.innerHTML += "<p>" + game.wins + "</p>";
currWordDisp.innerHTML += "<p>" + game.correctGuesses.join(" ") + "</p>";
guessesDisp.innerHTML += "<p>Remaining guesses: " + game.remainingGuesses + "</p><p>Letters guessed: " + game.lettersAlreadyGuessed + "</p>";

document.onkeyup = function (event) {
    var userGuess = event.key;
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
    }
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