import { formInputTitle, formInputDescription, formSelectUser } from './refs.js'; // получение переменных
import { getDay, getTime } from './getData.js' // получить текущую дату и время
import { randomCompleted, randomDay, randomTime, generateUUID } from './getRandom.js' // рандом статуса Todo, даты, времени

function createTodoObj() {
  const userId = generateUUID();
  const todo = {
    todo: {
      id: generateUUID(),
      time: getTime(),
      day: getDay(),
      completed: 'todo',
      userId: userId,
      title: formInputTitle.value,
      body: formInputDescription.value,
    },
    user: {
      id: userId,
      name: formSelectUser.value,
    },
  }

  return todo
};

export { createTodoObj } //создать объект Todo