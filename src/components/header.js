import { createElement } from '../utils/createElement.js';

export function createHeader({ totalPairs, onNewGame, onShowLeaderboard }) {
  const movesValue = createElement('span', { className: 'stats__value' });
  const pairsValue = createElement('span', { className: 'stats__value' });

  const newGameButton = createElement('button', {
    className: 'button',
    text: 'New Game',
    attributes: { type: 'button' },
    events: { click: onNewGame },
  });

  const leaderboardButton = createElement('button', {
    className: 'button',
    text: 'Leaderboard',
    attributes: { type: 'button' },
    events: { click: onShowLeaderboard },
  });

  const element = createElement('header', { className: 'header' }, [
    createElement('h1', { className: 'header__title', text: 'Memory Game' }),
    createElement('div', { className: 'header__controls' }, [newGameButton, leaderboardButton]),
    createElement('div', { className: 'stats', attributes: { 'aria-live': 'polite' } }, [
      createElement('p', { className: 'stats__item' }, ['Moves: ', movesValue]),
      createElement('p', { className: 'stats__item' }, ['Pairs: ', pairsValue]),
    ]),
  ]);

  function updateStats({ moves, pairs }) {
    movesValue.textContent = moves;
    pairsValue.textContent = `${pairs}/${totalPairs}`;
  }

  updateStats({ moves: 0, pairs: 0 });

  return { element, updateStats };
}
