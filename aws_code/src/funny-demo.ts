import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

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