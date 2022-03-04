console.log("Файл .js подключён!");

let todo__list = document.querySelector(".todo__list")
let todo__new__input = document.querySelector(".todo__new__input");
let btnAdd = document.querySelector(".btnAdd")
let index = 0;
let task_description = "ничего";

const render = index => {
    return `            
    <li class="task" id = "task${index}">
        <div class="task__description">${task_description}</div>
    </li>
    `
}

btnAdd.addEventListener('click', () => {
    task_description = document.querySelector(".todo__new__input").value;
    todo__list.innerHTML += render(index);
    index ++;
});

