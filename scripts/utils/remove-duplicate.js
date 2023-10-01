import { toCapitalize } from "./to-capitalize.js";

const options = [];

export const removeDuplicate = (arr) => {
  arr.forEach((option) => {
    if (options.includes(toCapitalize(option.textContent))) option.remove();
    else options.push(toCapitalize(option.textContent));
  });
};
