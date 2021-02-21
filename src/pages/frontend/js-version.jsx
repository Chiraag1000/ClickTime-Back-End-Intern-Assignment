import React from 'react';
import Head from 'next/head';
import { useAsync } from '@utilities-js/hooks';
import { getDerivedGameData } from '@utilities-js/gameInfo';
import { Notification } from '@components-js/Notification';
import { Modal } from '@components-js/Modal';
import { LoadGame } from '@components-js/LoadGame';
import { HangmanPhrase } from '@components-js/HangmanPhrase';
import { CTText } from '@components-js/CTText';
import { CTButton } from '@components-js/CTButton';
import { AlphabetGrid } from '@components-js/AlphabetGrid';
import styles from '../index.module.scss';

const FrontendJS = () => {
	const {
		data: randomPhrase,
		status: randomPhraseStatus,
		makeHttpRequest: phraseRequest,
		reset: resetRandomPhrase,
	} = useAsync();
	const { data: categories = [], makeHttpRequest: categoriesRequest } = useAsync();

	React.useEffect(() => {
		categoriesRequest({ url: '/api/categories', method: 'GET' });
	}, [categoriesRequest]);

	const [chosenLetters, setChosenLetters] = React.useState([]);
	const [username, setUsername] = React.useState(undefined);
	const [notification, setNotification] = React.useState(undefined);

	const {
		attemptsRemaining,
		chosenPhrase,
		currentCategory,
		missedGuesses,
		gameStatus,
	} = getDerivedGameData({ categories, chosenLetters, randomPhrase });

	const onClickRestart = () => {
		resetRandomPhrase();
		setChosenLetters([]);
	};

	const onClickLetter = ({ letter }) => setChosenLetters([...chosenLetters, letter]);

	const onLoadGame = ({ categoryID, newUsername }) => {
		setUsername(newUsername);
		phraseRequest({
			url: '/api/phrases/random',
			method: 'GET',
			params: { categoryId: categoryID?.toString() },
		});
	};

	React.useEffect(() => {
		// Front-end Exercise 1
		// Fill in this function so we display an error when there is an error getting a phrase.
	}, [randomPhraseStatus]);

	return (
		<div className={styles.container}>
			<Head>
				<title>Hangman</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<Notification
					notification={notification}
					onClose={() => setNotification(undefined)}
					show={notification !== undefined}
				/>
				<Modal show={gameStatus === 'loading'}>
					<LoadGame categories={categories} onLoadGame={onLoadGame} username={username} />
				</Modal>
				<CTText
					as="p"
					value={`Welcome to Hangman${username === undefined ? '' : ` ${username}`}!`}
					variant="header"
				/>
				<CTText as="p" value={`You've currently chosen the ${currentCategory} category.`} />
				<HangmanPhrase
					phrase={chosenPhrase}
					chosenLetters={chosenLetters}
					revealAll={gameStatus === 'won' || gameStatus === 'lost'}
				/>
				<AlphabetGrid
					onClickLetter={onClickLetter}
					chosenLetters={chosenLetters}
					isDisabled={gameStatus !== 'playing'}
				/>
				<CTText
					as="p"
					value={`You have missed ${missedGuesses} guess(es), 
									you have ${attemptsRemaining} attempt(s) left.`}
				/>
				<div>
					<CTButton onClick={onClickRestart} value="Restart Game" />
				</div>
			</main>
		</div>
	);
};

export default FrontendJS;
