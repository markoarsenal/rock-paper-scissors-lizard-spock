export const getRandomNumber = (): number => {
  return Math.floor(Math.random() * 100);
};

export const getRandomNumberUpTo = (max: number): number => {
  const number = getRandomNumber();
  return Math.floor((number / 100) * max);
};
