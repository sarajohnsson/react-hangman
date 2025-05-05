import '../styles/keyboard.scss';

const KEYS = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'P',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
];

type KeyboardProps = {
    activeLetters: string[];
    inactiveLetters: string[];
    disabled?: boolean;
    addGuessedLetter: (letter: string) => void;
};

export function Keyboard({
    activeLetters,
    inactiveLetters,
    disabled = false,
    addGuessedLetter,
}: KeyboardProps) {
    return (
        <div className="keyboard-wrapper">
            {KEYS.map((key) => {
                const isActive = activeLetters.includes(key);
                const isInactive = inactiveLetters.includes(key);
                return (
                    <button
                        onClick={() => addGuessedLetter(key)}
                        className={`keyboard-btn ${isActive ? 'active' : ''} ${
                            isInactive ? 'inactive' : ''
                        }`}
                        disabled={isInactive || isActive || disabled}
                        key={key}>
                        {key}
                    </button>
                );
            })}
        </div>
    );
}
