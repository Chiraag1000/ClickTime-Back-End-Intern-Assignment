export const stringsToNumbers = ({ value }: { value: string | string[] }): number[] => {
	const stringArray = typeof value === 'string' ? [value] : value;
	return stringArray.map((str) => parseInt(str, 10));
};

export const getErrorMessage = ({ error }: { error: unknown }): string => {
	if (error instanceof Error) {
		return error.message;
	} else if (typeof error === 'string') {
		return error;
	}
	return '';
};
