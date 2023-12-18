import { formAddTodo, formInputTitle, formInputDescription, formВtnConfirm, formSelectUser, controls } from './refs.js'; // получение переменных
import { getDay, getTime } from './getData.js' // получить текущую дату и время
import { createDiv, createButton, } from './htmlCreateElement.js' // создание элементов html
import { getData, setData } from './localStorage.js'// запись-чтение данных localStorage
import { createTodoCard } from './createTodoCard.js' // создание новой карточки дел
import { createTodoObj } from './createTodoObj.js' //создать объект Todo

//вызов формы создания карточки дел
function addTodo() {
  formВtnConfirm.classList.add('form-add-todo__btn-confirm--add-new-task');
  formAddTodo.classList.toggle('form-add-todo--vis');
  formInputTitle.value = '';
  formInputDescription.value = '';
  formSelectUser.value = '';
};

//закрыть форму создания карточки дел
function pressCancel() {
  formAddTodo.classList.toggle('form-add-todo--vis');
  formInputDescription.classList.remove('invalid-control');
  formInputTitle.classList.remove('invalid-control');
  formSelectUser.classList.remove('invalid-control');
  formВtnConfirm.classList.remove('form-add-todo__btn-confirm--edit');
  formВtnConfirm.classList.remove('form-add-todo__btn-confirm--add-new-task');
  formAddTodo.removeAttribute('id');
};

//создать карточку дел
function pressConfirmAddNewTask(todosGetData) {
  //если обязательные для заполнения поля не содержат данных - сигнализировать
  controls.forEach(control => {
    if (control.classList.contains('required') && !control.value) {
      control.classList.add('invalid-control');
    }
  });
  //проверка обязательных для заполнения полей и вызов функции создания карточки
  if (formInputTitle.value && formInputDescription.value && formSelectUser.value) {
    formAddTodo.classList.toggle('form-add-todo--vis');
    formВtnConfirm.classList.remove('form-add-todo__btn-confirm--add-new-task');

    todosGetData = getData('todos');
    const todoObj = createTodoObj();
    createTodoCard(todoObj, createDiv, createButton, getDay, getTime);
    todosGetData.push(todoObj);
    setData('todos', todosGetData);
    // updateCounterCards(paramsUpdateCounterCards);
    formAddTodo.removeAttribute('id');
  }
};

//сохранить отредактированную карточку дел
function pressConfirmEdit(todosGetData) {
  //если обязательные для заполнения поля не содержат данных - сигнализировать
  controls.forEach(control => {
    if (control.classList.contains('required') && !control.value) {
      control.classList.add('invalid-control');
    }
  });
  //проверка обязательных для заполнения полей и вызов функции создания карточки
  if (formInputTitle.value && formInputDescription.value && formSelectUser.value) {
    formAddTodo.classList.toggle('form-add-todo--vis');
    formВtnConfirm.classList.remove('form-add-todo__btn-confirm--edit');

    const taskListBodyTodo = document.querySelectorAll('.task--todo');
    let currentTask = null;

    for (let i = 0; i < taskListBodyTodo.length; i++) {
      if (taskListBodyTodo[i].id === formAddTodo.id) {
        currentTask = taskListBodyTodo[i]
      }
    };

    const taskTitleText = currentTask.querySelector('.task__title');
    const taskDescriptionText = currentTask.querySelector('.task__description');
    const taskUserText = currentTask.querySelector('.task__user');
    const taskTime = currentTask.querySelector('.task__time');
    const taskDay = currentTask.querySelector('.task__date');

    taskTitleText.textContent = formInputTitle.value;
    taskDescriptionText.textContent = formInputDescription.value;
    taskUserText.textContent = formSelectUser.value;
    taskTime.textContent = getTime();
    taskDay.textContent = getDay();

    for (let i = 0; i < todosGetData.length; i++) {
      if (todosGetData[i].todo.id === formAddTodo.id) {
        todosGetData[i].todo.title = taskTitleText.textContent;
        todosGetData[i].todo.body = taskDescriptionText.textContent;
        todosGetData[i].todo.name = taskUserText.textContent;
        todosGetData[i].todo.time = taskTime.textContent;
        todosGetData[i].todo.day = taskDay.textContent;
        setData('todos', todosGetData);
      };
    };

    formAddTodo.removeAttribute('id');
  }
};

export { addTodo, pressCancel, pressConfirmAddNewTask, pressConfirmEdit } //модальное окно FormTodo