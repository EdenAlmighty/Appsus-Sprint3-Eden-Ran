const { useState, useEffect } = React
const { Link } = ReactRouterDOM


import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getFilterBy())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then((books) => {
                setBooks(books)
            })
    }

    function onRemoveBook(bookId) {
        setBooks((prevBooks) => prevBooks.filter(book => book.id !== bookId))
        bookService.remove(bookId)
            .then(() => {
                showSuccessMsg('Book removed succesfully', bookId)
            })
            .catch(err => {
                console.log('Error removing book', err);
                showErrorMsg('Error removing book')
            })
    }

    function onSetFilter(fieldsToFilterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToFilterBy }))
    }

    return <section className="book-index">
        <BookFilter
            onSetFilter={onSetFilter}
            filterBy={filterBy} />
        <section className="books-index-actions">
            <Link to="/books/edit"><button className="addbook-btn">Add Book <img src={'./assets/img/book-logo.svg'} /></button></Link>
            <Link to="/books/add"><button className="addbook-fromgoogle-btn">Add Book from google <img src={'./assets/img/book-logo.svg'} /></button></Link>
        </section>
        <BookList books={books}
            onRemoveBook={onRemoveBook}
        />
    </section>
}