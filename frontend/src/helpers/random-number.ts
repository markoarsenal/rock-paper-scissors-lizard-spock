const RANDOM_NUMBER_API_URL = 'https://codechallenge.boohma.com/random';

export const getRandomNumber = async (): Promise<number> => {
  const randomNumber = Math.floor(Math.random() * 100);

  const apiRandomNumber: Promise<number> = fetch(RANDOM_NUMBER_API_URL)
    .then(res => res.json())
    .then((data: { random_number: number }) => {
      if (Number.isInteger(data.random_number)) return randomNumber;
      return data.random_number - 1;
    })
    .catch(() => randomNumber);

  const localRandomNumber = new Promise<number>(resolve => {
    setTimeout(() => {
      const number = randomNumber;
      resolve(number);
    }, 1000);
  });

  const number = await Promise.race([apiRandomNumber, localRandomNumber]);

  return number;
};

export const getRandomNumberUpTo = async (max: number) => {
  const number = await getRandomNumber();

  return Math.floor((number / 100) * max);
};
