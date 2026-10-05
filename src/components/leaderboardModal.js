import { createElement } from '../utils/createElement.js';
import { formatDate } from '../utils/formatDate.js';
import { getResults } from '../storage/leaderboard.js';
import { openModal } from './modal.js';

function createTable(results) {
  const rows = results.map((result, index) =>
    createElement('tr', {}, [
      createElement('td', { text: index + 1 }),
      createElement('td', { text: result.moves }),
      createElement('td', { text: formatDate(result.date) }),
    ]),
  );

  return createElement('table', { className: 'leaderboard' }, [
    createElement('thead', {}, [
      createElement('tr', {}, [
        createElement('th', { text: 'Rank' }),
        createElement('th', { text: 'Moves' }),
        createElement('th', { text: 'Date' }),
      ]),
    ]),
    createElement('tbody', {}, rows),
  ]);
}

export function showLeaderboardModal() {
  const results = getResults();

  if (results.length === 0) {
    openModal('Leaderboard', [
      createElement('p', {
        className: 'modal__text',
        text: 'No results yet. Finish a game to get on the leaderboard!',
      }),
    ]);
    return;
  }

  openModal('Leaderboard', [createTable(results)]);
}
