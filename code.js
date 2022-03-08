const todoList = document.querySelector(".todo__list")
const todoInput = document.querySelector(".todo__input");
const btnAdd = document.querySelector(".btnAdd");
let tasks = [];
let task = 0;

function createTask(tasks) {
    const task = {
    text: todoInput.value,
    id: Math.random(),
    isChecked: false,
    }   
    tasks.push(task);
    render(tasks);
}

function render(tasks)  {
    let stringForRender = '';
    tasks.forEach((task) => {
    stringForRender += `<li class="task" id = "task${task.id}">
    <input class="btnCheck" type="checkbox" id= "done${task.id}"><label for="done${task.id}"></label>
    <div class="task__description">${task.text}</div>
    <button  class="btnDel"><img src="img/del.svg" alt="удалить"></button>
    </li>`;});
    todoList.innerHTML = stringForRender;
    todoInput.value = "";   
}

btnAdd.addEventListener('click', () => {
    createTask(tasks); 
});

document.addEventListener( 'keyup', event => {
    if( event.code === 'Enter' ) createTask(tasks);
  });