import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { UsersController } from '@server/controllers/users.controller';

const usersController = new UsersController();

const usersHandler = (req: NextApiRequest, res: NextApiResponse): void => {
	switch (req.method) {
		case 'GET': {
			usersController.getEntity(req, res);
			break;
		}
		case 'PATCH': {
			usersController.updateEntity(req, res);
			break;
		}
		default: {
			res.status(StatusCodes.NOT_FOUND).end();
		}
	}
};

export default usersHandler;
