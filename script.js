const All = document.querySelector('.All');                     //Получаем ссылку на элемент с классом All
const result = document.querySelector('#result');               // Получаем ссылку на элемент с id "result
let lastValueIsOperator = false;                                //Переменная для отслеживания того, является ли последнее введенное значение оператором
let calculationsPerformed = false;

All.addEventListener('click', function(event) {                 //добавляет обработчик событий на клик для элемента с классом "All". Когда пользователь кликает на элементе, выполняется функция внутри
    if (!event.target.classList.contains('button')) return;     //проверяет, был ли клик на элементе с классом "button". Если нет, функция завершается, и ничего не происходит.

    let value = event.target.innerText;                         // переменная получает текст кнопки, на которую произошел клик, и сохраняет его в переменной value.

    switch (value) {                                            //выполняет различные действия в зависимости от значения value
        case 'C':
            result.innerText = '';
            lastValueIsOperator = false;
            calculationsPerformed = false;
            break;
        case '=':
            if (result.innerText.search(/[^0-9.,*/+\-]/mi) !== -1) return;  // Регулярка для того, что бы нельзя было ввести, что-то "не то"
            result.innerText = eval(replaceCommasWithDots(result.innerText)).toFixed(1);        // Кол-во знаков после точки, и заменяем запятые точками
            lastValueIsOperator = false;
            calculationsPerformed = true;
            break;
        case '%':
            result.innerText = (eval(replaceCommasWithDots(result.innerText)) * 0.01).toFixed(1);
            calculationsPerformed = true;
            break;
        case '.':
        case ',':
            if (lastValueIsOperator || result.innerText.includes('.') || result.innerText.includes(',')) { //ИЛИ
                return;
            }
            result.innerText += '.';
            lastValueIsOperator = false;
            calculationsPerformed = false;
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            if (lastValueIsOperator) return;                            //проверяем, что предыдущий символ не является математической операцией
            result.innerText += value;
            lastValueIsOperator = true;
            calculationsPerformed = false;
            break;
        default:
            if (calculationsPerformed) {                                //Если уже выполнены вычисления, сбросить старые данные
                result.innerText = value;
                calculationsPerformed = false;
            } else {
                result.innerText += value;
            }
            lastValueIsOperator = false;
    }
});

result.addEventListener('input', function() {                            //Добавляем слушатель события input для сброса флага calculationsPerformed при изменении в поле ввода
    calculationsPerformed = false;
});

function replaceCommasWithDots(expression) {                            //функция, которая заменяет все запятые на точки в переданном выражении.
    return expression.replace(/,/g, '.');
}
