'use server'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import {connect} from 'mongoose';
// import {MongoClient} from 'mongodb';

// const dbClient = new MongoClient(process.env.MONGODB_URI!, {
//     auth: {
//         username: process.env.AWS_ACCESS_KEY_ID,
//         password: process.env.AWS_SECRET_ACCESS_KEY
//     },
//     authSource: '$external',
//     authMechanism: 'MONGODB-AWS'
// });
//
// console.log("Db Client: ", dbClient);

connect(process.env.MONGODB_URI!).then(() => console.log('Connected!'));

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        if (event) {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'This API is WORKING! :)',
                }),
            };
        }
        return {
            statusCode: 404,
            body: JSON.stringify({
                message: 'THERE IS SOMETHING WRONG! :)',
            }),
        }
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
}