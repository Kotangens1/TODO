const todo__list = document.querySelector(".todo__list")
const todo__input = document.querySelector(".todo__input");
const btnAdd = document.querySelector(".btnAdd");
let tasks = [];
let task = 0;

function createTask(tasks) {
    const task = {
    text: todo__input.value,
    id: Math.random(),
    isChecked: false
    }   
    tasks.push(task);
    render(tasks);
}

function render(tasks)  {
    let stringForRender = '';
    tasks.forEach((item) => {
    stringForRender += `<li class="task" id = "task${task.id}">
    <input class="btnCheck" type="checkbox" id= "done${task.id}"><label for="done${task.id}"></label>
    <div class="task__description">${tasks[tasks.length -1].text}</div>
    <button  class="btnDel"><img src="img/del.svg" alt="удалить"></button>
    </li>`;});
    todo__list.innerHTML = stringForRender;
}

btnAdd.addEventListener('click', () => {
    createTask(tasks);
});