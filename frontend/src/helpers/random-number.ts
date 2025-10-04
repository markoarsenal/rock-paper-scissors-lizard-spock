const RANDOM_NUMBER_API_URL = 'https://codechallenge.boohma.com/random';

export const getRandomNumber = async (): Promise<number> => {
  const apiRandomNumber: Promise<number> = fetch(RANDOM_NUMBER_API_URL)
    .then(res => res.json())
    .then((data: { random_number: number }) => {
      return data.random_number;
    });

  const localRandomNumber = new Promise<number>(resolve => {
    setTimeout(() => {
      const number = Math.floor(Math.random() * 100);
      resolve(number);
    }, 1000);
  });

  const number = await Promise.race([apiRandomNumber, localRandomNumber]);

  return number;
};

export const getRandomNumberUpTo = async (max: number) => {
  const number = await getRandomNumber();

  return Math.round((number / 100) * max);
};
