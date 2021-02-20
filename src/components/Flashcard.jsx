
const Flashcard = ({cards}) => {

  return (
    <div>
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <h2>{cards[0].japanese}</h2>
          </div>
          <div className="flip-card-back">
            <h2>{cards[0].eng}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Flashcard
