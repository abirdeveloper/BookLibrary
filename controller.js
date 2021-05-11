const bookAdaptor = require('./lib/books-adaptor')

const getAll = () => {
    const books = bookAdaptor.getAll();
    return books
}

const getOne = (code) => {
    const book = bookAdaptor.getOne(code);
    return book
}

const add = (book) => {
    const books = bookAdaptor.add(book)
    return books
}
const addNewBook = (book)=>{
  return  bookAdaptor.addNewBook(book)
}
const updateNewBook = (book)=>{
    return  bookAdaptor.updateBook(book)
  }

const deleteBookByCode = (code)=>{
    return bookAdaptor.deleteNewBook(code)
}


module.exports = {getAll, getOne, addNewBook,deleteBookByCode,updateNewBook}