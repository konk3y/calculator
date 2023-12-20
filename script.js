const All = document.querySelector('.All');             //Получаем ссылку на элемент с классом All
const result = document.querySelector('#result');       // Получаем ссылку на элемент с id "result
let lastValueIsOperator = false;                        //Переменная для отслеживания того, является ли последнее введенное значение оператором
let calculationsPerformed = false;                      //Флаг, который указывает, были ли выполнены вычисления. Он используется для сброса старых данных при вводе новых после выполнения вычислений.

All.addEventListener('click', function(event) {                           // Вешаем обработчик событий - клики на элементы калькулятора
    if (!event.target.classList.contains('button')) return;               // Таргет для того, чтобы понимать, на что нажали + проверка, что нажали ИМЕННО на кнопку

    let value = event.target.innerText;                                 // Значение кнопок берется из того, что указано в их классе в html

    switch (value) {
        case 'C':
            result.innerText = '';                                      // Сброс до начала
            lastValueIsOperator = false;
            calculationsPerformed = false;
            break;
        case '=':
            if (result.innerText.search(/[^0-9*/+-]/mi) != -1) return;      // Регулярка для того, что бы нельзя было ввести, что-то "не то"
            result.innerText = eval(result.innerText).toFixed(1);           // Кол-во знаков после точки
            lastValueIsOperator = false;
            calculationsPerformed = true;
            break;
        case '%':
            result.innerText = (eval(result.innerText) * 0.01).toFixed(1);  
            calculationsPerformed = true;
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            if (lastValueIsOperator) return;        // проверяем, что предыдущий символ не является математической операцией 
            result.innerText += value;
            lastValueIsOperator = true;
            calculationsPerformed = false;
            break;
        default:
            
            if (calculationsPerformed) {            // Если уже выполнены вычисления, сбросить старые данные
                result.innerText = value;
                calculationsPerformed = false;
            } else {
                result.innerText += value;
            }
            lastValueIsOperator = false;
    }
});

result.addEventListener('input', function() {           // Добавляем слушатель события input для сброса флага calculationsPerformed при изменении в поле ввода
    calculationsPerformed = false;
});
