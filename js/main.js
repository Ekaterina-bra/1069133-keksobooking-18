'use strict';
var ADDS_NUMBER = 8;
var PICTURE_NUMBER = ['01', '02', '03', '04', '05', '06', '07', '08'];
var APARTMENTS_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var APARTMENT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var APARTMENT_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var GUESTS_NUMBER = [1, 2, 3, 100];
var ROOMS_NUMBER = [0, 1, 2, 3];
var PRICE_MAX = 15000;
var PRICE_MIN = 0;
var X_MIN = 0;
var X_MAX = 980;
var Y_MIN = 130;
var Y_MAX = 630;
var ENTER_KEYCODE = 13;
var MAINPIN_WIDTH = 40;
var MAINPIN_HEIGHT = 44;
var MAINPINEND_HEIGHT = 22;

var getRandomArrElement = function (adds) {
  var rand = Math.floor(Math.random() * adds.length);
  return adds[rand];
};
var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateAdd = function () {
  var x = getRandomInt(X_MIN, X_MAX);
  var y = getRandomInt(Y_MIN, Y_MAX);
  var newAdd = {
    author: {
      avatar: 'img/avatars/user' + getRandomArrElement(PICTURE_NUMBER) + '.png'
    },

    offer: {
      title: 'Заголовок объявления',
      address: x + ', ' + y,
      price: getRandomInt(PRICE_MIN, PRICE_MAX),
      type: getRandomArrElement(APARTMENTS_TYPE),
      rooms: getRandomArrElement(ROOMS_NUMBER),
      guests: getRandomArrElement(GUESTS_NUMBER),
      checkin: getRandomArrElement(CHECKIN_TIME),
      checkout: getRandomArrElement(CHECKOUT_TIME),
      features: getRandomArrElement(APARTMENT_FEATURES),
      description: 'Описание',
      photos: [
        getRandomArrElement(APARTMENT_PHOTOS),
        getRandomArrElement(APARTMENT_PHOTOS),
        getRandomArrElement(APARTMENT_PHOTOS)
      ]
    },

    location: {
      x: x,
      y: y
    }
  };
  return newAdd;
};

var generateAdds = function (count) {
  var adds = [];
  for (var i = 0; i < count; i++) {
    adds.push(generateAdd());
  }
  return adds;
};
/* generateAdds(ADDS_NUMBER); */

var mapBlock = document.querySelector('.map');

var pins = document.querySelector('.map__pins');
var pinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (pin) {
  var pinElement = pinsTemplate.cloneNode(true);
  pinElement.style.left = pin.location.x + 'px';
  pinElement.style.top = pin.location.y + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.alt = pin.title;
  return pinElement;
};

var newPins = generateAdds(ADDS_NUMBER);
/* var fragment = document.createDocumentFragment();
for (var i = 0; i < ADDS_NUMBER; i++) {
  fragment.appendChild(renderPin(newPins[i]));
}
pins.appendChild(fragment); */

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card.popup');

var renderCard = function (pinData) {
  var pinDataElement = cardTemplate.cloneNode(true);
  pinDataElement.querySelector('.popup__title').textContent = pinData.offer.title;
  pinDataElement.querySelector('.popup__text--address').textContent = pinData.offer.address;
  pinDataElement.querySelector('.popup__text--price').textContent = pinData.offer.price + '₽/ночь';
  var typeName = '';
  switch (pinData.offer.type) {
    case 'flat':
      typeName = 'Квартира';
      break;
    case 'bungalo':
      typeName = 'Бунгало';
      break;
    case 'house':
      typeName = 'Дом';
      break;
    case 'palace':
      typeName = ' Дворец';
      break;
  }
  pinDataElement.querySelector('.popup__type').textContent = typeName;
  pinDataElement.querySelector('.popup__text--capacity').textContent = pinData.offer.rooms + ' комнаты для ' + pinData.offer.guests + ' гостей';
  pinDataElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pinData.offer.checkin + ', выезд до ' + pinData.offer.checkout;
  pinDataElement.querySelector('.popup__features').textContent = pinData.offer.features;
  pinDataElement.querySelector('.popup__description').textContent = pinData.offer.description;
  var photosBlock = pinDataElement.querySelector('.popup__photos');
  var photosList = pinData.offer.photos;
  var firstPhoto = photosBlock.querySelector('img');
  for (var j = 0; j < photosList.length; j++) {
    var photoElement = firstPhoto.cloneNode(true);
    photoElement.src = photosList[j];
    photosBlock.appendChild(photoElement);
  }
  firstPhoto.remove();
  var avatarBlock = pinDataElement.querySelector('.popup__avatar');
  avatarBlock.src = pinData.author.avatar;
};
/* renderCard(newPins[0]); */

var filtersContainer = document.querySelector('.map__filters-container');
/* var newElement = mapBlock.appendChild(renderCard(newPins[0]));
mapBlock.insertBefore(newElement, filtersContainer); */

var form = document.querySelector('.notice').querySelector('.ad-form');
form.classList.add('ad-form--disabled');

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
adressInput.value = (offsetLeft + MAINPIN_WIDTH * 0.5) + ', ' + (offsetTop + MAINPIN_HEIGHT * 0.5);

var mainPin = pins.querySelector('.map__pin--main');
var getActivePage = function () {
  mapBlock.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  for (var j = 0; j < fieldsetElements.length; j++) {
    fieldsetElements[j].disabled = false;
  }
  filters.classList.remove('disabled');
};
var setActiveAdressField = function () {
  adressInput.value = (offsetLeft + MAINPIN_WIDTH * 0.5) + ', ' + (offsetTop + MAINPINEND_HEIGHT + MAINPIN_HEIGHT * 0.5);
};

mainPin.addEventListener('mousedown', function () {
  getActivePage();
  setActiveAdressField();
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    getActivePage();
    setActiveAdressField();
  }
});

var roomNumberInput = form.querySelector('#room_number');
var guestsNumberInput = form.querySelector('#capacity');
var checkRoomNumber = function () {
  if (roomNumberInput.value === '1') {
    var capacityGuests = '1';
    if (guestsNumberInput.value === capacityGuests) {
      guestsNumberInput.setCustomValidity('');
    } else {
      guestsNumberInput.setCustomValidity('Введено неправильное значение');
      console.log(guestsNumberInput.value);
    }

  } else if (roomNumberInput.value === '2') {
    capacityGuests = ['2', '1'];
    if (capacityGuests.includes(guestsNumberInput.value)) {
      guestsNumberInput.setCustomValidity('');
    } else {
      guestsNumberInput.setCustomValidity('Введено неправильное значение');
    }
  } else if (roomNumberInput.value === '3') {
    capacityGuests = ['3', '2', '1'];
    if (capacityGuests.includes(guestsNumberInput.value)) {
      guestsNumberInput.setCustomValidity('');
    } else {
      guestsNumberInput.setCustomValidity('Введено неправильное значение');
    }
  } else if (roomNumberInput.value === '100') {
    capacityGuests = '0';
    if (guestsNumberInput.value === capacityGuests) {
      guestsNumberInput.setCustomValidity('');
    } else {
      guestsNumberInput.setCustomValidity('Введено неправильное значение');
    }
  }
};
/* var invalidValue = 'Введено неправильное значение';
  var validValue = ''; */
roomNumberInput.addEventListener('change', function () {
  checkRoomNumber();
});
guestsNumberInput.addEventListener('change', function () {
  checkRoomNumber();
});
