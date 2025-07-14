import { config } from './config/index.js';
import {
  debounce,
  throttle,
  deepMerge,
  typeChecks,
  arrayUtils,
  promiseUtils,
  Calculator,
  TodoApp,
  TicTacToeGame,
  ApiFetcher,
  PasswordGenerator
} from './codeSnippets/index.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 JS Utility Library initialized');

  const calculator = new Calculator();
  const todoApp = new TodoApp();
  const ticTacToe = new TicTacToeGame();
  const apiFetcher = new ApiFetcher();
  const passwordGen = new PasswordGenerator();

  ticTacToe.init();

  class NavigationManager {
    constructor() {
      this.navLinks = document.querySelectorAll('.nav-link');
      this.sections = document.querySelectorAll('.feature-section, .landing-page');
      this.sidebar = document.getElementById('sidebar');
      this.sidebarOverlay = document.getElementById('sidebar-overlay');
      this.hamburgerMenu = document.getElementById('hamburger-menu');
    }

    init() {
      this.setupNavigation();
      this.setupMobileMenu();
      this.initializeDemos();
      // Show home section by default
      this.showSection('home');
      this.setActiveNavLink('home');
    }

    setupNavigation() {
      this.sections.forEach(section => {
        section.style.display = 'none';
      });

      this.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetSection = link.getAttribute('data-section');
          this.showSection(targetSection);
          this.setActiveNavLink(targetSection);
          this.closeMobileSidebar();
        });
      });
    }

    showSection(sectionId) {
      this.sections.forEach(section => {
        section.style.display = 'none';
      });
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.style.display = 'block';
      }
    }

    setActiveNavLink(sectionId) {
      this.navLinks.forEach(nav => {
        nav.classList.toggle('active', nav.getAttribute('data-section') === sectionId);
      });
    }

    setupMobileMenu() {
      if (!this.hamburgerMenu || !this.sidebar || !this.sidebarOverlay) return;

      this.hamburgerMenu.addEventListener('click', () => {
        this.sidebar.classList.toggle('open');
        this.sidebarOverlay.classList.toggle('active');
      });

      this.sidebarOverlay.addEventListener('click', () => {
        this.closeMobileSidebar();
      });
    }

    closeMobileSidebar() {
      if (this.sidebar && this.sidebarOverlay) {
        this.sidebar.classList.remove('open');
        this.sidebarOverlay.classList.remove('active');
      }
    }

    initializeDemos() {
      this.setupDebounceDemo();
      this.setupThrottleDemo();
      this.setupCalculatorDemo();
      this.setupTodoAppDemo();
      this.setupTicTacToeDemo();
      this.setupApiFetchDemo();
      this.setupPasswordGeneratorDemo();
      this.setupPromisesDemo();
      this.setupTypeChecksDemo();
      this.setupArrayMethodsDemo();
      this.setupDeepMergeDemo();
    }

    setupDebounceDemo() {
      const debounceInput = document.getElementById('debounce-input');
      const debounceResult = document.getElementById('debounce-result');
      if (!debounceInput || !debounceResult) return;

      const handleSearch = (query) => {
        debounceResult.textContent = `Searching for: "${query}" at ${new Date().toLocaleTimeString()}`;
      };
      const debouncedSearch = debounce(handleSearch, 500);
      debounceInput.addEventListener('input', (e) => debouncedSearch(e.target.value));
    }

    setupThrottleDemo() {
      const scrollArea = document.getElementById('scroll-area');
      const throttleResult = document.getElementById('throttle-result');
      if (!scrollArea || !throttleResult) return;

      const handleScroll = (e) => {
        throttleResult.textContent = `Scroll position: ${e.target.scrollTop}px at ${new Date().toLocaleTimeString()}`;
      };
      const throttledScroll = throttle(handleScroll, 100);
      scrollArea.addEventListener('scroll', throttledScroll);
    }

    setupCalculatorDemo() {
      const calculatorContainer = document.getElementById('calculator');
      if (!calculatorContainer) return;

      // Make calculator container focusable for keyboard input
      calculatorContainer.setAttribute('tabindex', '0');

      const updateCalcDisplay = () => {
        document.getElementById('calc-display').textContent = calculator.display;
      };

      // Set the update callback for keyboard input
      calculator.updateCallback = updateCalcDisplay;

      calculatorContainer.addEventListener('click', (e) => {
        if (e.target.matches('.calc-btn')) {
          const button = e.target;
          const number = button.textContent;
          const operators = ['+', '-', '×', '÷'];

          if (!isNaN(parseFloat(number)) || number === '.') {
            calculator.inputNumber(number);
          } else if (operators.includes(number)) {
            calculator.inputOperation(number);
          } else if (number === '=') {
            calculator.inputOperation(number);
          } else if (button.classList.contains('clear')) {
            calculator.clear();
          }
          updateCalcDisplay();
        }
      });
    }

    setupTodoAppDemo() {
      const todoContainer = document.getElementById('todo');
      const todoInput = document.getElementById('todo-input');
      if (!todoContainer || !todoInput) return;

      document.getElementById('add-todo-btn').addEventListener('click', () => {
        if (todoInput.value.trim()) {
          todoApp.addTodo(todoInput.value.trim());
          todoInput.value = '';
        }
      });

      todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && todoInput.value.trim()) {
          todoApp.addTodo(todoInput.value.trim());
          todoInput.value = '';
        }
      });

      document.getElementById('clear-completed').addEventListener('click', () => {
        todoApp.clearCompleted();
      });

      document.querySelector('.todo-filters').addEventListener('click', (e) => {
        if (e.target.matches('.filter-btn')) {
          const filter = e.target.dataset.filter;
          todoApp.setFilter(filter);
          document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
          e.target.classList.add('active');
        }
      });

      document.getElementById('todo-list').addEventListener('click', (e) => {
        const target = e.target;
        const item = target.closest('.todo-item');
        if (!item) return;
        const id = parseInt(item.dataset.id);

        if (target.matches('input[type="checkbox"]')) {
          todoApp.toggleTodo(id);
        } else if (target.matches('button')) {
          todoApp.deleteTodo(id);
        }
      });
    }

    setupTicTacToeDemo() {
        const gameBoard = document.getElementById('game-board');
        const resetGameBtn = document.querySelector('#tic-tac-toe .game-controls button:first-child');
        const resetScoreBtn = document.querySelector('#tic-tac-toe .game-controls button:last-child');

        if (!gameBoard || !resetGameBtn || !resetScoreBtn) return;

        gameBoard.addEventListener('click', (e) => {
            if (e.target.matches('.cell')) {
                const cellIndex = parseInt(e.target.dataset.cell);
                ticTacToe.makeMove(cellIndex);
            }
        });

        resetGameBtn.addEventListener('click', () => ticTacToe.resetGame());
        resetScoreBtn.addEventListener('click', () => ticTacToe.resetScore());
    }


    setupApiFetchDemo() {
      const apiContainer = document.getElementById('api-fetch');
      if (!apiContainer) return;
      apiContainer.querySelector('.api-controls').addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
          const buttonText = e.target.textContent;
          if (buttonText.includes('Quote')) {
            apiFetcher.fetchQuote();
          } else if (buttonText.includes('Joke')) {
            apiFetcher.fetchJoke();
          } else if (buttonText.includes('Fact')) {
            apiFetcher.fetchFact();
          }
        }
      });
    }

    setupPasswordGeneratorDemo() {
        const pgContainer = document.getElementById('password-generator');
        if (!pgContainer) return;

        const lengthSlider = document.getElementById('length-slider');
        const lengthDisplay = document.getElementById('length-display');
        const generateBtn = pgContainer.querySelector('button');
        const output = document.getElementById('password-output');

        const updatePassword = () => {
            const options = {
                length: parseInt(lengthSlider.value),
                includeUppercase: document.getElementById('uppercase').checked,
                includeLowercase: document.getElementById('lowercase').checked,
                includeNumbers: document.getElementById('numbers').checked,
                includeSymbols: document.getElementById('symbols').checked,
            };
            try {
                const password = passwordGen.generatePassword(options);
                output.textContent = password;
                // Update strength display
                passwordGen.updateDisplay(password);
            } catch (error) {
                output.textContent = error.message;
            }
        };

        // Update length display when slider changes (but don't generate password)
        lengthSlider.addEventListener('input', () => {
            lengthDisplay.textContent = lengthSlider.value;
        });

        // Only generate password when button is clicked
        generateBtn.addEventListener('click', updatePassword);
    }

    setupPromisesDemo() {
        const container = document.getElementById('promises');
        if (!container) return;
        const fetchBtn = document.getElementById('fetch-quotes-btn');
        const quoteCountSelect = document.getElementById('quote-count');
        const resultContainer = document.getElementById('quotes-result');

        if (!fetchBtn || !quoteCountSelect || !resultContainer) return;

        fetchBtn.addEventListener('click', async () => {
            const count = parseInt(quoteCountSelect.value);
            resultContainer.innerHTML = '<p>Fetching quotes concurrently with Promise.all...</p>';
            
            try {
                console.log(`🚀 Starting to fetch ${count} quotes...`);
                const startTime = Date.now();
                const quotes = await promiseUtils.fetchMultipleQuotes(count);
                const endTime = Date.now();
                const duration = endTime - startTime;

                console.log('✅ Quotes received:', quotes);
                resultContainer.innerHTML = `
                    <div class="fetch-info">
                        <p><strong>✅ Successfully fetched ${quotes.length} quotes in ${duration}ms using Promise.all</strong></p>
                    </div>
                    ${quotes.map(quote => `
                        <div class="quote-item">
                            <p><i class="fas fa-quote-left"></i> "${quote.quote}"</p>
                            <p><strong>— ${quote.author}</strong></p>
                        </div>
                    `).join('')}
                `;
            } catch (error) {
                console.error('❌ Error in setupPromisesDemo:', error);
                resultContainer.innerHTML = `
                    <div style="color: red; padding: 10px; border: 1px solid red; border-radius: 4px;">
                        <p><strong>❌ Error fetching quotes:</strong></p>
                        <p>${error.message}</p>
                        <p><small>Check the browser console for more details.</small></p>
                    </div>
                `;
            }
        });
    }

    setupTypeChecksDemo() {
        const container = document.getElementById('type-checks');
        if (!container) return;
        const checkBtn = container.querySelector('button');
        const input = document.getElementById('type-input');
        const resultBox = document.getElementById('type-result');

        checkBtn.addEventListener('click', () => {
            let value;
            try {
                // A simple eval to parse arrays/objects from string. Use with caution.
                value = eval(`(${input.value})`);
            } catch (e) {
                value = input.value;
            }

            let results = '';
            
            // Show the detected type first
            const detectedType = typeChecks.getType(value);
            const isEmpty = typeChecks.isEmpty(value);
            const typeDisplay = isEmpty ? `${detectedType} (empty)` : detectedType;
            results += `<div style="background: #e8f5e8; padding: 8px; margin-bottom: 10px; border-radius: 4px; border-left: 4px solid #4caf50;"><b>Detected Type:</b> <span style="color: #2e7d32; font-weight: bold;">${typeDisplay}</span></div>`;
            
            for (const key in typeChecks) {
                if (typeChecks.hasOwnProperty(key) && key !== 'getType') {
                    const isType = typeChecks[key](value);
                    results += `<div><b>${key}:</b> ${isType}</div>`;
                }
            }
            resultBox.innerHTML = results;
        });
    }

    setupArrayMethodsDemo() {
        const container = document.getElementById('array-methods');
        if (!container) return;
        const executeBtn = container.querySelector('button');
        const methodSelect = document.getElementById('array-method');
        const arrayInput = document.getElementById('array-input');
        const resultBox = document.getElementById('array-result');

        executeBtn.addEventListener('click', () => {
            const method = methodSelect.value;
            let array;
            try {
                array = JSON.parse(arrayInput.value || '[1, 2, 3, 4, 5, 6]');
            } catch (e) {
                resultBox.textContent = 'Invalid array format. Please use JSON format (e.g., [1, 2, 3]).';
                return;
            }

            if (!Array.isArray(array)) {
                 resultBox.textContent = 'Input is not an array.';
                 return;
            }
            
            let result;
            // Note: arrayUtils in the original code had hardcoded logic.
            // I'm assuming it should be more generic.
            // For now, I'll replicate the simple logic from the code snippet.
            switch(method) {
                case 'map': result = array.map(x => x * 2); break;
                case 'filter': result = array.filter(x => x % 2 === 0); break;
                case 'reduce': result = array.reduce((sum, x) => sum + x, 0); break;
                case 'flatten': result = array.flat(Infinity); break; // A better flatten
                case 'unique': result = [...new Set(array)]; break;
                default: result = 'Unknown method';
            }
            resultBox.textContent = JSON.stringify(result, null, 2);
        });
    }

    setupDeepMergeDemo() {
        const container = document.getElementById('deep-merge');
        if (!container) return;
        const mergeBtn = container.querySelector('button');
        const input1 = document.getElementById('merge-input1');
        const input2 = document.getElementById('merge-input2');
        const resultBox = document.getElementById('merge-result');

        mergeBtn.addEventListener('click', () => {
            try {
                const obj1 = JSON.parse(input1.value);
                const obj2 = JSON.parse(input2.value);
                const merged = deepMerge(obj1, obj2);
                resultBox.textContent = JSON.stringify(merged, null, 2);
            } catch (e) {
                resultBox.textContent = 'Invalid JSON format. ' + e.message;
            }
        });
    }
  }

  try {
    const navManager = new NavigationManager();
    navManager.init();
    console.log('✅ All components initialized');
  } catch (error) {
    console.error('❌ Error during initialization:', error);
  }
});