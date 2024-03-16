export function RenderReviews({reviews}){
    
    if (!reviews) return <div>No reviews yet</div>
    return <section className="render-reviews">
            <h1>Reviews:</h1>
            <ul className="clean-list">
        {
            reviews.map(review => {
                return <li key={review.id} className="book-review-card">
                    <div>
                        Name: {review.fullName} <br />
                        Full review: {review.freeText} <br />
                        Read at: {review.readAt} <br />
                        Rating: {review.rate}
                        
                    </div>
                </li> 
            })
        }
            </ul>
    </section>
}