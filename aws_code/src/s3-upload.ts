import {APIGatewayProxyEvent, APIGatewayProxyResult, Context} from "aws-lambda";
import {S3} from "aws-sdk";

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    try {
        const s3Bucket = new S3({ signatureVersion: 'v4'});
        const bucketName: string = 'leon-sample-store';
        const expirationInSeconds: number = 120;
        const filename: string = event.queryStringParameters!.fileName!;

        const payload = {
            Bucket: bucketName,
            Key: filename,
            ContentType: 'multipart/form-data',
            Expires: expirationInSeconds
        };

        console.log("File payload: ", payload);

        const preSignedUrl = s3Bucket.getSignedUrl('putObject', payload);

        return {
            statusCode: 200,
            headers: {
                "access-control-allow-origin": "*"
            },
            body: JSON.stringify({
                fileUploadURL: preSignedUrl
            })
        }
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to create upload URL' }),
        };
    }
}