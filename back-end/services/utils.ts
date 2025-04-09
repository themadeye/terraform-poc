import crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

export const generatePassword = (password: string) => {
    const salt = createSalt();
    const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return {
        salt: salt,
        hash: genHash
    }
}

export const verifyPassword = (salt: string, password: string, hashedPassword: string) => {
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex') === hashedPassword;
}

export const createJWT = (id: string) => {
    const TOKEN_SECRET = "pocsecret"; // This token must be store properly, with this a simple variable is dangerous.
    const jwtMaxAge = 3 * 24 * 60 * 60;

    return jwt.sign({id}, TOKEN_SECRET, {
        expiresIn: jwtMaxAge,
        algorithm: 'HS512'
    });
}

export const verifyJWT = (token: string) => {
    const TOKEN_SECRET = "pocsecret"; // This token must be store properly, with this a simple variable is dangerous.
    const jwtMaxAge = 3 * 24 * 60 * 60;
    return jwt.verify(token, TOKEN_SECRET, {
        maxAge: jwtMaxAge,
        algorithms: ['HS512']
    });
}

const createSalt = () => {
    return crypto.randomBytes(32).toString('hex');
}