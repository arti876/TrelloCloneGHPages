// рандомный статус
function randomCompleted() {
  const completedTodo = ['todo', 'done'];
  return completedTodo[Math.floor(Math.random() * completedTodo.length)];
}

// рандомный день
function randomDay(start, end) {
  const rDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  return `${('0' + rDate.getDate()).slice(-2)}-${('0' + (rDate.getMonth() + 1)).slice(-2)}-${rDate.getFullYear()}`
}

// рандомное время
function randomTime(start, end) {
  const rDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  return `${('0' + rDate.getHours()).slice(-2)}:${('0' + rDate.getMinutes()).slice(-2)}:${('0' + rDate.getSeconds()).slice(-2)}`
}

export { randomCompleted, randomDay, randomTime } // рандом статуса Todo, даты, времени