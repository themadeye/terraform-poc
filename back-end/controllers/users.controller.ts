import {Express, Router} from 'express';
import {create, findAll, findById, findOneByEmail} from '../services/users.service'

export default (app: Express) => {
    const router = Router();

    router.post('/', create);
    router.post('/login', findOneByEmail);
    router.get('/', findAll);
    router.get('/:id/:token', findById);

    app.use('/api/users', router);
}