// @flow
const fs = require('fs');
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const s3 = require('s3');

const { BITBUCKET_COMMIT } = process.env;
const { AWS_ACCESS_KEY } = process.env;
const { AWS_SECRET_KEY } = process.env;
const ARGS_LENGTH_WITHOUT_OUTPUT_PATH = 3;
const ARGS_LENGTH_WITH_OUTPUT_PATH = 4;
const BUCKET_NAME = 'atlaskit-artefacts';
const BUCKET_REGION = 'ap-southeast-2';

if (!AWS_ACCESS_KEY || !AWS_SECRET_KEY || !BITBUCKET_COMMIT) {
  console.error(
    'AWS_ACCESS_KEY, AWS_SECRET_KEY or BITBUCKET_COMMIT are missing',
  );
  console.error('These env variables need to be set to be able to s3');
  process.exit(1);
}

if (
  ![ARGS_LENGTH_WITH_OUTPUT_PATH, ARGS_LENGTH_WITHOUT_OUTPUT_PATH].includes(
    process.argv.length,
  )
) {
  console.error(
    `Usage ${path.basename(
      process.argv[1],
    )} path/to/file/to/upload [path/on/s3]`,
  );
  console.error(
    'Note: You only need the path for the (optional) second arg, not the basename',
  );
  process.exit(1);
}

const pathToFile = path.resolve(process.argv[2]);
const fileName = path.basename(pathToFile);
const commitHash = BITBUCKET_COMMIT ? BITBUCKET_COMMIT.substring(0, 12) : '';
let outputPath = process.argv[3] || '';

if (!fs.existsSync(path.resolve(process.argv[2]))) {
  console.error(`Could not find file: ${pathToFile} from ${process.cwd()}`);
}

if (outputPath && !outputPath.endsWith('/')) {
  outputPath += '/';
}
const bucketPath = `s3://${BUCKET_NAME}/${commitHash}/${outputPath}${fileName}`;

// npmRun.sync(
//   `s3-cli --region="${BUCKET_REGION}" put ${pathToFile} ${bucketPath}`,
// );

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

const params = {
  localFile: pathToFile,

  s3Params: {
    Bucket: BUCKET_NAME,
    Key: bucketPath,
  },
};

const uploader = client.uploadFile(params);

uploader.on('error', err => {
  throw Error(`unable to upload: ${err.stack}`);
});
uploader.on('progress', () => {
  console.log(
    'progress',
    uploader.progressMd5Amount,
    uploader.progressAmount,
    uploader.progressTotal,
  );
});
uploader.on('end', () => {
  console.log('done uploading');
});

const publicUrl = `https://s3-${BUCKET_REGION}.amazonaws.com/${BUCKET_NAME}/${commitHash}/${outputPath}${fileName}`;
console.log('Successfully published to', publicUrl);
console.log('You can also fetch this file again by running:');
console.log(`node ./build/download.build.artefact.for.commit.js ${outputPath}`);
