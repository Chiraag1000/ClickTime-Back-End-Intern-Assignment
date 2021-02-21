import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { getErrorMessage, stringsToNumbers } from './helpers';
import { EntityController } from './entity.controller';
import { PhrasesService } from '../services/phrases.service';
import { Filters, Phrase, PhrasePostModel } from '../models';

export class PhrasesController extends EntityController<Phrase, PhrasePostModel> {
	service = new PhrasesService();

	validatePostModel = (model: unknown): model is PhrasePostModel => {
		if (typeof model !== 'object') {
			throw new Error('Model must be an object');
		} else {
			const phraseModelObject = model as Record<string, unknown>;
			if (typeof phraseModelObject.name !== 'string') {
				throw new TypeError('name of new phrase must be provided');
			} else if (typeof phraseModelObject.categoryId !== 'number') {
				throw new TypeError('categoryId of new phrase must be provided');
			} else if (typeof phraseModelObject.difficultyLevelId !== 'number') {
				throw new TypeError('difficultyLevelId of new phrase must be provided');
			}
		}
		return true;
	};

	validatePatchModel = (_model: unknown): _model is Partial<Phrase> => {
		throw new Error('Cannot PATCH a Phrase');
	};

	getFilters({ query }: { query: Record<string, string | string[]> }): Filters<Phrase> {
		const filters = super.getFilters({ query });
		const { categoryId, difficultyLevelId } = query;
		if (categoryId !== undefined) {
			filters.categoryId = stringsToNumbers({ value: categoryId });
		}
		if (difficultyLevelId !== undefined) {
			filters.difficultyLevelId = stringsToNumbers({ value: difficultyLevelId });
		}
		return filters;
	}

	getRandomPhrase(req: NextApiRequest, res: NextApiResponse): void {
		const { query } = req;
		try {
			const filters = this.getFilters({ query });
			const phrase = this.service.getRandomPhrase({ filters });
			res.status(StatusCodes.OK).json(phrase);
		} catch (error) {
			res.status(StatusCodes.BAD_REQUEST).send(getErrorMessage({ error }));
		}
	}

	convertToEntity = ({ model }: { model: PhrasePostModel }): Omit<Phrase, 'id'> => model;
}
