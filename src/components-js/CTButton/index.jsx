import styles from '@styles/components/button.module.scss';
import { CTText } from '@components-js/CTText';

const buttonVariantToTextVariant = {
	primary: 'button-primary',
	secondary: 'button-secondary',
	icon: 'icon',
};

export const CTButton = ({
	children,
	isDisabled = false,
	onClick,
	value,
	variant = 'primary',
	sizeVariant = 'standard',
}) => (
	<button
		type="button"
		className={`${styles[variant]} ${styles[sizeVariant]}`}
		disabled={isDisabled}
		onClick={onClick}
	>
		{value ? <CTText variant={buttonVariantToTextVariant[variant]} value={value} /> : children}
	</button>
);
