import styles from '@styles/components/select.module.scss';

type Props = {
	onChange: (value: string) => void;
};

export const CTSelect: React.FC<Props> = ({ children, onChange }) => {
	const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
		onChange(event.target.value);

	return (
		<select className={styles.select} onChange={handleOnChange}>
			{children}
		</select>
	);
};
