const hitBtn = document.getElementById('hit-btn');
const standBtn = document.getElementById('stand-btn');
const playerCardsElement = document.getElementById('player-cards');
const dealerCardsElement = document.getElementById('dealer-cards');
const playerScoreElement = document.getElementById('player-score');
const dealerScoreElement = document.getElementById('dealer-score');
const messageElement = document.getElementById('message');

let playerHand = [];
let dealerHand = [];
let deck = [];

const suits = ['♠', '♣', '♦', '♥'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

function createDeck() {
  deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  deck = shuffle(deck);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startGame() {
  createDeck();
  playerHand = [deck.pop(), deck.pop()];
  dealerHand = [deck.pop(), deck.pop()];
  renderGame();
}

function renderGame() {
  playerCardsElement.innerHTML = playerHand.map(card => `<span>${card.value} ${card.suit}</span>`).join(' ');
  dealerCardsElement.innerHTML = dealerHand.map(card => `<span>${card.value} ${card.suit}</span>`).join(' ');
  
  playerScoreElement.textContent = `Score: ${getScore(playerHand)}`;
  dealerScoreElement.textContent = `Score: ${getScore(dealerHand)}`;

  if (getScore(playerHand) > 21) {
    messageElement.textContent = 'You busted! Dealer wins!';
    disableButtons();
  } else if (getScore(dealerHand) > 21) {
    messageElement.textContent = 'Dealer busted! You win!';
    disableButtons();
  }
}

function getScore(hand) {
  let score = 0;
  let hasAce = false;
  
  for (let card of hand) {
    if (card.value === 'A') {
      hasAce = true;
      score += 11;
    } else if (['K', 'Q', 'J'].includes(card.value)) {
      score += 10;
    } else {
      score += parseInt(card.value);
    }
  }
  
  if (hasAce && score > 21) {
    score -= 10;
  }

  return score;
}

function hit() {
  playerHand.push(deck.pop());
  renderGame();
}

function stand() {
  while (getScore(dealerHand) < 17) {
    dealerHand.push(deck.pop());
    renderGame();
  }
  if (getScore(dealerHand) > 21) {
    messageElement.textContent = 'Dealer busted! You win!';
  } else if (getScore(dealerHand) > getScore(playerHand)) {
    messageElement.textContent = 'Dealer wins!';
  } else if (getScore(dealerHand) < getScore(playerHand)) {
    messageElement.textContent = 'You win!';
  } else {
    messageElement.textContent = 'It\'s a tie!';
  }
  disableButtons();
}

function disableButtons() {
  hitBtn.disabled = true;
  standBtn.disabled = true;
}

hitBtn.addEventListener('click', hit);
standBtn.addEventListener('click', stand);

startGame();
