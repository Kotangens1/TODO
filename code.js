const todo__list = document.querySelector(".todo__list")
const todo__input = document.querySelector(".todo__input");
const btnAdd = document.querySelector(".btnAdd");
let tasks = [];

function createTask() {
    text = "";
    id = Math.random();
    isChecked = false;
}

function render(task)  {
    task.text = todo__input.value;
    task.id = Math.random();
    task.isChecked = false;
    return `            
    <li class="task" id = "task${task.id}">
        <input class="btnCheck" type="checkbox" id= "done${task.id}"><label for="done${task.id}"></label>
        <div class="task__description">${task.text}</div>
        <button  class="btnDel"><img src="img/del.svg" alt="удалить"></button>
    </li>
    `;
    
    
}

btnAdd.addEventListener('click', () => {
    var task = new createTask();
    tasks += task;
    console.log(task);

    console.log(tasks);
    todo__list.innerHTML += render(task);
});

