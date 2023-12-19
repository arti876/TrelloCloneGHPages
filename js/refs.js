const taskListBodyTodo = document.querySelector('.task-list__body--todo');
const taskListBodyInProgress = document.querySelector('.task-list__body--in-progress');
const taskListBodyDone = document.querySelector('.task-list__body--done');
const taskListBtnAddTodo = document.querySelector('.task-list__btn-add-todo');
const formAddTodo = document.querySelector('.form-add-todo');
const formInputTitle = document.querySelector('.form-add-todo__input-title');
const formInputDescription = document.querySelector('.form-add-todo__input-description');
const formВtnCancel = document.querySelector('.form-add-todo__btn-cancel');
const formВtnConfirm = document.querySelector('.form-add-todo__btn-confirm');
const formSelectUser = document.querySelector('.form-add-todo__user');
const controls = document.querySelectorAll('.form-control');
const board = document.querySelector('.board');
const taskListBody = document.querySelector('.task-list__body');
const warning = document.querySelector('.warning');
const warningBtnConfirm = document.querySelector('.warning__btn-confirm');
const warningText = document.querySelector('.warning__text');
const trelloWrapper = document.querySelector('.trello__wrapper');
const goTopBtn = document.querySelector(".go-top");
const taskListBtnShowAll = document.querySelector('.task-list__btn-show-all');
const taskListBtnShowAllTodo = document.querySelector('.task-list__btn-show-all--todo');
const taskListBtnShowAllInProgress = document.querySelector('.task-list__btn-show-all--in-progress');
const taskListBtnShowAllDone = document.querySelector('.task-list__btn-show-all--done');

export {
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
}