import { EntityService } from './entity.service';
import { Category } from '../models';

export class CategoriesService extends EntityService<Category> {
	fileName = 'data/categories.json';

	validatePostEntity = (): void => {
		throw new Error('Cannot POST a Category');
	};

	validatePatchEntity = (): void => {
		throw new Error('Cannot PATCH a Category');
	};
}
