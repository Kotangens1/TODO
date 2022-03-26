const todoList = document.querySelector('.todo__list');
const todoInput = document.querySelector('.todo__input');
const btnAdd = document.querySelector('.btnAdd');
const btnDoneAll = document.querySelector('.btnDoneAll');
const filterAll = document.querySelector('.filter__all');
const filterCompleted = document.querySelector('.filter__completed');
const filterActive = document.querySelector('.filter__active');
const numberOfActive = document.querySelector('.number-of-active');
const numberOfCompleted = document.querySelector('.number-of-completed');
const numberOfAll = document.querySelector('.number-of-all');

const tasks = [];

const activeTasks = () => {
  let number = 0;

  tasks.forEach(task => {
    if (!task.isChecked) {
      number++;
    }
  });

  numberOfActive.innerHTML = number;
};

const completedTasks = () => {
  let number = 0;

  tasks.forEach(task => {
    if (task.isChecked) {
      number++;
    }
  });
  numberOfCompleted.innerHTML = number;
};

const allTasks = () => {
  // eslint-disable-next-line prefer-destructuring
  numberOfAll.innerHTML = tasks.length;
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
  activeTasks();
  completedTasks();
  allTasks();
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

const checkTask = event => {
  tasks.forEach(task => {
    // eslint-disable-next-line prefer-destructuring
    const currentTaskId = event.target.parentElement.id;

    task.id = String(task.id);

    if (task.id === currentTaskId) {
      task.isChecked = !task.isChecked;
    }
  });
};

const deleteTask = event => {
  tasks.forEach((task, index) => {
    // eslint-disable-next-line prefer-destructuring
    const currentTaskId = event.target.parentElement.parentElement.id;

    task.id = String(task.id);

    if (task.id === currentTaskId) {
      tasks.splice(index, 1);
    }
  });
};

const editDescription = event => {
  tasks.forEach(task => {
    // eslint-disable-next-line prefer-destructuring
    const currentTaskId = event.target.parentElement.id;

    task.id = String(task.id);

    if (task.id === currentTaskId) {
      event.target.parentElement.innerHTML = `<input type="text" class="todo__input__edit" value="${task.text}">`;
    }
  });
};

const saveChanges = event => {
  tasks.forEach(task => {
    // eslint-disable-next-line prefer-destructuring
    const currentTaskId = event.target.parentElement.id;

    task.id = String(task.id);

    if (task.id === currentTaskId) {
      // eslint-disable-next-line prefer-destructuring
      task.text = event.target.value;
    }
  });
};

const clearInput = () => {
  todoInput.value = '';
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
  clearInput();
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
    clearInput();
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

  const currentElementClicked = event.target.classList.contains('todo__input__edit');

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


