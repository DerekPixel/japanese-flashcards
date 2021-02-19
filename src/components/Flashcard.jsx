import React, { useState } from 'react'

const Flashcard = ({cards}) => {

  const [randoNum, setrandoNum] = useState(Math.floor(Math.random() * cards.length));

  var maxNum = cards.length;

  var newRandomNum = (maxNum) => {
    return Math.floor(Math.random() * maxNum);
  }

  return (
    <div>
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <h1>{cards[randoNum].japanese}</h1>
            <p>{randoNum}</p>
      
          </div>
          <div className="flip-card-back">
            <h1>{cards[randoNum].eng}</h1>
            <p>{randoNum}</p>
          </div>
        </div>
      </div>
      <button onClick={() => setrandoNum(newRandomNum(maxNum))} >New Card</button>
    </div>
  )
}

export default Flashcard
