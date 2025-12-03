const express = require('express')
const router = express.Router()
const controller = require('../controller')

router.get('/', (req, res) => {  
    res.send('Welcome to Book Store')
})

router.get('/books', async(req, res) => {
    const data = await controller.getAll()
    res.send(data)
})

router.get('/book/:code', async(req,res) => {
    const { code } = req.params
    const data = await controller.getOne(code)
    res.send(data)
})

router.post('/addbook', (req, res) => {
    const newBook = {
        code: req.body.code,
        name: req.body.name,
        author:req.body.author
    }
    
    controller.addNewBook(newBook)
    res.send('Book added!!')
})

router.post('/updatebook', async (req, res) => {
    const newBook = {
        code: req.body.code,
        name: req.body.name,
        author:req.body.author
    }
    
    const updateResult = await controller.updateNewBook(newBook);
    
    if (updateResult === 0) {
        res.send('Book not found or no updates applied.');
    } else {
        res.send('Book updated!!');
    }
});

router.post('/deletebook',(req,res)=>{
    let code = req.body.code
    controller.deleteBookByCode(code)
    res.send('Book Deleted!!')
})

// router.get('/book/:code', async(req,res) => {
//     const { code } = req.params
//     const data = await controller.getOne(code)
//     res.send(data)
// })

module.exports = router