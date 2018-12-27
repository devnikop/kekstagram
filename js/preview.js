'use strict';

(function () {
  var addCommentsInBigPicture = function (pictureComments) {
    var fragment = document.createDocumentFragment();
    var commentTemplate = document.querySelector('#comment').content;

    for (var i = 0; i < pictureComments.length; i++) {
      var commentElement = commentTemplate.cloneNode(true);
      commentElement.querySelector('.social__picture').src = pictureComments[i].avatar;
      commentElement.querySelector('.social__text').textContent = pictureComments[i].message;
      fragment.appendChild(commentElement);
    }
    return fragment;
  };

  var addBigPicture = function (bigPictureElement, picture) {
    bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
    bigPictureElement.querySelector('.social__caption').textContent = picture.description;
    bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
    bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;

    var comentsContainerElement = bigPictureElement.querySelector('.social__comments');
    while (comentsContainerElement.firstChild) {
      comentsContainerElement.firstChild.remove();
    }
    comentsContainerElement.appendChild(addCommentsInBigPicture(picture.comments));
  };

  window.preview = function (bigPictureTemplate, picture) {
    var closeBigPicture = function () {
      bigPictureElement.remove();
      document.removeEventListener('keydown', onBigPictureEscPress);
      document.body.classList.remove('modal-open');
    };

    var onBigPictureEscPress = function (evt) {
      if (evt.keyCode === 27) {
        closeBigPicture();
      }
    };

    var bigPictureElement = bigPictureTemplate.cloneNode(true).querySelector('.big-picture');
    document.querySelector('main').appendChild(bigPictureElement);
    document.body.classList.add('modal-open');

    addBigPicture(bigPictureElement, picture);

    var bigPictureCancelElement = bigPictureElement.querySelector('.big-picture__cancel');
    bigPictureCancelElement.addEventListener('click', closeBigPicture);
    document.addEventListener('keydown', onBigPictureEscPress);

    document.querySelector('.social__comment-count').classList.add('visually-hidden');
    document.querySelector('.comments-loader').classList.add('visually-hidden');
  };
})();
