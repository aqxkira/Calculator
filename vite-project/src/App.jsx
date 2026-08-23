import { useState } from 'react';
import './style.css';


function App() {
 
const [currentInput, setCurrentInput] = useState(""); // То, что сейчас на экране
const [previousInput, setPreviousInput] = useState(null); // То, что спрятано
const [operation, setOperation] = useState(null); // Текущий знак
  

const handleClear = () =>{
  setCurrentInput('')
  setPreviousInput(null);
  setOperation(null);





};

const handleNumberClick = (number) => {
  if (currentInput === "Ошибка") {
    setCurrentInput(number);
    return; // Важно добавить return, чтобы функция остановилась
  }

  // ЗАЩИТА ОТ ЛИШНИХ НУЛЕЙ:
  // Если на экране только "0", и нажали "0" - ничего не делаем
  if (currentInput === "0" && number === "0") {
    return;
  }
  
  // Если на экране только "0", а нажали "5", то заменяем "0" на "5" (а не делаем "05")
  if (currentInput === "0" && number !== "0") {
     setCurrentInput(number);
     return;
  }

  // Обычное поведение - склеиваем
  setCurrentInput((prev) => prev + number); 
};

const handleOperatorClick = (op) => {
  if (currentInput === "") return;

  setPreviousInput(currentInput)
  setOperation(op)
  setCurrentInput("");

  
};

const handleCalculate = () =>{
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
      if (num2 === 0) {
        result = 0; 
      } 
      else {
        result = num1 / num2; 
      }
      break;

      case '%':
        if(num1 === 0 || num2 === 0){
          result = 0;
        }
        else{
        result = num1 % num2;}
        break;

      case '^':
         if (num2 === 0) {
        result = 0; 
      } 
      else {
        result = Math.pow(num1, num2);
      }
        break;
    
    
      default:
      return;
  }
  setCurrentInput(String(result));
  setPreviousInput(null);
  setOperation(null);

};

const handleDelete = () =>{
  // Берем то, что сейчас на экране (prev), и отрезаем 1 символ с конца
  setCurrentInput((prev) => prev.slice(0, -1));
};




  return (
<div className='Calculator'>
      <div className="altscreen">
        {previousInput} {operation}
      </div>
      <div className="screen">{currentInput}</div>

      {/* 1-й ряд: Очистка, Стереть символ, Процент, Деление */}
      <button className="btn-clear" onClick={handleClear}>C</button>
      <button onClick={handleDelete}>←</button>
      <button onClick={() => handleOperatorClick("%")}>%</button>
      <button onClick={() => handleOperatorClick("/")}>/</button>

      {/* 2-й ряд: 7, 8, 9 и Умножение */}
      <button onClick={() => handleNumberClick("7")}>7</button>
      <button onClick={() => handleNumberClick("8")}>8</button>
      <button onClick={() => handleNumberClick("9")}>9</button>
      <button onClick={() => handleOperatorClick("*")}>*</button>

      {/* 3-й ряд: 4, 5, 6 и Минус */}
      <button onClick={() => handleNumberClick("4")}>4</button>
      <button onClick={() => handleNumberClick("5")}>5</button>
      <button onClick={() => handleNumberClick("6")}>6</button>
      <button onClick={() => handleOperatorClick("-")}>-</button>

      {/* 4-й ряд: 1, 2, 3 и Плюс */}
      <button onClick={() => handleNumberClick("1")}>1</button>
      <button onClick={() => handleNumberClick("2")}>2</button>
      <button onClick={() => handleNumberClick("3")}>3</button>
      <button onClick={() => handleOperatorClick("+")}>+</button>

      {/* 5-й ряд: Степень, 0 и Равно (широкая кнопка) */}
      <button onClick={() => handleOperatorClick("^")}>^</button>
      <button onClick={() => handleNumberClick("0")}>0</button>
      <button onClick={handleCalculate}>=</button>
    </div>


  )
}

export default App;

