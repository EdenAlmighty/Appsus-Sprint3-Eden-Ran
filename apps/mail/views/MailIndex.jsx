const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useParams, useNavigate } = ReactRouter


import { mailService } from '../services/mail.service.js'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { EmailCompose } from '../cmps/EmailCompose.jsx'
import { MailSort } from '../cmps/MailSort.jsx'
import { MailDetails } from './MailDetails.jsx'


export function MailIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    // const [filterBy, setFilterBy] = useState(mailService.getFilterBy())
    const [sortBy, setSortBy] = useState(mailService.getSortBy())
    const [isComposing, setIsComposing] = useState(false)
    const [unreadCount, setUnreadCount] = useState()
    // console.log(filterBy);
    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromParams(searchParams))
    const [isDetails, setIsDetails] = useState(false)
    const params = useParams()

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
    }, [mails])

    useEffect(() => {
        params.mailId ? setIsDetails(true) : setIsDetails(false)
    }, [params.mailId])

    useEffect(() => {
        loadMails()
    },[isComposing])

    console.log(params);

    // useEffect(() => {
    //     loadMails()
    // },[mails])

    function loadMails() {
        return mailService.query(filterBy, sortBy)
            .then((mails) => {
                setMails(mails)
            })
    }

    function loadMailDetails() {
        return mailService.query(filterBy, sortBy)
            .then(mail => {

            })
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onSetSort(sortBy) {
        setSortBy(sortBy)
    }

    function onSetRead(isRead, mailId) {
        return mailService.get(mailId)
            .then(mail => {
                mail.isRead = isRead
                return mailService.save(mail)
            })
            .then(loadMails)

    }

    function onRemoveMail(mailId) {
        mailService.get(mailId)
            .then((mail) => {
                if (mail.removedAt === null) {
                    mail.removedAt = Date.now()
                    return mailService.save(mail)
                } else return mailService.remove(mailId)
            }).then(loadMails)
            .then(showSuccessMsg('Mail Removed'))
    }

    function onStarMail(mailId) {
        mailService.get(mailId)
            .then(mail => {
                if (mail.star) {
                    mail.star = false
                } else {
                    mail.star = true
                }
                return mailService.save(mail)
            }).then(loadMails)
    }

    return <section className="mail-index">

        {isComposing && <EmailCompose setIsComposing={setIsComposing} />}
        <section className="mail-main-layout">
            <div className="main-mail-list-folder">
                <button className='compose-btn' onClick={() => setIsComposing((prevComposing => !prevComposing))}><span className="material-symbols-outlined">edit</span>Compose</button>

                <MailFolderList
                    onSetFilter={onSetFilter}
                    filterBy={filterBy}
                    unreadCount={unreadCount}
                />
            </div>
            
         
          
           
                {!isDetails &&  <div className="mail-list-and-filter">
                <MailFilter
                     onSetFilter={onSetFilter}
                     loadMails={loadMails}
                     filterBy={filterBy} />
                     <div className="sort-and-list-container">

                <MailSort
                     onSetSort={onSetSort}
                     sortBy={sortBy}
                 />
               
                    <MailList
                        mails={mails}
                        loadMails={loadMails}
                        onStarMail={onStarMail}
                        onRemoveMail={onRemoveMail}
                        onSetRead={onSetRead}
                    />
                          </div>
                    </div>
                }
                {isDetails && <div className="mail-details-and-filter">

                    <MailFilter
                    onSetFilter={onSetFilter}
                    loadMails={loadMails}
                    filterBy={filterBy} />
                    <MailDetails
                        onStarMail={onStarMail}
                        onRemoveMail={onRemoveMail}
                        onSetRead={onSetRead}
                        />
                        </div>
                }

        </section>
    </section >
}

