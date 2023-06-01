const text = document.getElementById('text');
const words = ['Top Artists'];
let wordIndex = 0;
let letterIndex = 0;
const text1 = document.querySelector(".text1")
const wordss = ['Top Albums'];
let wordIndex1 = 0;
let letterIndex1 = 0;
const text2 = document.querySelector(".text2")
const wordsss = ['Top Songs'];
let wordIndex2 = 0;
let letterIndex2 = 0;

function type() {
  if (letterIndex === words[wordIndex].length) {
    return setTimeout(remove, 1000);
  }
  text.textContent += words[wordIndex][letterIndex];
  letterIndex++;
  setTimeout(type, 200);
}

function type1() {
    if (letterIndex1 === wordss[wordIndex1].length) {
      return setTimeout(remove1, 1000);
    }
    text1.textContent += wordss[wordIndex1][letterIndex1];
    letterIndex1++;
    setTimeout(type1, 200);
}

function type2() {
    if (letterIndex2 === wordsss[wordIndex2].length) {
      return setTimeout(remove2, 1000);
    }
    text2.textContent += wordsss[wordIndex2][letterIndex2];
    letterIndex2++;
    setTimeout(type2, 200);
}

function remove() {
  if (letterIndex === 0) {
    wordIndex++;
    if (wordIndex === words.length) {
      wordIndex = 0;
    }
    return setTimeout(type, 500);
  }
  text.textContent = words[wordIndex].substring(0, letterIndex - 1);
  letterIndex--;
  setTimeout(remove, 100);
}

function remove1() {
    if (letterIndex1 === 0) {
      wordIndex1++;
      if (wordIndex1 === wordss.length) {
        wordIndex1 = 0;
      }
      return setTimeout(type1, 500);
    }
    text1.textContent = wordss[wordIndex1].substring(0, letterIndex1 - 1);
    letterIndex1--;
    setTimeout(remove1, 135);
}

function remove2() {
    if (letterIndex2 === 0) {
      wordIndex2++;
      if (wordIndex2 === wordsss.length) {
        wordIndex2 = 0;
      }
      return setTimeout(type2, 500);
    }
    text2.textContent = wordsss[wordIndex2].substring(0, letterIndex2 - 1);
    letterIndex2--;
    setTimeout(remove2, 170);
}

setTimeout(type, 1500);
setTimeout(type1, 1500);
setTimeout(type2, 1500);