import { useKeyPressedCallback } from '@utilities/hooks';
import styles from '@styles/components/alphabet.module.scss';
import { CTButton } from '@components/CTButton';

type Props = {
	isChosen?: boolean;
	letter: string;
	onClick: () => void;
};

export const Letter: React.FC<Props> = ({ isChosen = false, letter, onClick }) => {
	useKeyPressedCallback({ targetKey: letter, callback: onClick, enabled: !isChosen });
	return (
		<div className={styles.letter}>
			<CTButton
				isDisabled={isChosen}
				onClick={onClick}
				value={letter}
				variant="secondary"
				sizeVariant="fill-container"
			/>
		</div>
	);
};
