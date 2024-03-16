const { Link } = ReactRouterDOM

import { BookPreview } from "./BookPreview.jsx"

export function BookList({books,onRemoveBook}){

    function removeBook(bookId){
        
        onRemoveBook(bookId)
    }

    if (!books) return <div className="loader"><span>III</span></div>
    return <ul className="book-list clean-list">
        {
        books.map(book => 
            <li key={book.id} className="book-card">
                <div className="card-container">
                <Link to={`/books/${book.id}`}>
                    <BookPreview book={book}/>
                </Link>

                </div>
                
                
                <div className="book-actions">
                    <Link to={`/books/edit/${book.id}`}><button>Edit book</button></Link>
                    <button onClick={() => removeBook(book.id)}>Remove book</button>
                </div>
            </li>
        )
        }
    </ul>
}