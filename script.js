const cards = document.querySelectorAll('.card');
const specialCards = document.querySelectorAll('.sCard');
const scoreBox = document.querySelector('.score-counter');
const scoreDisplay = document.querySelector('.score-count');
const cardCountDisplay = document.querySelector('.card-count');
const clearButton = document.querySelector('.clear-button');
let scoreSet = [];
let times2 = false;
let score = {
  sumScore: 0,
  newScoreSet: [],
};

cards.forEach((card) => {
  card.addEventListener('click', () => {
    if (!card.classList.contains('has')) {
      card.classList.add('has');
    } else if (card.classList.contains('has')) {
      card.classList.remove('has');
      scoreSet = score.newScoreSet.filter(
        (e) => e !== Number(card.dataset.cardValue)
      );
    }

    collectScore(card);

    if (
      (score.newScoreSet.length === 13 && score.sumScore === -194) ||
      (score.newScoreSet.length === 15 && score.sumScore === -194)
    ) {
      score.sumScore = 194;
    } else if (score.newScoreSet.length === 16) {
      score.sumScore = 1000;
    } else if (score.newScoreSet.length === 14 && score.sumScore === -94) {
      score.sumScore = 294;
    } else if (score.newScoreSet.length === 14 && score.sumScore === -294) {
      score.sumScore = 94;
    } else if (score.newScoreSet.length === 1 && times2) {
      score.sumScore = 50;
    }

    scoreDisplay.innerHTML = score.sumScore;
    cardCountDisplay.innerHTML = score.newScoreSet.length;
  });
});

clearButton.addEventListener('click', () => {
  console.log('cleared');
  score = {
    sumScore: 0,
    newScoreSet: [],
  };
  scoreSet = [];
  times2 = false;
  cards.forEach((card) => {
    card.classList.remove('has');
  });
  scoreDisplay.innerHTML = score.sumScore;
  cardCountDisplay.innerHTML = score.newScoreSet.length;
  console.log(score);
});

scoreBox.addEventListener('click', () => {
  if (score.sumScore === undefined) return;
  else {
    console.log('copied');
    copyToClipboard(score.sumScore);
  }
});

function collectScore(card) {
  scoreSet.push(Number(card.dataset.cardValue));

  if (card.dataset.cardValue === 'times2') {
    times2 = true;
    scoreSet.push('');
  }

  let newScoreSet = scoreSet.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });

  let sumScore = newScoreSet.reduce(function (total, current) {
    return total + current;
  }, 0);

  if (times2) {
    sumScore = sumScore * 2;
  }

  score = {
    sumScore,
    newScoreSet,
  };

  console.log(score);
  return score;
}

function copyToClipboard(number) {
  const textarea = document.createElement('textarea');
  textarea.value = number;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}
