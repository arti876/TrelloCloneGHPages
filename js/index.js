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
} from './refs.js'; // получение переменных
import {
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
} from './functionEvent.js' // functionEvent
import { startTime, } from './clock.js'; // часы
// import { v4 as uuidv4 } from 'uuid'; // рандом id
import { getDay, getTime } from './getData.js' // получить текущую дату и время
import { updateCounter } from './updateCounter.js' // обновление счетчиков Todos
import { createDiv,createButton, } from './htmlCreateElement.js' // создание элементов html
import { addTodo, pressCancel, pressConfirmAddNewTask, pressConfirmEdit } from './modalFormTodo.js' //модальное окно FormTodo
import { getTrelloData } from './getTrelloData.js' // получение данных с jsonplaceholder
import { getData, setData } from './localStorage.js'// запись-чтение данных localStorage
import { createTodoCard } from './createTodoCard.js' // создание новой карточки дел
import { addNameInForm } from './addNameInForm.js' //добавить имена из загружаемых данных в форму
import { trackScroll, goTop } from './goTod.js' //кнопка вверх
import { createTodoObj } from './createTodoObj.js' //создать объект Todo
import { randomCompleted, randomDay, randomTime, generateUUID } from './getRandom.js' // рандом статуса Todo, даты, времени

const runTrelloApplication = async () => {
// часы
startTime();

// загрузаем данные в localStorage с сервера, если их нету
if (!localStorage.length || !getData('todos')[0]) {
  getTrelloData();
};

// получаем массив данных из localStorage
let todosGetData = getData('todos');

// загрузка имен юзеров в модальную форму добавления дел
addNameInForm(todosGetData);

// отрисовка карточек дел из localStorage
todosGetData.forEach(todo => {
  createTodoCard(todo);
});

// обновление счетчиков
updateCounter();

  // скролл возврата к началу страницы
  // обработчик скролл вверх
  window.addEventListener('scroll', function (event) {
    trackScroll();
  });

  // вернуться в начало
  goTopBtn.addEventListener("click", goTop);

  // модальное окно формы Todo
  trelloWrapper.addEventListener('click', function (event) {
    // удалить все карточки дел
    if (event.target.classList.contains('board-clear')) {
      boardClear(updateCounter);
    }
  });

  formAddTodo.addEventListener('click', function (event) {
    // убрать стили для проверки заполненного поля
    if (event.target.classList.contains('form-add-todo__input-title')) {
      event.target.closest('.form-add-todo__input-title').classList.remove('invalid-control');
    }
    if (event.target.classList.contains('form-add-todo__input-description')) {
      event.target.closest('.form-add-todo__input-description').classList.remove('invalid-control');
    }
    if (event.target.classList.contains('form-add-todo__user')) {
      event.target.closest('.form-add-todo__user').classList.remove('invalid-control');
    }
    // закрыть модальное окно создания/редактирования карточки
    if (event.target.classList.contains('form-add-todo__btn-cancel')) {
      pressCancel();
    }
    // подтвердить и созать новую карточку
    if (event.target.classList.contains('form-add-todo__btn-confirm--add-new-task')) {
      pressConfirmAddNewTask(todosGetData);
    }
    // подтвердить и сохранить редакрированные данные в карточку
    if (event.target.classList.contains('form-add-todo__btn-confirm--edit')) {
      pressConfirmEdit(todosGetData);
    }
  });

  // события Drag'n'drop
  // элемент который перетаскиваем
  let activeElement = null;
  // id элемента который перетаскиваем
  let activeElementId = null;

  // срабатывает в начале операции перетаскивания элемента
  board.addEventListener('dragstart', (event) => {
    event.target.classList.add('active-element');
    activeElement = event.target;
    activeElementId = event.target.id;
  })

  // срабатывает, когда элемент перемещают над допустимой зоной для переноса
  board.addEventListener('dragover', (event) => {
    event.preventDefault();
    elementMovement(activeElement);
  });

  // срабатывает, когда пользователь закончил перетаскивание элемента
  board.addEventListener('dragend', (event) => {
    event.target.classList.remove('active-element');
    if (event.target.closest('.task-list__body--todo')) {
      // перемещение в Todo
      if (event.target.classList.contains('task--in-progress')) {
        relocateProgressInTodo(event.target);
        statusTaskСhange(activeElementId, todosGetData, 'todo');
        updateCounter();
      } else if (event.target.classList.contains('task--done')) {
        relocateDoneInTodo(event.target);
        statusTaskСhange(activeElementId, todosGetData, 'todo');
        updateCounter();
      }
      // перемещение в InProgress
    } else if (event.target.closest('.task-list__body--in-progress')) {
      if (event.target.classList.contains('task--todo')) {
        relocateTodoInProgress(event.target);
        statusTaskСhange(activeElementId, todosGetData, 'inProgress');
        updateCounter();
      } else if (event.target.classList.contains('task--done')) {
        relocateDoneInProgress(event.target);
        statusTaskСhange(activeElementId, todosGetData, 'inProgress');
        updateCounter();
      }
      // перемещение в Done
    } else if (event.target.closest('.task-list__body--done')) {
      if (event.target.classList.contains('task--todo')) {
        relocateTodoInDone(event.target);
        statusTaskСhange(activeElementId, todosGetData, 'done');
        updateCounter();
      } else if (event.target.classList.contains('task--in-progress')) {
        relocateProgressInDone(event.target);
        statusTaskСhange(activeElementId, todosGetData, 'done');
        updateCounter();
      }
    }
  });

  // запрет переноса в InProgress если дел 6 или больше
  board.addEventListener('dragenter', (event) => {
    event.preventDefault();
    if (event.target.closest('.task-list__body--in-progress')) {
      const lengthTaskInProgress = document.getElementsByClassName('task--in-progress').length;
      if (!activeElement.classList.contains('task--in-progress') && lengthTaskInProgress >= 6) {
        warning.classList.toggle('warning--vis');
        warningBtnConfirm.classList.add('warning__btn-confirm--none');
        warningText.textContent = 'Before you can add a new task, you must complete at least one current task!';
      }
    }
  });

  // события по клику в области board
  board.addEventListener('click', function (event) {
    // удаление карточки кнопкой DELETE
    if (event.target.classList.contains('task__btn--del')) {
      const task = event.target.closest('.task');
      // удаление дела из разметки
      task.remove();
      // удаление дела из массива дел и обновление localStorage
      todosGetData = getData('todos');
      const taskDel = todosGetData.filter(({ todo: { id } }) => id !== task.id);
      setData('todos', taskDel);
      updateCounter();
    }
    // перемещение из Todo в InProgress
    if (event.target.classList.contains('task__btn--relocate')) {
      const lengthTaskInProgress = document.getElementsByClassName('task--in-progress').length;
      if (lengthTaskInProgress >= 6) {
        warning.classList.toggle('warning--vis');
        warningBtnConfirm.classList.add('warning__btn-confirm--none');
        warningText.textContent = 'Before you can add a new task, you must complete at least one current task!';
      } else {
        const task = event.target.closest('.task');
        const taskId = task.id;
        // клонирование карточки
        const cloneTask = task.cloneNode(true);
        // удаление оригинальной карточки
        task.remove();
        // перемещение склонированной карточки в новое место
        relocateTodoInProgress(cloneTask);
        taskListBodyInProgress.prepend(cloneTask);
        // изменение статуса карточки
        statusTaskСhange(taskId, todosGetData, 'inProgress');
        updateCounter();
      }
    }
    // перемещение из InProgress в Todo
    if (event.target.classList.contains('task__btn--back')) {
      const task = event.target.closest('.task');
      const taskId = task.id;
      const cloneTask = task.cloneNode(true);
      task.remove();
      relocateProgressInTodo(cloneTask);
      taskListBodyTodo.prepend(cloneTask);
      statusTaskСhange(taskId, todosGetData, 'todo');
      updateCounter();
    }
    // перемещение из InProgress в Done
    if (event.target.classList.contains('task__btn--complete')) {
      const task = event.target.closest('.task');
      const taskId = task.id;
      const cloneTask = task.cloneNode(true);
      task.remove();
      relocateProgressInDone(cloneTask);
      taskListBodyDone.prepend(cloneTask);
      statusTaskСhange(taskId, todosGetData, 'done');
      updateCounter();
    }
    // вызов окна подтверждения удаления всех карточек
    if (event.target.classList.contains('task-list__btn--del-all')) {
      warning.classList.toggle('warning--vis');
      warningText.textContent = 'Delete all done cards?';
    }
    // редакрирование Todo
    if (event.target.classList.contains('task__btn--edit')) {
      editTodo(formAddTodo, formInputTitle, formInputDescription, formВtnConfirm, formSelectUser);
    }
    // добавить новый Todo
    if (event.target.classList.contains('task-list__btn--add-todo')) {
      addTodo();
    }
  });

  // модальное окно Warning
  // подтвердить и удалить все карточки done
  warning.addEventListener('click', function (event) {
    if (event.target.classList.contains('warning__btn-confirm')) {
      warning.classList.toggle('warning--vis');
      const taskDoneAll = taskListBodyDone.querySelectorAll('.task--done');
      taskDoneAll.forEach(elem => elem.remove());
      // удаление дела из массива дел и обновление localStorage
      const taskDoneDelAll = todosGetData.filter(({ todo: { completed } }) => completed !== 'done');
      setData('todos', taskDoneDelAll);
      updateCounter();
    }
    // отменить удаление всех карточек done
    if (event.target.classList.contains('warning__btn-cancel')) {
      warning.classList.toggle('warning--vis');
      warningBtnConfirm.classList.remove('warning__btn-confirm--none');
    }
  })
}

runTrelloApplication()