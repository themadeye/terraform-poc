import * as mongoose from 'mongoose';

import createUserModel from './users.model';
import dbConfig from '../config/db.config';

const db= {
    mongoose: mongoose,
    url: dbConfig.url,
    users: createUserModel()
}

export default db;