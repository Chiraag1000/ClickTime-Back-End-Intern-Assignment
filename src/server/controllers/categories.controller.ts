import { EntityController } from './entity.controller';
import { CategoriesService } from '../services/categories.service';
import { Category, PostModel } from '../models';

export class CategoriesController extends EntityController<Category> {
	service = new CategoriesService();

	validatePostModel = (_model: unknown): _model is PostModel => {
		throw new Error('Cannot POST a Category');
	};

	validatePatchModel = (_model: unknown): _model is Partial<Category> => {
		throw new Error('Cannot PATCH a Category');
	};

	convertToEntity = (): Category => {
		throw new Error('Cannot POST a Category');
	};
}
