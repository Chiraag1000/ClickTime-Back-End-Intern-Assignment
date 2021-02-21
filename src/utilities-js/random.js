export const getRandomInt = ({ min = 0, max }) => {
	const minCeil = Math.ceil(min);
	const maxFloor = Math.floor(max);
	return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
};
