import styles from '@styles/components/notification.module.scss';
import { CTText } from '@components/CTText';
import { CTButton } from '@components/CTButton';

type NotificationVariants = 'error' | 'success' | 'warning';
export type NotificationData = { message: string; variant: NotificationVariants };
type Props = {
	notification?: NotificationData;
	onClose: () => void;
	show: boolean;
};

export const Notification: React.FC<Props> = ({
	notification = { message: '', variant: 'error' },
	onClose,
	show,
}) =>
	show ? (
		<div className={styles[notification.variant]}>
			<CTText value={notification.message} />
			<div>
				<CTButton value="&#215;" variant="icon" onClick={onClose} sizeVariant="fill-container" />
			</div>
		</div>
	) : null;
