
import './App.css';
import Flashcard from './components/Flashcard';

function App() {

  var tempFlashCards = [
    {
      japanese: 'おはようございます',
      eng: 'Good Morning'
    },
    {
      japanese: 'こんにちは',
      eng: 'Hello / Good Afternoon'
    },
    {
      japanese: 'こんばんは',
      eng: 'Good Evening'
    },
    {
      japanese: 'ありがとうございます',
      eng: 'Thank you very much'
    },
  ]

  return (
    <div className="App">
      <Flashcard cards={tempFlashCards} />
    </div>
  );
}

export default App;
