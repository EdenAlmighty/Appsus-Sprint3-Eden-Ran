const { useState } = React

import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export function BookAdd() {
    const [inputFromUser, setInputFromUser] = useState('')
    const [isSearched, setIsSearched] = useState(false)
    const [googleResults, setGoogleResults] = useState('')

    function handleChange({ target }) {
        let { value } = target
        setInputFromUser(value)
    }

    function onSubmitForm(ev) {
        ev.preventDefault()
        // console.log(getFromGoogle(inputFromUser))
        getFromGoogle(inputFromUser)
            .then(res => {
                console.log(res);
                setGoogleResults(() => res.items)
            })
    }

    function onAddBook(bookId) {
        console.log(bookId);
        addBook(bookId)
        // console.log(book);

        // loadResults(bookId)
    }

    console.log(googleResults);

    function getFromGoogle(bookTitle = '') {
        const url = bookService.getGoogleApi(bookTitle)
        return fetch(url)
            .then(res => res.json())
        // .then(res => console.log(res.items))
        // return bookService.getDemoDataGoogle()
    }

    function addBook(bookId) {
        const emptyBook = bookService.getEmptyBook()
        const googleBook = googleResults.find((book => book.id === bookId))
        // console.log(googleBook);
        let { googleId, volumeInfo: details } = googleBook
        console.log(googleBook);
        let { title, authors, description, pageCount, publishedDate, categories, imageLinks, language } = details
        let book = { googleId, title, authors, description, pageCount, publishedDate, categories, imageLinks, language }
        book.thumbnail = book.imageLinks.thumbnail
        book.listPrice = {
            amount: 100,
            currencyCode: '🚫(From Google)',
            isOnSale: false
        }
        // subtitle,publishdate
        book = { ...emptyBook, ...book }
        console.log(book);
        bookService.save(book)
            .then(savedBook => {
                console.log('book saved', savedBook)
                showSuccessMsg('Book Saved', savedBook.id)
                // navigate('/books')
            })
            .catch(err => {
                console.log('error saving book', err)
                showErrorMsg('Error saving book')
            })
        // console.log(book);


    }

    return <React.Fragment>
        <section className="addbook-from-google">
            <form onSubmit={(ev) => onSubmitForm(ev)}>
                <label htmlFor="search-from-google">Search by name</label>
                <input
                    type="text"
                    name="title"
                    id="search-from-google"
                    value={inputFromUser}
                    onChange={handleChange}
                    placeholder="Enter book title"
                />
                <button>Submit</button>
            </form>
        </section>
        {!googleResults && <div>You havn't searched yet</div>}
        {googleResults && <section className="google-results">
            {
                googleResults.map((result) => {
                    return (
                        <li key={result.id} className="google-list-result">
                            <button onClick={() => onAddBook(result.id)} className="btn-book-google">➕</button>
                            <p>{result.volumeInfo.title}</p>
                        </li>

                    )
                })
            }
        </section>
        }


    </React.Fragment>

}

// // https://www.googleapis.com/books/v1/volumes?printType=books&q=harrypotter