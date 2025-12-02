const mongoose = require('mongoose');
const keys = require('../config/keys');
const { body, validationResult } = require('express-validator');

// Define the Book schema
const bookSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    }
});

// Create the Book model
const Book = mongoose.model('Book', bookSchema, keys.collectionName); // Ensure model name is 'Book' and collection name matches

//DB Config
const dbUri = keys.MongoUri;

let dbo = null;

const init = async () => {
    try {
        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: keys.dbName // Specify the database name here
        });
        console.log('MongoDB connected');
        dbo = mongoose.connection.db; // Get the native db object from mongoose
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err;
    }
};

const findAll = async () => {
    if (!dbo) {
        console.error('Database connection not initialized.');
        throw new Error('Database connection not initialized.');
    }
    try {
        const result = await Book.find({});
        return result;
    } catch (err) {
        throw err;
    }
};

const findOne = async (code) => {
    if (!dbo) {
        console.error('Database connection not initialized.');
        throw new Error('Database connection not initialized.');
    }
    // Validate and sanitize code
    if (!code || typeof code !== 'string' || code.trim() === '') {
        throw new Error('Invalid book code provided.');
    }
    try {
        const result = await Book.findOne({ code: code.trim() });
        return result;
    } catch (err) {
        throw err;
    }
};

const AddBook = async (book) => {
    if (!dbo) {
        console.error('Database connection not initialized.');
        throw new Error('Database connection not initialized.');
    }
    // Validate book data
    if (!book || typeof book !== 'object' || Object.keys(book).length === 0) {
        throw new Error('Invalid book data provided.');
    }

    try {
        const newBook = new Book({
            code: book.code.trim(),
            name: book.name.trim(),
            author: book.author.trim()
        });
        const result = await newBook.save();
        return result;
    } catch (err) {
        throw err;
    }
};

const UpdateBook = async (book) => {
    if (!dbo) {
        console.error('Database connection not initialized.');
        throw new Error('Database connection not initialized.');
    }
    // Validate book data
    if (!book || typeof book !== 'object' || Object.keys(book).length === 0) {
        throw new Error('Invalid book data provided.');
    }

    try {
        const result = await Book.updateOne({ code: book.code.trim() }, {
            code: book.code.trim(),
            name: book.name.trim(),
            author: book.author.trim()
        });
        return result;
    } catch (err) {
        throw err;
    }
};

const DeleteBook = async (code) => {
    if (!dbo) {
        console.error('Database connection not initialized.');
        throw new Error('Database connection not initialized.');
    }
    // Validate and sanitize code
    if (!code || typeof code !== 'string' || code.trim() === '') {
        throw new Error('Invalid book code provided.');
    }
    try {
        const result = await Book.deleteOne({ code: code.trim() });
        return result;
    } catch (err) {
        throw err;
    }
};

module.exports = { init, findAll, findOne, AddBook, DeleteBook, UpdateBook };