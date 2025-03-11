import express from 'express';
import * as bodyParser from 'body-parser';

import db from './models/index';
import cors from 'cors';

import {ConnectionOptions} from 'node:tls';
import {Express} from 'express';

const app: Express = express();
const corsOptions = {
    "origin": "*"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
} as ConnectionOptions).then(() => {
    console.log("Connected to the database!");
}).catch(err => {
    console.log("Error connecting to the database!", err);
    process.exit();
});

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to TPOC." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});