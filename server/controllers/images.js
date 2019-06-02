import AWS from 'aws-sdk';
import uuid from 'uuid';

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

/**
 * @name createObject
 * function for saving image to Amazon S3
 * @param {Object} file
 * @returns {String} tag of image saved to S3
 */
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

/**
 * @name getObject
 * Function for retrieving images from S3
 * @param {String} Key
 * @returns {Object} details of image retrieved from S3 storage
 */
const getObject = (Key) => {
  const params = {
    Bucket: 'pica-app',
    Key,
  };
  const object = s3.getObject(params).promise();
  return object.then(data => data).catch(err => err);
};

export { createObject, getObject };
