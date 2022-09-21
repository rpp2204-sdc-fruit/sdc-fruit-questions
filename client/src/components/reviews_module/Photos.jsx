import React, { useState } from 'react';

function Photos({ photos, handleUserInputs }) {
  const [addPhotoDiv, setAddPhotoDiv] = useState(<div />);

  function handlePhotos(e) {
    let files = e.target.files;
    console.log(files);
    let fileURLs = [];

    if (files.length + photos.length > 5) {
      throw new Error('Too Many Files Uploaded: Max(5)');
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const img = document.createElement('img');
      img.className = 'review-image';
      img.file = file;
      img.width = 80;
      img.onclick = function(e) {
        e.target.remove();
        console.log(files);
      }

      images.appendChild(img);

      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
        fileURLs.push(e.target.result);
        handleUserInputs('photos', fileURLs);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <fieldset id="review-photos" fromelement="Ratings/Reviews">
      <legend id="review-photos-header" fromelement="Ratings/Reviews">
        Upload your photos
      </legend>
      <input
        id="photo-input"
        fromelement="Ratings/Reviews"
        type="file"
        accept="image/png, image/jpeg"
        onChange={(e) => handlePhotos(e)}
      ></input>
      <div id="images" fromelement="Ratings/Reviews"></div>
    </fieldset>
  );
}

export default Photos;
