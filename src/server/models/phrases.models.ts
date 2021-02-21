import { Entity, EntityQuery } from './modelTypes';

export type Phrase = Entity & {
	categoryId: number;
	difficultyLevelId: number;
};

export type PhrasePostModel = Omit<Phrase, 'id'>;

export type PhraseQuery = EntityQuery & { categoryId?: string; difficultyLevelId?: string };
