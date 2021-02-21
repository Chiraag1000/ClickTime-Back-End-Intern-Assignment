import styles from '@styles/components/hangman.module.scss';
import { CTText } from '@components/CTText';

type Props = {
	isShown: boolean;
	letter: string;
};

export const HangmanLetter: React.FC<Props> = ({ isShown, letter }) => (
	<div className={styles.letter}>{isShown ? <CTText value={letter} variant="bold" /> : null}</div>
);
