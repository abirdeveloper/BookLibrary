const MongoClient = require('mongodb').MongoClient;
const keys = require('../config/keys');
const { body, validationResult } = require('express-validator');

//DB Config
const dbUri = keys.MongoUri;

let dbo = null;
    
    const init = async() => {
        try {
            MongoClient.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
                if(err) {
                    console.log('Error connecting to MongoDB:', err);
                    throw err;
                } else {
                    console.log('Mongo db connected')
                    dbo = db.db(keys.dbName)
                }
            });
        } catch(err) {
            console.log('Error while initializing mongodb')
        }       
    }

    const findAll = async() => {
        if (!dbo) {
            console.error('Database connection not initialized.');
            throw new Error('Database connection not initialized.');
        }
        try {
            const result = await dbo.collection(keys.collectionName).find({}).toArray()                
            return result            
        } catch (err) {
            throw err
        }
    }

    const findOne = async(code) => {
        if (!dbo) {
            console.error('Database connection not initialized.');
            throw new Error('Database connection not initialized.');
        }
        // Validate and sanitize code
        if (!code || typeof code !== 'string' || code.trim() === '') {
            throw new Error('Invalid book code provided.');
        }
        try {
            const result = await dbo.collection(keys.collectionName).findOne({code: code.trim()})             
            return result            
        } catch (err) {
            throw err
        }
    }

    const AddBook = async(book) => {
        if (!dbo) {
            console.error('Database connection not initialized.');
            throw new Error('Database connection not initialized.');
        }
        // Validate book data
        if (!book || typeof book !== 'object' || Object.keys(book).length === 0) {
            throw new Error('Invalid book data provided.');
        }

        // Example validation for required fields
        if (!book.code || typeof book.code !== 'string' || book.code.trim() === '') {
            throw new Error('Book code is required.');
        }
        if (!book.name || typeof book.name !== 'string' || book.name.trim() === '') {
            throw new Error('Book name is required.');
        }
        if (!book.author || typeof book.author !== 'string' || book.author.trim() === '') {
            throw new Error('Book author is required.');
        }

        try {
            const result = await dbo.collection(keys.collectionName).insertOne({
                code: book.code.trim(),
                name: book.name.trim(),
                author: book.author.trim()
            })            
            return result            
        } catch (err) {
            throw err
        }
    }
    const UpdateBook = async(book) => {
        if (!dbo) {
            console.error('Database connection not initialized.');
            throw new Error('Database connection not initialized.');
        }
         // Validate book data
         if (!book || typeof book !== 'object' || Object.keys(book).length === 0) {
            throw new Error('Invalid book data provided.');
        }

        // Example validation for required fields
        if (!book.code || typeof book.code !== 'string' || book.code.trim() === '') {
            throw new Error('Book code is required.');
        }
        if (!book.name || typeof book.name !== 'string' || book.name.trim() === '') {
            throw new Error('Book name is required.');
        }
        if (!book.author || typeof book.author !== 'string' || book.author.trim() === '') {
            throw new Error('Book author is required.');
        }
        try {
            var myquery = { "code": book.code.trim() };
            var newvalues = { $set: {"code":book.code.trim(),"name":book.name.trim(),"author": book.author.trim() } };
            const result = await dbo.collection(keys.collectionName).updateOne(myquery, newvalues);            
            return result            
        } catch (err) {
            throw err
        }
    }

    const DeleteBook = async(code) => {
        if (!dbo) {
            console.error('Database connection not initialized.');
            throw new Error('Database connection not initialized.');
        }
        // Validate and sanitize code
        if (!code || typeof code !== 'string' || code.trim() === '') {
            throw new Error('Invalid book code provided.');
        }
        try {
            var myquery = { "code": code.trim() };
            const result = await dbo.collection(keys.collectionName).deleteOne(myquery)            
            return result            
        } catch (err) {
            throw err
        }
    }

module.exports = {init, findAll, findOne,AddBook,DeleteBook,UpdateBook};