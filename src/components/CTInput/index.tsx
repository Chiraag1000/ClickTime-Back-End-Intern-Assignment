import styles from '@styles/components/input.module.scss';

type Props = {
	onChange: (value: string) => void;
	placeholder?: string;
	value?: string;
};

export const CTInput: React.FC<Props> = ({ onChange, placeholder, value }) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value);
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
