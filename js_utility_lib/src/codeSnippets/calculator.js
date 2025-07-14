export class Calculator {
  constructor(updateCallback = null) {
    this.display = '0';
    this.previousValue = null;
    this.operation = null;
    this.waitingForInput = false;
    this.isError = false;
    this.updateCallback = updateCallback;
    
    this.boundKeyHandler = this.handleKeyPress.bind(this);
    this.initKeyboardSupport();
  }

  notifyUpdate() {
    if (this.updateCallback && typeof this.updateCallback === 'function') {
      try {
        this.updateCallback(this.display, this.expression);
      } catch (error) {
        console.error('Error in updateCallback:', error);
      }
    }
  }

  initKeyboardSupport() {
    document.addEventListener('keydown', this.boundKeyHandler);
  }

  handleKeyPress(event) {
    // Only handle calculator keys when no input field is focused or calculator container is focused
    const activeElement = document.activeElement;
    const isInputFocused = activeElement && (
      activeElement.tagName === 'INPUT' || 
      activeElement.tagName === 'TEXTAREA'
    );
    
    const calculatorContainer = document.getElementById('calculator');
    const isCalculatorFocused = calculatorContainer && (
      calculatorContainer.contains(activeElement) || 
      activeElement === calculatorContainer
    );
    
    // Don't intercept if an input field is focused unless it's within the calculator
    if (isInputFocused && !isCalculatorFocused) {
      return;
    }

    const calculatorKeys = [
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.',
      '=', 'Enter', '+', '-', '*', '/', 'Escape', 'Backspace', '%', 'c', 'C'
    ];

    if (calculatorKeys.includes(event.key)) {
      event.preventDefault();
    }

    switch (event.key) {
      case '0': case '1': case '2': case '3': case '4':
      case '5': case '6': case '7': case '8': case '9':
      case '.':
        this.inputNumber(event.key);
        break;
      case '+': case '-':
        this.inputOperation(event.key);
        break;
      case '*':
        this.inputOperation('×');
        break;
      case '/':
        this.inputOperation('÷');
        break;
      case '=': case 'Enter':
        this.inputOperation('=');
        break;
      case 'Escape': case 'c': case 'C':
        this.clear();
        break;
      case 'Backspace':
        this.backspace();
        break;
      case '%':
        this.percentage();
        break;
    }

    // Ensure UI updates after every key press
    this.notifyUpdate();
  }

  inputNumber(number) {
    if (this.isError) this.clear();
    
    if (this.waitingForInput) {
      this.display = number === '.' ? '0.' : number;
      this.waitingForInput = false;
    } else {
      if (number === '.' && this.display.includes('.')) return;
      if (this.display.length >= 15 && number !== '.') return;
      
      this.display = this.display === '0' && number !== '.' 
        ? number 
        : this.display + number;
    }
    this.notifyUpdate();
  }

  inputOperation(operation) {
    if (this.isError) return;

    if (this.waitingForInput && operation !== '=') {
      this.operation = operation;
      this.notifyUpdate();
      return;
    }

    const currentValue = parseFloat(this.display) || 0;

    if (this.previousValue !== null && this.operation && !this.waitingForInput) {
      const result = this.calculate(this.previousValue, currentValue, this.operation);
      if (this.isError) {
        this.notifyUpdate();
        return;
      }
      
      this.display = this.formatResult(result);
      this.previousValue = result;
    } else {
      this.previousValue = currentValue;
    }

    this.waitingForInput = true;
    this.operation = operation;

    if (operation === '=') {
      this.operation = null;
      this.previousValue = null;
      this.waitingForInput = false;
    }
    this.notifyUpdate();
  }

  clear() {
    this.display = '0';
    this.previousValue = null;
    this.operation = null;
    this.waitingForInput = false;
    this.isError = false;
    this.notifyUpdate();
  }

  backspace() {
    if (this.isError) {
      this.clear();
      return;
    }
    
    if (this.waitingForInput) return;
    
    this.display = this.display.length > 1 
      ? this.display.slice(0, -1)
      : '0';
    this.notifyUpdate();
  }

  percentage() {
    if (this.isError) return;
    
    const value = parseFloat(this.display) || 0;
    this.display = this.formatResult(value / 100);
    this.waitingForInput = true;
    this.notifyUpdate();
  }

  toggleSign() {
    if (this.isError) return;
    
    if (this.display !== '0') {
      this.display = this.display.startsWith('-')
        ? this.display.slice(1)
        : '-' + this.display;
    }
    this.notifyUpdate();
  }

  showError(message) {
    this.display = 'Error';
    this.isError = true;
    this.previousValue = null;
    this.operation = null;
    this.waitingForInput = false;
    this.notifyUpdate();
  }

  calculate(firstValue, secondValue, operation) {
    try {
      let result;
      switch (operation) {
        case '+':
          result = firstValue + secondValue;
          break;
        case '-':
          result = firstValue - secondValue;
          break;
        case '×':
          result = firstValue * secondValue;
          break;
        case '÷':
          if (secondValue === 0) {
            this.showError('Cannot divide by zero');
            return 0;
          }
          result = firstValue / secondValue;
          break;
        case '%':
          result = firstValue % secondValue;
          break;
        default:
          return secondValue;
      }
      
      if (!isFinite(result)) {
        this.showError('Invalid result');
        return 0;
      }
      
      return result;
    } catch (error) {
      this.showError('Calculation error');
      return 0;
    }
  }

  formatResult(value) {
    const result = Number(value.toFixed(8));
    
    if (Math.abs(result) > 1e15 || Math.abs(result) < 1e-10) {
      return result.toExponential(8);
    }
    
    return String(result);
  }

  destroy() {
    document.removeEventListener('keydown', this.boundKeyHandler);
  }

  get expression() {
    if (this.operation && this.previousValue !== null) {
      return `${this.formatResult(this.previousValue)} ${this.operation}`;
    }
    return '';
  }
}

// Example of correct UI integration
const calculator = new Calculator((display, expression) => {
  // Update your UI elements immediately
  const displayElement = document.getElementById('calculator-display');
  const expressionElement = document.getElementById('calculator-expression');
  
  if (displayElement) {
    displayElement.textContent = display;
  }
  
  if (expressionElement) {
    expressionElement.textContent = expression;
  }
});

// Make sure to call destroy when done
// calculator.destroy();