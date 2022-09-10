// General logging for all API access
exports.logRequest = (req, res, next) => {
  let date = new Date(Date.now()).toLocaleDateString("en-US", {
    dateStyle: "long",
    timeStyle: "long",
  });

  // Prints time, url, method
  console.log(
    `Got a Request
      On: ${date}
      URL: ${req.baseUrl}${req.path}
      Protocol: ${req.protocol}
      Method: ${req.method}
      Params: ${req.params}
      Body: ${JSON.stringify(req.body)}`
  );

  next();
};
