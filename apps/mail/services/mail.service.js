// mail service

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { func } from 'prop-types'

const MAIL_KEY = 'mailDB'

export const mailService = {
    query,
    getFilterBy,
    get,
    remove,
    save,
    getNewMail,
    getSortBy,
    sortMails,
    getUnreadCount,
    saveComposedMail,
    getFilterFromParams,
    getRandomTime
}


const gEmails = [
    {
        id: 'e101',
        sender: 'Puki',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: getRandomTime(),
        removedAt: null,
        from: 'user@appsus.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e102',
        sender: 'John',
        subject: 'Meeting Reminder',
        body: 'Just a reminder about our meeting tomorrow at 10 AM.',
        isRead: true,
        sentAt: getRandomTime(),
        removedAt: null,
        from: 'user@appsus.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e103',
        sender: 'Alice',
        subject: 'Weekend Plans',
        body: 'Hey there! Any plans for the weekend?',
        isRead: false,
        sentAt: getRandomTime(),
        removedAt: getRandomTime(),
        from: 'alice@example.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e104',
        sender: 'Mark',
        subject: 'Project Update',
        body: 'Attached is the latest project update. Let me know if you have any questions.',
        isRead: false,
        sentAt: getRandomTime(),
        removedAt: null,
        from: 'mark@example.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e105',
        sender: 'Emma',
        subject: 'Happy Birthday!',
        body: 'Wishing you a fantastic birthday filled with joy and laughter!',
        isRead: true,
        sentAt: getRandomTime(),
        removedAt: getRandomTime(),
        from: 'emma@example.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e106',
        sender: 'David',
        subject: 'Regarding the Proposal',
        body: 'I have some feedback on the proposal we discussed. Let\'s schedule a meeting to discuss further.',
        isRead: true,
        sentAt: 1551332394000,
        removedAt: null,
        from: 'david@example.com',
        to: 'user@appsus.com',
        star: true
    },
    {
        id: 'e107',
        sender: 'Sophie',
        subject: 'Quick Question',
        body: 'Hey, I have a quick question regarding the upcoming event. Can you please give me a call when you\'re available?',
        isRead: true,
        sentAt: getRandomTime(),
        removedAt: null,
        from: 'sophie@example.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e108',
        sender: 'Michael',
        subject: 'Weekend Getaway',
        body: 'I\'m planning a weekend getaway. Would you like to join?',
        isRead: true,
        sentAt: getRandomTime(),
        removedAt: null,
        from: 'michael@example.com',
        to: 'user@appsus.com',
        star:true
    },
    {
        id: 'e109',
        sender: 'Lily',
        subject: 'Volunteer Opportunity',
        body: 'We have a volunteering opportunity this weekend. Are you interested?',
        isRead: true,
        sentAt: getRandomTime(),
        removedAt: null,
        from: 'lily@example.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e110',
        sender: 'James',
        subject: 'Project Deadline',
        body: 'Just a reminder that the project deadline is approaching. Let\'s ensure everything is on track.',
        isRead: true,
        sentAt: getRandomTime(),
        removedAt: null,
        from: 'james@example.com',
        to: 'user@appsus.com',
        isDraft: true
    },
    {
        id: 'e111',
        sender: 'Olivia',
        subject: 'Coffee Meeting',
        body: 'Would you like to grab coffee this afternoon?',
        isRead: true,
        sentAt: getRandomTime(),
        removedAt: null,
        from: 'olivia@example.com',
        to: 'user@appsus.com',
        isDraft: true,
        star:true
    },
    {
        id: 'e112',
        sender: 'Daniel',
        subject: 'New Task Assignment',
        body: 'I\'ve assigned you a new task. Please review and let me know if you have any questions.',
        isRead: false,
        sentAt: getRandomTime(),
        removedAt: null,
        from: 'daniel@example.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e113',
        sender: 'Sophia',
        subject: 'Lunch Invitation',
        body: 'Hey! I\'m organizing a lunch gathering next week. Would you like to join us?',
        isRead: true,
        sentAt: getRandomTime(),
        removedAt: null,
        from: 'sophia@example.com',
        to: 'user@appsus.com',
        isDraft: true
    },
    {
        id: 'e114',
        sender: 'Jack',
        subject: 'Team Meeting Agenda',
        body: 'Attached is the agenda for our team meeting tomorrow. Please review it.',
        isRead: false,
        sentAt: getRandomTime(),
        removedAt: null,
        from: 'jack@example.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e115',
        sender: 'Isabella',
        subject: 'Feedback Request',
        body: 'I would appreciate your feedback on the latest project proposal.',
        isRead: true,
        sentAt: getRandomTime(),
        removedAt: null,
        from: 'isabella@example.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e116',
        sender: 'Ethan',
        subject: 'Weekend Hike',
        body: 'I\'m planning a hike this weekend. Would you like to join me?',
        isRead: false,
        sentAt: getRandomTime(),
        removedAt: null,
        from: 'ethan@example.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e117',
        sender: 'Mia',
        subject: 'New Product Launch',
        body: 'We\'re launching a new product next month. Stay tuned for more details!',
        isRead: true,
        sentAt: getRandomTime(),
        removedAt: null,
        from: 'mia@example.com',
        to: 'user@appsus.com'
    },
    {
        id: "e118",
        sender: "Alexander",
        subject: "Travel Plans",
        body: "I'm planning a trip next month. Do you have any recommendations?",
        isRead: false,
        sentAt: getRandomTime(),
        removedAt: null,
        from: "alexander@example.com",
        to: "user@appsus.com"
    },
    {
        id: "e119",
        sender: "Lily",
        subject: "Volunteer Opportunity",
        body: "We have a volunteering opportunity this weekend. Are you interested?",
        isRead: true,
        sentAt: getRandomTime(),
        removedAt: null,
        from: "lily@example.com",
        to: "user@appsus.com"
    },
    {
        id: "e120",
        sender: "James",
        subject: "Project Deadline",
        body: "Just a reminder that the project deadline is approaching. Let's ensure everything is on track.",
        isRead: false,
        sentAt: getRandomTime(),
        removedAt: null,
        from: "james@example.com",
        to: "user@appsus.com"
    },
    {
        id: "e121",
        sender: "Olivia",
        subject: "Coffee Meeting",
        body: "Would you like to grab coffee this afternoon?",
        isRead: true,
        sentAt: getRandomTime(),
        removedAt: null,
        from: "olivia@example.com",
        to: "user@appsus.com"
    },
    {
        id: "e122",
        sender: "Sophia",
        subject: "Lunch Invitation",
        body: "Hey! I'm organizing a lunch gathering next week. Would you like to join us?",
        isRead: true,
        sentAt: getRandomTime(),
        removedAt: null,
        from: "sophia@example.com",
        to: "user@appsus.com"
    },
    {
        id: "e123",
        sender: "Jack",
        subject: "Team Meeting Agenda",
        body: "Attached is the agenda for our team meeting tomorrow. Please review it.",
        isRead: false,
        sentAt: getRandomTime(),
        removedAt: null,
        from: "jack@example.com",
        to: "user@appsus.com"
    },
    {
        id: "e124",
        sender: "Isabella",
        subject: "Feedback Request",
        body: "I would appreciate your feedback on the latest project proposal.",
        isRead: true,
        sentAt: getRandomTime(),
        removedAt: null,
        from: "isabella@example.com",
        to: "user@appsus.com"
    },
    {
        id: "e125",
        sender: "Ethan",
        subject: "Weekend Hike",
        body: "I'm planning a hike this weekend. Would you like to join me?",
        isRead: false,
        sentAt: getRandomTime(),
        removedAt: null,
        from: "ethan@example.com",
        to: "user@appsus.com"
    },
    {
        id: "e126",
        sender: "Mia",
        subject: "New Product Launch",
        body: "We're launching a new product next month. Stay tuned for more details!",
        isRead: true,
        sentAt: getRandomTime(),
        removedAt: null,
        from: "mia@example.com",
        to: "user@appsus.com"
    },
    {
        id: "e127",
        sender: "Alexander",
        subject: "Travel Plans",
        body: "I'm planning a trip next month. Do you have any recommendations?",
        isRead: false,
        sentAt: getRandomTime(),
        removedAt: null,
        from: "alexander@example.com",
        to: "user@appsus.com"
    },
    {
        id: "e128",
        sender: "Sophie",
        subject: "Dinner Invitation",
        body: "Hey! I'm hosting a dinner party next Saturday. Are you available?",
        isRead: true,
        sentAt: getRandomTime(),
        removedAt: null,
        from: "sophie@example.com",
        to: "user@appsus.com"
    },
    {
        id: "e129",
        sender: "Noah",
        subject: "Weekend Plans",
        body: "Hey there! Any plans for the weekend?",
        isRead: false,
        sentAt: getRandomTime(),
        removedAt: null,
        from: "noah@example.com",
        to: "user@appsus.com"
    },
    {
        id: "e130",
        sender: "Mia",
        subject: "Quick Question",
        body: "Hey, I have a quick question for you. Can you please help me?",
        isRead: true,
        sentAt: getRandomTime(),
        removedAt: null,
        from: "mia@example.com",
        to: "user@appsus.com"
    }
];
    

_createBooks()
// _createBooks()

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

function query(filterBy = getFilterBy(), sortBy = { sentAt: -1 }) {
    console.log(filterBy);
    return storageService.query(MAIL_KEY)
        .then(mails => {
            mails = sortMails(sortBy, mails)
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regex.test(mail.body) || regex.test(mail.subject) || regex.test(mail.sender))
            }

            if (filterBy.isRead === 'read') {
                mails = mails.filter(mail => mail.isRead)
            }

            if (filterBy.isRead === 'unread'){
                mails = mails.filter(mail => !mail.isRead)
            }
            if (filterBy.star) {
                mails = mails.filter(mail => mail.star)
            }
            if (filterBy.status) {
                if (filterBy.status === 'inbox') {
                    mails = mails.filter(mail => mail.to === loggedinUser.email && mail.removedAt === null)
                }
                if (filterBy.status === 'sent') {
                    mails = mails.filter(mail => mail.from === loggedinUser.email && !mail.isDraft)
                }
                if (filterBy.status === 'trash') {
                    mails = mails.filter(mail => mail.removedAt !== null)
                }
                if (filterBy.status === 'draft') {
                    mails = mails.filter(mail => mail.isDraft)
                }
                if (filterBy.status === 'star') { 
                    mails = mails.filter(mail => mail.star)
                }
            }
            return mails
        })
}

function sortMails(sortBy, mails) {
    
    console.log(sortBy);
    if (sortBy.sentAt) {
        console.log('sorrted by sentat');
        mails = mails.sort((mailA, mailB) => (mailA.sentAt - mailB.sentAt) * sortBy.sentAt)
    }
    if (sortBy.subject) {
        console.log('sorrted by subject');
        mails = mails.sort((mailA, mailB) => mailA.subject.localeCompare(mailB.subject) * sortBy.subject)
    }
    if (sortBy.sender) {
        console.log('sorrted by sender');
        mails = mails.sort((mailA, mailB) => mailA.sender.localeCompare(mailB.sender) * sortBy.sender)
    }
    return mails
}

function saveComposedMail(mail) {
    console.log(mail);
    const newMail = { ...mail, sentAt: Date.now(), isRead: true, isDraft: false }
    // console.log(newMail);
    save(newMail)
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    // console.log(mail);
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getFilterFromParams(searchParams){
    const defaultFilter = getFilterBy()
        return {
            txt: searchParams.get('txt') || defaultFilter.txt,
            status: 'inbox',
            isRead: null,
            
        }

}

function getRandomTime() {
    const randomOffset = Math.floor(Math.random() * 30);
    const date = new Date(Date.now() - randomOffset * 24 * 60 * 60 * 1000)
    return date
}

function getFilterBy() {
    return {
        status: 'inbox',
        txt: '', // no need to support complex text search
        isRead: null, // (optional property, if missing: show all)
        star: false, // (optional property, if missing: show all)
        // lables: [] // has any of the labels
    
    }
}

function getSortBy() {
    return { sentAt: -1 }
}

function getNewMail() {
    return {
        // id: utilService.makeId(),
        sender: 'Puki',
        subject: '',
        body: '',
        isRead: false,
        removedAt: null,
        from: 'user@appsus.com',
        to: '',
        isDraft: true,
        sentAt: Date.now()
    }
}

function getUnreadCount() {

    return storageService.query(MAIL_KEY)
        .then(mails => {
            mails = mails.filter((mail) => !mail.isRead)
            console.log(mails.length);
            return mails.length
        })
    // console.log(length);
    // return length
}

// Private funcs

function _createBooks() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) mails = gEmails
    console.log(mails);
    utilService.saveToStorage(MAIL_KEY, mails)
}



const criteria = {
    status: 'inbox',
    txt: '', // no need to support complex text search
    isRead: false, // (optional property, if missing: show all)
    isStared: true, // (optional property, if missing: show all)
    lables: [] // has any of the labels
}

// statuses arr should be: 'inbox/sent/trash/draft'