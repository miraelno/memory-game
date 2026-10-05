import { createElement } from '../utils/createElement.js';

const HIDDEN_CARD_LABEL = 'Hidden card';

function createCard(card, onCardClick) {
  return createElement(
    'button',
    {
      className: 'card',
      attributes: { type: 'button', 'data-id': card.id, 'aria-label': HIDDEN_CARD_LABEL },
      events: { click: () => onCardClick(card.id) },
    },
    [
      createElement('span', { className: 'card__face card__face--back' }),
      createElement('span', { className: 'card__face card__face--front', text: card.emoji }),
    ],
  );
}

export function createBoard({ onCardClick }) {
  const element = createElement('section', {
    className: 'board',
    attributes: { 'aria-label': 'Game board' },
  });

  function renderCards(cards) {
    const items = cards.map((card) => createCard(card, onCardClick));
    element.replaceChildren(...items);
  }

  function updateCard(card) {
    const cardElement = element.querySelector(`[data-id="${card.id}"]`);
    const isVisible = card.isOpen || card.isMatched;

    cardElement.classList.toggle('card--open', isVisible);
    cardElement.classList.toggle('card--matched', card.isMatched);
    cardElement.setAttribute('aria-label', isVisible ? card.pairId : HIDDEN_CARD_LABEL);
  }

  return { element, renderCards, updateCard };
}
