// mail service

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'

export const mailService = {
    query,
    getFilterBy,
    get,
    remove,
    save,
    getNewMail
}


const gEmails = [
    // {
    //     id: 'e101',
    //     sender: 'Puki',
    //     subject: 'Miss you!',
    //     body: 'Would love to catch up sometimes',
    //     isRead: false,
    //     sentAt: 1551133930594,
    //     removedAt: null,
    //     from: 'momo@momo.com',
    //     to: 'user@appsus.com',
    // },
    // {
    //     id: 'e102',
    //     sender: 'Muki',
    //     subject: 'Miss you!',
    //     body: 'Have you been through our meeting?',
    //     isRead: false,
    //     sentAt: 1551133930594,
    //     removedAt: null,
    //     from: 'momo@momo.com',
    //     to: 'user@appsus.com',
    // },
    // {
    //     id: 'e103',
    //     sender: 'Shuki',
    //     subject: 'Miss you!',
    //     body: 'Any update on the last quote sent?',
    //     isRead: false,
    //     sentAt: 1551133930594,
    //     removedAt: null,
    //     from: 'momo@momo.com',
    //     to: 'user@appsus.com',
    // }
    // const demoData = [
        {
          id: 'e101',
          sender: 'Puki',
          subject: 'Miss you!',
          body: 'Would love to catch up sometimes',
          isRead: false,
          sentAt: 1551133930594,
          removedAt: null,
          from: 'momo@momo.com',
          to: 'user@appsus.com'
        },
        {
          id: 'e102',
          sender: 'John',
          subject: 'Meeting Reminder',
          body: 'Just a reminder about our meeting tomorrow at 10 AM.',
          isRead: true,
          sentAt: 1551183455000,
          removedAt: null,
          from: 'john@example.com',
          to: 'user@appsus.com'
        },
        {
          id: 'e103',
          sender: 'Alice',
          subject: 'Weekend Plans',
          body: 'Hey there! Any plans for the weekend?',
          isRead: false,
          sentAt: 1551210238000,
          removedAt: null,
          from: 'alice@example.com',
          to: 'user@appsus.com'
        },
        {
          id: 'e104',
          sender: 'Mark',
          subject: 'Project Update',
          body: 'Attached is the latest project update. Let me know if you have any questions.',
          isRead: false,
          sentAt: 1551245021000,
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
          sentAt: 1551289327000,
          removedAt: null,
          from: 'emma@example.com',
          to: 'user@appsus.com'
        },
        {
          id: 'e106',
          sender: 'David',
          subject: 'Regarding the Proposal',
          body: 'I have some feedback on the proposal we discussed. Let\'s schedule a meeting to discuss further.',
          isRead: false,
          sentAt: 1551332394000,
          removedAt: null,
          from: 'david@example.com',
          to: 'user@appsus.com'
        },
        {
          id: 'e107',
          sender: 'Sophie',
          subject: 'Quick Question',
          body: 'Hey, I have a quick question regarding the upcoming event. Can you please give me a call when you\'re available?',
          isRead: true,
          sentAt: 1551370846000,
          removedAt: null,
          from: 'sophie@example.com',
          to: 'user@appsus.com'
        },
        {
          id: 'e108',
          sender: 'Michael',
          subject: 'Weekend Getaway',
          body: 'I\'m planning a weekend getaway. Would you like to join?',
          isRead: false,
          sentAt: 1551407623000,
          removedAt: null,
          from: 'michael@example.com',
          to: 'user@appsus.com'
        },
        {
          id: 'e109',
          sender: 'Lily',
          subject: 'Volunteer Opportunity',
          body: 'We have a volunteering opportunity this weekend. Are you interested?',
          isRead: true,
          sentAt: 1551446132000,
          removedAt: null,
          from: 'lily@example.com',
          to: 'user@appsus.com'
        },
        {
          id: 'e110',
          sender: 'James',
          subject: 'Project Deadline',
          body: 'Just a reminder that the project deadline is approaching. Let\'s ensure everything is on track.',
          isRead: false,
          sentAt: 1551483911000,
          removedAt: null,
          from: 'james@example.com',
          to: 'user@appsus.com'
        },
        {
          id: 'e111',
          sender: 'Olivia',
          subject: 'Coffee Meeting',
          body: 'Would you like to grab coffee this afternoon?',
          isRead: true,
          sentAt: 1551522100000,
          removedAt: null,
          from: 'olivia@example.com',
          to: 'user@appsus.com'
        },
        {
          id: 'e112',
          sender: 'Daniel',
          subject: 'New Task Assignment',
          body: 'I\'ve assigned you a new task. Please review and let me know if you have any questions.',
          isRead: false,
          sentAt: 1551559789000,
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
          sentAt: 1551598654000,
          removedAt: null,
          from: 'sophia@example.com',
          to: 'user@appsus.com'
        },
        {
          id: 'e114',
          sender: 'Jack',
          subject: 'Team Meeting Agenda',
          body: 'Attached is the agenda for our team meeting tomorrow. Please review it.',
          isRead: false,
          sentAt: 1551640712000,
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
          sentAt: 1551684423000,
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
          sentAt: 1551730085000,
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
          sentAt: 1551777456000,
          removedAt: null,
          from: 'mia@example.com',
          to: 'user@appsus.com'
        },
        {
          id: 'e118',
          sender: 'Alexander',
          subject: 'Travel Plans',
          body: 'I\'m planning a trip next month. Do you have any recommendations?',
          isRead: false,
          sentAt: 1551826312000,
          removedAt: null,
          from: 'alexander@example.com',
        }      
]
_createBooks()
// _createBooks()

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
                    mails = mails.filter(mail => mail.from === loggedinUser.email && !mail.isDraft)
                }
                if (filterBy.status === 'trash') {
                    mails = mails.filter(mail => mail.removedAt !== null)
                }
                if (filterBy.status === 'draft') {
                    mails = mails.filter(mail => mail.isDraft)
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

function getNewMail(){
    return {
        // id: utilService.makeId(),
        sender: utilService.makeLorem(3),
        subject: '',
        body: '',
        isRead: false,
        removedAt: null,
        from: 'user@appsus.com',
        to: '',
        isDraft: true
    }
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