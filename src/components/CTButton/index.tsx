import styles from '@styles/components/button.module.scss';
import { CTText, CTTextVariants } from '@components/CTText';

type CTButtonVariants = 'primary' | 'secondary' | 'icon';
type CTButtonSizingVariants = 'standard' | 'fill-container';

const buttonVariantToTextVariant: Record<CTButtonVariants, CTTextVariants> = {
	primary: 'button-primary',
	secondary: 'button-secondary',
	icon: 'icon',
};

type Props = {
	isDisabled?: boolean;
	onClick: () => void;
	value?: string;
	variant?: CTButtonVariants;
	sizeVariant?: CTButtonSizingVariants;
};

export const CTButton: React.FC<Props> = ({
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
