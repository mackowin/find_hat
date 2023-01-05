const prompt = require('prompt-sync')({sigint: true});
//const term = require('terminal-kit').terminal;


const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this.field = field;
  }

  merge() {
    const mergedField = [].concat.apply([], this.field);
    return mergedField;
  }

  print() {
    console.log(this.field.join());
  }

  static generateField(heightParam, widthParam, percentage) {
    const randomFieldArea = heightParam * widthParam;

    let numberOfHoles;
    if (randomFieldArea * percentage + 2 > randomFieldArea) {
      numberOfHoles = randomFieldArea - 2
    } else {
      numberOfHoles = Math.round(randomFieldArea * percentage, 0);
    }

    const numberOfNeutralSymbols = randomFieldArea - numberOfHoles - 2;

    if(randomFieldArea < 3) {
      console.log('Not sufficient field area, increase height or width');
    }

    if(randomFieldArea >= 3 && numberOfHoles < 1) {
      console.log('Not sufficient number of holes, increase field area or percentage');
    }

    let randomField = [];
    if(randomFieldArea >= 3 && numberOfHoles >= 1) {
      randomField.push('^');
      randomField.push('*');

      for(let i = 0; i < numberOfHoles; i++) {
        randomField.push('O');
      }

      for(let j = 0; j < numberOfNeutralSymbols; j++) {
        randomField.push('░');
      }

      const shuffleFieldArray = array => {
        for (let k = array.length - 1; k > 0; k--) {

      let n = Math.floor(Math.random() * (k + 1));

        var temp = array[k];
        array[k] = array[n];
        array[n] = temp;
        }

      return array
      }

      //shuffleFieldArray(randomField).splice(0, 0, "*");
      shuffleFieldArray(randomField);

      const splitArrayIntoChunks = (arr, len) => {
        let chunks = [], p = 0, q = arr.length;
        while (p < q) {
          chunks.push(arr.slice(p, p += len));
        }
        return chunks;
      }
      console.log(splitArrayIntoChunks(randomField, widthParam));
    }


    let startIndex = randomField.findIndex(num => num === '*');
    let endIndex = randomField.findIndex(num => num === '^');
    console.log(randomField);
    console.log(startIndex);
    console.log(endIndex);


    if(startIndex - 1 === endIndex || startIndex - widthParam === endIndex || startIndex + 1 === endIndex || startIndex + widthParam === endIndex) {
        console.log('This is already solved!');
    }

    do {
        if(randomField[startIndex - 1] === "░") {
          randomField[startIndex - 1] = '*';
          startIndex -= 1;

        } else if (randomField[startIndex - widthParam] === "░") {
          randomField[startIndex - widthParam] = '*';
          startIndex -= widthParam;

        } else if (randomField[startIndex + 1] === "░") {
          randomField[startIndex + 1] = '*';
          startIndex += 1;

        } else if (randomField[startIndex + widthParam] === "░"){
          randomField[startIndex + widthParam] = '*';
          startIndex += widthParam;

        }

        console.log(`My position index is ${startIndex} and hat is at ${endIndex} index`);

        if(endIndex === startIndex || startIndex - 1 === endIndex || startIndex - widthParam === endIndex || startIndex + 1 === endIndex || startIndex + widthParam === endIndex) {
          console.log('You can solve that');
        } else {
          console.log('You got stuck')
        }

    } while (randomField[startIndex - 1] === "░" || randomField[startIndex - widthParam] === "░" || randomField[startIndex + 1] === "░" || randomField[startIndex + widthParam] === "░")




  }
}

Field.generateField(3, 3, 0.2);


const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

let gameOver = false;
let updatedField = myField.merge();
let index = updatedField.findIndex(num => num === '*');
let width = myField.field[0].length;


while (!gameOver) {
    const userInput = prompt('What is your move?');

    if (userInput === 'r') {
      index += 1;
    }
    if (userInput === 'l') {
      index -= 1;
    }
    if (userInput === 'd') {
      index += width;
    }
    if (userInput === 'u') {
      index -= width;
    }

      if (myField.merge()[index] === 'O') {
      gameOver = true;
      console.log('You fall down in a hole!');
    } else if (myField.merge()[index] === '^') {
      gameOver = true;
      console.log('Congrats, you found your hat!');
    } else if (index > myField.merge().length-1 || index < 0) {
      gameOver = true;
      console.log('You are out of the field');
    } else {
      updatedField[index] = '*';
      const neutralSymbolToHole = Math.floor(Math.random() * updatedField.length);
      console.log(neutralSymbolToHole);
      console.log(updatedField[neutralSymbolToHole]);

      if (updatedField[neutralSymbolToHole] === "░") {
        updatedField[neutralSymbolToHole] = 'O';
      }

      const splitArrayIntoChunks = (arr, len) => {
        let chunks = [], p = 0, q = arr.length;
        while (p < q) {
          chunks.push(arr.slice(p, p += len));
        }
        return chunks;
      }

      console.log(splitArrayIntoChunks(updatedField, width));
    }
  }
