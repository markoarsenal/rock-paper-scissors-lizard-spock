export const getCssVariable = (variable: string) => {
  const style = window.getComputedStyle(document.body);
  return style.getPropertyValue(variable);
};
