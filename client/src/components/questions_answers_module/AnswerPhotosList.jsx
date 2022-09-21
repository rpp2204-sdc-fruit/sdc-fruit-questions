import React, { useState, useEffect } from 'react';
import validUrl from 'valid-url';

function AnswerPhotosList({ photos }) {
  return (
    <div className="answer-img">
      {photos.map((photo) => {
        if (validUrl.isUri(photo.url)) {
          return (
            <img
              id="answer-img"
              alt="not available"
              key={photo.id}
              src={photo.url}
            />
          );
        }
      })}
    </div>
  );
}

export default AnswerPhotosList;
