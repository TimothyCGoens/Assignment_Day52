const express = require('express')
const app = express()
const cors= require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())

let books = [
    {
        title: '',
        author: '',
        genre: '',
        year: '',
        image: ''
    }
]

app.post('/api/books', (req,res) => {

    let title = req.body.title
    let author = req.body.author
    let genre = req.body.genre
    let year = req.body.year
    let image = req.body.image

    books.push({title: title, genre: genre, year: year, image: image})
    res.json({success: true, message: 'Book was added!'})

})

app.get('/api/books', (req,res) => {
    res.json(books)
})



















app.listen(8080, () => {
    console.log('Server is a go!')
})