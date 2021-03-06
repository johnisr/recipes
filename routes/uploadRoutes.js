const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');

const s3 = new AWS.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey,
  signatureVersion: 'v4',
  region: 'us-east-1',
});

module.exports = app => {
  app.get('/api/upload', requireLogin, (req, res) => {
    const key = `${req.user.id}/${uuid()}.jpeg`;

    s3.getSignedUrl(
      'putObject',
      {
        Bucket: 'ramosrecipes',
        ContentType: 'image/jpeg',
        Key: key,
      },
      (err, url) => {
        res.send({ key, url });
      }
    );
  });

  app.patch('/api/upload', requireLogin, (req, res) => {
    const key = req.body.url;
    s3.deleteObject(
      {
        Bucket: 'ramosrecipes',
        Key: key,
      },
      (err, data) => {
        res.status(200).send(data);
      }
    );
  });
};
