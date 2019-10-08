// This function is used in case of an error more likely when a new package is added.
// It returned the missing package based on the error message.
function returnMissingPkgBasedOn(err) {
  const newErr = err
    .split('was not found in s3 bucket')
    .shift()
    .split('File for this')
    .pop()
    .trim();
  console.log(newErr);
  return newErr;
}

module.exports = { returnMissingPkgBasedOn };
