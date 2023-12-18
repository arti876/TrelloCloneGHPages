function updateCounter() {
    // счетчик Todo
    (function getTodoCounter() {
      const taskListCountersTodo = document.querySelector('.task-list__counters--todo');
      const taskTodoAll = document.getElementsByClassName('task--todo');
      return taskListCountersTodo.textContent = taskTodoAll.length;
    })();
  // счетчик InProgress
  (function getInProgressCounter() {
    const taskListCountersInProgress = document.querySelector('.task-list__counters--in-progress');
    const taskInProgressAll = document.getElementsByClassName('task--in-progress');
    return taskListCountersInProgress.textContent = taskInProgressAll.length;
  })();
  // счетчик Done
  (function getDoneCounter() {
    const taskListCountersDone = document.querySelector('.task-list__counters--done');
    const taskDoneAll = document.getElementsByClassName('task--done');
    return taskListCountersDone.textContent = taskDoneAll.length;
  })();
};

export { updateCounter } // обновление счетчиков Todos