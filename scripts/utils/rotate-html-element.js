let count = 0;

/**
 * Rotation Element HTML
 * @param {HTMLElement} htmlElement
 */
export const rotateHtmlElement = (htmlElement) => {
  count++;
  let deg = count * 180;
  if (deg === 360) {
    count = 0;
  }
  htmlElement.style.transform = "rotate(" + deg + "deg)";
};
