// const books = require('../data/books')
// let bookList = books
const booksDS = require('./booksDS')

const getAll = () => {
    return booksDS.findAll()
    // return new Promise ((resolve,reject) => {
    //     try {
    //         resolve(books)
    //     } catch {
    //         reject()
    //     }        
    // })
}

const getOne = (code) => {
   // return bookList.filter(book => book.code == code)
   return booksDS.findOne(code)
    // return new Promise ((resolve,reject) => {
    //     try {
    //         resolve(books.filter(book => book.code == code))
    //     } catch (error) {
    //         reject(error)
    //     }        
    // })
}

const addNewBook = (book) => {
    
    return booksDS.AddBook(book)
}
const updateBook = (book) => {
    
    return booksDS.UpdateBook(book)
}

const deleteNewBook = (code) => {
    
    return booksDS.DeleteBook(code)
}

module.exports = { getAll, getOne, addNewBook , deleteNewBook,updateBook}