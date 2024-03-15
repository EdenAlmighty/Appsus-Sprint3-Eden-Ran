const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'

export function MailFolderList({ onSetFilter, filterBy = getFilterFromParams(searchParams), unreadCount }){


    console.log(filterBy);    

    const [filterByToUpdate, setFilterByToUpdate] = useState(filterBy)
    useEffect(() => {
        onSetFilter(filterByToUpdate)
    },[filterByToUpdate])

    function handleChange(value){
        setFilterByToUpdate({...filterBy, ['status']: value})
    }

    function getFolderClass(value){
        if(filterBy.status === value){
            return 'focused'
        }
    }

    return <section className="mail-folder-list">
        <ul className="clean-list mail-folder-list-items">
            <li className={`inbox ${getFolderClass('inbox')}`} onClick={() => handleChange('inbox')}>Inbox <span className="unread-count">{unreadCount}</span></li>
            <li className={getFolderClass('sent')}  onClick={() => handleChange('sent')}>Sent</li>
            <li className={getFolderClass('trash')}  onClick={() => handleChange('trash')}>Trash</li>
            <li className={getFolderClass('draft')}  onClick={() => handleChange('draft')}>Draft</li>
            <li className={getFolderClass('star')}  onClick={() => handleChange('star')}>Starred</li>
        </ul>
    </section>
    
}