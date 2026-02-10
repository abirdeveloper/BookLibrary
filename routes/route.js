const express = require('express')
const router = express.Router()
const controller = require('../controller')

router.get('/', (req, res) => {  
    res.send('Welcome to Book Store')
})

router.get('/books', async(req, res) => {
    try {
        const data = await controller.getAll()
        res.send(data)
    } catch (error) {
        console.error('Error fetching all books:', error)
        res.status(500).send('Internal Server Error')
    }
})

router.get('/book/:code', async(req,res) => {
    try {
        const { code } = req.params
        const data = await controller.getOne(code)
        res.send(data)
    } catch (error) {
        console.error('Error fetching book by code:', error)
        res.status(500).send('Internal Server Error')
    }
})

router.post('/addbook', async (req, res) => {
    try {
        const newBook = {
            code: req.body.code,
            name: req.body.name,
            author:req.body.author
        }
        
        await controller.addNewBook(newBook)
        res.send('Book added!!')
    } catch (error) {
        console.error('Error adding new book:', error)
        res.status(500).send('Internal Server Error')
    }
})

router.post('/updatebook', async (req, res) => {
    try {
        const newBook = {
            code: req.body.code,
            name: req.body.name,
            author:req.body.author
        }
        
        await controller.updateNewBook(newBook)
        res.send('1 book updated!!')
    } catch (error) {
        console.error('Error updating book:', error)
        res.status(500).send('Internal Server Error')
    }
})

router.post('/deletebook', async (req,res)=>{
    try {
        let code = req.body.code
        await controller.deleteBookByCode(code)
        res.send('Book Deleted!!')
    } catch (error) {
        console.error('Error deleting book:', error)
        res.status(500).send('Internal Server Error')
    }
})

module.exports = router