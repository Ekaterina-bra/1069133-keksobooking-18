'use strict';

(function () {
  var MAINPIN_WIDTH = 40;
  var MAINPIN_HEIGHT = 44;
  var MAINPINEND_HEIGHT = 22;

  var form = document.querySelector('.notice').querySelector('.ad-form');

  var getUnaktiveForm = function () {
    form.classList.add('ad-form--disabled');
  };
  getUnaktiveForm();

  var fieldsetElements = form.querySelectorAll('fieldset');
  for (var i = 0; i < fieldsetElements.length; i++) {
    var newFieldsetElements = fieldsetElements[i];
    newFieldsetElements.disabled = true;
  }

  var filters = document.querySelector('.map__filters');
  filters.classList.add('disabled');

  var adressInput = document.querySelector('#address');
  var offsetTop = 375;
  var offsetLeft = 570;

  var setActiveAdressField = function () {
    adressInput.value = (offsetLeft + MAINPIN_WIDTH * 0.5) + ', ' + (offsetTop + MAINPINEND_HEIGHT + MAINPIN_HEIGHT * 0.5);
  };
  setActiveAdressField(MAINPIN_WIDTH);


  var roomNumberInput = form.querySelector('#room_number');
  var guestsNumberInput = form.querySelector('#capacity');

  var checkRoomNumber = function () {
    if (roomNumberInput.value === '1') {
      var capacityGuests = ['1'];
    } else if (roomNumberInput.value === '2') {
      capacityGuests = ['2', '1'];
    } else if (roomNumberInput.value === '3') {
      capacityGuests = ['3', '2', '1'];
    } else if (roomNumberInput.value === '100') {
      capacityGuests = '0';
    }
    if (capacityGuests.includes(guestsNumberInput.value)) {
      guestsNumberInput.setCustomValidity('');
    } else {
      guestsNumberInput.setCustomValidity('Введено неправильное значение');
    }
  };

  roomNumberInput.addEventListener('change', function () {
    checkRoomNumber();
  });
  guestsNumberInput.addEventListener('change', function () {
    checkRoomNumber();
  });

  var titleInput = form.querySelector('#title');

  var checkTitle = function () {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('Заголовок не должен превышать 100-а символов');
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else {
      titleInput.setCustomValidity('');
    }
  };
  titleInput.addEventListener('invalid', function () {
    checkTitle();
  });
  var timeinInput = form.querySelector('#timein');
  var timeoutInput = form.querySelector('#timeout');
  var checkTimeOut = function () {
    timeoutInput.value = timeinInput.value;
  };
  timeinInput.addEventListener('change', function () {
    checkTimeOut();
  });
  var checkTimeIn = function () {
    timeinInput.value = timeoutInput.value;
  };
  timeoutInput.addEventListener('change', function () {
    checkTimeIn();
  });

  var apartmentsTypeInput = form.querySelector('#type');
  var priceInput = form.querySelector('#price');
  var setMinPrice = function () {
    if (apartmentsTypeInput.value === 'bungalo') {
      var minPrice = 0;
    } else if (apartmentsTypeInput.value === 'flat') {
      minPrice = 1000;
    } else if (apartmentsTypeInput.value === 'house') {
      minPrice = 5000;
    } else if (apartmentsTypeInput.value === 'palace') {
      minPrice = 10000;
    }
    priceInput.placeholder = minPrice;
    priceInput.min = minPrice;
  };

  apartmentsTypeInput.addEventListener('change', function () {
    setMinPrice();
  });

  var checkValidationForm = function () {
    checkRoomNumber();
    setMinPrice();
    checkTimeOut();
    checkTimeIn();
    checkTitle();
  };

  window.form = {
    checkValidationForm: checkValidationForm,
    setActiveAdressField: setActiveAdressField,
    fieldsetElements: fieldsetElements,
    filters: filters,
  };
})();

