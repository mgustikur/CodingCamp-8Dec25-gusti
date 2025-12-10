let todos = [];
let currentFilter = 'all';

const todoInput = document.getElementById('todoInput');
const dateInput = document.getElementById('dateInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const emptyMessage = document.getElementById('emptyMessage');
const filterBtns = document.querySelectorAll('.filter-btn');

function addTodo() {
    const task = todoInput.value.trim();
    const dueDate = dateInput.value;
    
    if (task === '') {
        alert('Please enter a task!');
        return;
    }
    
    const todo = {
        id: Date.now(),
        task: task,
        dueDate: dueDate || 'No due date',
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

function toggleComplete(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
    }
}

function filterTodos() {
    if (currentFilter === 'all') {
        return todos;
    } else if (currentFilter === 'pending') {
        return todos.filter(todo => !todo.completed);
    } else if (currentFilter === 'completed') {
        return todos.filter(todo => todo.completed);
    }
}

function renderTodos() {
    const filteredTodos = filterTodos();
    
    if (filteredTodos.length === 0) {
        emptyMessage.classList.remove('hidden');
        todoList.innerHTML = '';
        return;
    }
    
    emptyMessage.classList.add('hidden');
    
    todoList.innerHTML = filteredTodos.map(todo => `
        <li class="todo-item ${todo.completed ? 'completed' : ''}">
            <span class="task-text">${todo.task}</span>
            <span class="due-date">${todo.dueDate}</span>
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

renderTodos();