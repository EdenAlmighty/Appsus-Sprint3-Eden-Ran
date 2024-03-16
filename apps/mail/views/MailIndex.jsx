const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM


import { mailService } from '../services/mail.service.js'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { EmailCompose } from '../cmps/EmailCompose.jsx'
import { MailSort } from '../cmps/MailSort.jsx'


export function MailIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    // const [filterBy, setFilterBy] = useState(mailService.getFilterBy())
    const [sortBy, setSortBy] = useState(mailService.getSortBy())
    const [isComposing, setIsComposing] = useState(false)
    const [unreadCount, setUnreadCount] = useState()
    // console.log(filterBy);
    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromParams(searchParams))

    useEffect(() => {
        setSearchParams(filterBy)
        console.log(filterBy);
        loadMails()
    }, [filterBy])

    useEffect(() => {
        loadMails()
    }, [sortBy])

    useEffect(() => {
        mailService.getUnreadCount()
            .then((res) => setUnreadCount(res))
    },[mails])

    // useEffect(() => {
    //     loadMails()
    // },[mails])

    function loadMails() {
        return mailService.query(filterBy, sortBy)
            .then((mails) => {
                setMails(mails)
            })
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onSetSort(sortBy) {
        setSortBy(sortBy)
    }

    return <section className="mail-index">

        <h2 className="page-title">misterEmail</h2>
        {isComposing && <EmailCompose setIsComposing={setIsComposing} />}
        <section className="mail-main-layout">







            <div className="main-mail-list-folder">
                <button className='compose-btn' onClick={() => setIsComposing((prevComposing => !prevComposing))}><span className="material-symbols-outlined">edit</span>Compose</button>

                <MailFolderList
                    onSetFilter={onSetFilter}
                    filterBy={filterBy}
                    unreadCount = {unreadCount}
                />
            </div>
            <div className="mail-list-and-filter">
               
                <MailFilter
                    onSetFilter={onSetFilter}
                    loadMails={loadMails}
                    filterBy={filterBy} />
                     <MailSort
                    onSetSort={onSetSort}
                    sortBy={sortBy} 
                    />
                <MailList
                    mails={mails}
                    loadMails={loadMails}
                />

            </div>

        </section>
    </section >
}

