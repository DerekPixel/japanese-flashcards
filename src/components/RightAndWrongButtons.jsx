import React from 'react';

function RightAndWrongButtons({
  answerIsRevealed, 
  randomizedCards, 
  setRandomizedCards, 
  shiftCorrectAnswer, 
  pushAndShiftWrongAnswer, 
  handleSetFlip
}) {
  return <div className="right-wrong-btns-and-reveal-answer-text-container">
    {
      answerIsRevealed ?
      <div className="right-wrong-buttons">
        <button
          className='correct'
          onClick={() => setRandomizedCards(shiftCorrectAnswer(randomizedCards))}
        >
          I got it right
        </button>
        <button
          className='incorrect'
          onClick={() => setRandomizedCards(pushAndShiftWrongAnswer(randomizedCards))}
        >
          I got it wrong
        </button>
      </div> :
      <div
        className='reveal-the-answer-text'
        onClick={() => handleSetFlip()}
      >Reveal the Answer</div>
    }
    
  </div>
}

export default RightAndWrongButtons;
