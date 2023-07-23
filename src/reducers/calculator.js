import * as types from "../actions/actionTypes";

const initialState = {
  display: "0",
  operator: null,
  lastOperator: null,
  operand: null,
  stack: []
};

const calculateResult = (firstOperand, operator, secondOperand) => {
  const a = parseFloat(firstOperand);
  const b = secondOperand ? parseFloat(secondOperand) : null;

  switch (operator) {
    case "+":
      return b !== null ? a + b : a;
    case "-":
      return b !== null ? a - b : a;
    case "*":
      return b !== null ? a * b : a;
    case "/":
      return b !== null ? a / b : a;
    default:
      return a;
  }
};

const operatorFlags = {
  "+": true,
  "-": true,
  "*": true,
  "/": true
};

const isOperator = (char) => ["+", "-", "*", "/"].includes(char);

const calculator = (state = initialState, action) => {
  switch (action.type) {
    case types.INPUT_NUMBER:
      if (state.waitingForSecondOperand) {
        return {
          ...state,
          display: action.number,
          waitingForSecondOperand: false,
          hasDot: false
        };
      }

      if (state.display === "0" || state.display === "-0") {
        return state.hasDot
          ? { ...state, display: state.display + action.number }
          : { ...state, display: action.number };
      }

      return { ...state, display: state.display + action.number };

    case types.INPUT_DECIMAL:
      if (state.waitingForSecondOperand) {
        return {
          ...state,
          display: "0.",
          waitingForSecondOperand: false,
          hasDot: true
        };
      }

      if (!state.hasDot) {
        return { ...state, display: state.display + ".", hasDot: true };
      }

      return state;

    case types.INPUT_OPERATOR:
      const lastChar = state.display[state.display.length - 1];
      if (isOperator(lastChar)) {
        if (action.operator === "-" && isOperator(lastChar)) {
          return { ...state, display: state.display + action.operator };
        }
        const newDisplay = state.display.slice(0, -1) + action.operator;
        return { ...state, display: newDisplay, operator: action.operator };
      }
      if (state.operand !== null && !state.waitingForSecondOperand) {
        if (operatorFlags[state.lastOperator]) {
          const result = calculateResult(
            state.operand,
            state.lastOperator,
            state.display
          );
          return {
            ...state,
            display: String(result),
            operand: String(result),
            operator: action.operator,
            lastOperator: action.operator,
            waitingForSecondOperand: true
          };
        }
      }

      if (action.operator === "-" && state.waitingForSecondOperand) {
        return {
          ...state,
          display: "-",
          waitingForSecondOperand: false
        };
      }

      if (action.operator === "-" && !state.waitingForSecondOperand) {
        return {
          ...state,
          operand: state.display,
          operator: action.operator,
          lastOperator: action.operator,
          waitingForSecondOperand: true
        };
      }

      return {
        ...state,
        operand: state.display,
        operator: action.operator,
        lastOperator: action.operator,
        waitingForSecondOperand: true
      };

    case types.EQUALS:
      if (state.operand === null) {
        return state;
      }

      if (!state.waitingForSecondOperand) {
        const result = calculateResult(
          state.operand,
          state.operator,
          state.display
        );
        return {
          ...initialState,
          display: String(result)
        };
      }

      const result = calculateResult(
        state.operand,
        state.operator,
        state.operand
      );
      return {
        ...initialState,
        display: String(result)
      };

    case types.CLEAR:
      return initialState;

    default:
      return state;
  }
};

export default calculator;
