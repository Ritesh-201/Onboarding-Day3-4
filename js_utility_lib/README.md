# JS Utility Library

A comprehensive JavaScript utility library with reusable components and common functions. Built with Vite for modern development workflow.

## 🚀 Features

### Core Utilities
- **Debounce**: Delay function execution until after a specified time has passed
- **Throttle**: Limit function execution to once per specified time interval
- **Deep Merge**: Recursively merge objects while preserving nested structures
- **Type Checks**: Reliable type checking utilities for JavaScript values
- **Array Methods**: Enhanced array manipulation utilities
- **Promise Utilities**: Helper functions for handling promises

### Interactive Components
- **Calculator**: Full-featured calculator with basic arithmetic operations
- **Todo App**: Complete todo application with local storage persistence
- **Tic-Tac-Toe**: Classic game with score tracking
- **API Fetch Demo**: Real-world API integration examples
- **Color Picker**: Interactive color selection tool
- **Password Generator**: Secure password generation with customizable options
- **JSON Formatter**: Format and validate JSON data

## 🛠️ Installation & Setup

1. **Clone or download the project**
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

## 🔧 Configuration

The library uses environment variables for configuration. Create a `.env` file in the root directory:

```env
API_NINJAS_KEY=your_api_key_here

```

## 📚 API Documentation

### Core Utilities

#### Debounce
```javascript
import { debounce } from './src/codeSnippets/index.js';

const debouncedFn = debounce((value) => {
  console.log('Debounced:', value);
}, 500);

debouncedFn('hello'); // Will execute after 500ms of no new calls
```

#### Throttle
```javascript
import { throttle } from './src/codeSnippets/index.js';

const throttledFn = throttle((event) => {
  console.log('Scroll position:', event.target.scrollTop);
}, 100);

window.addEventListener('scroll', throttledFn);
```

#### Type Checks
```javascript
import { typeChecks } from './src/codeSnippets/index.js';

typeChecks.isArray([1, 2, 3]);     // true
typeChecks.isObject({a: 1});       // true
typeChecks.isString("hello");      // true
typeChecks.isEmpty("");            // true
```

#### Array Utils
```javascript
import { arrayUtils } from './src/codeSnippets/index.js';

arrayUtils.chunk([1, 2, 3, 4, 5, 6], 2);        // [[1, 2], [3, 4], [5, 6]]
arrayUtils.unique([1, 2, 2, 3, 3, 4]);          // [1, 2, 3, 4]
arrayUtils.flatten([[1, 2], [3, [4, 5]]]);      // [1, 2, 3, 4, 5]
arrayUtils.shuffle([1, 2, 3, 4, 5]);            // [3, 1, 5, 2, 4] (random)
```

### Components

#### Calculator
```javascript
import { Calculator } from './src/codeSnippets/calculator.js';

const calc = new Calculator();
calc.inputNumber('5');
calc.inputOperation('+');
calc.inputNumber('3');
calc.inputOperation('=');
console.log(calc.getDisplay()); // "8"
```

#### Todo App
```javascript
import { TodoApp } from './src/codeSnippets/todo.js';

const todoApp = new TodoApp();
todoApp.addTodo('Learn JavaScript');
todoApp.addTodo('Build a project');
todoApp.toggleTodo(1); // Mark first todo as completed
console.log(todoApp.getStats()); // { total: 2, completed: 1, active: 1 }
```

#### API Fetcher
```javascript
import { ApiFetcher } from './src/codeSnippets/apiFetch.js';

const api = new ApiFetcher();

// Fetch a random quote
const quote = await api.fetchQuote();
console.log(quote.data.text);

// Fetch a joke
const joke = await api.fetchJoke();
console.log(joke.data.text);
```

## 🎮 Interactive Features

### Calculator
- Full arithmetic operations (+, -, ×, ÷)
- Clear function
- Decimal point support
- Keyboard support

### Todo Application
- Add, edit, delete todos
- Mark todos as complete
- Filter by status (all, active, completed)
- Local storage persistence
- Item counter

### Tic-Tac-Toe Game
- Two-player gameplay
- Win detection
- Score tracking
- Game reset functionality
- Local storage for scores

### API Integration
- Real-time data fetching
- Error handling
- Loading states
- Multiple API endpoints

## 🔌 External APIs

The library integrates with **API Ninjas** for real-world data fetching:

### Quotes API
- **Endpoint**: `https://api.api-ninjas.com/v1/quotes`
- **API Key**: `` (configured)
- **Features**: 
  - Free tier: Access to 100+ quotes
  - Premium tier: 200,000+ quotes with category filtering
  - Returns random quotes with author and category information

### API Response Format
```json
[
  {
    "quote": "The will of man is his happiness.",
    "author": "Friedrich Schiller", 
    "category": "happiness"
  }
]
```

### Testing the API
You can test the API connection directly in the browser console:

```javascript
// Test API connectivity
await window.testApiNinjas();

// Or use the utility library
await window.jsUtils.apiFetcher.fetchQuote();
```


---

Built with ❤️ and modern JavaScript
