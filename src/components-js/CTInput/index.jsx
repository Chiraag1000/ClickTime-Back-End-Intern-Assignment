import styles from '@styles/components/input.module.scss';

export const CTInput = ({ onChange, placeholder, value }) => {
	const handleChange = (event) => onChange(event.target.value);
	return (
		<input
			className={styles.input}
			maxLength={50}
			onChange={handleChange}
			placeholder={placeholder}
			value={value}
		/>
	);
};
