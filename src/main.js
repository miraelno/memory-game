import './styles/style.css';
import { createElement } from './utils/createElement.js';
import { header, board, startNewGame } from './game/game.js';

const main = createElement('main', { className: 'main' }, [board.element]);

document.body.append(header.element, main);

startNewGame();
