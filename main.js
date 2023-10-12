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

    // Підготовка для збереження індексів
    const indexes = [];

    // Цикл для перевірки кожного об'єкта
    for (const item of jsonData) {
      if (item.ku === "13" && parseFloat(item.value) > 5) {
        indexes.push(item.value);
      }
    }

    // Перевіряємо, чи є дані, щоб не записувати порожній файл
    if (indexes.length === 0) {
      console.log('Немає відповідних даних для запису.');
      return;
    }

    // Записуємо індекси у файл output.txt
    fs.writeFile('output.txt', indexes.join('\n'), (err) => {
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
