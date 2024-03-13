const { useState, useEffect } = React
const { Link } = ReactRouterDOM


import { bookService } from '../services/mail.service.js'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailList } from '../cmps/MailList.jsx'


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

    function onSetFilter(){

    }

    console.log(mails);


    return <section className="mail-index">
        <MailFilter 
        onSetFilter={onSetFilter}
        filterBy={filterBy}/>
        <MailList 
        mails={mails}
        />
    </section>
}

