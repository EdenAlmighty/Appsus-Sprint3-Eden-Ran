const { useState, useEffect } = React
const { Link } = ReactRouterDOM


import { mailService } from '../services/mail.service.js'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { EmailCompose } from '../cmps/EmailCompose.jsx'


export function MailIndex() {

    const [filterBy, setFilterBy] = useState(mailService.getFilterBy())
    const [isComposing, setIsComposing] = useState(false)
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

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    return <section className="mail-index">
        <h2 className="page-title">Mail</h2>
        <button onClick={() => setIsComposing((prevComposing => !prevComposing))}>Compose New Mail</button>
        {isComposing && <EmailCompose/>}

        <MailFolderList
            onSetFilter={onSetFilter}
            filterBy={filterBy}
        />
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

