import { getRandomInt } from '@utilities/random';
import { EntityService } from './entity.service';
import { CategoriesService } from './categories.service';
import { Filters, Phrase } from '../models';

export class PhrasesService extends EntityService<Phrase> {
	fileName = 'data/phrases.json';

	validatePostEntity = ({ entity }: { entity: Omit<Phrase, 'id'> }): void => {
		const categoriesService = new CategoriesService();
		const [category] = categoriesService.getEntities({ filters: { id: [entity.categoryId] } });
		if (category === undefined) {
			throw new Error('Invalid categoryId');
		}
	};

	validatePatchEntity = (): void => {
		throw new Error('Cannot PATCH a Phrase');
	};

	getRandomPhrase({ filters }: { filters?: Filters<Phrase> } = {}): Phrase {
		const phrases = this.getEntities({ filters });
		const randomPhraseIndex = getRandomInt({ max: phrases.length - 1 });
		return phrases[randomPhraseIndex];
	}
}
