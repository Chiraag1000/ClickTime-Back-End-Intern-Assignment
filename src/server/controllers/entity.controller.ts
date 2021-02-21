import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { getErrorMessage, stringsToNumbers } from './helpers';
import { EntityService } from '../services/entity.service';
import { Entity, Filters, PostModel } from '../models';

export abstract class EntityController<
	TEntity extends Entity,
	TPostModel extends PostModel = PostModel,
	TPatchModel extends Partial<TEntity> = Partial<TEntity>
> {
	abstract service: EntityService<TEntity>;

	abstract validatePostModel(model: unknown): model is TPostModel;

	abstract validatePatchModel(model: unknown): model is TPatchModel;

	// method to convert the request object to a model
	abstract convertToEntity({ model }: { model: TPostModel }): Omit<TEntity, 'id'>;

	// eslint-disable-next-line class-methods-use-this
	getFilters({ query }: { query: Record<string, string | string[]> }): Filters<TEntity> {
		const filters: Filters<TEntity> = {};
		const { id, name } = query;
		if (id !== undefined) {
			filters.id = stringsToNumbers({ value: id });
		}
		if (name !== undefined) {
			filters.name = typeof name === 'string' ? [name] : name;
		}
		return filters;
	}

	getEntities(req: NextApiRequest, res: NextApiResponse): void {
		const { query } = req;
		try {
			const filters = this.getFilters({ query });
			const entities = this.service.getEntities({ filters });
			res.status(StatusCodes.OK).json(entities);
		} catch (error) {
			res.status(StatusCodes.BAD_REQUEST).send(getErrorMessage({ error }));
		}
	}

	getEntity(req: NextApiRequest, res: NextApiResponse): void {
		const { query } = req;
		try {
			const filters = this.getFilters({ query });
			const [entity] = this.service.getEntities({ filters });
			if (entity === undefined) {
				throw new Error('Entity with given id not found');
			}
			res.status(StatusCodes.OK).json(entity);
		} catch (error) {
			res.status(StatusCodes.BAD_REQUEST).send(getErrorMessage({ error }));
		}
	}

	createEntity(req: NextApiRequest, res: NextApiResponse): void {
		const model = req.body;
		try {
			if (this.validatePostModel(model)) {
				model.name = model.name.toLowerCase().replace(/[^a-zA-Z ]/g, '');
				const convertedModel = this.convertToEntity({ model });
				const newEntity = this.service.createNewEntity({ newEntity: convertedModel });
				res.status(StatusCodes.OK).json(newEntity);
			}
		} catch (error) {
			res.status(StatusCodes.BAD_REQUEST).send(getErrorMessage({ error }));
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
	updateEntity(req: NextApiRequest, res: NextApiResponse): void {
		throw new Error('Not implemented');
	}
}
