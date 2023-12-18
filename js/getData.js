function getDay() {
  const data = new Date();
  const Year = data.getFullYear();
  const Month = data.getMonth();
  const Day = data.getDate();

  return `${Day}-${Month}-${Year}`
}

function getTime() {
  const data = new Date();
  const Hour = ('0' + data.getHours()).slice(-2);
  const Minutes = ('0' + data.getMinutes()).slice(-2);
  const Seconds = ('0' + data.getSeconds()).slice(-2);

  return `${Hour}:${Minutes}:${Seconds}`
}

export { getDay, getTime } // получить текущую дату и время