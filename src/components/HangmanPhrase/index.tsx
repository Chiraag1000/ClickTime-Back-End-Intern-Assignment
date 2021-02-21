import styles from '@styles/components/hangman.module.scss';
import { HangmanLetter } from './HangmanLetter';

type Props = {
	chosenLetters: string[];
	phrase: string;
	revealAll: boolean;
};

export const HangmanPhrase: React.FC<Props> = ({ chosenLetters, phrase, revealAll }) => {
	const wordsInPhrase = phrase.split(' ');
	return (
		<div className={styles.hangman}>
			{wordsInPhrase.map((word) => (
				<div key={word} className={styles.word}>
					{[...word].map((letter, letterIndex) => (
						<HangmanLetter
							// eslint-disable-next-line react/no-array-index-key
							key={`${letter}${letterIndex}`}
							letter={letter}
							isShown={revealAll || chosenLetters.includes(letter)}
						/>
					))}
				</div>
			))}
		</div>
	);
};
