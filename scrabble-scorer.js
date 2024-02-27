const input = require("readline-sync");

const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
 };

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }
 
let word = '';

function initialPrompt() {
   word = input.question("Let's play some scrabble! Enter a word: ")
 return word
};

 function simpleScorer(word) {
   let score = 0
   for (let i = 0; i < word.length; i++) {
      score++;
   }
   return score
};

function vowelBonusScorer(word) {
   let vowels = ['A', 'E', 'I', 'O', 'U'];
   let score = 0;
   word = word.toUpperCase()
   for (let i = 0; i < word.length; i++) {
      if(vowels.includes(word[i])) {
         score += 3;
      } else {
         score += 1;
      }
   }
   return score
};

function scrabbleScorer(word) {
   let score = 0;
   word = word.toLowerCase();
   for (let i = 0; i < word.length; i++) {
      let letter = word[i];
   if (newPointStructure.hasOwnProperty(letter)) {
         score += newPointStructure[letter];
      }
   }
   return score;
};


const scoringAlgorithms = [{name: 'Simple Scorer', description: 'Each letter is worth 1 point.', scorerFunction: simpleScorer}, {name: 'Bonus Vowels', description: 'Vowels are 3pts, consonants are 1 pt.', scorerFunction: vowelBonusScorer}, {name: 'Scrabble', description: 'The traditional scoring algorithm.', scorerFunction: scrabbleScorer}];

function scorerPrompt() {
    console.log(`\nWhich scoring algorithm would you like to use?`)
   for(let i = 0; i < scoringAlgorithms.length; i++) {
      console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`)
   }
   let scoringChoice = Number(input.question(`\nEnter 0, 1, or 2: `));
      if(scoringChoice === 0) {
   console.log(`Algorithm Name: ${scoringAlgorithms[0].name}\nScoring Result for "${word}": ${scoringAlgorithms[0].scorerFunction()}`)
      } else if (scoringChoice === 1) {
         console.log(`Algorithm Name: ${scoringAlgorithms[1].name}\nScoring Result for "${word}": ${scoringAlgorithms[1].scorerFunction()}`)
      } else if (scoringChoice === 2) {
         console.log(`Algorithm Name: ${scoringAlgorithms[2].name}\nScoring Result for "${word}": ${scoringAlgorithms[2].scorerFunction()}`)
      } else {
         console.log("Invalid input. Please try again.")
      }
   return
}


function transform(ogPointStructure) {
   let newLetterKeys = {};
   for (key in ogPointStructure) {
     let oldKeys = ogPointStructure[key];
     for(i=0; i < oldKeys.length; i++) {
       newLetterKeys[oldKeys[i].toLowerCase()] = Number(key);
       }
   }        
   return newLetterKeys
 }

let newPointStructure = transform(oldPointStructure)
console.log(newPointStructure.hasOwnProperty('F'));


function runProgram() {
   initialPrompt();
   scorerPrompt(word); 

}



module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
