export function createElement(tag, options = {}, children = []) {
  const { className, text, attributes = {}, events = {} } = options;
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text !== undefined) {
    element.textContent = text;
  }

  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });

  Object.entries(events).forEach(([type, handler]) => {
    element.addEventListener(type, handler);
  });

  element.append(...children);

  return element;
}
