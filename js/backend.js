'use strict';

(function () {
  var SUCCESS_OK = 200;
  var TIMEOUT = 10000;
  var Url = {
    LOAD: 'https://js.dump.academy/kekstagram/data',
    SAVE: 'https://js.dump.academy/kekstagram'
  };

  var createRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = createRequest(onLoad, onError);
      xhr.open('GET', Url.LOAD);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = createRequest(onLoad, onError);
      xhr.timeout = TIMEOUT;
      xhr.open('POST', Url.SAVE);
      xhr.send(data);
    }
  };
})();
