import { useCallback, useEffect, useState } from 'react';
import words from './wordList.json';
import '../styles/app.scss';
import { HangmanDrawing } from '../components/HangmanDrawing';
import { HangmanWord } from '../components/HangmanWord';
import { Keyboard } from '../components/Keyboard';

function getWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function App() {
    const [wordToGuess, setWordToGuess] = useState(getWord);

    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

    const incorrectLetters = guessedLetters.filter(
        (letter) => !wordToGuess.includes(letter)
    );

    const isLoser = incorrectLetters.length >= 6;
    const isWinner = wordToGuess
        .split('')
        .every((letter) => guessedLetters.includes(letter));

    const addGuessedLetter = useCallback(
        (letter: string) => {
            if (guessedLetters.includes(letter) || isWinner || isLoser) {
                return;
            } else {
                setGuessedLetters((currentLetters) => [
                    ...currentLetters,
                    letter,
                ]);
            }
        },
        [guessedLetters, isWinner, isLoser]
    );

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key;
            if (!key.match(/^[a-z]$/)) {
                return;
            } else {
                e.preventDefault();
                addGuessedLetter(key);
            }
        };

        document.addEventListener('keypress', handler);

        return () => {
            document.removeEventListener('keypress', handler);
        };
    }, [addGuessedLetter, guessedLetters]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key;
            if (key !== 'Enter') {
                return;
            } else {
                e.preventDefault();
                setGuessedLetters([]);
                setWordToGuess(getWord);
            }
        };

        document.addEventListener('keypress', handler);

        return () => {
            document.removeEventListener('keypress', handler);
        };
    }, []);

    return (
        <div className="wrapper">
            <div className="game-over">
                {isWinner && 'Winner! - Refresh to try again.'}
                {isLoser && 'Nice Try - Refresh to try again.'}
            </div>

            <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
            <HangmanWord
                reveal={isLoser}
                guessedLetters={guessedLetters}
                wordToGuess={wordToGuess}
            />
            <div style={{ alignSelf: 'stretch' }}>
                <Keyboard
                    disabled={isWinner || isLoser}
                    activeLetters={guessedLetters.filter((letter) =>
                        wordToGuess.includes(letter)
                    )}
                    inactiveLetters={incorrectLetters}
                    addGuessedLetter={addGuessedLetter}
                />
            </div>
        </div>
    );
}

export default App;
