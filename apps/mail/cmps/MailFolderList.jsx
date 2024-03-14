const { useState, useEffect } = React

import { mailService } from '../services/mail.service.js'

export function MailFolderList({ onSetFilter, filterBy, unreadCount }){

    const [filterByToUpdate, setFilterByToUpdate] = useState(filterBy)
    useEffect(() => {
        onSetFilter(filterByToUpdate)
    },[filterByToUpdate])

    function handleChange(value){
        setFilterByToUpdate({'status' : value})
    }

    function getFolderClass(value){
        if(filterBy.status === value){
            return 'focused'
        }
    }

    // function getUnreadCount(){
    //     // return unreadCount
    //     let result
    //     return mailService.getUnreadCount()
             
                


    // }

    console.log(unreadCount);

    // console.log(unreadCount);

    return <section className="mail-folder-list">
        <ul className="clean-list mail-folder-list-items">
            <li className={`inbox ${getFolderClass('inbox')}`} onClick={() => handleChange('inbox')}>Inbox <span className="unread-count">{unreadCount}</span></li>
            <li className={getFolderClass('sent')}  onClick={() => handleChange('sent')}>Sent</li>
            <li className={getFolderClass('trash')}  onClick={() => handleChange('trash')}>Trash</li>
            <li className={getFolderClass('draft')}  onClick={() => handleChange('draft')}>Draft</li>
        </ul>
    </section>
    
}