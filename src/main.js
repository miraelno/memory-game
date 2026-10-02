import './styles/style.css';
import { createElement } from './utils/createElement.js';
import { createHeader } from './components/header.js';
import { createBoard } from './components/board.js';
import { CARD_VALUES } from './data/cards.js';

const header = createHeader({
  totalPairs: CARD_VALUES.length,
  onNewGame: () => {},
  onShowLeaderboard: () => {},
});

const board = createBoard({
  onCardClick: () => {},
});

const main = createElement('main', { className: 'main' }, [board.element]);

document.body.append(header.element, main);
