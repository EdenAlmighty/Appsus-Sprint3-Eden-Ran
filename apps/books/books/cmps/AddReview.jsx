const { useState } = React
const { useParams, useNavigate } = ReactRouter

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { bookService } from "../services/book.service.js"

export function AddReview({ setBook }) {

    const [reviewToUpdate, setReviewToUpdate] = useState(bookService.getEmptyReview())

    const params = useParams()
    const navigator = useNavigate()

    function handleChange({ target }) {
        let { value, name: field, type } = target
        console.log(value, field, type);
        if (type === 'number') value = +value
        setReviewToUpdate((prevReviewToUpdate) => ({ ...prevReviewToUpdate, [field]: value }))
    }

    function handleChangeBtns(ev, value, field, type) {
        ev.preventDefault()
        if (type === 'number') value = +value
        if (value > 5 || value < 1) return
        setReviewToUpdate((prevReviewToUpdate) => ({ ...prevReviewToUpdate, [field]: value }))
    }

    function onSubmitBook(ev) {
        ev.preventDefault()
        bookService.addReview(params.bookId, reviewToUpdate)
            .then((book) => {
                console.log('book from add review', book);
                showSuccessMsg('Review Added')
                setBook(book)
            })
            .catch((err) => {
                console.log('failed adding review', err);
                showErrorMsg('Adding review failed brother')
            })
    }

    function getStars(){
        let str = ''
        for(var i=0;i<reviewToUpdate.rate;i++){
            str += '⭐️'
        }
        console.log(str);
        return !str ? '⭐️' : str
        // return str
    }

    return <section className="add-review">
        <h1>Add New Review</h1>
        <form className="add-review-form" onSubmit={(ev) => onSubmitBook(ev)}>
            <label htmlFor="add-review-full-name">Full name</label>
            <input
                type="text"
                name="fullName"
                id="add-review-full-name"
                value={reviewToUpdate.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
            />
            <label htmlFor="add-review-free-text">Free text </label>
            <input
                type="text"
                name="freeText"
                id="add-review-free-text"
                value={reviewToUpdate.freeText}
                onChange={handleChange}
                placeholder="Enter free text"
            />
            <label htmlFor="add-review-rating">{getStars()}</label>
            <div className="price-input-container">
                <button className="minus-btn" onClick={(ev) => handleChangeBtns(ev, reviewToUpdate.rate - 1, 'rate', 'number')}>➖</button>
                <input
                    type="number"
                    name="rate"
                    id="add-review-rating"
                    min="1" max="5"
                    value={reviewToUpdate.rate}
                    style={{display:"none"}}
                    onChange={handleChange}
                />
                <button className="plus-btn" onClick={(ev) => handleChangeBtns(ev, reviewToUpdate.rate + 1, 'rate', 'number')}>➕</button>
            </div>
            <label htmlFor="add-review-read-at">Read at</label>
            <input
                type="date"
                name="readAt"
                id="add-review-read-at"
                value={reviewToUpdate.readAt}
                onChange={handleChange}
                placeholder="Enter read date"
            />
            <button>Submit</button>
        </form>
    </section>
}