// @flow
const fs = require('fs');
const path = require('path');
// const npmRun = require('npm-run');
const s3 = require('@auth0/s3');
const chalk = require('chalk');
const axios = require('axios');

const masterStatsFolder = createDir('./.masterBundleSize');
const currentStatsFolder = createDir('./.currentBundleSize');

const { BITBUCKET_COMMIT } = process.env;
const { AWS_ACCESS_KEY } = process.env;
const { AWS_SECRET_KEY } = process.env;
const BUCKET_NAME = 'atlaskit-artefacts';
const BUCKET_REGION = 'ap-southeast-2';

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

function createDir(dir) {
  try {
    fs.mkdirSync(dir);
  } catch (err) {
    if (err.code === 'EEXIST') {
      return dir;
    }
    console.log(err);
    process.exit(0);
  }
  return dir;
}

function isAWSAccessible() {
  if (!AWS_ACCESS_KEY || !AWS_SECRET_KEY || !BITBUCKET_COMMIT) {
    console.error(
      chalk.red(
        'AWS_ACCESS_KEY, AWS_SECRET_KEY or BITBUCKET_COMMIT are missing',
      ),
    );
    console.error(
      chalk.red('These env variables need to be set to be able to s3'),
    );
    return false;
  }
  return true;
}

/**
 * This function downloads files from S3 and create ratchet file into a given download location.
 * This does not use S3 commands instead uses http get to fetch ratchet file from S3.
 * This is designed to enable local dev loop without AWS credentials to access data on S3.
 **/
async function downloadFromS3ForLocal(
  downloadToFolder /*: string */,
  branch /*: string */,
  packageName /*: string */,
) {
  const ratchetFile = `${packageName}-bundle-size-ratchet.json`;
  const output = `${downloadToFolder}/${ratchetFile}`;
  const rachetFileUrl = `http://s3-${BUCKET_REGION}.amazonaws.com/${BUCKET_NAME}/${branch}/bundleSize/${ratchetFile}`;
  try {
    const response = await axios({
      url: rachetFileUrl,
      method: 'get',
    });
    fs.writeFileSync(output, JSON.stringify(response.data), 'utf-8');
  } catch (err) {
    if (err.response.status === 403 || err.response.status === 404) {
      console.error(
        chalk.red(`Could not find file ${ratchetFile} on s3, it is likely that you are adding a new package to the repository.
      Please consult the README.md in the @atlaskit/measure folder on how to add a new package on s3.`),
      );
      process.exit(0);
    } else {
      console.error(chalk.red(`${err}`));
      process.exit(1);
    }
  }
}

function downloadFromS3(
  downloadToFolder /*: string */,
  branch /*: string */,
  packageName /*: string */,
) {
  if (!isAWSAccessible()) {
    process.exit(1);
  }

  const ratchetFile = `${packageName}-bundle-size-ratchet.json`;
  const bucketPath = `s3://${BUCKET_NAME}/${branch}/bundleSize/${ratchetFile}`;

  console.log('bucket', bucketPath);
  try {
    const params = {
      localFile: `${downloadToFolder}/${ratchetFile}`,

      s3Params: {
        Bucket: BUCKET_NAME,
        Key: bucketPath,
      },
    };
    const downloader = client.downloadFile(params);

    downloader.on('error', err => {
      throw Error(`unable to download: ${err.stack}`);
    });

    downloader.on('progress', () => {
      console.log(
        'progress',
        downloader.progressAmount,
        downloader.progressTotal,
      );
    });

    downloader.on('end', () => {
      console.log('done downloading');
    });
    // npmRun.sync(
    //   `s3-cli --region="${BUCKET_REGION}" get ${bucketPath} ${downloadToFolder}/${ratchetFile}`,
    // );
  } catch (err) {
    if (err.status === 1) {
      console.warn(
        chalk.yellow(`Could not find file ${ratchetFile} on s3, it is likely that you are adding a new package to the repository.
       Don't worry, we will create and upload ratchet file for this pkg.`),
      );
      throw new Error(
        `Ratchet file for this ${packageName} was not found in s3 bucket`,
      );
    } else {
      console.error(chalk.red(`${err}`));
      process.exit(1);
    }
  }
}

function uploadToS3(pathToFile /*: string */, branch /*: string */) {
  if (!isAWSAccessible()) {
    process.exit(1);
  }

  if (!fs.accessSync(path.resolve(pathToFile))) {
    console.error(
      chalk.red(`Could not find file: ${pathToFile} from ${process.cwd()}`),
    );
  }

  const fileName = path.basename(pathToFile);
  const bucketPath = `s3://${BUCKET_NAME}/${branch}/bundleSize/${fileName}`;

  const params = {
    localFile: pathToFile,

    s3Params: {
      Bucket: BUCKET_NAME,
      Key: bucketPath,
    },
  };

  // npmRun.sync(
  //   `s3-cli --region="${BUCKET_REGION}" put ${pathToFile} ${bucketPath}`,
  // );

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

  const publicUrl = `s3-${BUCKET_REGION}.amazonaws.com/${BUCKET_NAME}/${branch}/bundleSize/${fileName}`;
  console.log(chalk.green('Successfully published to', publicUrl));
}

module.exports = {
  currentStatsFolder,
  downloadFromS3,
  downloadFromS3ForLocal,
  masterStatsFolder,
  uploadToS3,
};
