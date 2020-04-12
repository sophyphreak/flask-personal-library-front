import React, { useState, useEffect } from "react"
import axios from "axios"

const SampleFrontend = () => {
  const [bookTitle, setBookTitle] = useState("")
  const [bookList, setBookList] = useState([])
  const [bookSelected, setBookSelected] = useState(null)

  const [newComment, setNewComment] = useState("")

  useEffect(() => {
    ;(async function fetchData() {
      try {
        const response = await axios.get(
          "https://flask-personal-library.andrew-horn-portfolio.life/api/books/"
        )
        setBookList(response.data)
      } catch (e) {
        console.log(e)
      }
    })()
  })

  const handleSubmitBook = async (e) => {
    e.preventDefault()
    let response = {}
    try {
      response = await axios.post(
        `https://flask-personal-library.andrew-horn-portfolio.life/api/books/`,
        {
          title: bookTitle,
        }
      )
    } catch (e) {
      console.log(e)
    }
    setBookTitle("")
  }

  const handleAddComment = async (e) => {
    e.preventDefault()
    let response = {}
    try {
      response = await axios.post(
        `https://flask-personal-library.andrew-horn-portfolio.life/api/books/`,
        {
          title: bookTitle,
        }
      )
    } catch (e) {
      console.log(e)
    }
    setBookTitle("")
  }

  const handleDeleteBook = async (e) => {
    e.preventDefault()
    let response = {}
    try {
      response = await axios.post(
        `https://flask-personal-library.andrew-horn-portfolio.life/api/books/`,
        {
          title: bookTitle,
        }
      )
    } catch (e) {
      console.log(e)
    }
    setBookTitle("")
  }

  const handleDeleteAllBookss = async (e) => {
    e.preventDefault()
    let response = {}
    try {
      response = await axios.delete(
        `https://flask-personal-library.andrew-horn-portfolio.life/api/books/`
      )
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div id="sampleui">
      <h2 style={{ textAlign: "left" }}>Sample Front-End:</h2>
      <form id="newBookForm" className="border">
        <input
          type="text"
          id="bookTitleToAdd"
          name="title"
          placeholder="New Book Title"
          style={{ width: "295px" }}
          value={bookTitle}
          onChange={({ target: { value } }) => setBookTitle(value)}
        />
        <button
          type="submit"
          value="Submit"
          id="newBook"
          onClick={handleSubmitBook}
        >
          Submit New Book!
        </button>
      </form>
      <div id="display">
        <ul>
          {bookList.map((book, index) => {
            return (
              <li key={index} onClick={() => setBookSelected(index)}>
                {`${book.title} - ${book.commentcount} comments`}
              </li>
            )
          })}
        </ul>
      </div>
      <div id="bookDetail" className="border">
        {bookSelected === null && (
          <p id="detailTitle">Select a book to see it's details and comments</p>
        )}
        {bookSelected !== null && bookSelected !== undefined && (
          <form>
            <p>
              <b>{bookList[bookSelected].title}</b> (id:{" "}
              {bookList[bookSelected]._id})
            </p>
            <ol id="detailComments">
              {bookList[bookSelected].commentcount &&
                bookList[bookSelected].comments.map((comment, index) => (
                  <li key={index}>{comment}</li>
                ))}
            </ol>
            <input
              placeholder="New Comment"
              value={newComment}
              onChange={({ target: { value } }) => setNewComment(value)}
            />
            <br />
            <br />
            <button onClick={handleAddComment}>Add Comment</button>
            <button onClick={handleDeleteBook}>Delete Book</button>
          </form>
        )}
      </div>
      <button id="deleteAllBooks" onClick={handleDeleteAllBookss}>
        Delete all books...
      </button>
    </div>
  )
}

export default SampleFrontend
