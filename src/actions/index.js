import * as types from "./actionTypes";

export const inputNumber = (number) => ({
  type: types.INPUT_NUMBER,
  number
});

export const inputOperator = (operator) => ({
  type: types.INPUT_OPERATOR,
  operator
});

export const inputDecimal = () => ({
  type: types.INPUT_DECIMAL
});

export const clear = () => ({
  type: types.CLEAR
});

export const equals = () => ({
  type: types.EQUALS
});
