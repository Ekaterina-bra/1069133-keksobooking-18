'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var ADDS_NUMBER = 8;

  var pins = document.querySelector('.map__pins');

  var newPins = generateAdds(ADDS_NUMBER);
  var renderPins = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < ADDS_NUMBER; i++) {
      var pinElement = renderPin(newPins[i]);
      fragment.appendChild(pinElement);
      initOpenCardListener(pinElement, newPins[i]);
    }
    pins.appendChild(fragment);
  };
  var mapBlock = document.querySelector('.map');

  var mainPin = pins.querySelector('.map__pin--main');
  var getActivePage = function () {
    mapBlock.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    for (var j = 0; j < fieldsetElements.length; j++) {
      fieldsetElements[j].disabled = false;
    }
    filters.classList.remove('disabled');
  };

  mainPin.addEventListener('mousedown', function () {
    getActivePage();
    setActiveAdressField();
    renderPins();
    checkValidationForm();
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      getActivePage();
      setActiveAdressField();
      renderPins();
      checkValidationForm();
    }
  });

  var filtersContainer = document.querySelector('.map__filters-container');
  var initOpenCardListener = function (pinElement, pin) {
    pinElement.addEventListener('click', function () {
      mapBlock.insertBefore(renderCard(pin), filtersContainer);
    });
  };

  var initCloseCardListener = function (pinDataElement) {
    var popupClose = pinDataElement.querySelector('.popup__close');
    popupClose.addEventListener('click', function () {
      pinDataElement.remove();
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        pinDataElement.remove();
      }
    });
  };
})();
