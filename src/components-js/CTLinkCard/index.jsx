import Link from 'next/link';
import styles from '@styles/components/card.module.scss';

export const CTLinkCard = ({ href, value }) => (
	<div className={styles.container}>
		<Link href={href}>{value}</Link>
	</div>
);
