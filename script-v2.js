const cards = document.querySelectorAll('.card');
const specialCards = document.querySelectorAll('.sCard');
const scoreBox = document.querySelector('.score-counter');
const scoreDisplay = document.querySelector('.score-count');
const cardCountDisplay = document.querySelector('.card-count');
const clearButton = document.querySelector('.clear-button');
const scoreText = document.querySelector('.score-text');

let cardSetName = [];
let cardSetNum = [];
let copyScore = 0;

cards.forEach((card) => {
  card.addEventListener('click', () => {
    copyScore = collectScore(card);
    collectCardCount(card);
  });
});

clearButton.addEventListener('click', () => {
  cardSetName = [];
  cardSetNum = [];
  scoreDisplay.innerHTML = 0;
  cardCountDisplay.innerHTML = 0;
  cards.forEach((card) => {
    card.classList.remove('has');
  });
  console.log('Cleared');
  clearButton.textContent = 'Cleared';
  clearButton.classList.add('lengthen-clear')
  setInterval(() => {
    clearButton.textContent = 'Clear';
    clearButton.classList.remove('lengthen-clear')
  }, 2000);
});

scoreBox.addEventListener('click', () => {
  copyToClipboard(copyScore);
  let scoreBoxInnerHTML = scoreBox.innerHTML;
  scoreText.textContent = 'Copied!';
  setTimeout(() => {
    scoreText.innerHTML = scoreBoxInnerHTML;
  }, 2000);
});

function collectScore(card) {
  if (!cardSetName.includes(card.dataset.cardValue)) {
    cardSetName.push(card.dataset.cardValue);
    card.classList.add('has');
  } else if (cardSetName.includes(card.dataset.cardValue)) {
    cardSetName = cardSetName.filter((e) => e !== card.dataset.cardValue);
    card.classList.remove('has');
    console.log('Removed name');
  }

  if (
    !cardSetNum.includes(Number(card.dataset.cardValue)) &&
    !isNaN(Number(card.dataset.cardValue))
  ) {
    cardSetNum.push(Number(card.dataset.cardValue));
  } else if (cardSetNum.includes(Number(card.dataset.cardValue))) {
    console.log('Removed number');
    cardSetNum = cardSetNum.filter((e) => e !== Number(card.dataset.cardValue));
  }

  let score = accumulator(cardSetNum);

  if (cardSetNum.length === 13) {
    score = Math.abs(score);
  }
  if (cardSetName.includes('plus100')) {
    score = score + 100;
  }
  if (cardSetName.includes('minus100')) {
    score = score - 100;
  }
  if (cardSetName.includes('times2')) {
    score = score * 2;
  }
  if (cardSetName.includes('times2') && cardSetName.length === 1) {
    score = 50;
  }
  if (cardSetName.length === 16) {
    score = 1000;
  }

  console.log('cardSetName : ', cardSetName);
  console.log('cardSetNum : ', cardSetNum);
  console.log('Final Score :', score);

  scoreDisplay.innerHTML = score;

  return score;
}

function collectCardCount() {
  numOfCard = cardSetName.length;
  console.log('Number 0f Cards :', numOfCard);
  cardCountDisplay.innerHTML = numOfCard;
  return numOfCard;
}

function accumulator(array) {
  let zNum = 0;
  array.forEach((num) => {
    zNum += num;
    return zNum;
  });
  return zNum;
}

function copyToClipboard(number) {
  const textarea = document.createElement('textarea');
  textarea.value = number;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}
