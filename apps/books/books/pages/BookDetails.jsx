const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { LongTxt } from "../cmps/LongTxt.jsx"
import { bookService } from "../services/book.service.js"
import { AddReview } from "../cmps/AddReview.jsx"
import { RenderReviews } from "../cmps/RenderReviews.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export function BookDetails() {
    const [book, setBook] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        setIsLoading(true)
        bookService.get(params.bookId)
            .then(book => setBook(book))
            .catch(err => {
                console.log('error with load car details', err)
                navigate('/books')
            })
            .finally(() => {
                setIsLoading(false)
            })

    }

    function onRemoveReview(reviewId) {
        const review = book.review.filter(review => review.id !== reviewId)
        book.review = review
        bookService.save(book)
            .then(book => {
                showSuccessMsg('Review removed')
                console.log('Review removed, new book:', book);
                return book
            })
            .then((book) => {
                setBook(book)
                loadBook()
            })
    }

    function getPageCount() {
        if (book.pageCount > 500) return 'Serious Reading'
        if (book.pageCount > 200) return 'Descent Reading'
        if (book.pageCount < 100) return 'Light Reading'
    }

    function getPublishDate() {
        if (book.publishedDate < 2014) return <span style={{ color: 'brown' }}>- Vintage</span>
        if (book.publishedDate > 2023) return <span style={{ color: 'green' }}>- New</span>
    }

    function getPriceClass() {
        if (book.listPrice.amount > 150) return 'price price-red'
        if (book.listPrice.amount < 20) return ' price price-green'
        else return ''
    }

    function getOnSale() {
        return <div className="on-sale-container">
            Last Price: <span className="deleted-price">{book.listPrice.amount + book.listPrice.currencyCode}</span>
            <span className="new-price"> New Price: {Math.trunc(book.listPrice.amount * .9) + book.listPrice.currencyCode}</span>
        </div>
    }

    console.log('book', book);

    if (isLoading) return <div className="loader"><span>III</span></div>

    return <section className="book-details">
        <Link to="/books"><button className="book-details-btn-back">Back</button></Link>
        <div className="book-details-info-container">
            <h1 className="book-details-title">{book.title}</h1>
            <p>{book.subtitle}</p>
            <h2>Author/s: {book.authors.map(author => author + ' ')}</h2>
            <h3>Published Date: {book.publishedDate} <span>{getPublishDate()}</span></h3>
            <h3>Page Count: {book.pageCount}<span> - {getPageCount()}</span></h3>
            <h3>Description:</h3>
            <LongTxt txt={book.description} />
            <p>Book categories: {book.categories.map(category => category + ' ')}</p>
            <p>LNG: {book.language}</p>
            <div className={getPriceClass()}>{book.listPrice.isOnSale ? getOnSale() : book.listPrice.amount + book.listPrice.currencyCode}</div>
            <div className="imgs-container">
                {book.listPrice.isOnSale && <img className="on-sale-img" src={"./assets/img/onsale-sign.svg"} />}
                <img src={book.thumbnail} />
            </div>
        </div>

        <div className="book-selector-prev-next">
            <Link to={`/books/${book.prevBookId}`}><button>Prev Book</button></Link>
            <Link to={`/books/edit/${book.id}`}><button>Edit Book</button></Link>
            <Link to={`/books/${book.nextBookId}`}><button>Next Book</button></Link>
        </div>

        {(book.review) && <section className="render-reviews">
            <h1>Reviews:</h1>
            <ul className="clean-list">
                {
                    book.review.map(review => {
                        return <li key={review.id} className="book-review-card">
                            <div>
                                Name: {review.fullName} <br />
                                Full review: {review.freeText} <br />
                                Read at: {review.readAt} <br />
                                Rating: {review.rate}
                                <button onClick={() => onRemoveReview(review.id)}>Delete</button>
                            </div>
                        </li>
                    })
                }
            </ul>
        </section>

        }
        {
            (!book.review) && <section className="no-reviews">
                <h1>No reviews yet</h1>
            </section>
        }
        <AddReview setBook={setBook} />
    </section>
}