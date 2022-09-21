/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ReactImageZoom from 'react-image-zoom';

function Expanded(props) {
  const imageProps = {
    img: props.selectedPhoto,
    zoomPosition: 'original',
  };
  // new ImageZoom(document.getElementById('expanded-img'), options);
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        {/* <button
          onClick={() => {
            props.changeViewDefault();
          }}
          className="x"
        >
          X
        </button> */}
        <Button
          variant="text"
          className="x"
          onClick={() => {
            props.changeViewDefault();
          }}
        >
          X
        </Button>
        <div className="main-img-container">
          <div className="main-img-and-arrows">
            <Button
              onClick={(e) => {
                props.previousPhoto(e);
              }}
              variant="text"
            >
              &lt;
            </Button>
            {/* <img src={props.selectedPhoto} className="expanded-img" /> */}
            <ReactImageZoom {...imageProps} />
            <Button
              onClick={(e) => {
                props.nextPhoto(e);
              }}
            >
              &gt;
            </Button>
          </div>
        </div>
        <div className="expanded-photo-gallery">
          {props.photos.map((photo, index) => {
            if (index === props.selectedIndex) {
              return (
                <img
                  onClick={(e) => {
                    handleChangePhoto(e);
                  }}
                  className="style-other-imgs-selected"
                  src={photo.url}
                  index={index}
                />
              );
            }
            return (
              <img
                onClick={(e) => {
                  props.changeSelectedPhoto(e);
                }}
                className="style-other-imgs"
                src={photo.url}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Expanded;
