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

function generateUUID() {
  // Получаем текущее время в миллисекундах
  let d = new Date().getTime();
  // Если доступна производительность, то добавляем ее значение к времени
  if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
      d += performance.now();
  }
  // Генерируем UUID в формате 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
}

export { randomCompleted, randomDay, randomTime, generateUUID } // рандом статуса Todo, даты, времени