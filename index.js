let tasks = [];

const app = document.getElementById("app");

const form = document.createElement("form");
const input = document.createElement("input");
input.type = "text";
input.placeholder = "Add a new task...";
input.classList.add("task-input");

const button = document.createElement("button");
button.textContent = "Add";
button.classList.add("btn", "btn-primary");

form.appendChild(input);
form.appendChild(button);
app.appendChild(form);

// Load any existing tasks from local storage
if (localStorage.getItem("tasks")) {
    //tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach((task) => {
    renderTask(task);
    });
}

form.addEventListener("submit", addTask);

// Add Task
function addTask(e) {
    e.preventDefault();
    const inputValue = input.value;
    const newTask = {
        id: Date.now(),
        text: inputValue,
    };
    tasks.push(newTask);
    renderTask(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
    }

// Render Task
function renderTask(task) {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.dataset.id = task.id;
    const taskText = document.createElement("span");
    taskText.classList.add("task-text");
    taskText.innerText = task.text;
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "btn-danger");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", () => {
        taskDiv.remove();
        tasks = tasks.filter((t) => t.id !== task.id);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    });
    taskDiv.appendChild(taskText);
    taskDiv.appendChild(deleteBtn);
    app.appendChild(taskDiv);
    }
