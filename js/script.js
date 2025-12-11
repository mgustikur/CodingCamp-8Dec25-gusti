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
        todoInput.focus();
        return;
    }
    
    if (dueDate === '') {
        alert('Please select a due date!');
        dateInput.focus();
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
    
    // Announce to screen readers
    emptyMessage.textContent = `Task "${task}" added successfully`;
    setTimeout(() => {
        emptyMessage.textContent = 'No task found';
    }, 2000);
}

function deleteTodo(id) {
    const todo = todos.find(t => t.id === id);
    const taskName = todo ? todo.task : 'Task';
    
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
    
    // Announce to screen readers
    emptyMessage.textContent = `${taskName} deleted`;
    setTimeout(() => {
        emptyMessage.textContent = 'No task found';
    }, 2000);
}

function deleteAllTodos() {
    if (todos.length === 0) {
        alert('No tasks to delete!');
        return;
    }
    
    if (confirm('Are you sure you want to delete all tasks?')) {
        todos = [];
        renderTodos();
        
        // Announce to screen readers
        emptyMessage.textContent = 'All tasks deleted';
    }
}

function toggleComplete(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
        
        // Announce to screen readers
        const status = todo.completed ? 'completed' : 'pending';
        emptyMessage.textContent = `Task marked as ${status}`;
        setTimeout(() => {
            emptyMessage.textContent = 'No task found';
        }, 2000);
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
        <li class="todo-item ${todo.completed ? 'completed' : ''}" role="listitem">
            <span class="task-text">${todo.task}</span>
            <time class="due-date" datetime="${todo.dueDate}">${formatDate(todo.dueDate)}</time>
            <span class="status-badge ${todo.completed ? 'status-completed' : 'status-pending'}" role="status">
                ${todo.completed ? 'Completed' : 'Pending'}
            </span>
            <div class="actions">
                <button 
                    class="action-btn complete-btn" 
                    onclick="toggleComplete(${todo.id})"
                    aria-label="${todo.completed ? 'Mark as pending' : 'Mark as completed'}"
                    type="button"
                >
                    ${todo.completed ? '↩' : '✓'}
                </button>
                <button 
                    class="action-btn delete-btn" 
                    onclick="deleteTodo(${todo.id})"
                    aria-label="Delete task"
                    type="button"
                >✕</button>
            </div>
        </li>
    `).join('');
}

// Event Listeners
addBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});

searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderTodos();
});

deleteAllBtn.addEventListener('click', deleteAllTodos);

// Initial render
renderTodos();