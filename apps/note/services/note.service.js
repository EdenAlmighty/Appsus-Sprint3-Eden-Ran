// note service

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { localStorageService } from '../../../services/storage.service.js'


export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    duplicateNote,
    toggleNotePin

}

const NOTE_KEY = 'notesDB'

let gNotes = [
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
    },
    {
        id: 'n104',
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
        id: 'n105',
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'Get my stuff together',
            todos: [
                { txt: 'Driving license', doneAt: null },
                { txt: 'Coding power', doneAt: 187111111 }
            ]
        }
    },
    {
        id: 'n106',
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
        id: 'n107',
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
_createNotes()


function query(filterBy) {
    return storageService.query(NOTE_KEY).then((notes) => {
        if (!notes || !notes.length) {
            notes = gNotes
            _saveNotesToStorage()
        }
        if(filterBy && filterBy === 'pinned'){
            notes = notes.filter(note => note.isPinned)
        }
        return notes
    })
}

function getEmptyNote() {
    return {
        // id,
        type: '',
        createdAt: new Date().getDate(),
        isPinned: false,
        style: {
            backgroundColor: '#00d'
        },
        info: {
            txt: 'text',
            title: 'title',
        }
    }
}

function duplicateNote(noteId) {
    return storageService.get(NOTE_KEY, noteId)
        .then((noteToDuplicate) => {
            if (!noteToDuplicate) {
                throw new Error("Note not found...")
            }
            const newNote = { ...noteToDuplicate }
            newNote.id = utilService.makeId()
            newNote.isPinned = false
            return storageService.post(NOTE_KEY, newNote)
        })
}

function toggleNotePin(noteId) {
    return storageService.get(NOTE_KEY, noteId)
        .then((noteToToggle) => {
            if (!noteToToggle) {
                throw new Error("Note not found...")
            }
            console.log(noteToToggle);
            noteToToggle.isPinned = !noteToToggle.isPinned
            return storageService.put(NOTE_KEY, noteToToggle)
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) notes = gNotes
    utilService.saveToStorage(NOTE_KEY, notes)
}

function _saveNotesToStorage() {
    storageService.put(NOTE_KEY, gNotes)
}

