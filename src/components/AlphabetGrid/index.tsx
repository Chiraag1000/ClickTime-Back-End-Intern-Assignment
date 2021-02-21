import { letters } from '@utilities/constants';
import styles from '@styles/components/alphabet.module.scss';
import { Letter } from './Letter';

export type OnClickLetter = (args: { letter: string }) => void;
type Props = {
	chosenLetters: string[];
	onClickLetter: OnClickLetter;
	isDisabled?: boolean;
};

export const AlphabetGrid: React.FC<Props> = ({
	chosenLetters,
	onClickLetter,
	isDisabled = false,
}) => (
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
