import styles from '@styles/components/select.module.scss';

export const CTSelect = ({ children, onChange }) => {
	const handleOnChange = (event) => onChange(event.target.value);

	return (
		<select className={styles.select} onChange={handleOnChange}>
			{children}
		</select>
	);
};
