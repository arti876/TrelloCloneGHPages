import { formInputTitle, formInputDescription, formSelectUser } from './refs.js'; // получение переменных
import { v4 as uuidv4 } from 'uuid'; // рандом id
import { getDay, getTime } from './getData.js' // получить текущую дату и время

function createTodoObj() {
  const userId = uuidv4();
  const todo = {
    todo: {
      id: uuidv4(),
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