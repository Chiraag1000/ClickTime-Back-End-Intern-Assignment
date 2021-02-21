import * as React from 'react';
import styles from '@styles/components/modal.module.scss';
import { CTButton } from '@components-js/CTButton';

export const Modal = ({ children, onClose, show }) => {
	const modalRef = React.useRef(null);
	React.useEffect(() => {
		const handleMousePress = (event) => {
			if (show && onClose !== undefined && !modalRef.current.contains(event.target)) {
				onClose();
			}
		};
		document.addEventListener('mouseup', handleMousePress);
		return () => document.removeEventListener('mouseup', handleMousePress);
	}, [onClose, show]);

	return show ? (
		<div className={styles.modalContainer}>
			<div className={styles.modal} ref={modalRef}>
				{onClose === undefined ? null : (
					<div className={styles.closeContainer}>
						<CTButton
							value="&#215;"
							variant="icon"
							onClick={onClose}
							sizeVariant="fill-container"
						/>
					</div>
				)}
				{children}
			</div>
		</div>
	) : null;
};
