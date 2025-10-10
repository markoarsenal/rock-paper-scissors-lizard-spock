export const getRandomNumber = (): number => {
  return Math.floor(Math.random() * 100);
};

export const getRandomNumberUpTo = (max: number): number => {
  const number = getRandomNumber();
  return Math.floor((number / 100) * max);
};

export const getRandomNumberInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
