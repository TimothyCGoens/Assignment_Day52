import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Books} from './Books'

export class App extends Component {

  constructor() {
    super()

    this.state = {
      books: [],
      title: '',
      author: '',
      genre: '',
      year: '',
      image: ''
    }
  }

  componentDidMount() {

    let url = 'http://localhost:8080/api/books'

    fetch(url)
    .then(response => response.json())
    .then(json => {
      this.setState({
        books: json
      })
    })
  }

handleBookText = (e) => {

  this.setState({
  [e.target.name]: e.target.value
  })
}

handleAddBook = () => {

  let book = { 
    
    title: this.state.title, 
    author: this.state.author, 
    genre: this.state.genre, 
    year: this.state.year, 
    image: this.state.image
    }

    fetch('http://localhost:8080/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.title,
        author: this.state.author,
        genre: this.state.genre,
        year: this.state.year,
        image: this.state.image,
      })
      })
      .then(() => {
        this.setState({
        books: this.state.books.concat(book)
        })
    })
}

  removeBook = (name) => {

    this.setState({
      books: this.state.books.filter((book) => book != name)
    })
  }

  removeBook = (name) => {
    this.props.removeBookCallback(name)
}

  render() {

    let books = this.state.books
    let bookItems = books.map((b) => {
      return (
        <div className='book-info'>
        <li>
        {b.title}
        <div>
        Written by:{b.author}
        </div>
        <div>
        Genre:{b.genre}
        </div>
        <div>
        Published:{b.year}
        </div>
        <div>
        <img className='image-size' src={b.image}/>
        </div>
        <button>Delete</button>
        </li>
        </div>
        
      )
    })

    return (
      <div className="App">
        <h1>holla back bookstore!</h1>
        <div className='text-boxes'>
        <input onChange={this.handleBookText} placeholder='enter title of book' name='title' type='text'/>
        <input onChange={this.handleBookText} placeholder='enter author of book' name='author' type='text'/>
        <input onChange={this.handleBookText} placeholder='enter genre of book' name='genre' type='text'/>
        <input onChange={this.handleBookText} placeholder='enter year of book' name='year' type='text'/>
        <input onChange={this.handleBookText} placeholder='link to image of book' name='image' type='text'/>
        <button onClick={this.handleAddBook}>Add</button>
        <Books books={this.state.books} removeBookCallback={this.removeBook}></Books>
        <ul>{bookItems}</ul>
        </div>
      </div>
    );
  }

}

export default App;
