[, , command, task, edTask] = process.argv

const fs = require('fs');
const stringifiedTasks = fs.readFileSync('./todo.json', 'utf8') || '[]' // if isNot exist, create empty array
const tasks = JSON.parse(stringifiedTasks) // this array to json string

function todoApp(command) {
    switch (command) {
        case 'add':
            addTask(task);
            break;
        case 'list':
            listTasks();
            break;
        case 'remove':
            removeTask(task);
            break;
        case 'edit':
            editTask(task, edTask);
            break;
        default:
            console.log("# " + command + " #" + " is NOT supported - you can use (add - list - remove - edit) to modify any data");
    }
}

function listTasks() {
    console.log(tasks);
}

function addTask(task) {
    if (!task) return;
    const lastTaskIndex = tasks.length - 1;
    const lastTask = tasks[lastTaskIndex];
    const id = lastTask ? tasks[lastTaskIndex].Id + 1 : 1;
    const statusOfTask = "to-do";
    let newTask = {
        Task: task,
        Id: id,
        Status: statusOfTask
    };
    tasks.push(newTask);
    fs.writeFileSync('./todo.json', JSON.stringify(tasks));
    console.log("successful");

}

function removeTask(id) {
    const newTasks = tasks.filter((task) => task.Id !== Number(id));
    fs.writeFileSync('./todo.json', JSON.stringify(newTasks));
    console.log("successful");
}

function editTask(id, edTask) {
    // want to know the index number of the task 
    // is task exist or not
    const checkingId = (NumOfTask) => NumOfTask.Id == id
    const taskId = tasks.findIndex(checkingId);
    // console.log(taskId);
    if (taskId < -1) {
        console.log("The modification did not succeed");
        return;
    }
    tasks[taskId].Task = edTask;
    fs.writeFileSync('./todo.json', JSON.stringify(tasks));
    console.log("Modified successfully");
    return;
}

todoApp(command);