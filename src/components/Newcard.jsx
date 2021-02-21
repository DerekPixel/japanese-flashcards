
const Newcard = ({engInput, japaneseInput, engChange, japChange, onClick}) => {
  return (

    <div className='form'>
      <label htmlFor='japanese' >Japanese</label>
      <textarea name="japanese" id="jap" value={japaneseInput} onChange={japChange} ></textarea>
      <label htmlFor="english">English</label>
      <textarea name="english" id="eng" value={engInput} onChange={engChange} ></textarea>
      <button onClick={onClick} >Make New Card</button>
    </div>

  )
}

export default Newcard
