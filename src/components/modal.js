import { createElement } from '../utils/createElement.js';

let overlay = null;

function handleKeydown(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

function handleOverlayClick(event) {
  if (event.target === overlay) {
    closeModal();
  }
}

function setPageInert(isInert) {
  Array.from(document.body.children).forEach((element) => {
    if (element !== overlay) {
      element.inert = isInert;
    }
  });
}

export function openModal(title, content) {
  closeModal();

  const closeButton = createElement('button', {
    className: 'modal__close',
    text: '×',
    attributes: { type: 'button', 'aria-label': 'Close' },
    events: { click: closeModal },
  });

  const modal = createElement(
    'div',
    { className: 'modal', attributes: { role: 'dialog', 'aria-modal': 'true' } },
    [closeButton, createElement('h2', { className: 'modal__title', text: title }), ...content],
  );

  overlay = createElement('div', { className: 'overlay', events: { click: handleOverlayClick } }, [
    modal,
  ]);

  setPageInert(true);
  document.body.append(overlay);
  document.body.classList.add('no-scroll');
  document.addEventListener('keydown', handleKeydown);
  closeButton.focus();
}

export function closeModal() {
  if (!overlay) {
    return;
  }

  overlay.remove();
  overlay = null;
  setPageInert(false);
  document.body.classList.remove('no-scroll');
  document.removeEventListener('keydown', handleKeydown);
}
