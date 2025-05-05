import '../styles/word.scss';

type HangmanWordProps = {
    guessedLetters: string[];
    wordToGuess: string;
    reveal?: boolean;
};

export function HangmanWord({
    guessedLetters,
    wordToGuess,
    reveal = false,
}: HangmanWordProps) {
    return (
        <div className="word-wrapper">
            {wordToGuess.split('').map((letter, index) => (
                <span className="displayed-word" key={index}>
                    <span
                        style={{
                            visibility:
                                guessedLetters.includes(letter) || reveal
                                    ? 'visible'
                                    : 'hidden',
                            color:
                                !guessedLetters.includes(letter) && reveal
                                    ? '#e03131'
                                    : '#000',
                        }}>
                        {letter}
                    </span>
                </span>
            ))}
        </div>
    );
}
