[, , command, task, edTask] = process.argv

const fs = require('fs');
// const { CLIENT_RENEG_WINDOW } = require('tls');
const stringifiedTasks = fs.readFileSync('./todo.json', 'utf8') || '[]' // if isNot exist, create empty array
const tasks = JSON.parse(stringifiedTasks) // this array to json string
    // const tasks = JSON.parse(fs.readFileSync('./todo.json', { encoding: 'UTF-8' }));

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


function addTask(task) {
    const lastTaskIndex = tasks.length - 1;
    const lastTask = tasks[lastTaskIndex];
    const id = lastTask ? tasks[lastTaskIndex].Id + 1 : 1;

    let newTask = {
        Task: task,
        Id: id
    };
    tasks.push(newTask);
    fs.writeFileSync('./todo.json', JSON.stringify(tasks));
    console.log("successful");

}

function listTasks() {
    console.log(tasks);
}

function removeTask(id) {
    // want to know the index number of the task 
    // is task exist or not
    const checkingId = (NumOfTask) => NumOfTask.Id == id
    const taskId = tasks.findIndex(checkingId);
    // console.log(taskId);
    if (taskId > -1) {
        tasks.splice(taskId, 1);
        fs.writeFileSync('./todo.json', JSON.stringify(tasks));
        console.log("successful");
    } else {
        console.log("task not found");
    }
}

function editTask(id, edTask) {
    // want to know the index number of the task 
    // is task exist or not
    const checkingId = (NumOfTask) => NumOfTask.Id == id
    const taskId = tasks.findIndex(checkingId);
    // console.log(taskId);
    if (taskId > -1) {
        tasks[taskId].Task = edTask;
        fs.writeFileSync('./todo.json', JSON.stringify(tasks));
        console.log("Modified successfully");
    } else {
        console.log("The modification did not succeed");
    }
}

todoApp(command);