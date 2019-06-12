const { pipe, addTable } = require('./helpers/tasks');

const initTask = pipe(addTable);

module.exports = initTask;
