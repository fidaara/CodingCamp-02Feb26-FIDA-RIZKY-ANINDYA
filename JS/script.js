const todoInput = document.getElementById("todoInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const filterBtn = document.getElementById("filterBtn");

let todos = [];
let showAll = true;

addBtn.addEventListener("click", addTodo);
deleteAllBtn.addEventListener("click", deleteAll);
filterBtn.addEventListener("click", toggleFilter);

function addTodo() {
    const task = todoInput.value.trim();
    const date = dateInput.value;

    if (task === "" || date === "") {
        alert("Please fill task and date!");
        return;
    }

    todos.push({
        id: Date.now(),
        task,
        date,
        completed: false
    });

    todoInput.value = "";
    dateInput.value = "";
    renderTodos();
}

function renderTodos() {
    todoList.innerHTML = "";

    let data = showAll ? todos : todos.filter(t => !t.completed);

    if (data.length === 0) {
        todoList.innerHTML = `
            <tr>
                <td colspan="4" class="empty">No task found</td>
            </tr>`;
        return;
    }

    data.forEach(todo => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${todo.task}</td>
            <td>${todo.date}</td>
            <td class="${todo.completed ? 'done' : 'pending'}">
                ${todo.completed ? 'Completed' : 'Pending'}
            </td>
            <td>
                <span class="action-icon done-icon" onclick="markDone(${todo.id})">✔</span>
                <span class="action-icon pending-icon" onclick="markPending(${todo.id})">✖</span>
            </td>
        `;

        todoList.appendChild(row);
    });
}

function markDone(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) todo.completed = true;
    renderTodos();
}

function markPending(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) todo.completed = false;
    renderTodos();
}

function deleteAll() {
    if (confirm("Delete all tasks?")) {
        todos = [];
        renderTodos();
    }
}

function toggleFilter() {
    showAll = !showAll;
    filterBtn.textContent = showAll ? "Show All" : "Show Pending";
    renderTodos();
}
