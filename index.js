// varaibles
const taskList = document.getElementById("task-list");
const addTaskForm = document.querySelector("form");
const newTaskInput = document.getElementById("new-task");

// Create an empty Array to add new Tasks
let tasks = [];

// Function to render the task list
function renderTasks() {
    // Clear the task list
    taskList.innerHTML = "";
    // Loop through the tasks and create list items for each one
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const li = document.createElement("li");
        li.textContent = task.title;
        // Add a class to the list item if it's completed
        if (task.completed) {
        li.classList.add("completed");
        }
        // Add event listeners for marking tasks as completed
        li.addEventListener("click", function () {
        task.completed = !task.completed;
        li.classList.toggle("completed");
        saveTasks();
        });
        
        // Create a button for deleting tasks
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
        tasks.splice(i, 1);
        saveTasks();
        renderTasks();
        });
        // Add the list item and delete button to the task list
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }
}

// Function to save tasks to local storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage on page load
function loadTasks() {
    const tasksJSON = localStorage.getItem("tasks");
    if (tasksJSON !== null) {
        tasks = JSON.parse(tasksJSON);
    }
    renderTasks();
}

// Add event listener for adding tasks
addTaskForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const title = newTaskInput.value.trim();
    if (title.length === 0) {
        return;
    }
    tasks.push({ title: title, completed: false });
    saveTasks();
    newTaskInput.value = "";
    renderTasks();
});

loadTasks();
