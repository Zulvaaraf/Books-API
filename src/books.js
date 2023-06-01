const { nanoid } = require('nanoid');

class Books {
  constructor(entry) {
    this.id = nanoid(10);
    this.name = entry.name;
    this.year = entry.year;
    this.author = entry.author;
    this.summary = entry.summary;
    this.publisher = entry.publisher;
    this.pageCount = entry.pageCount;
    this.readPage = entry.readPage;
    this.finished = entry.readPage === entry.pageCount;
    this.reading = entry.reading;

    const currentTime = new Date().toISOString();
    this.insertedAt = currentTime;
    this.updatedAt = currentTime;
  }

  updateBook(newData) {
    this.name = newData.name;
    this.year = newData.year;
    this.author = newData.author;
    this.summmary = newData.summary;
    this.publisher = newData.publisher;
    this.pageCount = newData.pageCount;
    this.readPage = newData.readPage;
    this.finished = newData.finished;
    this.reading = newData.reading;
    this.updatedAt = new Date().toISOString();
  }

  getIdNameAndPublisher() {
    return {
      id: this.id,
      name: this.name,
      publisher: this.publisher,
    };
  }
}

module.exports = Books;
