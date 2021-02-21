import { EntityController } from './entity.controller';
import { UsersService } from '../services/users.service';
import { User, UserPatchModel, UserPostModel } from '../models';

export class UsersController extends EntityController<User, UserPostModel, UserPatchModel> {
	service = new UsersService();

	validatePostModel = (model: unknown): model is UserPostModel => {
		if (typeof model !== 'object') {
			throw new Error('Model must be an object');
		} else {
			const userModelObject = model as Record<string, unknown>;
			if (!userModelObject.name) {
				throw new TypeError('name must be provided');
			} else if (typeof userModelObject.name !== 'string') {
				throw new TypeError('name of new user must be a string');
			} else if (userModelObject.wins && typeof userModelObject.wins !== 'number') {
				throw new TypeError('wins must be a number');
			} else if (userModelObject.losses && typeof userModelObject.losses !== 'number') {
				throw new TypeError('losses must be a number');
			}
		}
		return true;
	};

	validatePatchModel = (model: unknown): model is UserPatchModel => {
		throw new Error('Not implemented');
	};

	convertToEntity = ({ model }: { model: UserPostModel }): Omit<User, 'id'> => ({
		wins: 0,
		losses: 0,
		...model,
	});
}
