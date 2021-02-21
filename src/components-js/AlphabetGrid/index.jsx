import { letters } from '@utilities-js/constants';
import styles from '@styles/components/alphabet.module.scss';
import { Letter } from './Letter';

export const AlphabetGrid = ({ chosenLetters, onClickLetter, isDisabled = false }) => (
	<div className={styles.grid}>
		{letters.map((letter) => (
			<Letter
				key={letter}
				letter={letter}
				isChosen={isDisabled || chosenLetters.includes(letter)}
				onClick={() => onClickLetter({ letter })}
			/>
		))}
	</div>
);
