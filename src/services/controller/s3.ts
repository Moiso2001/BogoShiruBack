/* utils */
import dotenv from "dotenv"
import { createReadStream } from 'fs';
import * as uuid from "uuid"

/* aws */
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

dotenv.config()

interface FileObject {
    path: string;
}

const bucketName = 'bogotrip-bucket'

const s3_client = new S3Client({
    region: "sa-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESSKEY,
        secretAccessKey: process.env.AWS_SECRETKEY
    }
})

export const postObjectToBucket = async (file: FileObject) => {
    try {
        const fileStream = createReadStream(file.path);

        const uploadParams = {
            Bucket: bucketName,
            Key: uuid.v4(),
            Body: fileStream,
        };

        const command = new PutObjectCommand(uploadParams);
        const result = await s3_client.send(command);
        console.log('Upload successful:', result);
        return result;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error; 
    }
}

export const getObjectFromBucket = async(filename: string) => {
    try {
        if(!filename || filename.length === 0){
            return false
        }

        const key = filename

        const command = new GetObjectCommand({
          Bucket: bucketName,
          Key: key
        })

        const url = await getSignedUrl(s3_client, command);

        return url
    } catch (error) {
        console.error('Error getting file:', error);
        throw error; 
    }
}
