import { difference } from '@utilities/sets';

const MAX_GUESSES = 6;

export const getDerivedGameData = ({ categories, chosenLetters, randomPhrase }) => {
	const chosenPhrase = randomPhrase?.name.toUpperCase() ?? '';

	const chosenLettersSet = new Set(chosenLetters);
	const phraseLettersSet = new Set(chosenPhrase.split(''));
	phraseLettersSet.delete(' ');
	const missedGuesses = difference({ setA: chosenLettersSet, setB: phraseLettersSet }).size;
	const correctGuesses = chosenLettersSet.size - missedGuesses;
	const attemptsRemaining = MAX_GUESSES - missedGuesses;

	let gameStatus = 'playing';
	if (randomPhrase === undefined) {
		gameStatus = 'loading';
	} else if (attemptsRemaining === 0) {
		gameStatus = 'lost';
	} else if (correctGuesses === phraseLettersSet.size) {
		gameStatus = 'won';
	}

	const currentCategory =
		randomPhrase === undefined
			? undefined
			: categories.find((category) => category.id === randomPhrase.categoryId)?.name;

	return {
		attemptsRemaining,
		chosenPhrase,
		currentCategory: currentCategory ?? 'unknown',
		missedGuesses,
		gameStatus,
	};
};

export const getDerivedGameDataWithDifficulties = ({
	categories,
	chosenLetters,
	difficulties,
	randomPhrase,
}) => {
	const gameData = getDerivedGameData({ categories, chosenLetters, randomPhrase });
	const currentDifficultyLevel =
		randomPhrase === undefined
			? undefined
			: difficulties.find((difficulty) => difficulty.id === randomPhrase.categoryId)?.name;
	return { currentDifficultyLevel: currentDifficultyLevel ?? 'unknown', ...gameData };
};
