// @flow
const path = require('path');
const s3 = require('@auth0/s3');

const { BITBUCKET_COMMIT } = process.env;
const { AWS_ACCESS_KEY } = process.env;
const { AWS_SECRET_KEY } = process.env;
const BUCKET_NAME = 'atlaskit-artefacts';
const BUCKET_REGION = 'ap-southeast-2';

if (!AWS_ACCESS_KEY || !AWS_SECRET_KEY || !BITBUCKET_COMMIT) {
  console.error(
    'AWS_ACCESS_KEY, AWS_SECRET_KEY or BITBUCKET_COMMIT are missing',
  );
  console.error('These env variables need to be set to be able to s3');
  process.exit(1);
}

if (process.argv.length !== 3) {
  console.error(`Usage ${path.basename(process.argv[1])} relative/path/on/s3`);
  process.exit(1);
}

const client = s3.createClient({
  maxAsyncS3: 20, // this is the default
  s3RetryCount: 3, // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
  s3Options: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
    region: BUCKET_REGION,
  },
});

const commitHash = BITBUCKET_COMMIT ? BITBUCKET_COMMIT.substring(0, 12) : '';
const filePath = process.argv[2];
const remotePathToFile = `${commitHash}/${filePath}`;
const localFileName = path.basename(filePath);

const params = {
  localFile: localFileName,

  s3Params: {
    Bucket: BUCKET_NAME,
    Key: remotePathToFile,
  },
};

const downloader = client.downloadFile(params);

downloader.on('error', err => {
  throw Error(`unable to download: ${err.stack}`);
});

downloader.on('progress', () => {
  console.log('progress', downloader.progressAmount, downloader.progressTotal);
});

downloader.on('end', () => {
  console.log('done downloading');
});
