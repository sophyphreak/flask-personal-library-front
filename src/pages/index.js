import React, {useState} from "react"
import axios from "axios"
import './style.css'

const IndexPage = () => {
  const [bookId, setBookId] = useState('')
  const [commentText, setCommentText] = useState('')
  const [postCommentResponse, setPostCommentResponse] = useState('')

  const handleSubmitComment = async e => {
    e.preventDefault()
    let response = {}
    try {
      response = await axios.post(`https://flask-personal-library.andrew-horn-portfolio.life/api/books/${bookId}`, {
        comment_text: commentText
      })
    } catch (e) {
      console.log(e)
    }
    setPostCommentResponse(JSON.stringify(response.data))
    setBookId('')
    setCommentText('')
  }

return (
  <div>
    <header>
      <h1>
        <b>ISQA Project</b> - Personal Library
      </h1>
    </header>
    <br />
    <div id="userstories">
      <h2>User stories:</h2>
      <ol>
        <li>
          I can <b>post</b> a <code>title</code> to /api/books to add a book and
          returned will be the object with the <code>title</code> and a unique{" "}
          <code>_id</code>.
        </li>
        <li>
          I can <b>get</b> /api/books to retrieve an aray of all books
          containing <code>title</code>,<code>_id</code>, &{" "}
          <code>commentcount</code>.
        </li>
        <li>
          I can <b>get</b> /api/books/{'{_id}'} to retrieve a single object of a
          book containing <code>title</code>,<code>_id</code>, & an array of{" "}
          <code>comments</code> (empty array if no comments present).
        </li>
        <li>
          I can <b>post</b> a <code>comment</code> to /api/books/{'{_id}'} to add a
          comment to a book and returned will be the books object similar to{" "}
          <b>get</b> /api/books/{'{_id}'}.
        </li>
        <li>
          I can <b>delete</b> /api/books/{'{_id}'} to delete a book from the
          collection. Returned will be 'delete successful' if successful.
        </li>
        <li>
          If I try to request a book that doesn't exist I will get a 'no book
          exists' message.
        </li>
        <li>
          I can send a <b>delete</b> request to /api/books to delete all books
          in the database. Returned will be 'complete delete successful' if
          successful.
        </li>
      </ol>
      <br />
      <img src="https://cdn.gomix.com/d7932c52-287f-4dae-b175-631fef453000%2FScreen%20Shot%202016-12-16%20at%201.35.56%20AM.png" alt=""/>
    </div>
    <hr style={{margin: "50px"}} />
    <div id="sampleposting">
      <h2 style={{ textAlign: "left" }}>Test API responses:</h2>
      <form action="https://flask-personal-library.andrew-horn-portfolio.life/api/books/" method="post" className="border">
        <h4>Test post to /api/books/</h4>
        Book Title:
        <br />
        <input type="text" name="title" />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <form action="" method="" id="commentTest" className="border">
        <h4>Test post to /api/books/{'{bookid}'}</h4>
        BookId to comment on:
        <br />
        <input type="text" name="id" value={bookId} onChange={({ target: { value }}) => setBookId(value)} id="idinputtest" />
        <br />
        Comment:
        <br />
        <input type="text" name="comment" value={commentText} onChange={({ target: { value } }) => setCommentText(value)} />
        <br />
        <input type="submit" value="Submit" onClick={handleSubmitComment} />
      </form>
      {postCommentResponse && (
        <p><code>{postCommentResponse}</code></p>
      )}
    </div>
    <hr style={{margin: "50px"}} />
    <div id="sampleui">
      <h2 style={{ textAlign: "left" }}>Sample Front-End:</h2>
      <form id="newBookForm" className="border">
        <input
          type="text"
          id="bookTitleToAdd"
          name="title"
          placeholder="New Book Title"
          style={{ width: "295px" }}
        />
        <button type="submit" value="Submit" id="newBook">
          Submit New Book!
        </button>
      </form>
      <div id="display"></div>
      <div id="bookDetail" className="border">
        <p id="detailTitle">Select a book to see it's details and comments</p>
        <ol id="detailComments"></ol>
      </div>
      <button id="deleteAllBooks">Delete all books...</button>
    </div>
    <hr style={{margin: "50px"}} />
  </div>
)}

export default IndexPage
