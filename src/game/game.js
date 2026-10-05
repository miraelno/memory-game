import { CARD_VALUES } from '../data/cards.js';
import { shuffle } from '../utils/shuffle.js';
import { saveResult } from '../storage/leaderboard.js';
import { createHeader } from '../components/header.js';
import { createBoard } from '../components/board.js';
import { closeModal } from '../components/modal.js';
import { showWinModal } from '../components/winModal.js';
import { showLeaderboardModal } from '../components/leaderboardModal.js';

const MISMATCH_DELAY = 1000;
const TOTAL_PAIRS = CARD_VALUES.length;

let cards = [];
let firstCard = null;
let secondCard = null;
let moves = 0;
let pairs = 0;
let timerId = null;

export const header = createHeader({
  totalPairs: TOTAL_PAIRS,
  onNewGame: startNewGame,
  onShowLeaderboard: showLeaderboardModal,
});

export const board = createBoard({
  onCardClick: handleCardClick,
});

function createDeck() {
  const deck = [...CARD_VALUES, ...CARD_VALUES].map((value, index) => ({
    id: index,
    pairId: value.id,
    emoji: value.emoji,
    isOpen: false,
    isMatched: false,
  }));

  return shuffle(deck);
}

export function startNewGame() {
  clearTimeout(timerId);
  timerId = null;

  cards = createDeck();
  firstCard = null;
  secondCard = null;
  moves = 0;
  pairs = 0;

  board.renderCards(cards);
  header.updateStats({ moves, pairs });
  closeModal();
}

function closeOpenedCards() {
  firstCard.isOpen = false;
  secondCard.isOpen = false;
  board.updateCard(firstCard);
  board.updateCard(secondCard);

  firstCard = null;
  secondCard = null;
  timerId = null;
}

function finishGame() {
  saveResult(moves);
  showWinModal(moves, startNewGame);
}

function handleCardClick(cardId) {
  if (secondCard) {
    return;
  }

  const card = cards.find((item) => item.id === cardId);

  if (card.isOpen || card.isMatched) {
    return;
  }

  card.isOpen = true;
  board.updateCard(card);

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  moves += 1;

  if (firstCard.pairId !== secondCard.pairId) {
    header.updateStats({ moves, pairs });
    timerId = setTimeout(closeOpenedCards, MISMATCH_DELAY);
    return;
  }

  firstCard.isMatched = true;
  secondCard.isMatched = true;
  board.updateCard(firstCard);
  board.updateCard(secondCard);

  firstCard = null;
  secondCard = null;
  pairs += 1;
  header.updateStats({ moves, pairs });

  if (pairs === TOTAL_PAIRS) {
    finishGame();
  }
}
