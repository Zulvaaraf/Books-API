const Books = require('./books');
const { succesResponse, failResponse, errorResponse } = require('./response-template');
const storage = require('./storage');

const postBookHandler = (request, h) => {
  try {
    const { payload } = request;
    if (payload.name === undefined) {
      const message = 'Gagal menambahkan buku. Mohon isi nama buku';
      h.response(
        failResponse({
          responseMessage: message,
          withData: false,
        })
      ).code(400);
    }
    if (payload.readPage > payload.pageCount) {
      const message = 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount';
      h.response(
        failResponse({
          responseMessage: message,
          withData: false,
        })
      ).code(400);
    }

    const newBook = new Books(payload);
    storage.set(newBook.id, newBook);
    h.response(
      succesResponse({
        responseMessage: 'Buku berhasil ditambahkan',
        responseData: {
          bookId: newBook.id,
        },
      })
    ).code(201);
  } catch (error) {
    const message = 'Buku gagal ditambahkan';
    return h.response(errorResponse(message)).code(500);
  }
};

module.exports = { postBookHandler };
