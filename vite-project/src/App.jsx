import { useState } from 'react';
import './style.css';

function App() {
  const [currentInput, setCurrentInput] = useState("");
  const [previousInput, setPreviousInput] = useState(null);
  const [operation, setOperation] = useState(null);

  const handleClear = () => {
    setCurrentInput('');
    setPreviousInput(null);
    setOperation(null);
  };

  const handleNumberClick = (number) => {
    if (currentInput === "Ошибка") {
      setCurrentInput(number === "." ? "0." : number);
      return;
    }

    // Правильная обработка точки
    if (number === ".") {
      if (currentInput.includes(".")) return; // Не даем поставить вторую точку
      if (currentInput === "") {
        setCurrentInput("0.");
        return;
      }
    }

    // Защита от лишних нулей
    if (currentInput === "0" && number === "0") return;
    if (currentInput === "0" && number !== "0" && number !== ".") {
      setCurrentInput(number);
      return;
    }

    setCurrentInput((prev) => prev + number);
  };

  const handleOperatorClick = (op) => {
    if (currentInput === "") {
      // Позволяет сменить знак, если второе число еще не начали вводить
      if (previousInput !== null) setOperation(op);
      return;
    }

    setPreviousInput(currentInput);
    setOperation(op);
    setCurrentInput("");
  };

  const handleCalculate = () => {
    if (previousInput === null || currentInput === "" || operation === null) return;

    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    let result;

    switch (operation) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":     
        result = num2 === 0 ? "Ошибка" : num1 / num2;
        break;
      case "%":
        result = num2 === 0 ? "Ошибка" : num1 % num2;
        break;
      case "^":
        result = Math.pow(num1, num2);
        break;
      default:
        return;
    }

    setCurrentInput(String(result));
    setPreviousInput(null);
    setOperation(null);
  };

  const handleDelete = () => {
    if (currentInput === "Ошибка") {
      setCurrentInput("");
      return;
    }
    setCurrentInput((prev) => prev.slice(0, -1));
  };

  return (
    <div className='Calculator'>
      <div className="altscreen">
        {previousInput} {operation}
      </div>
      <div className="screen">{currentInput}</div>

      <button className="btn-clear" onClick={handleClear}>C</button>
      <button onClick={handleDelete}>←</button>
      <button onClick={() => handleOperatorClick("%")}>%</button>
      <button onClick={() => handleOperatorClick("/")}>/</button>

      <button onClick={() => handleNumberClick("7")}>7</button>
      <button onClick={() => handleNumberClick("8")}>8</button>
      <button onClick={() => handleNumberClick("9")}>9</button>
      <button onClick={() => handleOperatorClick("*")}>*</button>

      <button onClick={() => handleNumberClick("4")}>4</button>
      <button onClick={() => handleNumberClick("5")}>5</button>
      <button onClick={() => handleNumberClick("6")}>6</button>
      <button onClick={() => handleOperatorClick("-")}>-</button>

      <button onClick={() => handleNumberClick("1")}>1</button>
      <button onClick={() => handleNumberClick("2")}>2</button>
      <button onClick={() => handleNumberClick("3")}>3</button>
      <button onClick={() => handleOperatorClick("+")}>+</button>

      <button onClick={() => handleOperatorClick("^")}>^</button>
      <button onClick={() => handleNumberClick("0")}>0</button>
      <button onClick={() => handleNumberClick(".")}>.</button>
      <button onClick={handleCalculate}>=</button>
    </div>
  );
}

export default App;