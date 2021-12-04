export const solve1 = (codes: string[]) => {
  const gammaRate = parseInt(getGammaRate(codes), 2);
  const epsilonRate = parseInt(getEpsilonRate(codes), 2);

  return gammaRate * epsilonRate;
};

export const solve2 = (codes: string[]) => {
  const oxygenGeneratorRating = parseInt(getOxygenGeneratorRating(codes), 2);
  const co2ScrubberRating = parseInt(getCO2ScrubberRating(codes), 2);

  return oxygenGeneratorRating * co2ScrubberRating;
};

const getGammaRate = (codes: string[]) => {
  const strLength = codes[0].length;
  let gammaRateCode = '';

  for (let i = 0; i < strLength; i++) {
    const digitCountAtIndex = countDigitsAtIndex(codes, i);
    const mostCommonDigit = getMostCommonDigit(digitCountAtIndex);
    gammaRateCode += mostCommonDigit;
  }

  return gammaRateCode;
};

const getEpsilonRate = (codes: string[]) => {
  const strLength = codes[0].length;
  let epsilonRateCode = '';

  for (let i = 0; i < strLength; i++) {
    const digitCountAtIndex = countDigitsAtIndex(codes, i);
    const leastCommonDigit = getLeastCommonDigit(digitCountAtIndex);
    epsilonRateCode += leastCommonDigit;
  }

  return epsilonRateCode;
};

const getOxygenGeneratorRating = (codes: string[]) => {
  const strLength = codes[0].length;

  for (let i = 0; i < strLength; i++) {
    const digitCountAtIndex = countDigitsAtIndex(codes, i);
    const mostCommonDigit = getMostCommonDigitOrOne(digitCountAtIndex);
    codes = codes.filter(code => code[i] === mostCommonDigit);

    if (codes.length === 1) {
      return codes[0];
    }
  }

  return codes[0];
};

const getCO2ScrubberRating = (codes: string[]) => {
  const strLength = codes[0].length;

  for (let i = 0; i < strLength; i++) {
    const digitCountAtIndex = countDigitsAtIndex(codes, i);
    const leastCommonDigit = getLeastCommonDigitOrZero(digitCountAtIndex);
    codes = codes.filter(code => code[i] === leastCommonDigit);

    if (codes.length === 1) {
      return codes[0];
    }
  }

  return codes[0];
};

const countDigitsAtIndex = (codes: string[], index: number) => {
  return codes.reduce((result, code) => {
    const digit = code[index] as '0' | '1';
    result[digit] += 1;
    return result;
  }, { '0': 0, '1': 0 });
};

const getMostCommonDigit = (count: { '0': number, '1': number }) => {
  return Object.entries(count)
    .sort((a, b) => a[1] - b[1])
    .pop()?.[0];
};

const getLeastCommonDigit = (count: { '0': number, '1': number }) => {
  return Object.entries(count)
    .sort((a, b) => b[1] - a[1])
    .pop()?.[0];
};

const getMostCommonDigitOrOne = (count: { '0': number, '1': number }) => {
  if (count[0] === count[1]) {
    return '1';
  } else {
    return getMostCommonDigit(count);
  }
};

const getLeastCommonDigitOrZero = (count: { '0': number, '1': number }) => {
  if (count[0] === count[1]) {
    return '0';
  } else {
    return getLeastCommonDigit(count);
  }
};
