class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      //the variable this.previousOperandTextElement is the only way to refer to the variable within the class
      //the right variable is from the parameter, which the only purpose is to place it there
      this.currentOperandTextElement = currentOperandTextElement
      //remember that those 2 are empty when we start, they get updated though whenever a change happens like append
      this.clear()
      //doing clear() initializes the variables for output
  
    }
  
    clear() {
      //these variables are what we need to look at and base what to do
      this.currentOperand = '' 
      //first declaration of this variable, enables to have a storage for our numbers inputted
      this.previousOperand = ''
      this.operation = undefined
      //this is to set the stage and initialized what we need to output as display
  
      //does two things, first->as initializer for our variables to be outputted
      //second -> since this creates/replaces the var, it resets it to an empty string 
      //can also be used when we choose a clear option later, it resets the screen,
    }
  
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
      //remember to always make a number .toString() before doing any manipulation, just to be sure 
      //slice(0,-1) first parameter is starting index, second para is the index which to be deleted
      //it returns a new array that was manipulated, from starting to the second para index but is EXCLUDED,
    }
  
    appendNumber(number) {
      //append is when you press any number it appends it on the window 
      if (number === '.' && this.currentOperand.includes('.')) return
      //this check whether there is more than decimal, only one should be allowed, if what you inputted is decimal
      //and the current operand already has a decimal, then return meaning don't do anything
      // .includes is good way to find a string under a whole sentence
      this.currentOperand = this.currentOperand.toString() + number.toString()
      //if you press any number, the current operand number will be appended with that inputted number
      //remember to make both of them into a string to be appended with +
    }
  
    chooseOperation(operation) {
      if (this.currentOperand === '') return
      //if there is no number displayed in current , you cannot use operations yet
      //this means you cannot put another operation after another because current is moved to prev after an operation
      if (this.previousOperand !== '') {
        //conceptially, you cannot put more than 1 operation on the board, if you put a second one,
        //whatever is above will be automatically executed/solved, thats why
        //if you press an operation when there is something in previous board, it will execute,
        //ITS IMPORTANT to understand that the current board will be transferred to previous whenever->
        //an operation is inputted, its part of the compute() method mechanism
        //there will be transfer regardless, the difference is that when there is not previous, no calculations
        //if there is already something, calculate that with the last number first, and put that above
        this.compute()
        //commence compute
      }
      this.operation = operation
      //takes from event listener to this.
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
      //move the current to previous
      //move current above when pressed with another operation
    }
  
    compute() {
      let computation
      //temp var because no this.
      const prev = parseFloat(this.previousOperand)
      // local prev, reads the previous board string and convert to float to enable computations
      const current = parseFloat(this.currentOperand)
      //loca current, reads the current board , typecase to float
      if (isNaN(prev) || isNaN(current)) return
      //if either prev or current board is empty, then don't do anything because the other component for computation is absent,
      //remember, the second number is automatically placed after an operation
      //empty string returns undefined, empty int or float returns NaN
      switch (this.operation) {
        //if they are not empty the proceed
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '÷':
          computation = prev / current
          break
        default:
          return
      }
      this.currentOperand = computation
      //what the result is will be put in the current board when you press equal
      //QUESTION: WHEN I PRESS ANOTHER OPERATION IT DOES COMPUTE BUT IS PUT ABOVE 
      //UPDATE: this line is when you press equals, the other automatic one is when you press another operation
      this.operation = undefined
      this.previousOperand = ''
    }
  
    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
  
    updateDisplay() {
      //this.currentOperandTextElement is the way for the strings to go out to be displayed
      this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) {
        this.previousOperandTextElement.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
        this.previousOperandTextElement.innerText = ''
      }
    }
  }
  
  
  const numberButtons = document.querySelectorAll('[data-number]')
  //all number buttons with data-number attr will be stored in a nodelist,(not an array), in numberButtons
  const operationButtons = document .querySelectorAll('[data-operation]')
  //all operation buttons are stored in this as well
  const equalsButton = document.querySelector('[data-equals]')  
  //equals button is only one, specialized key
  const deleteButton = document.querySelector('[data-delete]')  
  //delete is only one, specialized key
  const allClearButton = document.querySelector('[data-all-clear]')
  //one all clear
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  //this var shows what the previous operand is in the output
  const currentOperandTextElement = document.querySelector('[data-current-operand]')
  //this var shows what the current operand is in the output
  
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement) 
  //create an object from Calculator class that is created above, pass the parameters->
  //previousOperandTextElement -> for now it is empty, the upper portion of the output
  //currentOperandTextElement -> for now it is empty, the lower portion of the output
  
  
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })
  
  document.addEventListener('keydown', function (event) {
    let patternForNumbers = /[0-9]/g;
    let patternForOperators = /[+\-*\/]/g
    if (event.key.match(patternForNumbers)) {
      event.preventDefault();
      calculator.appendNumber(event.key)
      calculator.updateDisplay()
    }
    if (event.key === '.') {
      event.preventDefault();
      calculator.appendNumber(event.key)
      calculator.updateDisplay()
    }
    if (event.key.match(patternForOperators)) {
      event.preventDefault();
      calculator.chooseOperation(event.key)
      calculator.updateDisplay()
    }
    if (event.key === 'Enter' || event.key === '=') {
      event.preventDefault();
      calculator.compute()
      calculator.updateDisplay()
    }
    if (event.key === "Backspace") {
      event.preventDefault();
      calculator.delete()
      calculator.updateDisplay()
    }
    if (event.key == 'Delete') {
      event.preventDefault();
      calculator.clear()
      calculator.updateDisplay()
    }
  
  });
  