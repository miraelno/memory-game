import { createElement } from '../utils/createElement.js';
import { openModal, closeModal } from './modal.js';

export function showWinModal(moves, onNewGame) {
  const newGameButton = createElement('button', {
    className: 'button',
    text: 'New Game',
    attributes: { type: 'button' },
    events: { click: onNewGame },
  });

  const closeButton = createElement('button', {
    className: 'button button--secondary',
    text: 'Close',
    attributes: { type: 'button' },
    events: { click: closeModal },
  });

  openModal('You won!', [
    createElement('p', {
      className: 'modal__text',
      text: `You found all pairs in ${moves} moves.`,
    }),
    createElement('div', { className: 'modal__actions' }, [newGameButton, closeButton]),
  ]);
}
