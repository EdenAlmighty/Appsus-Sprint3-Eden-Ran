// mail service

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'

export const mailService = {
    query,
    getFilterBy,
    get,
    remove,
    save
}


const gEmails = [
    {
        id: 'e101',
        sender: 'Puki',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
    },
    {
        id: 'e102',
        sender: 'Muki',
        subject: 'Miss you!',
        body: 'Have you been through our meeting?',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
    },
    {
        id: 'e103',
        sender: 'Shuki',
        subject: 'Miss you!',
        body: 'Any update on the last quote sent?',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
    }
]
_createBooks()

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
    }

function query(filterBy = getFilterBy()) {
    return storageService.query(MAIL_KEY)
        // .then()
    
    
    // return Promise.resolve(emails)
}

function get(mailId){
    return storageService.get(MAIL_KEY,mailId)
}

function remove(mailId){
    return storageService.remove(MAIL_KEY,mailId)
}

function save(mail){
    console.log(mail);
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getFilterBy(){
    return criteria
}

// Private funcs

function _createBooks(){
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) mails = gEmails
    console.log(mails);
    utilService.saveToStorage(MAIL_KEY,mails)
}



const criteria = {
    status: 'inbox',
    txt: 'puki', // no need to support complex text search
    isRead: true, // (optional property, if missing: show all)
    isStared: true, // (optional property, if missing: show all)
    lables: ['important', 'romantic'] // has any of the labels
    }

// statuses arr should be: 'inbox/sent/trash/draft'