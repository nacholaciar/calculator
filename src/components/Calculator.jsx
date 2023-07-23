import React from "react";
import { useSelector } from "react-redux";
import {
  inputNumber,
  inputOperator,
  inputDecimal,
  clear,
  equals
} from "../actions";
import Button from "./Button";

const Calculator = () => {
  const display = useSelector((state) => state.display);

  return (
    <div className="App">
      <div id="display">{display}</div>
      <div className="buttons-grid">
        <Button id="seven" action={inputNumber("7")}>
          7
        </Button>
        <Button id="eight" action={inputNumber("8")}>
          8
        </Button>
        <Button id="nine" action={inputNumber("9")}>
          9
        </Button>
        <Button id="divide" action={inputOperator("/")} className="operator">
          /
        </Button>
        <Button id="four" action={inputNumber("4")}>
          4
        </Button>
        <Button id="five" action={inputNumber("5")}>
          5
        </Button>
        <Button id="six" action={inputNumber("6")}>
          6
        </Button>
        <Button id="multiply" action={inputOperator("*")} className="operator">
          *
        </Button>
        <Button id="one" action={inputNumber("1")}>
          1
        </Button>
        <Button id="two" action={inputNumber("2")}>
          2
        </Button>
        <Button id="three" action={inputNumber("3")}>
          3
        </Button>
        <Button id="subtract" action={inputOperator("-")} className="operator">
          -
        </Button>
        <Button id="zero" action={inputNumber("0")}>
          0
        </Button>
        <Button id="decimal" action={inputDecimal()}>
          .
        </Button>
        <Button id="equals" action={equals()} className="equals">
          =
        </Button>
        <Button id="add" action={inputOperator("+")} className="operator">
          +
        </Button>
        <Button id="clear" action={clear()} className="clear">
          AC
        </Button>
      </div>
    </div>
  );
};

export default Calculator;
