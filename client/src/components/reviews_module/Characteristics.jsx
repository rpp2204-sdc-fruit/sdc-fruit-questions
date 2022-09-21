import React, { useState, useEffect } from 'react';
import charsKey from './helper_functions/characteristics';

function Characteristics({
  characteristics,
  handleProductChars,
  handleUserInputs,
}) {
  const [charsDiv, setCharsDiv] = useState(<div />);
  const [charRatings, setCharRatings] = useState({});

  useEffect(() => {
    createCharsDiv();
  }, []);

  // Handles user input on product characteristics when adding a review.
  const handleCharacteristics = (char, id, value) => {
    handleUserInputs('characteristics', id, value);
    handleCharText(char, id, value);
  };

  // Handles the text output above each characteristic in the add review form.
  const handleCharText = (char, id, value) => {
    const currentDisplay = document.getElementById(id);
    const newDisplay = charsKey[char][value];
    currentDisplay.textContent = newDisplay;
  };

  // Creates the characteristics div in the add review form.
  const createCharsDiv = () => {
    let div = [];

    for (let char in characteristics) {
      const id = characteristics[char].id;

      div.push(
        <div id="add-characteristic" fromelement="Ratings/Reviews" key={id}>
          <div id="char-descrip-output" fromelement="Ratings/Reviews">
            <div id={id} fromelement="Ratings/Reviews" className="char-descrip-output">
              None Selected
            </div>
          </div>
          <div className="char-radios-text" fromelement="Ratings/Reviews"> {`${char}`} </div>

          <div id="char-radios" fromelement="Ratings/Reviews">
            <input
              id={id}
              fromelement="Ratings/Reviews"
              className="char-radios"
              type="radio"
              name={`${char}`}
              value="1"
              onClick={() => handleCharacteristics(char, id, 1)}
            />
            <input
              id={id}
              fromelement="Ratings/Reviews"
              className="char-radios"
              type="radio"
              name={`${char}`}
              value="2"
              onClick={() => handleCharacteristics(char, id, 2)}
            />
            <input
              id={id}
              fromelement="Ratings/Reviews"
              className="char-radios"
              type="radio"
              name={`${char}`}
              value="3"
              onClick={() => handleCharacteristics(char, id, 3)}
            />
            <input
              id={id}
              fromelement="Ratings/Reviews"
              className="char-radios"
              type="radio"
              name={`${char}`}
              value="4"
              onClick={() => handleCharacteristics(char, id, 4)}
            />
            <input
              id={id}
              fromelement="Ratings/Reviews"
              className="char-radios"
              type="radio"
              name={`${char}`}
              value="5"
              onClick={() => handleCharacteristics(char, id, 5)}
            />
          </div>
          <div id="char-descrip" fromelement="Ratings/Reviews">
            <div className="char-descrip-1" fromelement="Ratings/Reviews"> {`(1) ${charsKey[char][1]}`} </div>
            <div className="char-descrip-5" fromelement="Ratings/Reviews"> {`(5) ${charsKey[char][5]}`} </div>
          </div>
        </div>
      );
    }
    setCharsDiv(div);
  };

  return (
    <fieldset id="characteristics-radios" fromelement="Ratings/Reviews">
      <legend id="characteristics-inputs" fromelement="Ratings/Reviews">Characteristics*</legend>
      {charsDiv}
    </fieldset>
  );
}

export default Characteristics;
