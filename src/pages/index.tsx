import React from 'react';
import Head from 'next/head';
import { CTText } from '@components/CTText';
import { CTLinkCard } from '@components/CTLinkCard';
import styles from './index.module.scss';

const Home: React.FC = () => (
	<div className={styles.container}>
		<Head>
			<title>Hangman</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<main className={styles.main}>
			<CTText as="p" value="Welcome to ClickTime's Intern Assignment!" variant="header" />
			<CTText
				variant="subheader"
				value="As a reminder, you can choose either the front-end exercise, or the back-end exercise."
			/>
			<div className={styles['card-links']}>
				<CTLinkCard href="/frontend" value="Front-end Exercise" />
				<CTLinkCard href="/backend" value="Back-end Exercise" />
			</div>
		</main>
	</div>
);

export default Home;
