const All = document.querySelector('.All');
const result = document.querySelector('#result');
let lastValueIsOperator = false;

All.addEventListener('click', function(event) { // Вешаем клики на элементы калькулятора
    if(!event.target.classList.contains('button')) return; // Таргет для того, чтобы понимать, на что нажали + проверка, что нажали ИМЕННО на кнопку
    

let value = event.target.innerText; // Значение кнопок берется из того, что указано в их классе в html 


switch(value) {
    case 'C' :
        result.innerText = ''; // Сброс до начала
        lastValueIsOperator = false;
        break;

    
    case '=':
        if(result.innerText.search(/[^0-9*/+-]/mi) != -1) return; // Регулярка для того, что бы нельзя было ввести, что-то "не то"

        result.innerText = eval(result.innerText).toFixed(1); // Кол-во знаков после точки

        break;

    case '%':
         result.innerText = (eval(result.innerText) * 0.01).toFixed(1);
        break;

    case '+':
    case '-':
    case '*':
    case '/':
      if(lastValueIsOperator) return; // проверяем, что предыдущий символ не является математической операцией 
      result.innerText += value; 
      lastValueIsOperator = true; // устанавливаем флаг
      break;


    default:

        result.innerText += value;
        lastValueIsOperator = false;

        
}
});