const { ResolverLog } = require('Models');

module.exports = async (_, args, context) => {
  return ResolverLog.findAll();
};
