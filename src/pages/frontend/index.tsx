import React from 'react';
import Head from 'next/head';
import { CTText } from '@components/CTText';
import { CTLinkCard } from '@components/CTLinkCard';
import styles from '../index.module.scss';

const Frontend: React.FC = () => (
	<div className={styles.container}>
		<Head>
			<title>Hangman</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<main className={styles.main}>
			<CTText as="p" value="Front-end Assignment" variant="header" />
			<CTText
				variant="subheader"
				value="You can choose whether to do a TypeScript or a JavaScript version of this assignment."
			/>
			<div className={styles['card-links']}>
				<CTLinkCard href="/frontend/ts-version" value="TypeScript Version" />
				<CTLinkCard href="/frontend/js-version" value="JavaScript Version" />
			</div>
		</main>
	</div>
);

export default Frontend;
