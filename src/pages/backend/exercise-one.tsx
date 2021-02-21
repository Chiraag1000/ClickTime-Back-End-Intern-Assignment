import React from 'react';
import Head from 'next/head';
import { useAsync } from '@utilities/hooks';
import { getDerivedGameDataWithDifficulties } from '@utilities/gameInfo';
import {
	Category,
	CategoryQuery,
	DifficultyLevel,
	DifficultyLevelQuery,
	Phrase,
	PhraseQuery,
} from '@server/models';
import { Notification, NotificationData } from '@components/Notification';
import { Modal } from '@components/Modal';
import { LoadGame, OnLoadGame } from '@components/LoadGame/LoadGameWithDifficulties';
import { HangmanPhrase } from '@components/HangmanPhrase';
import { CTText } from '@components/CTText';
import { CTButton } from '@components/CTButton';
import { AlphabetGrid, OnClickLetter } from '@components/AlphabetGrid';
import styles from '../index.module.scss';

const BackendExerciseOne: React.FC = () => {
	const { data: randomPhrase, makeHttpRequest: phraseRequest, reset: resetRandomPhrase } = useAsync<
		Phrase,
		PhraseQuery
	>();
	const { data: categories = [], makeHttpRequest: categoriesRequest } = useAsync<
		Category[],
		CategoryQuery
	>();
	const { data: difficulties = [], makeHttpRequest: difficultiesRequest } = useAsync<
		DifficultyLevel[],
		DifficultyLevelQuery
	>();

	React.useEffect(() => {
		categoriesRequest({ url: '/api/categories', method: 'GET' });
		difficultiesRequest({ url: '/api/difficultyLevels', method: 'GET' });
	}, [categoriesRequest, difficultiesRequest]);

	const [chosenLetters, setChosenLetters] = React.useState<string[]>([]);
	const [username, setUsername] = React.useState<string | undefined>();
	const [notification, setNotification] = React.useState<NotificationData | undefined>();

	const {
		attemptsRemaining,
		chosenPhrase,
		currentCategory,
		currentDifficultyLevel,
		missedGuesses,
		gameStatus,
	} = getDerivedGameDataWithDifficulties({ categories, chosenLetters, difficulties, randomPhrase });

	const onClickRestart = () => {
		resetRandomPhrase();
		setChosenLetters([]);
	};

	const onClickLetter: OnClickLetter = ({ letter }) => setChosenLetters([...chosenLetters, letter]);

	const onLoadGame: OnLoadGame = ({ categoryID, difficultyLevelID, newUsername }) => {
		setUsername(newUsername);
		phraseRequest({
			url: '/api/phrases/random',
			method: 'GET',
			params: {
				categoryId: categoryID?.toString(),
				difficultyLevelId: difficultyLevelID?.toString(),
			},
		});
	};

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
					<LoadGame
						categories={categories}
						difficultyLevels={difficulties}
						onLoadGame={onLoadGame}
						username={username}
					/>
				</Modal>
				<CTText
					as="p"
					value={`Welcome to Hangman${username === undefined ? '' : ` ${username}`}!`}
					variant="header"
				/>
				<CTText
					as="p"
					value={`You've currently chosen the ${currentCategory} category, 
								and the difficulty level is ${currentDifficultyLevel}.`}
				/>
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

export default BackendExerciseOne;
