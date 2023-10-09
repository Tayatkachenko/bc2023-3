const fs = require('fs');

// Читаємо вміст файлу data.json
fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Помилка читання файлу data.json: ', err);
    return;
  }

  try {
    // Розбираємо JSON-дані
    const jsonData = JSON.parse(data);

    // Фільтруємо дані за вказаними умовами
    const filteredData = jsonData.filter(item => item.ku === "13" && parseFloat(item.value) > 5);

    // Перевіряємо, чи є дані, щоб не записувати порожній файл
    if (filteredData.length === 0) {
      console.log('Немає відповідних даних для запису.');
      return;
    }

    // Вибираємо значення індексу (ключ "value") і перетворюємо їх у рядок
    const resultString = filteredData.map(item => parseFloat(item.value).toFixed(1)).join('\n');

    // Записуємо рядок у файл output.txt
    fs.writeFile('output.txt', resultString, (err) => {
      if (err) {
        console.error('Помилка запису в файл output.txt: ', err);
      } else {
        console.log('Дані успішно записані у файл output.txt');
      }
    });
  } catch (error) {
    console.error('Помилка розбору JSON: ', error);
  }
});

