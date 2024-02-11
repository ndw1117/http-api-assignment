const respondXML = (request, response, status, statusMessage, xmlString) => {
  response.writeHead(status, { 'Content-Type': 'text/xml', 'Status-Message': statusMessage });
  response.write(xmlString);
  response.end();
};

const notFound = (request, response) => {
  const xmlString = '<response><message>The page you are looking for was not found.</message><id>notFound</id></response>';

  return respondXML(request, response, 404, 'Not Found', xmlString);
};

const notImplemented = (request, response) => {
  const xmlString = '<response><message>A get request for this page has not been implemented yet. Check again later for updated content.</message><id>notImplemented</id></response>';

  return respondXML(request, response, 501, 'Not Implemented', xmlString);
};

const internalError = (request, response) => {
  const xmlString = '<response><message>Internal Server Error. Something went wrong.</message><id>internalError</id></response>';

  return respondXML(request, response, 500, 'Internal Server Error', xmlString);
};

const forbidden = (request, response) => {
  const xmlString = '<response><message>You do not have access to this content.</message><id>forbidden</id></response>';

  return respondXML(request, response, 403, 'Forbidden', xmlString);
};

const unauthorized = (request, response, params) => {
  let xmlString = '<response><message>You have successfully viewed the content</message></response>';

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    xmlString = '<response><message>Missing loggedIn query parameter set to yes</message><id>unauthorized</id></response>';

    return respondXML(request, response, 401, 'Unauthorized', xmlString);
  }

  return respondXML(request, response, 200, 'Success', xmlString);
};

const badRequest = (request, response, params) => {
  let xmlString = '<response><message>This request has the required parameters</message></response>';

  if (!params.valid || params.valid !== 'true') {
    xmlString = '<response><message>Missing valid query param set to true</message><id>badRequest</id></response>';

    return respondXML(request, response, 400, 'Bad Request', xmlString);
  }

  return respondXML(request, response, 200, 'Success', xmlString);
};

const success = (request, response) => {
  const xmlString = '<response><message>This is a successful response</message></response>';

  return respondXML(request, response, 200, 'Success', xmlString);
};

module.exports.success = success;
module.exports.badRequest = badRequest;
module.exports.unauthorized = unauthorized;
module.exports.forbidden = forbidden;
module.exports.internalError = internalError;
module.exports.notImplemented = notImplemented;
module.exports.notFound = notFound;
