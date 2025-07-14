// Todo Application class
export class TodoApp {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    this.filter = 'all';
    this.nextId = this.todos.length > 0 ? Math.max(...this.todos.map(t => t.id)) + 1 : 1;
  }

  addTodo(text) {
    if (text.trim() === '') return;
    
    const todo = {
      id: this.nextId++,
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    this.todos.push(todo);
    this.save();
    this.render();
  }

  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.save();
      this.render();
    }
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.save();
    this.render();
  }

  editTodo(id, newText) {
    const todo = this.todos.find(t => t.id === id);
    if (todo && newText.trim() !== '') {
      todo.text = newText.trim();
      this.save();
      this.render();
    }
  }

  setFilter(filter) {
    this.filter = filter;
    this.updateFilterButtons();
    this.render();
  }

  getFilteredTodos() {
    switch (this.filter) {
      case 'active': return this.todos.filter(t => !t.completed);
      case 'completed': return this.todos.filter(t => t.completed);
      default: return this.todos;
    }
  }

  clearCompleted() {
    this.todos = this.todos.filter(t => !t.completed);
    this.save();
    this.render();
  }

  save() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  updateFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-filter') === this.filter) {
        btn.classList.add('active');
      }
    });
  }

  render() {
    const todoList = document.getElementById('todo-list');
    const todoCount = document.getElementById('todo-count');
    
    if (!todoList || !todoCount) return;
    
    // Update count
    const activeCount = this.todos.filter(t => !t.completed).length;
    todoCount.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
    
    // Render todos
    const filteredTodos = this.getFilteredTodos();
    if (filteredTodos.length === 0) {
      todoList.innerHTML = '<div class="empty-state">No todos found. Add one above!</div>';
    } else {
      todoList.innerHTML = filteredTodos.map(todo => `
        <div class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
          <label class="todo-checkbox">
            <input type="checkbox" ${todo.completed ? 'checked' : ''}>
            <span class="checkmark"></span>
          </label>
          <span class="todo-text">${todo.text}</span>
          <button class="delete-btn" title="Delete todo">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `).join('');
    }
  }
}