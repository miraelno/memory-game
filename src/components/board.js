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
  const cardElements = new Map();

  function renderCards(cards) {
    cardElements.clear();

    const items = cards.map((card) => {
      const cardElement = createCard(card, onCardClick);
      cardElements.set(card.id, cardElement);
      return cardElement;
    });

    element.replaceChildren(...items);
  }

  function updateCard(card) {
    const cardElement = cardElements.get(card.id);
    const isVisible = card.isOpen || card.isMatched;

    cardElement.classList.toggle('card--open', isVisible);
    cardElement.classList.toggle('card--matched', card.isMatched);
    cardElement.setAttribute('aria-label', isVisible ? card.pairId : HIDDEN_CARD_LABEL);
  }

  return { element, renderCards, updateCard };
}
