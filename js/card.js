'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card.popup');
  var getTypeName = function (pinData) {
    var typeName = '';
    switch (pinData.offer.type) {
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      case 'palace':
        return ' Дворец';
    }
    return typeName;
  };

  var renderCard = function (pinData) {
    var pinDataElement = cardTemplate.cloneNode(true);
    pinDataElement.querySelector('.popup__title').textContent = pinData.offer.title;
    pinDataElement.querySelector('.popup__text--address').textContent = pinData.offer.address;
    pinDataElement.querySelector('.popup__text--price').textContent = pinData.offer.price + '₽/ночь';
    pinDataElement.querySelector('.popup__type').textContent = getTypeName(pinData);
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
    initCloseCardListener(pinDataElement);
    return pinDataElement;
  };


  var initCloseCardListener = function (pinDataElement) {
    var popupClose = pinDataElement.querySelector('.popup__close');
    var closeCard = function () {
      pinDataElement.remove();
      document.removeEventListener('keydown', onCardEscPress);
    };
    var onCardEscPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeCard();
      }
    };
    popupClose.addEventListener('click', function () {
      closeCard();
    });
    document.addEventListener('keydown', onCardEscPress);
    window.map.unActivatePin();
  };

  window.card = {
    render: renderCard,
  };
})();

