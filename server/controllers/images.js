import AWS from 'aws-sdk';
import uuid from 'uuid';

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

const createObject = (file) => {
  const { originalname, buffer } = file;
  const Key = `${originalname} ${uuid.v4()}`;
  const Body = Buffer.from(buffer, 'utf8');
  const params = {
    Bucket: 'pica-app',
    Key,
    Body,
    ACL: 'public-read',
  };
  const newObject = s3.putObject(params).promise();
  return newObject.then(data => data.ETag).catch(err => err);
};

const getObject = (Key) => {
  const params = {
    Bucket: 'pica-app',
    Key,
  };
  const object = s3.getObject(params).promise();
  return object.then(data => data).catch(err => err);
};

export { createObject, getObject };
