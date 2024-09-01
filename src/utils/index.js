export const getRandomUniqueElements = (array, n) => {
  if (n > array.length) {
    throw new Error("n cannot be greater than the length of the array");
  }
  const arrayCopy = [...array];

  const result = [];
  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * arrayCopy.length);
    result.push(arrayCopy[randomIndex]);
    arrayCopy.splice(randomIndex, 1);
  }

  return result;
};

export const generateRandomArray = (maxValue) => {
  const length = Math.floor(Math.random() * maxValue) + 1;
  const randomArray = [];

  while (randomArray.length < length) {
    const value = Math.floor(Math.random() * (maxValue + 1));
    if (!randomArray.includes(value)) randomArray.push(value);
  }

  return randomArray;
};

export const getRandomIntInclusive = (min, max) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
};
