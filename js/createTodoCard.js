import { taskListBodyTodo, taskListBodyInProgress, taskListBodyDone } from './refs.js'; // получение переменных
import { createDiv, createButton, } from './htmlCreateElement.js' // создание элементов html

function createTodoCard(todosGetData) {
  let { todo: { id, title, body, time, day, completed }, user: { name } } = todosGetData;
  const lengthTaskInProgress = document.getElementsByClassName('task--in-progress').length

  if (completed === 'inProgress' && lengthTaskInProgress < 6) {
  // if (completed === 'inProgress') {
    const elTask = createDiv('task task--in-progress');
    elTask.draggable = true; // Drag'n'drop ON
    elTask.id = id;
    const elTaskBtnContainer = createDiv('task__btn-container');
    const elTaskBody = createDiv('task__body');
    const elTaskHeaer = createDiv('task__header');
    const elTaskFooter = createDiv('task__footer');
    const elTaskTitle = createDiv('task__title');
    elTaskTitle.textContent = title;
    const elTaskDescription = createDiv('task__description');
    elTaskDescription.textContent = body;
    const elTaskUser = createDiv('task__user');
    elTaskUser.textContent = name;
    const elTaskDateContainer = createDiv('task__date-container');
    const elTaskTime = createDiv('task__time');
    elTaskTime.textContent = time;
    const elTaskDate = createDiv('task__date');
    elTaskDate.textContent = day;
    const elTaskBtnBack = createButton('task__btn task__btn--back', 'BACK');
    const elTaskBtnComplete = createButton('task__btn task__btn--complete', 'COMPLETE');
    taskListBodyInProgress.append(elTask);
    elTask.append(elTaskHeaer, elTaskBody, elTaskFooter);
    elTaskHeaer.append(elTaskBtnContainer, elTaskTitle);
    elTaskBtnContainer.append(elTaskBtnBack, elTaskBtnComplete);
    elTaskBody.append(elTaskDescription);
    elTaskFooter.append(elTaskUser, elTaskDateContainer);
    elTaskDateContainer.append(elTaskTime, elTaskDate);
  } else if (completed === 'done') {
    const elTask = createDiv('task task--done');
    elTask.draggable = true; // Drag'n'drop ON
    elTask.id = id;
    const elTaskBtnDel = createButton('task__btn task__btn--del', 'DELETE');
    const elTaskBtnContainer = createDiv('task__btn-container');
    const elTaskBody = createDiv('task__body');
    const elTaskHeaer = createDiv('task__header');
    const elTaskFooter = createDiv('task__footer');
    const elTaskTitle = createDiv('task__title');
    elTaskTitle.textContent = title;
    const elTaskDescription = createDiv('task__description');
    elTaskDescription.textContent = body;
    const elTaskUser = createDiv('task__user');
    elTaskUser.textContent = name;
    const elTaskDateContainer = createDiv('task__date-container');
    const elTaskTime = createDiv('task__time');
    elTaskTime.textContent = time;
    const elTaskDate = createDiv('task__date');
    elTaskDate.textContent = day;
    taskListBodyDone.append(elTask);
    elTask.append(elTaskHeaer, elTaskBody, elTaskFooter);
    elTaskHeaer.append(elTaskBtnContainer, elTaskTitle);
    elTaskBtnContainer.append(elTaskBtnDel);
    elTaskBody.append(elTaskDescription);
    elTaskFooter.append(elTaskUser, elTaskDateContainer);
    elTaskDateContainer.append(elTaskTime, elTaskDate);
  } else if (completed === 'todo') {
    const elTask = createDiv('task task--todo');
    elTask.draggable = true; // Drag'n'drop ON
    elTask.id = id;
    const elTaskBtnEdit = createButton('task__btn task__btn--edit', 'EDIT');
    const elTaskBtnDel = createButton('task__btn task__btn--del', 'DELETE');
    const elTaskBtnRelocate = createButton('task__btn task__btn--relocate', '>');
    const elTaskBtnContainer = createDiv('task__btn-container');
    const elTaskBody = createDiv('task__body');
    const elTaskHeaer = createDiv('task__header');
    const elTaskFooter = createDiv('task__footer');
    const elTaskTitle = createDiv('task__title');
    elTaskTitle.textContent = title;
    const elTaskDescription = createDiv('task__description');
    elTaskDescription.textContent = body;
    const elTaskUser = createDiv('task__user');
    elTaskUser.textContent = name;
    const elTaskDateContainer = createDiv('task__date-container');
    const elTaskTime = createDiv('task__time');
    elTaskTime.textContent = time;
    const elTaskDate = createDiv('task__date');
    elTaskDate.textContent = day;
    taskListBodyTodo.append(elTask);
    elTask.append(elTaskHeaer, elTaskBody, elTaskFooter);
    elTaskHeaer.append(elTaskBtnContainer, elTaskTitle);
    elTaskBtnContainer.append(elTaskBtnEdit, elTaskBtnDel);
    elTaskBody.append(elTaskDescription, elTaskBtnRelocate);
    elTaskFooter.append(elTaskUser, elTaskDateContainer);
    elTaskDateContainer.append(elTaskTime, elTaskDate);
  }
}

export { createTodoCard } // создание новой карточки дел