const respondJSON = (request, response, status, statusMessage, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json', 'Status-Message': statusMessage });
  response.write(JSON.stringify(object));
  response.end();
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, 'Not Found', responseJSON);
};

const notImplemented = (request, response) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  return respondJSON(request, response, 501, 'Not Implemented', responseJSON);
};

const internalError = (request, response) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };

  return respondJSON(request, response, 500, 'Internal Server Error', responseJSON);
};

const forbidden = (request, response) => {
  const responseJSON = {
    message: 'You do not have access this content.',
    id: 'forbidden',
  };

  return respondJSON(request, response, 403, 'Forbidden', responseJSON);
};

const unauthorized = (request, response, params) => {
  const responseJSON = {
    message: 'You have successfully viewed the content.',
  };

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    responseJSON.id = 'unauthorized';

    return respondJSON(request, response, 401, 'Unauthorized', responseJSON);
  }

  return respondJSON(request, response, 200, 'Success', responseJSON);
};

const badRequest = (request, response, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query param set to true';
    responseJSON.id = 'badRequest';

    return respondJSON(request, response, 400, 'Bad Request', responseJSON);
  }

  return respondJSON(request, response, 200, 'Success', responseJSON);
};

const success = (request, response) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  return respondJSON(request, response, 200, 'Success', responseJSON);
};

module.exports.success = success;
module.exports.badRequest = badRequest;
module.exports.unauthorized = unauthorized;
module.exports.forbidden = forbidden;
module.exports.internalError = internalError;
module.exports.notImplemented = notImplemented;
module.exports.notFound = notFound;
