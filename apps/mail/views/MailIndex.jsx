const { useState, useEffect } = React
const { Link } = ReactRouterDOM


import { mailService } from '../services/mail.service.js'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailList } from '../cmps/MailList.jsx'


export function MailIndex() {

    const [filterBy, setFilterBy] = useState(mailService.getFilterBy())
    // console.log(filterBy);
    const [mails, setMails] = useState(null)

    useEffect(() => {
        loadMails()
    }, [filterBy])

    // useEffect(() => {
    //     loadMails()
    // },[mails])

    function loadMails() {
        return mailService.query(filterBy)
            .then((mails) => {
                setMails(mails)
            })
    }

    function onSetFilter() {

    }

    return <section className="mail-index">
        <MailFilter
            onSetFilter={onSetFilter}
            loadMails={loadMails}
            filterBy={filterBy} />
        <MailList
            mails={mails}
            loadMails={loadMails}
        />
    </section>
}

