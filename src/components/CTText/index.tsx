import styles from '@styles/components/text.module.scss';

export type CTTextVariants =
	| 'header'
	| 'subheader'
	| 'standard'
	| 'small'
	| 'bold'
	| 'link'
	| 'grey'
	| 'error'
	| 'button-primary'
	| 'button-secondary'
	| 'icon';

type CTTextAs = 'p' | 'span';

type Props = {
	value?: string | number;
	variant?: CTTextVariants;
	as?: CTTextAs;
};

export const CTText: React.FC<Props> = ({ value, variant = 'standard', as = 'span' }) => {
	const Component = as;
	return <Component className={styles[variant]}>{value}</Component>;
};
