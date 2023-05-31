const { nanoid } = require('nanoid');
const books = require('./books');

const postBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBooks = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBooks);

  const isSuccess = books.filter((n) => n.id === id).length > 0;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
};

const getAllBookHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  const filteredBooks = books;

  if (name !== undefined) {
    filteredBooks = filteredBooks.filter((b) => b.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading !== undefined) {
    filteredBooks = filteredBooks.filter((b) => {
      if (reading == 0) {
        return !b.reading;
      } else if (reading === 1) {
        return b.reading;
      } else {
        return true;
      }
    });
  }

  if (finished !== undefined) {
    filteredBooks = filteredBooks.filter((b) => {
      if (finished == 0) {
        return !b.reading;
      } else if (finished === 1) {
        return b.finished;
      } else {
        return true;
      }
    });
  }

  const response = h.response({
    status: 'success',
    data: {
      books: [],
    },
  });
  response.code(200);
  return response;
};

module.exports = { postBookHandler, getAllBookHandler };
