const todoList = document.querySelector('.todo__list');
const todoInput = document.querySelector('.todo__input');
const btnAdd = document.querySelector('.btnAdd');
const btnDoneAll = document.querySelector('.btnDoneAll');
const counter = document.querySelector('.counter');
const filterAll = document.querySelector('.filter__all');
const filterCompleted = document.querySelector('.filter__completed');
const filterActive = document.querySelector('.filter__active');

const FILTER_TYPE_ALL = 'all';
const FILTER_TYPE_COMPLETED = 'completed';
const FILTER_TYPE_ACTIVE = 'active';

let currentTab = FILTER_TYPE_ALL;

const tasks = [];

const counting = () => {
  const { length: completed } = tasks.filter(task => task.isChecked);
  const notCompleted = tasks.length - completed;

  counter.innerHTML = `
    <li>All ${tasks.length}</li>
    <li>Completed ${completed}</li>
    <li>Active ${notCompleted}</li>`;
};

const clearInput = () => {
  todoInput.value = '';
};

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
  clearInput();
  counting();
};

const makeRadioActive = () => {
  if (currentTab === FILTER_TYPE_ALL) {
    filterAll.checked = true;
  }
};

const checkDoneAll = () => {
  const isAllChecked = tasks.length && tasks.every(task => task.isChecked);

  btnDoneAll.checked = isAllChecked;
};

const filterByRadio = type => {
  currentTab = type;
  let filteredArray = [];

  if (type === FILTER_TYPE_ALL) {
    filteredArray = tasks;
  }
  if (type === FILTER_TYPE_COMPLETED) {
    filteredArray = tasks.filter(task => task.isChecked);
  }
  if (type === FILTER_TYPE_ACTIVE) {
    filteredArray = tasks.filter(task => !task.isChecked);
  }

  checkDoneAll();
  makeRadioActive();
  render(filteredArray);
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
  filterByRadio(FILTER_TYPE_ALL);
};

const saveChanges = ({ target }) => {
  const { parentElement, value } = target;

  tasks.forEach(task => {
    if (String(task.id) === parentElement.id) {
      task.text = value;
    }
  });
};

const checkTask = ({ target }) => {
  const { id: currentTaskId } = target.parentElement;

  tasks.forEach(task => {
    if (String(task.id) === currentTaskId) {
      task.isChecked = !task.isChecked;
    }
  });
  filterByRadio(currentTab);
};

const deleteTask = ({ target }) => {
  const buttonDelete = target.parentElement;
  const { id: currentTaskId } = buttonDelete.parentElement;

  tasks.forEach((task, index) => {
    if (String(task.id) === currentTaskId) {
      tasks.splice(index, 1);
    }
  });
  filterByRadio(currentTab);
};

const editDescription = ({ target }) => {
  const { parentElement } = target;

  tasks.forEach(task => {
    if (String(task.id) === parentElement.id) {
      parentElement.innerHTML = `<input type="text" class="task__description-edit" value="${task.text}">`;
    }
  });

  const editInput = document.querySelector('.task__description-edit');

  editInput.focus();
  editInput.addEventListener('blur', () => {
    filterByRadio(currentTab);
  });
};

const doneAll = () => {
  const currentValue = btnDoneAll.checked;

  tasks.forEach(task => {
    task.isChecked = currentValue;
  });
};

btnAdd.addEventListener('click', () => {
  createTask();
});

filterAll.addEventListener('click', () => {
  filterByRadio(FILTER_TYPE_ALL);
});

filterCompleted.addEventListener('click', () => {
  filterByRadio(FILTER_TYPE_COMPLETED);
});

filterActive.addEventListener('click', () => {
  filterByRadio(FILTER_TYPE_ACTIVE);
});

document.addEventListener('keypress', event => {
  if (event.code === 'Enter') {
    createTask();
  }
});

document.addEventListener('click', event => {
  const currentElementClicked = event.target.parentElement.classList.contains('btnDel');

  if (!currentElementClicked) return;

  deleteTask(event);
});

document.addEventListener('click', event => {
  const currentElementClicked = event.target.classList.contains('btnCheck');

  if (!currentElementClicked) return;

  checkTask(event);
});

document.addEventListener('dblclick', event => {
  const currentElementClicked = event.target.classList.contains('task__description');

  if (!currentElementClicked) return;

  editDescription(event);
});

document.addEventListener('keypress', event => {
  if (!(event.code === 'Enter')) return;

  const currentElementClicked = event.target.classList.contains('task__description-edit');

  if (!currentElementClicked) return;

  saveChanges(event);
  filterByRadio(currentTab);
});

document.addEventListener('click', event => {
  const currentElementClicked = event.target.classList.contains('btnDoneAll');

  if (!currentElementClicked) return;

  doneAll();
  filterByRadio(currentTab);
});


