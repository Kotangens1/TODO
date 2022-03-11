const todoList = document.querySelector(".todo__list")
const todoInput = document.querySelector(".todo__input");
const btnAdd = document.querySelector(".btnAdd");
let tasks = [];

function createTask(tasks) {
    const task = {
    text: todoInput.value,
    id: Math.random(),
    isChecked: "",
    }   

    tasks.push(task);
    render(tasks);
}

function render(tasks)  {
    let stringForRender = '';

    tasks.forEach((task) => {
    stringForRender += `<li class="task" id="${task.id}">
    <input class="btnCheck" type="checkbox" ${task.isChecked ? "checked" : ""} id="checkbox_${task.id}"><label for="checkbox_${task.id}"></label>
    <div class="task__description">${task.text}</div>
    <button  class="btnDel"><img src="img/del.svg" alt="удалить"></button>
    </li>`;});
    
    todoList.innerHTML = stringForRender; 
}

function clearInput() {
    todoInput.value = "";  
}

btnAdd.addEventListener('click', () => {
    createTask(tasks); 
    clearInput();
});

document.addEventListener( 'keypress', event => {
    if( event.code === 'Enter' ) {
    createTask(tasks);
    clearInput();
    }
  });