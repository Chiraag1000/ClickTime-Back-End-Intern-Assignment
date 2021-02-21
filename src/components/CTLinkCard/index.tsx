import Link from 'next/link';
import styles from '@styles/components/card.module.scss';

type Props = {
	href: string;
	value: string;
};

export const CTLinkCard: React.FC<Props> = ({ href, value }) => (
	<div className={styles.container}>
		<Link href={href}>{value}</Link>
	</div>
);
