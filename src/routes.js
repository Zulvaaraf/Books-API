const { postBookHandler, getAllBookHandler } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: postBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBookHandler,
  },
];

module.exports = routes;
