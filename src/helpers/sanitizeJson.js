const sanitizeJson = (obj) => {
  Object.keys(obj).forEach((k) => (!obj[k] && obj[k] !== undefined) && delete obj[k]);
  return obj;
};

module.exports = sanitizeJson;
