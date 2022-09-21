import React from 'react';

function PhotoModal({ photoURL, viewPhoto, closePhotoModal, setViewPhoto }) {
  return !viewPhoto ? (
    ''
  ) : (
    <div id="photo-window" fromelement="Ratings/Reviews">
      <div id="modal-photo" fromelement="Ratings/Reviews">
        <div onClick={() => closePhotoModal(setViewPhoto)}>
          <i
            id="photo-window-icon"
            fromelement="Ratings/Reviews"
            className="fak fa-square-xmark-light fa-2xl"
          ></i>
        </div>
        <img
          className="modal-photo"
          fromelement="Ratings/Reviews"
          src={photoURL}
          alt="Photo Not Available"
        ></img>
      </div>
    </div>
  );
}

export default PhotoModal;
