// This function is used in case of an error more likely when a new package is added.
// It returned the missing package based on the error message.
function returnMissingPkgBasedOn(err) {
  console.log('err:', err);

  const newErr = err
    .split('was not found in s3 bucket')
    .shift()
    .split('Ratchet file for this')
    .pop()
    .trim();
  console.log('newErr:', newErr);
  return newErr;
}

module.exports = { returnMissingPkgBasedOn };
