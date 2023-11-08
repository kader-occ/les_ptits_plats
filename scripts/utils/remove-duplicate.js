import { toCapitalize } from "./to-capitalize.js";

export const removeDuplicate = (arr) => {
  const options = [];
  arr.forEach((option) => {
    if (options.includes(toCapitalize(option.textContent))) option.remove();
    else options.push(toCapitalize(option.textContent));
  });
};
