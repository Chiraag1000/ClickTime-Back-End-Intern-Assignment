import styles from '@styles/components/hangman.module.scss';
import { CTText } from '@components-js/CTText';

export const HangmanLetter = ({ isShown, letter }) => (
	<div className={styles.letter}>{isShown ? <CTText value={letter} variant="bold" /> : null}</div>
);
