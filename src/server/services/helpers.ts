import path from 'path';
import fs from 'fs';

const getFilePath = ({ fileName }: { fileName: string }): string =>
	path.join(process.cwd(), fileName);

export const readJsonFile = <T>({ fileName }: { fileName: string }): T => {
	const filePath = getFilePath({ fileName });
	const fileContents = fs.readFileSync(filePath, { encoding: 'utf-8' });
	const entities = JSON.parse(fileContents);
	return entities;
};

export const writeJsonFile = <T>({ fileName, data }: { fileName: string; data: T }): void => {
	const filePath = getFilePath({ fileName });
	const dataString = JSON.stringify(data, null, 2);
	fs.writeFileSync(filePath, dataString);
};
