export type Entity = {
	id: number;
	name: string;
};

export type PostModel = Omit<Entity, 'id'>;

export type Filters<T> = {
	[P in keyof T]?: T[P][];
};

export type EntityQuery = { id?: string; name?: string };
