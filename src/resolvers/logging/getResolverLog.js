const { ResolverLog } = require('Models');

module.exports = async (_, { id }, context) => {
  return ResolverLog.findOne({
    where: {
      id,
    }
  });
};
