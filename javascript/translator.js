const brailleAlphabet = [
  { character: ['a', 1], matrix: 'O.....' },
  { character: ['b', 2], matrix: 'O.O...' },
  { character: ['c', 3], matrix: 'OO....' },
  { character: ['d', 4], matrix: 'OO.0..' },
  { character: ['e', 5], matrix: 'O..O..' },
  { character: ['f', 6], matrix: 'OOO...' },
  { character: ['g', 7], matrix: 'OOOO..' },
  { character: ['h', 8], matrix: 'O.OO..' },
  { character: ['i', 9], matrix: '.OO...' },
  { character: ['j', 0], matrix: '.OOO..' },
  { character: ['k'], matrix: 'O...O.' },
  { character: ['l'], matrix: 'O.O.O.' },
  { character: ['m'], matrix: 'OO..O.' },
  { character: ['n'], matrix: 'OOO.O.' },
  { character: ['o'], matrix: 'O..OO.' },
  { character: ['p'], matrix: 'OO.OO.' },
  { character: ['q'], matrix: 'OOOOO.' },
  { character: ['r'], matrix: 'O.OOO.' },
  { character: ['s'], matrix: '.OO.O.' },
  { character: ['t'], matrix: '.OOO.O' },
  { character: ['u'], matrix: 'O...OO' },
  { character: ['v'], matrix: 'O.O.OO' },
  { character: ['w'], matrix: '.OOO.O' },
  { character: ['x'], matrix: 'OO..OO' },
  { character: ['y'], matrix: 'OO.OOO' },
  { character: ['z'], matrix: 'O..OOO' },
];

const numberSign = '.O.OOO';
const capitalSign = '.....O';

function textToBraille(text) {
  let result = '';
  let isNumber = false;

  for (let char of text.toLowerCase()) {
    if (/[0-9]/.test(char)) {
      if (!isNumber) {
        result += numberSign;
        isNumber = true;
      }
      char = parseInt(char);
    } else {
      isNumber = false;
    }

    if (/[A-Z]/.test(text[text.toLowerCase().indexOf(char)])) {
      result += capitalSign;
    }

    const brailleChar = brailleAlphabet.find(item => item.character.includes(char));
    if (brailleChar) {
      result += brailleChar.matrix;
    } else if (char === ' ') {
      result += '......';
    }
  }

  return result;
}

function brailleToText(braille) {
  let result = '';
  let isCapital = false;
  let isNumber = false;

  for (let i = 0; i < braille.length; i += 6) {
    const matrix = braille.slice(i, i + 6);

    if (matrix === capitalSign) {
      isCapital = true;
      continue;
    }

    if (matrix === numberSign) {
      isNumber = true;
      continue;
    }

    const char = brailleAlphabet.find(item => item.matrix === matrix);
    if (char) {
      let value = char.character[0];
      if (isNumber && typeof char.character[1] === 'number') {
        value = char.character[1].toString();
      } else if (isCapital) {
        value = value.toUpperCase();
        isCapital = false;
      }
      result += value;
    } else if (matrix === '......') {
      result += ' ';
      isNumber = false;
    }
  }

  return result;
}

function translate(input) {
  if (/^[O.]+$/.test(input) && input.length % 6 === 0) {
    return brailleToText(input);
  } else {
    return textToBraille(input);
  }
}

// Main execution
const input = process.argv.slice(2).join(' ');
if (!input) {
  console.error('Please provide a string to translate.');
  process.exit(1);
}

console.log(translate(input));