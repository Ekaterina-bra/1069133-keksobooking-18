'use strict';

(function () {
  var pinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var renderPin = function (pin) {
    var pinElement = pinsTemplate.cloneNode(true);
    pinElement.style.left = pin.location.x + 'px';
    pinElement.style.top = pin.location.y + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.alt = pin.title;
    return pinElement;
  };
})();
