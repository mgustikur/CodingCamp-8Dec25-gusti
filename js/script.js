let todos = [];
let currentFilter = 'all';
let searchQuery = '';

const todoInput = document.getElementById('todoInput');
const dateInput = document.getElementById('dateInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const emptyMessage = document.getElementById('emptyMessage');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const deleteAllBtn = document.getElementById('deleteAllBtn');

const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');
const pendingTasksEl = document.getElementById('pendingTasks');

function updateStats() {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const pending = total - completed;
    
    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
    pendingTasksEl.textContent = pending;
}

function addTodo() {
    const task = todoInput.value.trim();
    const dueDate = dateInput.value;
    
    if (task === '') {
        alert('Please enter a task!');
        return;
    }
    
    if (dueDate === '') {
        alert('Please select a due date!');
        return;
    }
    
    const todo = {
        id: Date.now(),
        task: task,
        dueDate: dueDate,
        completed: false
    };
    
    todos.push(todo);
    todoInput.value = '';
    dateInput.value = '';
    
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

function deleteAllTodos() {
    if (todos.length === 0) {
        alert('No tasks to delete!');
        return;
    }
    
    if (confirm('Are you sure you want to delete all tasks?')) {
        todos = [];
        renderTodos();
    }
}

function toggleComplete(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
    }
}

function filterTodos() {
    let filtered = todos;
    
    // Filter by status
    if (currentFilter === 'pending') {
        filtered = filtered.filter(todo => !todo.completed);
    } else if (currentFilter === 'completed') {
        filtered = filtered.filter(todo => todo.completed);
    }
    
    // Filter by search query
    if (searchQuery) {
        filtered = filtered.filter(todo => 
            todo.task.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    
    return filtered;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function renderTodos() {
    const filteredTodos = filterTodos();
    
    updateStats();
    
    if (filteredTodos.length === 0) {
        emptyMessage.classList.remove('hidden');
        todoList.innerHTML = '';
        return;
    }
    
    emptyMessage.classList.add('hidden');
    
    todoList.innerHTML = filteredTodos.map(todo => `
        <li class="todo-item ${todo.completed ? 'completed' : ''}">
            <span class="task-text">${todo.task}</span>
            <span class="due-date">${formatDate(todo.dueDate)}</span>
            <span class="status-badge ${todo.completed ? 'status-completed' : 'status-pending'}">
                ${todo.completed ? 'Completed' : 'Pending'}
            </span>
            <div class="actions">
                <button class="action-btn complete-btn" onclick="toggleComplete(${todo.id})">
                    ${todo.completed ? '↩' : '✓'}
                </button>
                <button class="action-btn delete-btn" onclick="deleteTodo(${todo.id})">✕</button>
            </div>
        </li>
    `).join('');
}

addBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});

searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderTodos();
});

deleteAllBtn.addEventListener('click', deleteAllTodos);

renderTodos();