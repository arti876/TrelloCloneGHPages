// получить
function getData(key) {
  return JSON.parse(localStorage.getItem(key)) ?? [];
};

// записать
function setData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

export { getData, setData } // запись-чтение данных localStorage