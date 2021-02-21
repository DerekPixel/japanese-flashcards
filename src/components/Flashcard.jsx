
const Flashcard = ({cards, reset}) => {

  var jap, eng;

  jap = cards[0].japanese;
  eng = cards[0]. eng;
  
  return (
    <div>
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <h2>{jap}</h2>
          </div>
          <div className="flip-card-back">
            <h2>{eng}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Flashcard
