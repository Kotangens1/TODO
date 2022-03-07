const todo__list = document.querySelector(".todo__list")
const todo__input = document.querySelector(".todo__input");
const btnAdd = document.querySelector(".btnAdd");
let tasks = [];
let task = 0;

function createTask() {
    const task = {
    text: todo__input.value,
    id: Math.random(),
    isChecked: false
} 
    return task;
}

function render(tasks)  {
    todo__list.innerHTML += 
    `            
    <li class="task" id = "task${task.id}">
        <input class="btnCheck" type="checkbox" id= "done${task.id}"><label for="done${task.id}"></label>
        <div class="task__description">${task.text}</div>
        <button  class="btnDel"><img src="img/del.svg" alt="удалить"></button>
    </li>
    `;
}

btnAdd.addEventListener('click', () => {
    task = createTask();
    tasks += task;
    render(tasks);
});

