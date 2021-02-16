/* Work with localStorage */

export const setToLocalStorage = (item: string, value: string) =>
  localStorage.setItem(`${item}`, value);

export const removeFromLocalStorage = (item: string) => localStorage.removeItem(`${item}`);

export const getFromLocalStorage = (item: string) => localStorage.getItem(`${item}`);
