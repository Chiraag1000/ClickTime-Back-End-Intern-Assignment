import React from 'react';
import Head from 'next/head';
import { useAsync } from '@utilities/hooks';
import { getDerivedGameData } from '@utilities/gameInfo';
import {
	Category,
	CategoryQuery,
	Phrase,
	PhraseQuery,
	User,
	UserPatchModel,
	UserPostModel,
	UserQuery,
} from '@server/models';
import { Notification, NotificationData } from '@components/Notification';
import { Modal } from '@components/Modal';
import { LoadGame, OnLoadGame } from '@components/LoadGame';
import { HangmanPhrase } from '@components/HangmanPhrase';
import { CTText } from '@components/CTText';
import { CTButton } from '@components/CTButton';
import { AlphabetGrid, OnClickLetter } from '@components/AlphabetGrid';
import styles from '../index.module.scss';

const BackendExerciseTwo: React.FC = () => {
	const { data: randomPhrase, makeHttpRequest: phraseRequest, reset: resetRandomPhrase } = useAsync<
		Phrase,
		PhraseQuery
	>();
	const { data: categories = [], makeHttpRequest: categoriesRequest } = useAsync<
		Category[],
		CategoryQuery
	>();
	const { data: users = [], makeHttpRequest: usersRequest } = useAsync<User[], UserQuery>();
	const { data: user, makeHttpRequest: requestUser } = useAsync<
		User,
		UserQuery,
		UserPostModel | UserPatchModel
	>();

	React.useEffect(() => {
		categoriesRequest({ url: '/api/categories', method: 'GET' });
		usersRequest({ url: '/api/users', method: 'GET' });
	}, [categoriesRequest, usersRequest]);

	const [chosenLetters, setChosenLetters] = React.useState<string[]>([]);
	const [notification, setNotification] = React.useState<NotificationData | undefined>();

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

	const onClickLetter: OnClickLetter = ({ letter }) => setChosenLetters([...chosenLetters, letter]);

	const onLoadGame: OnLoadGame = ({ categoryID, newUsername }) => {
		phraseRequest({
			url: '/api/phrases/random',
			method: 'GET',
			params: { categoryId: categoryID?.toString() },
		});
		if (user === undefined || user.name !== newUsername) {
			const existingUser = users.find((storedUser) => storedUser.name === newUsername);
			if (existingUser === undefined) {
				requestUser({ url: '/api/users', method: 'POST', body: { name: newUsername } });
			} else {
				requestUser({ url: `/api/users/${existingUser.id}`, method: 'GET' });
			}
		}
	};

	const gameLogged = React.useRef(false);
	React.useEffect(() => {
		if (gameStatus === 'loading') {
			gameLogged.current = false;
		}
	}, [gameStatus]);
	React.useEffect(() => {
		if (
			user !== undefined &&
			!gameLogged.current &&
			(gameStatus === 'won' || gameStatus === 'lost')
		) {
			gameLogged.current = true;
			requestUser({
				url: `/api/users/${user.id.toString()}`,
				method: 'PATCH',
				body: {
					wins: gameStatus === 'won' ? user.wins + 1 : undefined,
					losses: gameStatus === 'lost' ? user.losses + 1 : undefined,
				},
			});
		}
	}, [gameLogged, gameStatus, requestUser, user]);

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
					<LoadGame categories={categories} onLoadGame={onLoadGame} username={user?.name} />
				</Modal>
				<CTText
					as="p"
					value={`Welcome to Hangman${user === undefined ? '' : ` ${user.name}`}!`}
					variant="header"
				/>
				<CTText as="p" value={`You've currently chosen the ${currentCategory} category.`} />
				<CTText
					as="p"
					value={`You've won ${user?.wins ?? 0} game(s) and lost ${user?.losses ?? 0} game(s).`}
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

export default BackendExerciseTwo;
