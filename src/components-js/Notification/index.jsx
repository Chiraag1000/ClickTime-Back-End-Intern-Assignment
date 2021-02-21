import styles from '@styles/components/notification.module.scss';
import { CTText } from '@components-js/CTText';
import { CTButton } from '@components-js/CTButton';

export const Notification = ({ notification = { message: '', variant: 'error' }, onClose, show }) =>
	show ? (
		<div className={styles[notification.variant]}>
			<CTText value={notification.message} />
			<div>
				<CTButton value="&#215;" variant="icon" onClick={onClose} sizeVariant="fill-container" />
			</div>
		</div>
	) : null;
