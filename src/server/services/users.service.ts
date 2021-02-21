import { EntityService } from './entity.service';
import { User } from '../models';

export class UsersService extends EntityService<User> {
	fileName = 'data/users.json';

	validatePostEntity = ({ entity }: { entity: Omit<User, 'id'> }): void => {
		const [existingUser] = this.getEntities({ filters: { name: [entity.name] } });
		if (existingUser !== undefined) {
			throw new TypeError('name already exists');
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	validatePatchEntity = ({ entity }: { entity: Partial<User> & Pick<User, 'id'> }): void => {
		throw new Error('Not implemented');
	};
}
