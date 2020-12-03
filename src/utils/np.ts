import NP from 'number-precision';

type numType = number | string;

const ceil = (number: numType, precision: number | undefined) => {
  return NP.strip(number, precision);
};

const plus = (num1: numType, num2: numType, ...others: numType[]) => {
  return NP.plus(num1, num2, ...others);
};

const minus = (num1: numType, num2: numType, ...others: numType[]) => {
  return NP.minus(num1, num2, ...others);
};

const multiply = (num1: numType, num2: numType, ...others: numType[]) => {
  return NP.times(num1, num2, ...others);
};

const divide = (num1: numType, num2: numType, ...others: numType[]) => {
  return NP.divide(num1, num2, ...others);
};

const round = (num: numType, ratio: number) => {
  return NP.round(num, ratio);
};

export default {
  ceil,
  plus,
  minus,
  multiply,
  divide,
  round,
};
