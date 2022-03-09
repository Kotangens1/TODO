const todoList = document.querySelector(".todo__list")
const todoInput = document.querySelector(".todo__input");
const btnAdd = document.querySelector(".btnAdd");
let tasks = [];
let idBtnCheck = 0;

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
    stringForRender += `<li class="task" id = "${task.id}">
    <input class="btnCheck" type="checkbox" ${task.isChecked} id= "done_${idBtnCheck}"><label for="done_${idBtnCheck}"></label>
    <div class="task__description">${task.text}</div>
    <button  class="btnDel"><img src="img/del.svg" alt="удалить"></button>
    </li>`;});
    
    idBtnCheck++;
    todoList.innerHTML = stringForRender; 
}

function clearInput() {
    todoInput.value = "";  
}

btnAdd.addEventListener('click', () => {
    createTask(tasks); 
    clearInput();
});

document.addEventListener( 'keyup', event => {
    if( event.code === 'Enter' ) {
    createTask(tasks);
    clearInput();
    }
  });