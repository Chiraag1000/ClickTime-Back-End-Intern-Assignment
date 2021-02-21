import styles from '@styles/components/text.module.scss';

export const CTText = ({ value, variant = 'standard', as = 'span' }) => {
	const Component = as;
	return <Component className={styles[variant]}>{value}</Component>;
};
