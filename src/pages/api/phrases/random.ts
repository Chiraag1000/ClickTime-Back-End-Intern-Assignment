import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { PhrasesController } from '@server/controllers/phrases.controller';

const phrasesController = new PhrasesController();

const getRandomPhraseHandler = (req: NextApiRequest, res: NextApiResponse): void => {
	switch (req.method) {
		case 'GET': {
			phrasesController.getRandomPhrase(req, res);
			break;
		}
		default: {
			res.status(StatusCodes.NOT_FOUND).end();
		}
	}
};

export default getRandomPhraseHandler;
