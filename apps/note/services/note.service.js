// note service
import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'


export const noteService = {
    query,
    get,
    remove,
    save,
}

const NOTE_KEY = 'notesDB'

function query(filterBy) {
    console.log(gNotes);
    return Promise.resolve(gNotes)

}


// function query() {
//     return storageService.query(NOTE_KEY).then((notes) => {
//         if (!notes || !notes.length)
//             notes = gNotes
//     })

// }

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) storageService.put(NOTE_KEY, note)
    return storageService.post(NOTE_KEY, note)
}

function _saveNotesToStorage() {
    storageService.put(KEY, gBooks)
}
const gNotes = [
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
            url: '../../../assets/img/audi.jpg',
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
