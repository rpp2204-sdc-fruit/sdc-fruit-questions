import React from 'react';

function ErrorModal({ error, errorModal, setErrorModal }) {
  return errorModal ? (
    <div id="error-window" fromelement="Ratings/Reviews">
      <div id="error-modal" fromelement="Ratings/Reviews">
        <div onClick={() => setErrorModal((errorModal) => false)}>
          <i
            id="error-modal-icon"
            fromelement="Ratings/Reviews"
            className="fak fa-square-xmark-light fa-lg"
          ></i>
        </div>
        <div id="error" fromelement="Ratings/Reviews">{`You must enter the following: ${error.current.toUpperCase()}`}</div>
        <div id="error-msg" fromelement="Ratings/Reviews">{'missing field or incorrect format'}</div>
      </div>
    </div>
  ) : (
    ''
  );
}

export default ErrorModal;
