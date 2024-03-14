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
    toggleNotePin,
    getPinnedNotes,
    getUnPinnedNotes

}

const NOTE_KEY = 'notesDB'

let gNotes = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
            backgroundColor: utilService.getRandomNoteColor()
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
            url: 'https://picsum.photos/250/300',
            title: 'Random Image 1'
        },
        style: {
            backgroundColor: utilService.getRandomNoteColor()
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
        },
        style: {
            backgroundColor: utilService.getRandomNoteColor()
        }
    },
    {
        id: 'n104',
        type: 'NoteVideo',
        isPinned: false,
        info: {
            url: 'https://www.youtube.com/watch?v=QNTeq4QdOsQ',
            title: 'Rick Astley - Never Gonna Give You Up'
        },
        style: {
            backgroundColor: utilService.getRandomNoteColor()
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
        },
        style: {
            backgroundColor: utilService.getRandomNoteColor()
        }
    },
    {
        id: 'n106',
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'https://picsum.photos/200/300',
            title: 'Random Image 2'
        },
        style: {
            backgroundColor: utilService.getRandomNoteColor()
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
        },
        style: {
            backgroundColor: utilService.getRandomNoteColor()
        }
    },
    // Add a few more notes here
];

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

function getPinnedNotes(notes){
    return notes.filter(note => note.isPinned)
}

function getUnPinnedNotes(notes) {
    return notes.filter(note => !note.isPinned)
}

function getEmptyNote() {
    return {
        // id,
        type: '',
        createdAt: new Date().getDate(),
        isPinned: false,
        style: {
            backgroundColor: utilService.getRandomNoteColor()
        },
        info: {
            txt: '',
            title: '',
            todos: [
                { txt: '', doneAt: '' },
                
            ]
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

