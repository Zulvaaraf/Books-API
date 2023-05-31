const { nanoid } = require('nanoid');

class Books {
  constructor(entry) {
    this.id = nanoid(10);
    this.name = entry.name;
    this.year = entry.year;
    this.author = entry.author;
    this.summary = entry.summary;
    this.publisher = entry.publisher;
    this.pageCount = entry.publisher;
    this.readPage = entry.readPage;
    this.finished = entry.readPage === entry.pageCount;
    this.reading = entry.reading;

    const currentTime = new Date().toISOString();
    this.insertedAt = currentTime;
    this.updatedAt = currentTime;
  }
}

module.exports = Books;
