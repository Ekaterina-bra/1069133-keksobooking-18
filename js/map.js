'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ADDS_NUMBER = 8;

  var pins = document.querySelector('.map__pins');

  var newPins = window.data.generateAdds(ADDS_NUMBER);
  var renderPins = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < ADDS_NUMBER; i++) {
      var pinElement = window.pin.render(newPins[i]);
      fragment.appendChild(pinElement);
      onPinClickListener(pinElement, newPins[i]);
    }
    pins.appendChild(fragment);
  };
  var activatePin = function (pinElement) {
    pinElement.classList.add('map__pin--active');
  };
  var unActivatePin = function (pinElement) {
    pinElement.classList.remove('map__pin--active');
  };
  var mapBlock = document.querySelector('.map');
  var form = document.querySelector('.notice').querySelector('.ad-form');

  var mainPin = pins.querySelector('.map__pin--main');
  var getActivePage = function () {
    mapBlock.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    for (var j = 0; j < window.form.fieldsetElements.length; j++) {
      window.form.fieldsetElements[j].disabled = false;
    }
    window.form.filters.classList.remove('disabled');
  };
  var getMainPinAction = function () {
    getActivePage();
    window.form.setActiveAdressField();
    renderPins();
    window.form.checkValidationForm();
  };

  mainPin.addEventListener('mousedown', function () {
    getMainPinAction();
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      getMainPinAction();
    }
  });

  var filtersContainer = document.querySelector('.map__filters-container');
  var onPinClickListener = function (pinElement, pin) {
    pinElement.addEventListener('click', function () {
      mapBlock.insertBefore(window.card.render(pin), filtersContainer);
    });
    activatePin(pinElement);
  };
  window.map = {
    unActivatePin: unActivatePin,
  };
})();
