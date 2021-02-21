export const difference = ({ setA, setB }) => {
	const diff = new Set(setA);
	setB.forEach((elem) => diff.delete(elem));
	return diff;
};
