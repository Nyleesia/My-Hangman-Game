// Array of words for game
var words = ["apostrophe", "assassination", "amazement", "auspicious", "baseless", 
"bloody", "bump", "castigate", "changeful", "clangor", "control", "countless", 
"courtship", "critic", "critical", "dexterously", "dishearten", "dislocate", 
"dwindle", "eventful", "exposure", "fitful", "frugal", "generous", "gnarled", 
"hurry", "impartial", "lonely", "laughable", "lapse", "invulnerable", "inauspicious", 
"indistinguishable", "misplaced", "monumental", "multitudinous", "obscene", "palmy", "perusal", 
"pious", "premeditated", "suspicious", "radiance", "reliance", "road", "sanctimonious", 
"seamy", "sportive", "submerge", "bandit", "dauntless", "elbow", "fancy-free", "swagger" ];

// initialise word variable
var word= "";


// this array of letters and a space is used to dynamically create buttons on the screen
var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", 
"Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "-"];

// initialise answer array variable
var wordAnswerArray =[];

// set the number of wrong guesses allowed (chances per game, to 7)
var guessCount = 7;

// initialise wrong guesses array variable
var incorrectGuesses =[];

var wins = 0;
var losses = 0;

// there must be an area where the actual game is played 
// it must accomodate the underscores that show how many 
// letters are in the word
// in the index.html, I created a div for this with the 
// id "gamePlay"
// now I have to search for that div using the 
// document.querySelector
var gamePlay = document.querySelector("#gamePlay");

// I want to declare all additional variables outside of the functions so that they
// are globally available:
// I want players to use alphabet buttons to guess letters:
// first, I need to create a variable to find the div to which
// the alphabet letter buttons will be dynamically created and 
// appended
// the div has an id of "gamePlayAlpha"
var gameSpace = document.querySelector("#gamePlayAlpha");
var winsSpace = document.querySelector("#wins");
var lossesSpace = document.querySelector("#losses");

// then I need a variable to initiate the creation of the alphabet
// letter buttons
var letter = document.createElement("letter-button"); 




//////////////////////////////////////////////////////////////////////
// Firstly, I want to add some Shakespearean flourish to my game,
// so, I want some simple, lively music (to counter the macabre)
var audio = new Audio('assets/audio/TheWitchesDance.mp3');
audio.volume = 0.05;
audio.loop = true;

// since I want to activate the sound by using a button, I have
// to add another event listener
document.addEventListener('click', function (event) {

// next I have to add the conditions under which the sound will play
// I have decided to use just one sound button, so I will need to check
// if the sound is already playing or not, so that clicking the sound
// button will trigger the opposite event (play/pause)
if (event.target.matches('.sound')){
   if (audio.paused == true) {
        audio.play();
    }
    else {
        audio.pause();
    };
};
});
//////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////

// I also want players to exit the game from within the game window
// therefore, I have to add an event listener to detect the quit button 
// the quit button has a class of ".quit"
document.addEventListener('click', function (event) {

    // if the clicked element matches the quit class, 
    // I want the game to end, and I want to close the window
    if (event.target.matches('.quit')){
        window.close(this);
    };
});

// adding a reset button can also add positively to user experience
// this will have to reset the gamsSpace, guessCount, random word
// wordAnswerArray, pause the audio and clear the canvas, leaving 
// behind only the gallows
// this must be a global function (available from anywhere in the code):
function resetGame (){
    gamePlay.innerHTML = "";
    // the first step is to create a variable which stores the number
    // of guesses allowed per word
    // this variable is set to 7 because the hangman stick figure 
    // was drawn with 6 limbs and 1 noose
    guessCount =7;
    word= words[Math.floor(Math.random()*words.length)];
    wordAnswerArray =[];
    for (var i=0; i <word.length; i++){
        wordAnswerArray[i] = "_";
    };

    gameSpace.innerHTML = "";
    // reset buttons
    for (i=0; i<letters.length; i++){
        var letterBtn = document.createElement("button");
        letterBtn.classList.add("letter-button");
        letterBtn.innerHTML = letters[i];
        gameSpace.appendChild(letterBtn);
    }

    clearCanvas();
    audio.pause();
    incorrectGuesses =[];
    gamePlay.innerHTML = wordAnswerArray.join(" ") + 
                        ". Guess a letter, or click Quit to stop playing. " 
                        + guessCount + " guesses remain.";

};

// I need another even listener to call the function when the reset 
// button is clicked
document.addEventListener('click', function (event) {

// this here actually resets the game by calling on the resetGame function
    if (event.target.matches('.reset')){
        resetGame();
    };
});
////////////////////////////////////////////////////////////////////////////


//---------------------------------Words Game Loop-------------------------

// to actually play the game, since it is reiterative, it should be 
// within a loop, and should test prespecified conditions
// I want players to be able to quit or reset the game at any time

// now that I have a reset function, I want to add, a playGame function
// this has to be a loop which is triggered at the click of a button
// first, I have to write the playGame function, in all parts, 
// then I will be able to call that function with an event listener on the 
// click of the play button

// -------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////

//  I need to figure out how to deal with each individual
// letter button. I know that I will need to add an event listener
// but, I know also that writing a new event listener for each button 
// is going to be extremely DRY
// I have decided to do only one event listener, and although the 
// letters in my array are in CAPS (for aestetics) I can add 
// a ".toLowerCase", so that the input (guesses are not affected)
document.addEventListener('click', function (event) {
 
    // I want to catch each time a guess is correct (contained within the word)
    // the click event listens for the letter by button and then appends it
    // to the word, thereby replacing the underscore with a letter. 
    // first, I need to listen for the event
    if (event.target.matches('.letter-button') ){

        if (guessCount < 1) {
            gamePlay.innerHTML = "Press Reset to play again.";
            return;
        }

        // this has been selected;
        event.target.disabled = true;
        event.target.style.color = "red";
    
        // then, I need to add each guess to the DOM as lower case letters
        // plus, since I do not know how to disable letters already guessed, 
        // I will need to append a guessed letters list to the DOM
        var guess = event.target.innerHTML.toLowerCase();
        var correctGuess= false;
        //this just checks over the letters in the word
       for( var j = 0; j < word.length; j++) {
    
            // if the letter is actually in the word, this snippet identifies the index 
            // (location) of that letter
            if (word[j] === guess) {
                correctGuess = true;
                //  I will then need to add that letter to the wordAnswerArray, which was
                // previously an empty array, with only underscores as markers (update the array)
                wordAnswerArray[j] = guess;
   
                // next, I want to manipulate the DOM to prompt player to guess again 
                // and to let the player know that they have guessed a correct letter
                gamePlay.innerHTML = (wordAnswerArray.join(" ") + " .Good guess" + 
                ". Guess again, or click Quit to stop playing. " + "You have "+ guessCount 
                + " guess(es) remaining."); 
             
                // if they have correctly guessed the final letter (the joined letters form the word variable)
                // I still want to let player see the entire the word
                if (wordAnswerArray.join("") == word) { 
                    wins += 1;
                    gamePlay.innerHTML = "Good job the answer is " + word + ".";
                    winsSpace.innerHTML = "Wins: " + wins + "&nbsp;&nbsp;&nbsp;";
                }
            };
            
        };

             // on the other hand, if the letter guessed is not in the random word being parsed,
            // I will need to still add that letter to the guessed list
            if (correctGuess == false){;

                incorrectGuesses.push(guess);

                // this time I will need to reduce the variable guessCount
                // this snippet of code reduces the remaining guesses by increments of 1
                guessCount -= 1;
                
                // and then, this snippet starts drawing the noose and limbs to hang the stick figure
                hangTheMan(guessCount);

                gamePlay.innerHTML = wordAnswerArray.join(" ") + 
                ". Guess a letter, or click Quit to stop playing. " 
                + guessCount + " guesses remain.</br> So we know it's not... " + incorrectGuesses.join(", ") ;
                
                //if they have not correctly guessed the word, user experience can be positively affected by 
                // lettin the play know what the word was
                if (guessCount < 1) {
                    losses += 1;
                    gamePlay.innerHTML ="Game over, better luck next time. The word was " + word + ".";
                    lossesSpace.innerHTML = "Losses: " + losses
                };

            };
    };
});

// I want a click of the play button to initiate the game
// this entails executing the playGame function
// I also need another event listener
document.addEventListener('click', function (event) {
    
// if the clicked element matches the play class, 
// I want a new game to begin (after being reset)
    if (event.target.matches('.play')){
        resetGame();
    }
});