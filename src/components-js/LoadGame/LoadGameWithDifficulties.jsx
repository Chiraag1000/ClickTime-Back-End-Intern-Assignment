import * as React from 'react';
import styles from '@styles/components/load.module.scss';
import { CTText } from '@components-js/CTText';
import { CTSelect } from '@components-js/CTSelect';
import { CTInput } from '@components-js/CTInput';
import { CTButton } from '@components-js/CTButton';

export const LoadGame = ({ categories, difficultyLevels, username, onLoadGame }) => {
	const [newUsername, setUsername] = React.useState(username ?? '');
	React.useEffect(() => setUsername(username ?? ''), [username]);

	const [categoryID, setCategoryID] = React.useState(undefined);
	const [difficultyLevelID, setDifficultyLevelID] = React.useState(undefined);

	return (
		<div className={styles.container}>
			<div className={styles.username}>
				<CTText value="Username" />
				<CTInput onChange={setUsername} placeholder="Enter a username" value={newUsername} />
			</div>
			<div className={styles.selections}>
				<div className={styles.selection}>
					<CTText value="Category" />
					<CTSelect onChange={(value) => setCategoryID(Number(value))}>
						<option value={categoryID}>Select a Category</option>
						{categories.map((category) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
					</CTSelect>
				</div>
				<div className={styles.selection}>
					<CTText value="Difficulty Level" />
					<CTSelect onChange={(value) => setDifficultyLevelID(Number(value))}>
						<option value={difficultyLevelID}>Select a Difficulty Level</option>
						{difficultyLevels.map((difficultyLevel) => (
							<option key={difficultyLevel.id} value={difficultyLevel.id}>
								{difficultyLevel.name}
							</option>
						))}
					</CTSelect>
				</div>
			</div>
			<CTButton
				isDisabled={
					newUsername === '' || categoryID === undefined || difficultyLevelID === undefined
				}
				onClick={() => onLoadGame({ categoryID, difficultyLevelID, newUsername })}
				value="Load Game"
			/>
		</div>
	);
};
