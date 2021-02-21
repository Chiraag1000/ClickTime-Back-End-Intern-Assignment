export const difference = <T>({ setA, setB }: { setA: Set<T>; setB: Set<T> }): Set<T> => {
	const diff = new Set(setA);
	setB.forEach((elem) => diff.delete(elem));
	return diff;
};
