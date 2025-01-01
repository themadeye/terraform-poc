import {APIGatewayProxyEventV2, APIGatewayProxyResult, Context} from 'aws-lambda';
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, S3 } from '@aws-sdk/client-s3';

export const handler = async (event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyResult> => {
    try {
        console.log("Event: ", event)
        const s3Bucket = new S3Client({});
        const bucketName: string = 'leon-sample-store';
        const filename: string = event.queryStringParameters!.name!;

        const uploadToS3 = new Upload({
            client: s3Bucket,
            params: {
                Bucket: bucketName,
                Key: filename,
                Body: event.body
            }
        })

        uploadToS3.on('httpUploadProgress', (progress) => {
            console.log('Upload progress: ', progress)
        });

        await uploadToS3.done();
        return {
            statusCode: 200,
            headers: {
                "access-control-allow-origin": "*"
            },
            body: JSON.stringify({
                // fileUploadURL: preSignedUrl
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