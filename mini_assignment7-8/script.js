
function displayOutput(message) {
  document.getElementById("result").innerHTML += `<p>${message}</p>`;
}
function myMap(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array));
  }
  return result;
}

function myFilter(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
}

function myReduce(array, callback, initialValue) {
  let accumulator = initialValue !== undefined ? initialValue : array[0];
  const startIndex = initialValue !== undefined ? 0 : 1;
  for (let i = startIndex; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i, array);
  }
  return accumulator;
}
class LocalStorageManager {
  constructor() {
    this.storage = window.localStorage;
  }

  setItem(key, value) {
    try {
      if (typeof value === "function" || value instanceof RegExp) {
        throw new TypeError(`Value for key "${key}" is not JSON-serializable`);
      }
      const serialized = JSON.stringify(value);
      this.storage.setItem(key, serialized);
    } catch (err) {
      if (err.name === "QuotaExceededError") {
        throw new Error("LocalStorage quota exceeded");
      }
      throw err;
    }
  }

  getItem(key) {
    try {
      const serialized = this.storage.getItem(key);
      if (serialized === null) return null;
      return JSON.parse(serialized);
    } catch (err) {
      throw new Error(`Failed to parse value for key "${key}": ${err.message}`);
    }
  }

  removeItem(key) {
    try {
      this.storage.removeItem(key);
    } catch (err) {
      throw new Error(`Failed to remove key "${key}": ${err.message}`);
    }
  }
}

// Todo App Implementation
const storage = new LocalStorageManager();
const todoList = document.getElementById("todo-list");

let todos = storage.getItem("todos") || [];

function renderTodos(todosToRender = todos) {
  todoList.innerHTML = myMap(todosToRender, (todo, index) => `
    <li>
      ${todo.text} (Priority: ${todo.priority}, Completed: ${todo.completed ? "Yes" : "No"})
      <button onclick="toggleComplete(${index})">Toggle Complete</button>
    </li>
  `).join("");
}

// Add todo
document.getElementById("add-todo").addEventListener("click", () => {
  const text = document.getElementById("todo-text").value;
  const priority = document.getElementById("todo-priority").value;
  if (!text) return displayOutput("Please enter a todo");
  todos.push({ text, priority, completed: false });
  try {
    storage.setItem("todos", todos);
    renderTodos();
    document.getElementById("todo-text").value = "";
    displayOutput(`Added todo: ${text}`);
  } catch (err) {
    displayOutput(`Error saving todo: ${err.message}`);
  }
});

// Show high-priority todos using myFilter
document.getElementById("show-high-priority").addEventListener("click", () => {
  const highPriority = myFilter(todos, todo => todo.priority === "high");
  renderTodos(highPriority);
  displayOutput(`Showing ${highPriority.length} high-priority todos`);
});

document.getElementById("count-completed").addEventListener("click", () => {
  const completedCount = myReduce(
    todos,
    (count, todo) => count + (todo.completed ? 1 : 0),
    0
  );
  displayOutput(`Completed todos: ${completedCount}`);
});

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  try {
    storage.setItem("todos", todos);
    renderTodos();
    displayOutput(`Toggled completion for todo: ${todos[index].text}`);
  } catch (err) {
    displayOutput(`Error updating todo: ${err.message}`);
  }
}

renderTodos();