import { useState } from "react"
import words from './wordList.json'
import './style.scss'
import { HangmanDrawing } from "../components/HangmanDrawing";
import { HangmanWord } from "../components/HangmanWord";
import { Keyboard } from "../components/Keyboard";

function App() {
  const [wordToGuess, setWordToGuess] = useState(() =>{
    return words[Math.floor(Math.random() * words.length)];
  });

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  console.log(wordToGuess);
  return (
    <div className="wrapper">
      <div className="game-over">
        Win
        Lose
      </div>

      <HangmanDrawing/>
      <HangmanWord/>
      <Keyboard />
    </div>
  )
}

export default App
