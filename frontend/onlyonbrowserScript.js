document.getElementById('add-task-btn').addEventListener('click',function(){
    var taskInput = document.getElementById('new-task');
    var taskText = taskInput.value.trim();

    if(taskText!=""){
        var taskList = document.getElementById('task-list');
        var newTask = document.createElement('li');
        newTask.textContent = taskText;

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click',function(){
            taskList.removeChild(newTask);
        });
        
        newTask.appendChild(deleteButton);
        taskList.appendChild(newTask);
     

        taskInput.value = "";
    }
});