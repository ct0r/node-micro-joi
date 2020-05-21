async function validate(req, schema, options) {
  // TODO: Keep results in weakmap with req as key
  const input = {};

  for (const { key } of schema.$_terms.keys) {
    if (key === "body") {
      // TODO: Parse json only when schema is object
      input[key] = await json(req);
    } else if (key === "query") {
      const { query } = url.parse(req.url);
      input[key] = query ? querystring.parse(query) : {};
    } else {
      input[key] = req[key];
    }
  }

  return schema.validateAsync(input, options);
}

module.exports = {
  validate,
};
