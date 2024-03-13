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
        .then(mails => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt,'i')
                mails = mails.filter(mail => regex.test(mail.body) || regex.test(mail.subject) || regex.test(mail.sender))
            }
       
            if (filterBy.isRead){
                mails = mails.filter(mail => mail.isRead)
            }
            if (filterBy.status){
                if (filterBy.status === 'inbox') {
                    mails = mails.filter(mail => mail.to === loggedinUser.email)
                }
                if (filterBy.status === 'sent') {
                    mails = mails.filter(mail => mail.from === loggedinUser.email)
                }
                if (filterBy.status === 'trash') {
                    mails = mails.filter(mail => mail.removedAt !== null)
                }
            }
            return mails
        })
    
    
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
    status: '',
    txt: '', // no need to support complex text search
    isRead: false, // (optional property, if missing: show all)
    isStared: true, // (optional property, if missing: show all)
    lables: [] // has any of the labels
    }

// statuses arr should be: 'inbox/sent/trash/draft'