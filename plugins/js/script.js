// Функция ymaps.ready() будет вызвана, когда
    // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
    ymaps.ready(init);
    function init(){
        // Создание карты.
        var myMap = new ymaps.Map("map", {
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [48.87, 2.35],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 12
        });

        // Создание кастомной метки
        var myPlacemark = new ymaps.Placemark([48.87, 2.35], {}, {
          iconLayout: 'default#image',
          iconImageHref: 'img/map/Subtract.svg',
          iconImageSize: [30, 42],
          iconImageOffset: [-3, -42]
        });

        // Размещение геообъекта на карте.
        myMap.geoObjects.add(myPlacemark); 
      }


// selectbar     
const element = document.querySelector('#select');
    const choices = new Choices(element, {
      itemSelectText: '',
      searchEnabled: false
    });


// inputmask 
var telSelector = document.querySelector("input[type='tel']"); // выбираем все инпуты с типом тел

var im = new Inputmask("+7 (999)-999-99-99");
im.mask(telSelector);  


// validate старая версия!!!
new window.JustValidate('#form');
new JustValidate('#form', {
  rules: {
   tel: {
    required: true,
    function: (name, value) => {
      const phone = telSelector.inputmask.unmaskedvalue();
      console.log(phone);
      return Number(phone) && phone.length === 10;
    }
   }
  },
  messages: {
    name: {
      required: 'Вы не ввели имя',
      minLength: 'Введите 3 и более символов',
      maxLength: 'Запрещено вводить более 15-ти символов',
    },
    email: {
      required: 'Вы не ввели e-mail',
    },
    tel: {
      required: 'Вы не ввели телефон',
      function: 'Здесь долдно быть не менее 10-ти символов'
    }
  },
  colorWrong: '#FF5C00;',
});



