import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { CategoriesController } from '@server/controllers/categories.controller';

const categoriesController = new CategoriesController();

const getCategoryHandler = (req: NextApiRequest, res: NextApiResponse): void => {
	switch (req.method) {
		case 'GET': {
			categoriesController.getEntity(req, res);
			break;
		}
		default: {
			res.status(StatusCodes.NOT_FOUND).end();
		}
	}
};

export default getCategoryHandler;
