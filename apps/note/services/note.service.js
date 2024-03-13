// note service
import { storageService } from '../../../services/async-storage.service'
import { utilService } from '../../../services/util.service'

const NOTE_KEY = 'notesDB'

function query(filterBy) {
    return storageService.query(NOTE_KEY).then((notes) => {
        if (!notes || notes.length) {
            notes = gNotes
            _saveNotesToStorage()
        }
    })
}


function _saveNotesToStorage(){
    return Promise.resolve(notes)
}

const notes = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
            backgroundColor: '#00d'
        },
        info: {
            txt: 'Fullstack Me Baby!'
        }
    },
    {
        id: 'n102',
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'http://some-img/me',
            title: 'Bobi and Me'
        },
        style: {
            backgroundColor: '#00d'
        }
    },
    {
        id: 'n103',
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'Get my stuff together',
            todos: [
                { txt: 'Driving license', doneAt: null },
                { txt: 'Coding power', doneAt: 187111111 }
            ]
        }
    }
]
