document.addEventListener("DOMContentLoaded", function () {
let eventCallback = function (e) {  // Объявление функции обратного вызова для обработки событий
    let el = e.target;    // Получение элемента, вызвавшего событие
    let clearVal = el.dataset.phoneClear;  // Получение данных
    let pattern = el.dataset.phonePattern;
    let matrix_def = "+7(928)___-__-__"; //формат номера телефона по умолчанию
    let matrix = pattern ? pattern : matrix_def; // Формат номера телефона, используемый для форматирования
    let i = 0; //счетчик
    let def = matrix.replace(/\D/g, ""); //замена всех не цифр на пустую строку
    let val = e.target.value.replace(/\D/g, ""); //замена всех не цифр на пустую строку

    if (clearVal !== 'false' && e.type === 'blur') {
        if (val.length < matrix.match(/([\_\d])/g).length) {  // Если длина номера телефона меньше длины формата
            e.target.value = '';  // Очищаем значение элемента
            return;
        }
    }


    if (def.length >= val.length) val = def;
    e.target.value = matrix.replace(/./g, function (a) {  // Форматируем значение номера телефона в соответствии с форматом
        // Если символ в формате является цифрой или символом подчеркивания
        // и счетчик меньше длины значения номера телефона
        if (/[_\d]/.test(a) && i < val.length) {
            return val.charAt(i++);  // Возвращаем символ из номера телефона и увеличиваем счетчик
        } else if (i >= val.length) {  // Если счетчик больше или равен длине значения номера телефона
            return ""; // Возвращаем пустую строку
        } else {
            return a; //возвращаем символ без изменения
        }
    });

    if (phoneNumbers.includes(val)) { //если в массиве есть значение val 
        PasswordInput.style.display = 'block';
    } else {
        PasswordInput.style.display = 'none';
    }
};

let phone_inputs = document.querySelectorAll('[data-phone-pattern]'); // Выбор всех элементов с атрибутом данных 

for (let elem of phone_inputs) { // Добавление обработчика событий для каждого элемента
    for (let ev of ['input', 'blur', 'focus']) {
        elem.addEventListener(ev, eventCallback);
    }
}
});