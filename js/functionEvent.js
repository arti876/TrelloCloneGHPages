import { getDay, getTime } from './getData.js' // получить текущую дату и время
import { updateCounter } from './updateCounter.js' // обновление счетчиков Todos
import { createButton, } from './htmlCreateElement.js' // создание элементов html
import { setData } from './localStorage.js'// запись-чтение данных localStorage
import {
  taskListBodyTodo,
  taskListBtnAddTodo,
  formAddTodo,
  formInputTitle,
  formInputDescription,
  formВtnCancel,
  formВtnConfirm,
  formSelectUser,
  controls,
  board,
  taskListBody,
  taskListBodyInProgress,
  taskListBodyDone,
  warning,
  warningBtnConfirm,
  warningText,
  goTopBtn,
  trelloWrapper,
  taskListBtnShowAll,
  taskListBtnShowAllTodo,
  taskListBtnShowAllInProgress,
  taskListBtnShowAllDone,
} from './refs.js'; // получение переменных

// удалить все карточки дел
function boardClear() {
  const allTask = document.querySelectorAll('.task');
  allTask.forEach(task => task.remove())
  updateCounter();
  localStorage.clear();
}

// изменение статуса карточки при переносе
function statusTaskСhange(activeElementId, todosGetData, status) {
  for (let i = 0; i < todosGetData.length; i++) {
    if (todosGetData[i].todo.id === activeElementId) {
      todosGetData[i].todo.completed = status;
      todosGetData[i].todo.time = getTime();
      todosGetData[i].todo.day = getDay();
      setData('todos', todosGetData);
    };
  };
}

//редакрирование todo
function editTodo() {
  const idTask = event.target.closest('.task');
  const taskTitleText = idTask.querySelector('.task__title').textContent;
  const taskDescriptionText = idTask.querySelector('.task__description').textContent;
  const taskUserText = idTask.querySelector('.task__user').textContent;
  formAddTodo.id = idTask.id;
  formВtnConfirm.classList.add('form-add-todo__btn-confirm--edit');
  formAddTodo.classList.toggle('form-add-todo--vis');
  formInputTitle.value = taskTitleText;
  formInputDescription.value = taskDescriptionText;
  formSelectUser.value = taskUserText;
};

// перемещение элемента DnD
function elementMovement(activeElement) {
  // Элемент перед которым нужно разместить activeElement
  const currentElement = event.target;
  // Находим элемент, перед которым будем вставлять
  const nextElement = (currentElement === activeElement.nextElementSibling) ?
    currentElement.nextElementSibling :
    currentElement;
  // Вставяем activeElement
  setTimeout(() => {
    if (currentElement.classList.contains(`task`)) {
      currentElement.closest('.task-list__body').insertBefore(activeElement, nextElement);
    } else if (currentElement.classList.contains(`task-list__body`)) {
      currentElement.prepend(activeElement);
    }
  }, 100);
}

// перенос карточки из ProgressInTodo
function relocateProgressInTodo(elem) {
  elem.classList = 'task task--todo';
  elem.querySelector('.task__btn--back').textContent = 'EDIT';
  elem.querySelector('.task__btn--back').classList = 'task__btn task__btn--edit';
  elem.querySelector('.task__btn--complete').textContent = 'DELETE';
  elem.querySelector('.task__btn--complete').classList = 'task__btn task__btn--del';
  elem.querySelector('.task__time').textContent = getTime();
  elem.querySelector('.task__date').textContent = getDay();
  const elTaskBtnRelocate = createButton('task__btn task__btn--relocate', '>');
  elem.querySelector('.task__body').append(elTaskBtnRelocate);
}

// перенос карточки из TodoInProgress
function relocateTodoInProgress(elem) {
  elem.classList = 'task task--in-progress';
  elem.querySelector('.task__btn--relocate').remove();
  elem.querySelector('.task__btn--edit').textContent = 'BACK';
  elem.querySelector('.task__btn--edit').classList = 'task__btn task__btn--back';
  elem.querySelector('.task__btn--del').textContent = 'COMPLETE';
  elem.querySelector('.task__btn--del').classList = 'task__btn task__btn--complete';
  elem.querySelector('.task__time').textContent = getTime();
  elem.querySelector('.task__date').textContent = getDay();
}

// перенос карточки из ProgressInDone
function relocateProgressInDone(elem) {
  elem.classList = 'task task--done';
  elem.querySelector('.task__btn--back').remove();
  elem.querySelector('.task__btn--complete').textContent = 'DELETE';
  elem.querySelector('.task__btn--complete').classList = 'task__btn task__btn--del';
  elem.querySelector('.task__time').textContent = getTime();
  elem.querySelector('.task__date').textContent = getDay();
}

// перенос карточки из DoneInTodo
function relocateDoneInTodo(elem) {
  elem.classList = 'task task--todo';
  const elTaskBtnRelocate = createButton('task__btn task__btn--relocate', '>');
  elem.querySelector('.task__body').append(elTaskBtnRelocate)
  const elTaskBtnEdit = createButton('task__btn task__btn--edit', 'EDIT');
  elem.querySelector('.task__btn-container').prepend(elTaskBtnEdit);
  elem.querySelector('.task__time').textContent = getTime();
  elem.querySelector('.task__date').textContent = getDay();
}

// перенос карточки из DoneInProgress
function relocateDoneInProgress(elem) {
  elem.classList = 'task task--in-progress';
  const elTaskBtnBack = createButton('task__btn task__btn--back', 'BACK');
  elem.querySelector('.task__btn-container').prepend(elTaskBtnBack)
  elem.querySelector('.task__btn--del').textContent = 'COMPLETE';
  elem.querySelector('.task__btn--del').classList = 'task__btn task__btn--complete';
  elem.querySelector('.task__time').textContent = getTime();
  elem.querySelector('.task__date').textContent = getDay();
}

// перенос карточки из TodoInDone
function relocateTodoInDone(elem) {
  elem.classList = 'task task--done';
  elem.querySelector('.task__btn--relocate').remove();
  elem.querySelector('.task__btn--edit').remove();
  elem.querySelector('.task__time').textContent = getTime();
  elem.querySelector('.task__date').textContent = getDay();
}

// проверка наличие скролла
function scrollСheck() {
  if (taskListBodyInProgress.scrollHeight > taskListBodyInProgress.clientHeight) {
    taskListBtnShowAllInProgress.style.display = 'block';
  } else {
    taskListBtnShowAllInProgress.style.display = 'none';
  }

  if (taskListBodyTodo.scrollHeight > taskListBodyTodo.clientHeight) {
    taskListBtnShowAllTodo.style.display = 'block';
  } else {
    taskListBtnShowAllTodo.style.display = 'none';
  }
  if (taskListBodyDone.scrollHeight > taskListBodyDone.clientHeight) {
    taskListBtnShowAllDone.style.display = 'block';
  } else {
    taskListBtnShowAllDone.style.display = 'none';
  }
}

// показать/скрыть карточки
function showAllCards(taskList) {
  if (event.target.getAttribute('data-show') === "true") {
    taskList.style.height = 'auto';
    event.target.textContent = 'Roll up ▲';
    event.target.setAttribute('data-show', "false");
  } else {
    taskList.style.height = '600px';
    event.target.textContent = 'Show all ▼';
    event.target.setAttribute('data-show', "true");
  }
}

export {
  statusTaskСhange,
  relocateProgressInTodo,
  relocateTodoInProgress,
  relocateProgressInDone,
  relocateDoneInTodo,
  relocateDoneInProgress,
  relocateTodoInDone,
  boardClear,
  editTodo,
  elementMovement,
  scrollСheck,
  showAllCards,
} // functionEvent