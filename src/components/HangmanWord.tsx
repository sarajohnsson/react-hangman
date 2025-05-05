import { useState } from 'react';

export function HangmanWord() {
    const [isVisible, setIsVisible] = useState(false);
    const word = 'test';
    const guessedLetters = ['t'];

    return (
        <div className="word-wrapper">
            {word.split('').map((letter, index) => (
                <span className="displayed-word" key={index}>
                    <span
                        style={{
                            visibility: guessedLetters.includes(letter)
                                ? 'visible'
                                : 'hidden',
                        }}>
                        {letter}
                    </span>
                </span>
            ))}
        </div>
    );
}
