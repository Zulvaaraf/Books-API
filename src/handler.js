const Books = require('./books');
const { successResponse, failResponse, errorResponse } = require('./response-template');
const storage = require('./storage');

const postBookHandler = (request, h) => {
  try {
    const { payload } = request;
    if (!payload.name) {
      const message = 'Gagal menambahkan buku. Mohon isi nama buku';
      return h
        .response(
          failResponse({
            responseMessage: message,
            withData: false,
          })
        )
        .code(400);
    }

    if (payload.readPage > payload.pageCount) {
      const message = 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount';
      return h
        .response(
          failResponse({
            responseMessage: message,
            withData: false,
          })
        )
        .code(400);
    }

    const newBook = new Books(payload);
    storage.set(newBook.id, newBook);
    return h
      .response(
        successResponse({
          responseMessage: 'Buku berhasil ditambahkan',
          responseData: { bookId: newBook.id },
        })
      )
      .code(201);
  } catch (error) {
    const message = 'Buku gagal ditambahkan';
    return h.response(errorResponse(message)).code(500);
  }
};

const getBookHandler = (request, h) => {
  const { bookIdParam } = request.params;
  const bookById = storage.get(bookIdParam);
  if (bookIdParam !== undefined) {
    if (bookById === undefined) {
      const message = 'Buku tidak ditemukan';
      return h.response(failResponse({ responseMessage: message })).code(400);
    }
    return h.response(successResponse({ responseData: { book: bookById } })).code(200);
  }
};

module.exports = { postBookHandler };
