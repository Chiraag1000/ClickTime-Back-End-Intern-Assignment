import { useKeyPressedCallback } from '@utilities-js/hooks';
import styles from '@styles/components/alphabet.module.scss';
import { CTButton } from '@components-js/CTButton';

export const Letter = ({ isChosen = false, letter, onClick }) => {
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
