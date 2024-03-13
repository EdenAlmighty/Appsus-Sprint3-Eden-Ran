const { useState, useEffect } = React
const { Link } = ReactRouterDOM


import { bookService } from '../services/mail.service.js'


export function MailIndex() {
    
    const [filterBy,setFilterBy] = useState(bookService.getFilterBy())
    // console.log(filterBy);
    const [mails, setMails] = useState(null)
    
    useEffect(() => {
        loadMails()
    },[filterBy])

    function loadMails() {
        bookService.query(filterBy)
            .then((mails) => {
                setMails(mails)
            })
    }
    console.log(mails);


    return <section className="book-index">

    </section>
}

