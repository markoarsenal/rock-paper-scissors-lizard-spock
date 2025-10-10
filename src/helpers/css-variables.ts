export const getCssVariable = (variable: string, element: HTMLElement = document.body) => {
  const style = window.getComputedStyle(element);
  return style.getPropertyValue(variable);
};
