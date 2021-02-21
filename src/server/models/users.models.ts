import { Entity, EntityQuery, PostModel } from './modelTypes';

export type User = Entity & {
	wins: number;
	losses: number;
};

export type UserPostModel = PostModel & {
	wins?: number;
	losses?: number;
};

export type UserPatchModel = Partial<UserPostModel>;

export type UserQuery = EntityQuery;
