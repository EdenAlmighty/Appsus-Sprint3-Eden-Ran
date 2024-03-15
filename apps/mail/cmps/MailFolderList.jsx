const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'

export function MailFolderList({ onSetFilter, filterBy = getFilterFromParams(searchParams), unreadCount }) {


    console.log(filterBy);

    const [filterByToUpdate, setFilterByToUpdate] = useState(filterBy)
    useEffect(() => {
        onSetFilter(filterByToUpdate)
    }, [filterByToUpdate])

    function handleChange(value) {
        setFilterByToUpdate({ ...filterBy, ['status']: value })
    }

    function getFolderClass(value) {
        if (filterBy.status === value) {
            return 'focused'
        }
    }

    function getIconClass(value) {
        if (filterBy.status === value) {
            return 'active'
        }
    }

    return <section className="mail-folder-list">
        <ul className="clean-list mail-folder-list-items">
            <li className={`inbox ${getFolderClass('inbox')}`} onClick={() => handleChange('inbox')}><span className={`material-symbols-outlined ${getIconClass('inbox')}`}>inbox</span>Inbox <span className="unread-count">{unreadCount}</span></li>
            <li className={getFolderClass('sent')} onClick={() => handleChange('sent')}><span className={`material-symbols-outlined ${getIconClass('sent')}`}>send</span>Sent</li>
            <li className={getFolderClass('trash')} onClick={() => handleChange('trash')}><span className={`material-symbols-outlined ${getIconClass('trash')}`}>delete</span>Trash</li>
            <li className={getFolderClass('draft')} onClick={() => handleChange('draft')}><span className={`material-symbols-outlined ${getIconClass('draft')}`}>draft</span>Draft</li>
            <li className={getFolderClass('star')} onClick={() => handleChange('star')}><span className={`material-symbols-outlined ${getIconClass('star')}`}>star</span>Starred</li>
        </ul>
    </section>

}