window.addEventListener('load', init);

//globls

//available levels
const levels = {
    easy:  5,
    medium: 3,
    hard: 1
}

//to change level
const currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const highscoreDisplay = document.querySelector('#highscore');

const words = [
    'hat',
    'river',
    'lucky',
    'statue',
    'generate',
    'stubborn',
    'cocktail',
    'runaway',
    'joker',
    'developer',
    'establishment',
    'hero',
    'javascript',
    'nutrition',
    'revolver',
    'echo',
    'siblings',
    'investigate',
    'horrendous',
    'symptom',
    'laughter',
    'magic',
    'master',
    'space',
    'definition',
    'gender',
    'thick',
    'jaded',
    'threatening',
    'oceanic',
    'poison',
    'force',
    'surprise',
    'control',
    'enchanted',
    'tire',
    'bolt',
    'profuse',
    'environment',
    'bell',
    'type',
    'mischief',
    'flaky',
    'languid',
    'serve',
    'space',
    'mass',
    'bottle',
    'picture',
    'writer',
    'dusty',
    'divide',
    'plaster',
    'playground'
  ];

//initialize game
function init(){
    //show no of sec in UI
    seconds.innerHTML = currentLevel;

    //load word from array
    showWord(words);

    //start matching on word input
    wordInput.addEventListener('input', startMatch);

    //call countdown every sec
    setInterval(countdown, 1000);

    //check game status
    setInterval(checkStatus, 50);
}

//start Match
function startMatch(){
    if(matchWords()){
       isPlaying= true;
       time = currentLevel + 1;
       showWord(words);
       wordInput.value='';
       score++;
    }
      
  // Highscore based on score value for Session Storage
  if (typeof sessionStorage['highscore'] === 'undefined' || score > sessionStorage['highscore']) {
    sessionStorage['highscore'] = score;
  } else {
    sessionStorage['highscore'] = sessionStorage['highscore'];
  }

  // Prevent display of High Score: -1
  if (sessionStorage['highscore'] >= 0) {
  highscoreDisplay.innerHTML = sessionStorage['highscore'];
  }
  
    //if score is -1 display 0
    if(score === -1){
        scoreDisplay.innerHTML = 0;
    }else{
        scoreDisplay.innerHTML = score;
    }
}

//match currentWord to wordInput
function matchWords(){
    if(wordInput.value === currentWord.innerHTML){
        message.innerHTML = 'Correct!';
        return true;
    }else{
        message.innerHTML = '';
        return false;  
    }
}


//pick and show random word
function showWord(words){

    //generate random array index
    const randIndex = Math.floor(Math.random() * words.length);

    //ouput random word
    currentWord.innerHTML = words[randIndex];
}

//countdown timer
function countdown(){
    //make sure time is not run out
    if(time>0){
        //decrese time
        time--;
    }else if(time===0){
        //game over
        isPlaying = false;
    }
    //show time
    timeDisplay.innerHTML = time;
}

//check game status
function checkStatus(){
    if(!isPlaying && time === 0){
        message.innerHTML = 'GAME OVER!!!';
        score = -1;
    }
}