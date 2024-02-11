const http = require('http');
const url = require('url');
const query = require('querystring');

const handler = require('./response.js');
const jsonHandler = require('./jsonResponse.js');
const xmlHandler = require('./xmlResponse.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': handler.getIndex,
  '/style.css': handler.getStylesheet,
  '/success': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,
  '/unauthorized': jsonHandler.unauthorized,
  '/forbidden': jsonHandler.forbidden,
  '/internal': jsonHandler.internalError,
  '/notImplemented': jsonHandler.notImplemented,
  '/notFound': jsonHandler.notFound,
  'text/xml': {
    '/success': xmlHandler.success,
    '/badRequest': xmlHandler.badRequest,
    '/unauthorized': xmlHandler.unauthorized,
    '/forbidden': xmlHandler.forbidden,
    '/internal': xmlHandler.internalError,
    '/notImplemented': xmlHandler.notImplemented,
    '/notFound': xmlHandler.notFound,
  },
};

const onRequest = (request, response) => {
  console.log(request.url);
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);

  const typeHandler = urlStruct[request.headers.accept.split(',')[0]];
  if (!typeHandler) {
    const handlerFunc = urlStruct[parsedUrl.pathname];
    if (handlerFunc) {
      return handlerFunc(request, response, params);
    }

    return urlStruct['/notFound'](request, response, params);
  }
  const handlerFunc = typeHandler[parsedUrl.pathname];
  if (handlerFunc) {
    return handlerFunc(request, response, params);
  }
  return typeHandler['/notFound'](request, response, params);
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
