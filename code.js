const todoList = document.querySelector('.todo__list');
const todoInput = document.querySelector('.todo__input');
const btnAdd = document.querySelector('.btnAdd');

const tasks = [];

const render = array => {
  let stringForRender = '';

  array.forEach(task => {
    stringForRender += `<li class="task" id="${task.id}">
    <input class="btnCheck" type="checkbox" ${task.isChecked ? 'checked' : ''} id="checkbox_${task.id}">
    <label for="checkbox_${task.id}"></label>
    <div class="task__description">${task.text}</div>
    <button  class="btnDel"><img src="img/del.svg" alt="удалить"></button>
    </li>`;
  });

  todoList.innerHTML = stringForRender;
};

const createTask = () => {
  const text = todoInput.value.trim();

  if (!text) return;

  const task = {
    id: Math.random(),
    isChecked: false,
    text,
  };

  tasks.push(task);
  render(tasks);
};

const clearInput = () => {
  todoInput.value = '';
};

btnAdd.addEventListener('click', () => {
  createTask();
  clearInput();
});

document.addEventListener('keypress', event => {
  if (event.code === 'Enter') {
    createTask();
    clearInput();
  }
});
