import React, { useMemo } from 'react';

function ProductBreakdown({ characteristics }) {
  const characteristicsBreakDown = useMemo(() => {
    return createCharsDiv(characteristics);
  }, [characteristics]);

  function createCharsDiv() {
    const newCharDiv = [];

    const poorAndGreat = [
      <div id="poor" fromelement="Ratings/Reviews" key="poor">
        Poor
      </div>,
      <div id="great" fromelement="Ratings/Reviews" key="great">
        Great
      </div>,
    ];

    const bigAndSmall = [
      <div id="too-small" fromelement="Ratings/Reviews" key="small">
        Too Small
      </div>,
      <div id="perfect" fromelement="Ratings/Reviews" key="perfect">
        Perfect
      </div>,
      <div id="too-big" fromelement="Ratings/Reviews" key="big">
        Too Big
      </div>,
    ];

    for (let char in characteristics) {
      if (characteristics[char] !== null) {
        const key = characteristics[char].id;
        const value = Math.floor(characteristics[char].value);
        let element;

        if (char === 'Comfort' || char === 'Quality') {
          element = poorAndGreat;
        } else {
          element = bigAndSmall;
        }
        newCharDiv.push(
          <div
            className="characteristic"
            fromelement="Ratings/Reviews"
            key={key}
          >
            <div
              className="char-name"
              fromelement="Ratings/Reviews"
            >{`${char}`}</div>
            <div className="char-meter" fromelement="Ratings/Reviews">
              <i
                // className="char-icon"
                id="char-icon"
                fromelement="Ratings/Reviews"
                className="fak fa-triangle-solid fa-flip-vertical"
                style={{ marginLeft: value * 20 + '%' }}
              ></i>
            </div>
            <div className="breakdown-descrip" fromelement="Ratings/Reviews">
              {element}
            </div>
          </div>
        );
      }
    }
    return newCharDiv;
  }

  return (
    <div>
      <h3 hidden>Product Breakdown</h3>
      {characteristicsBreakDown}
    </div>
  );
}

export default ProductBreakdown;
