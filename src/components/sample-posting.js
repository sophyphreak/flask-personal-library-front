import React, { useState } from "react"
import axios from "axios"

const SamplePosting = () => {
  const [bookTitle, setBookTitle] = useState("")
  const [postBookResponse, setPostBookResponse] = useState("")

  const [bookId, setBookId] = useState("")
  const [commentText, setCommentText] = useState("")
  const [postCommentResponse, setPostCommentResponse] = useState("")

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
    setPostBookResponse(JSON.stringify(response.data))
    setBookTitle("")
  }

  const handleSubmitComment = async (e) => {
    e.preventDefault()
    let response = {}
    try {
      response = await axios.post(
        `https://flask-personal-library.andrew-horn-portfolio.life/api/books/${bookId}`,
        {
          comment_text: commentText,
        }
      )
    } catch (e) {
      console.log(e)
    }
    setPostCommentResponse(JSON.stringify(response.data))
    setBookId("")
    setCommentText("")
  }
  return (
    <div id="sampleposting">
      <h2 style={{ textAlign: "left" }}>Test API responses:</h2>
      <form action="" method="" className="border">
        <h4>Test post to /api/books/</h4>
        Book Title:
        <br />
        <input
          type="text"
          name="title"
          value={bookTitle}
          onChange={({ target: { value } }) => setBookTitle(value)}
        />
        <br />
        <input type="submit" value="Submit" onClick={handleSubmitBook} />
      </form>
      {postBookResponse && (
        <p>
          <code>{postBookResponse}</code>
        </p>
      )}
      <form action="" method="" id="commentTest" className="border">
        <h4>Test post to /api/books/{"{bookid}"}</h4>
        BookId to comment on:
        <br />
        <input
          type="text"
          name="id"
          value={bookId}
          onChange={({ target: { value } }) => setBookId(value)}
          id="idinputtest"
        />
        <br />
        Comment:
        <br />
        <input
          type="text"
          name="comment"
          value={commentText}
          onChange={({ target: { value } }) => setCommentText(value)}
        />
        <br />
        <input type="submit" value="Submit" onClick={handleSubmitComment} />
      </form>
      {postCommentResponse && (
        <p>
          <code>{postCommentResponse}</code>
        </p>
      )}
    </div>
  )
}

export default SamplePosting
