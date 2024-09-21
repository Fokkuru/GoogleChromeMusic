 // Функция для обновления интерфейса
 function updateUI() {
    dataContainer.innerHTML = ''; // Очищаем предыдущий контент
    chrome.storage.local.get(['jsonArray'], (result) => {
        const jsonArray = result.jsonArray || []; // Если нет, создаем пустой массив

        // Отображаем обновленные данные
        jsonArray.forEach((item, index) => {
           
            let obj = parseJsonToObj(item)
            let div = makeAudioElem(obj)[0]
            // Создаем кнопку для удаления
            const deleteButton = div.querySelector('.delButt');
            
            deleteButton.addEventListener('click', () => {
                // Удаляем элемент по индексу
                jsonArray.splice(index, 1);

                // Сохраняем обновленный массив в chrome.storage
                chrome.storage.local.set({ jsonArray: jsonArray }, () => {
                    console.log(`Элемент "${item}" удален.`);
                    updateUI(); // Обновляем интерфейс
                });
            });

            // Добавляем кнопку в элемент
            div.appendChild(deleteButton);
            dataContainer.appendChild(div);
        });

        if (jsonArray.length === 0) {
            dataContainer.textContent = "Нет данных"; // Если данных нет
        }
    });
}