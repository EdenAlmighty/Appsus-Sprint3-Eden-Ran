// mail service

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

export const bookService = {
    query,
    getFilterBy,
}

const emails = [
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

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
    }

function query(filterBy = getFilterBy()) {
    return Promise.resolve(emails)
}

function getFilterBy(){
    return criteria
}





const criteria = {
    status: 'inbox',
    txt: 'puki', // no need to support complex text search
    isRead: true, // (optional property, if missing: show all)
    isStared: true, // (optional property, if missing: show all)
    lables: ['important', 'romantic'] // has any of the labels
    }

// statuses arr should be: 'inbox/sent/trash/draft'