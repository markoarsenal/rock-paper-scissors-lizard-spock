const RANDOM_NUMBER_API_URL = 'https://codechallenge.boohma.com/random';

export const getRandomNumber = async (): Promise<number> => {
  const apiRandomNumber: Promise<number> = fetch(RANDOM_NUMBER_API_URL)
    .then(res => res.json())
    .then((data: { random_number: number }) => {
      console.log('apiRandomNumber', data.random_number - 1);
      return data.random_number - 1;
    });

  const localRandomNumber = new Promise<number>(resolve => {
    setTimeout(() => {
      const number = Math.floor(Math.random() * 100);
      console.log('localRandomNumber', number);
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
