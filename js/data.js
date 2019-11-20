'use strict';

(function () {
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
  window.data = {
    generateAdds: generateAdds,
  };
})();
