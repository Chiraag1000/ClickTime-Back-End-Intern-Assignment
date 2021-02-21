import React from 'react';
import Head from 'next/head';
import { CTText } from '@components/CTText';
import { CTLinkCard } from '@components/CTLinkCard';
import styles from '../index.module.scss';

const Backend: React.FC = () => (
	<div className={styles.container}>
		<Head>
			<title>Hangman</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<main className={styles.main}>
			<CTText as="p" value="Back-end Assignment" variant="header" />
			<CTText
				variant="subheader"
				value="These pages are largely used to see your API changes in action."
			/>
			<div className={styles['card-links']}>
				<CTLinkCard href="/backend/exercise-one" value="Exercise One" />
				<CTLinkCard href="/backend/exercise-two" value="Exercise Two" />
				<CTLinkCard href="/backend/exercise-both" value="Both Exercises" />
			</div>
		</main>
	</div>
);

export default Backend;
