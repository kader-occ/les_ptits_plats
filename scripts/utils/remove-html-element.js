/**
 * Supprime des elements HTML
 * @param {HTMLElement} htmlElement
 */
export const removeHtmlElement = (htmlElement) => {
  for (let i = htmlElement.length - 1; i >= 0; --i) {
    htmlElement[i].remove();
  }
};
