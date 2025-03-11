import db from '../models/index';
import * as jwt from 'jsonwebtoken';

import {compareSync, genSaltSync, hashSync} from "bcrypt-ts";

const Users = db.users;

export const create = async (req: any, res: any) => {
    if (!req.body.email || !req.body.firstName || !req.body.lastName || !req.body.password) {
        res.status(400).send({ message: `Content can not be empty! ${req.body}` });
        return;
    }

    const isExisted = await isUserExisted(req.body.email);
    if (isExisted) {
        res.status(409).send({ message: `User already existed! ${req.req.body.email}` });
        return;
    }

    const salt = genSaltSync(10);
    const hasedPassword = hashSync(req.body.password, salt);

    // Create a User
    const user = new Users({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hasedPassword
    });

    // Save Users in the database
    user.save().then(user => {
        const token = createJWT(user.id);
        res.status(200).json({ user: user.id, token: token });
    }).catch(err => {
        console.error(err);
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
}

export const findAll = async (req: any, res: any) => {
    // Mongoose find with no condition means finAll() in Mongo.
    Users.find({}).then(data => {
        res.send(data);
    }).catch(err => {
        console.error(err);
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
}

export const findOneByEmail = async (req: any, res: any) => {
    const email = req.body.email;
    const password = req.body.password;

    Users.findOne({ email: email }).then(user => {
        if (!user) {
            res.status(403).send({ message: "Email or Password incorrect" });
        }
        const isCorrectPassword = compareSync(password, user!.password);
        if (!isCorrectPassword) {
            res.status(403).send({ message: "Email or Password incorrect" });
        }

        const token = createJWT(user!.id);
        res.status(200).json({ user: user!.id, token: token });

    }).catch(err => {
        console.error(err);
        res.status(400).send({ message: "Error retrieving Users with email = " + email });
    })
}

export const findById = async (req: any, res: any) => {
    const id = req.params.id;
    const token = req.params.token;
    const verified = verifyJWT(token);

    if (!verified) {
        res.state(401).send({message: "Unauthenticated! "});
    }

    Users.findById(id).then(data => {
        console.log("Find by ID data: ", data);
        if (!data) {
            res.status(404).send({ message: "Not found user with id " + id });
        } else {
            res.status(200).json(data);
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send({ message: "Error retrieving user with id = " + id });
    });
}

const isUserExisted = async (email: string) => {
    return await Users.findOne({ email: email }).exec();
}

const createJWT = (id: string) => {
    const TOKEN_SECRET = "pocsecret"; // This token must be store properly, with this a simple variable is dangerous.
    const jwtMaxAge = 3 * 24 * 60 * 60;

    return jwt.sign({id}, TOKEN_SECRET, {
        expiresIn: jwtMaxAge,
        algorithm: 'HS512'
    });
}

const verifyJWT = (token: string) => {
    const TOKEN_SECRET = "pocsecret"; // This token must be store properly, with this a simple variable is dangerous.
    const jwtMaxAge = 3 * 24 * 60 * 60;
    return jwt.verify(token, TOKEN_SECRET, {
        maxAge: jwtMaxAge,
        algorithms: ['HS512']
    });
}