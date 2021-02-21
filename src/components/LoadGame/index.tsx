import * as React from 'react';
import styles from '@styles/components/load.module.scss';
import { Category } from '@server/models';
import { CTText } from '@components/CTText';
import { CTSelect } from '@components/CTSelect';
import { CTInput } from '@components/CTInput';
import { CTButton } from '@components/CTButton';

export type OnLoadGame = (args: { categoryID?: number; newUsername: string }) => void;
type Props = {
	categories: Category[];
	username?: string;
	onLoadGame: OnLoadGame;
};

export const LoadGame: React.FC<Props> = ({ categories, username, onLoadGame }) => {
	const [newUsername, setUsername] = React.useState(username ?? '');
	React.useEffect(() => setUsername(username ?? ''), [username]);

	const [categoryID, setCategoryID] = React.useState<number | undefined>();

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
