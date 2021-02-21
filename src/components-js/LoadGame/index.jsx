import * as React from 'react';
import styles from '@styles/components/load.module.scss';
import { CTText } from '@components-js/CTText';
import { CTSelect } from '@components-js/CTSelect';
import { CTInput } from '@components-js/CTInput';
import { CTButton } from '@components-js/CTButton';

export const LoadGame = ({ categories, username, onLoadGame }) => {
	const [newUsername, setUsername] = React.useState(username ?? '');
	React.useEffect(() => setUsername(username ?? ''), [username]);

	const [categoryID, setCategoryID] = React.useState(undefined);

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
			</div>
			<CTButton
				isDisabled={newUsername === '' || categoryID === undefined}
				onClick={() => onLoadGame({ categoryID, newUsername })}
				value="Load Game"
			/>
		</div>
	);
};
