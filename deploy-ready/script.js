class TodoApp {
    constructor() {
        this.todos = this.loadTodos();
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.priorityFilter = 'all';
        this.dateFilter = 'all';
        this.currentTheme = this.loadTheme();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.applyTheme();
        this.render();
    }

    setupEventListeners() {
        // Form submission
        document.getElementById('todo-form').addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Form submitted');
            this.addTodo();
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.setFilter(btn.dataset.filter);
                this.updateFilterButtons(btn);
            });
        });

        // Clear completed button
        document.getElementById('clear-completed').addEventListener('click', () => {
            this.clearCompleted();
        });
        
        // Search functionality
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.render();
        });
        
        document.getElementById('priority-filter').addEventListener('change', (e) => {
            this.priorityFilter = e.target.value;
            this.render();
        });
        
        document.getElementById('date-filter').addEventListener('change', (e) => {
            this.dateFilter = e.target.value;
            this.render();
        });
        
        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // WhatsApp share
        document.getElementById('share-whatsapp').addEventListener('click', () => {
            this.shareOnWhatsApp();
        });
    }

    addTodo() {
        console.log('addTodo called');
        const input = document.getElementById('todo-input');
        const dateInput = document.getElementById('todo-date');
        const timeInput = document.getElementById('todo-time');
        const priorityInput = document.getElementById('todo-priority');
        const text = input.value.trim();
        const dueDate = dateInput.value;
        const dueTime = timeInput.value;
        const priority = priorityInput.value;
        
        console.log('Text:', text, 'Priority:', priority, 'Date:', dueDate, 'Time:', dueTime);
        
        if (!text) {
            console.log('No text entered');
            return;
        }

        const todo = {
            id: Date.now().toString(),
            text: text,
            completed: false,
            dueDate: dueDate || null,
            dueTime: dueTime || null,
            priority: priority,
            createdAt: new Date().toISOString()
        };

        console.log('Todo created:', todo);
        this.todos.unshift(todo);
        input.value = '';
        dateInput.value = '';
        timeInput.value = '';
        document.getElementById('time-container').style.display = 'none';
        priorityInput.value = 'medium';
        this.saveTodos();
        this.render();
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }

    startEdit(id) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return;

        const todoElement = document.querySelector(`[data-id="${id}"]`);
        const textSpan = todoElement.querySelector('.todo-text');
        
        const input = document.createElement('input');
        input.type = 'text';
        input.value = todo.text;
        input.className = 'todo-edit-input';
        
        input.addEventListener('blur', () => this.finishEdit(id, input.value));
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.finishEdit(id, input.value);
            if (e.key === 'Escape') this.render();
        });
        
        textSpan.replaceWith(input);
        input.focus();
        input.select();
    }

    finishEdit(id, newText) {
        const todo = this.todos.find(t => t.id === id);
        if (todo && newText.trim() && newText !== todo.text) {
            todo.text = newText.trim();
            this.saveTodos();
        }
        this.render();
    }

    editTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return;

        const newText = prompt('Edit todo:', todo.text);
        if (newText && newText.trim()) {
            todo.text = newText.trim();
            this.saveTodos();
            this.render();
        }
    }

    deleteTodo(id) {
        const todoElement = document.querySelector(`[data-id="${id}"]`);
        if (todoElement) {
            todoElement.classList.add('removing');
            setTimeout(() => {
                this.todos = this.todos.filter(t => t.id !== id);
                this.saveTodos();
                this.render();
            }, 300);
        }
    }

    clearCompleted() {
        const completedTodos = this.todos.filter(t => t.completed);
        if (completedTodos.length === 0) return;

        if (confirm(`Delete ${completedTodos.length} completed todos?`)) {
            this.todos = this.todos.filter(t => !t.completed);
            this.saveTodos();
            this.render();
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.render();
    }

    updateFilterButtons(activeBtn) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }

    getFilteredTodos() {
        let filtered = [...this.todos];
        
        // Apply status filter (All/Active/Completed)
        switch (this.currentFilter) {
            case 'active':
                filtered = filtered.filter(t => !t.completed);
                break;
            case 'completed':
                filtered = filtered.filter(t => t.completed);
                break;
        }
        
        // Apply search filter
        if (this.searchQuery) {
            filtered = filtered.filter(t => 
                t.text.toLowerCase().includes(this.searchQuery)
            );
        }
        
        // Apply priority filter
        if (this.priorityFilter !== 'all') {
            filtered = filtered.filter(t => t.priority === this.priorityFilter);
        }
        
        // Apply date filter
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        switch (this.dateFilter) {
            case 'today':
                filtered = filtered.filter(t => {
                    if (!t.dueDate) return false;
                    const todoDate = new Date(t.dueDate);
                    return todoDate.toDateString() === today.toDateString();
                });
                break;
            case 'upcoming':
                filtered = filtered.filter(t => {
                    if (!t.dueDate) return false;
                    const todoDate = new Date(t.dueDate);
                    return todoDate >= today;
                });
                break;
            case 'overdue':
                filtered = filtered.filter(t => {
                    if (!t.dueDate) return false;
                    const todoDate = new Date(t.dueDate);
                    return todoDate < today && !t.completed;
                });
                break;
            case 'nodate':
                filtered = filtered.filter(t => !t.dueDate);
                break;
        }
        
        return filtered;
    }

    getActiveTodoCount() {
        return this.todos.filter(t => !t.completed).length;
    }

    render() {
        const todoList = document.getElementById('todo-list');
        const todoEmpty = document.getElementById('todo-empty');
        const actionsSection = document.getElementById('actions-section');
        const todoCount = document.getElementById('todo-count');

        const filteredTodos = this.getFilteredTodos();
        const hasCompletedTodos = this.todos.some(t => t.completed);

        // Update todo count
        todoCount.textContent = this.getActiveTodoCount();

        // Show/hide empty state
        todoEmpty.style.display = filteredTodos.length === 0 ? 'block' : 'none';
        todoList.style.display = filteredTodos.length === 0 ? 'none' : 'block';

        // Show/hide clear completed button
        actionsSection.style.display = hasCompletedTodos ? 'block' : 'none';

        // Render todos
        todoList.innerHTML = filteredTodos.map(todo => {
            const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;
            const priorityColors = {
                low: '#5cb85c',
                medium: '#f0ad4e', 
                high: '#d9534f'
            };
            
            return `
                <li class="todo-item ${todo.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}" data-id="${todo.id}">
                    <input 
                        type="checkbox" 
                        class="todo-checkbox" 
                        ${todo.completed ? 'checked' : ''}
                        onchange="app.toggleTodo('${todo.id}')"
                    >
                    <span class="todo-text" ondblclick="app.editTodo('${todo.id}')">${this.escapeHtml(todo.text)}</span>
                    <span class="todo-priority" style="background: ${priorityColors[todo.priority]}">${todo.priority ? todo.priority.toUpperCase() : 'MEDIUM'}</span>
                    ${todo.dueDate ? `<span class="todo-date">📅 ${this.formatDate(todo.dueDate)} ${todo.dueTime ? `⏰ ${this.formatTime(todo.dueTime)}` : ''}</span>` : ''}
                    <div class="todo-actions">
                        <button class="edit-btn" onclick="app.editTodo('${todo.id}')">Edit</button>
                        <button class="delete-btn" onclick="app.deleteTodo('${todo.id}')">Delete</button>
                    </div>
                </li>
            `;
        }).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return 'Tomorrow';
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
    }

    handleDateChange() {
        const dateInput = document.getElementById('todo-date');
        const timeContainer = document.getElementById('time-container');
        
        if (dateInput.value) {
            timeContainer.style.display = 'block';
            // Set default time to current time
            const now = new Date();
            const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            document.getElementById('todo-time').value = timeString;
        } else {
            timeContainer.style.display = 'none';
            document.getElementById('todo-time').value = '';
        }
    }

    formatTime(timeString) {
        if (!timeString) return '';
        
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        
        return `<span style="font-family: 'Courier New', monospace; font-weight: bold;">⏰ ${displayHour}:${minutes} ${ampm}</span>`;
    }

    loadTodos() {
        const saved = localStorage.getItem('todos');
        return saved ? JSON.parse(saved) : [];
    }

    clearFilters() {
        this.searchQuery = '';
        this.priorityFilter = 'all';
        this.dateFilter = 'all';
        
        document.getElementById('search-input').value = '';
        document.getElementById('priority-filter').value = 'all';
        document.getElementById('date-filter').value = 'all';
        
        this.render();
    }

    loadTheme() {
        return localStorage.getItem('theme') || 'light';
    }

    saveTheme(theme) {
        localStorage.setItem('theme', theme);
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        const themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) {
            themeBtn.textContent = this.currentTheme === 'dark' ? '☀️' : '🌙';
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.saveTheme(this.currentTheme);
        this.applyTheme();
    }

    shareOnWhatsApp() {
        const message = encodeURIComponent(
            `🎯 Check out this professional Todo App!\n\n` +
            `📱 Features:\n` +
            `✅ Task management with priorities\n` +
            `📅 Due dates & reminders\n` +
            `🔍 Smart search & filters\n` +
            `🌙 Dark/Light themes\n` +
            `📱 Mobile-friendly design\n\n` +
            `🔗 Link: ${window.location.href}\n\n` +
            `Built with modern web technologies - no installation needed! 🚀`
        );
        
        const whatsappUrl = `https://wa.me/?text=${message}`;
        
        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank');
        
        // Also copy to clipboard as backup
        navigator.clipboard.writeText(window.location.href).then(() => {
            console.log('Link copied to clipboard as backup');
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new TodoApp();
});