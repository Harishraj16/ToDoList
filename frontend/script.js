document.addEventListener('DOMContentLoaded', function() {
    fetchTasks();

    document.getElementById('add-task').addEventListener('click', addTask);
});

async function fetchTasks() {
    const response = await fetch('http://localhost:3000/tasks');
    const tasks = await response.json();
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const newTask = document.createElement('li');
        newTask.textContent = task.text;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', async function() {
            await fetch(`http://localhost:3000/tasks/${task.id}`, { method: 'DELETE' });
            taskList.removeChild(newTask);
        });

        newTask.appendChild(deleteButton);
        taskList.appendChild(newTask);
    });
}

async function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const response = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: taskText })
        });
        const newTask = await response.json();

        const taskList = document.getElementById('task-list');
        const taskElement = document.createElement('li');
        taskElement.textContent = newTask.text;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', async function() {
            await fetch(`http://localhost:3000/tasks/${newTask.id}`, { method: 'DELETE' });
            taskList.removeChild(taskElement);
        });

        taskElement.appendChild(deleteButton);
        taskList.appendChild(taskElement);

        taskInput.value = "";
    }
}
