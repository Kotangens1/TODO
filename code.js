const todoList = document.querySelector('.todo__list');
const todoInput = document.querySelector('.todo__input');
const btnAdd = document.querySelector('.btnAdd');
const btnDoneAll = document.querySelector('.btnDoneAll');
const counter = document.querySelector('.counter');
const filterAll = document.querySelector('.filter__all');
const filterCompleted = document.querySelector('.filter__completed');
const filterActive = document.querySelector('.filter__active');

const tasks = [];

const counting = () => {
  const { length: completed } = tasks.filter(task => task.isChecked);
  const notCompleted = tasks.length - completed;

  if (tasks.length === completed) btnDoneAll.checked = true;

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

const createTask = () => {
  const text = todoInput.value.trim();

  if (!text) return;

  const task = {
    id: Math.random(),
    isChecked: btnDoneAll.checked,
    text,
  };

  tasks.push(task);
  render(tasks);
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
  // eslint-disable-next-line prefer-destructuring
  const { id: currentTaskId } = target.parentElement;

  tasks.forEach(task => {
    if (String(task.id) === currentTaskId) {
      task.isChecked = !task.isChecked;
    }
  });
};

const deleteTask = ({ target }) => {
  const buttonDelete = target.parentElement;
  const { id: currentTaskId } = buttonDelete.parentElement;

  tasks.forEach((task, index) => {
    if (String(task.id) === currentTaskId) {
      tasks.splice(index, 1);
    }
  });
};

const editDescription = ({ target }) => {
  const { parentElement } = target;

  tasks.forEach(task => {
    if (String(task.id) === parentElement.id) {
      parentElement.innerHTML = `<input type="text" class="task__description-edit" value="${task.text}">`;
    }
  });

  const editInput = document.querySelector('.task__description-edit');

  editInput.onblur = function() {
    saveChanges(event);
    render(tasks);
  };
};

const renderCompleted = () => {
  let stringForRender = '';

  tasks.forEach(task => {
    if (task.isChecked) {
      stringForRender += `<li class="task" id="${task.id}">
        <input class="btnCheck" type="checkbox" ${task.isChecked ? 'checked' : ''} id="checkbox_${task.id}">
        <label for="checkbox_${task.id}"></label>
        <div class="task__description">${task.text}</div>
        <button  class="btnDel"><img src="img/del.svg" alt="удалить"></button>
        </li>`;
    }
  });
  todoList.innerHTML = stringForRender;
};

const renderActive = () => {
  let stringForRender = '';

  tasks.forEach(task => {
    if (!task.isChecked) {
      stringForRender += `<li class="task" id="${task.id}">
        <input class="btnCheck" type="checkbox" ${task.isChecked ? 'checked' : ''} id="checkbox_${task.id}">
        <label for="checkbox_${task.id}"></label>
        <div class="task__description">${task.text}</div>
        <button  class="btnDel"><img src="img/del.svg" alt="удалить"></button>
        </li>`;
    }
  });
  todoList.innerHTML = stringForRender;
};

const doneAll = () => {
  if (btnDoneAll.checked) {
    tasks.forEach(task => {
      task.isChecked = true;
    });
  }
  if (!btnDoneAll.checked) {
    tasks.forEach(task => {
      task.isChecked = false;
    });
  }
};

btnAdd.addEventListener('click', () => {
  createTask();
});

filterAll.addEventListener('click', () => {
  render(tasks);
});

filterCompleted.addEventListener('click', () => {
  renderCompleted();
});

filterActive.addEventListener('click', () => {
  renderActive();
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
  render(tasks);
});

document.addEventListener('click', event => {
  const currentElementClicked = event.target.classList.contains('btnCheck');

  if (!currentElementClicked) return;
  if (!event.target.checked) btnDoneAll.checked = false;

  checkTask(event);
  render(tasks);
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
  render(tasks);
});

document.addEventListener('click', event => {
  const currentElementClicked = event.target.classList.contains('btnDoneAll');

  if (!currentElementClicked) return;

  doneAll();
  render(tasks);
});


