import { setData } from './localStorage.js'// запись-чтение данных localStorage
import { randomCompleted, randomDay, randomTime, generateUUID } from './getRandom.js' // рандом статуса Todo, даты, времени

async function getTrelloData() {
  const fetchData = async (type) => fetch(`https://jsonplaceholder.typicode.com/${type}`).then(r => r.json());

  await Promise.all(['users', 'posts'].map(fetchData))
    .then(([users, posts]) => {
      const usersObj = Object.fromEntries(users.map(n => [n.id, n]))
      return posts.map(n => ({
        todo: n.id = generateUUID(),
        todo: n.time = randomTime(new Date(2020, 0, 1), new Date()),
        todo: n.day = randomDay(new Date(2020, 0, 1), new Date()),
        todo: n.completed = randomCompleted(),
        todo: n,
        user: usersObj[n.userId],
      }))
    })
    .then(todos => {
      // todos.length = 30;
      return setData('todos', todos)
    })
}

export { getTrelloData } // получение данных с jsonplaceholder