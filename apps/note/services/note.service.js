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
    getUnPinnedNotes,
    addTodo,
    changeNoteColor
    
}

const NOTE_KEY = 'notesDB'

let gNotes = [
    {
        id: utilService.makeId(),
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
        id: utilService.makeId(),
        type: 'NoteImg',
        isPinned: true,
        info: {
            url: 'https://images.squarespace-cdn.com/content/v1/5682fafe1115e07a05683289/1657298175422-PRN4EOL3CQEVTZ93N6KP/munch-comp2.gif?format=750w',
            title: 'YUM YUM!!!'
        },
        style: {
            backgroundColor: utilService.getRandomNoteColor()
        }
    },
    {
        id: utilService.makeId(),
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'https://picsum.photos/200/300',
            title: 'Memories'
        },
        style: {
            backgroundColor: utilService.getRandomNoteColor()
        }
    },
    {
        id: utilService.makeId(),
        type: 'NoteImg',
        isPinned: true,
        info: {
            url: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWM3amk1cmQ4Z2FwbDlpN3p4Y3Z2dWF5YXFiaTQ4bWhhZzV3NDR6ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/n03KjzUqXeDRe/giphy.gif',
            title: 'My favorite MEME! 😍'
        },
        style: {
            backgroundColor: utilService.getRandomNoteColor()
        }
    },
    {
        id: utilService.makeId(),
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
        id: utilService.makeId(),
        type: 'NoteVideo',
        isPinned: false,
        info: {
            url: 'https://www.youtube.com/watch?v=QNTeq4QdOsQ',
            title: 'css tips'
        },
        style: {
            backgroundColor: utilService.getRandomNoteColor()
        }
    },
    {
        id: utilService.makeId(),
        type: 'NoteImg',
        isPinned: true,
        info: {
            url: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTRqbHM2dndlNHZkc3J4ZXp2MW0xNno5MGRqNXg3cDJoa29tYWc3ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qvtLuBQ7WVD0ZurSUz/giphy.gif',
            title: ''
        },
        style: {
            backgroundColor: utilService.getRandomNoteColor()
        }
    },
    {
        id: utilService.makeId(),
        type: 'NoteImg',
        isPinned: true,
        info: {
            url: 'https://i.pinimg.com/564x/61/f6/6d/61f66da611c9a8cefca49499d3c074c4.jpg',
            title: ''
        },
        style: {
            backgroundColor: utilService.getRandomNoteColor()
        }
    },
    {
        id: utilService.makeId(),
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'Todays main quest',
            todos: [
                { txt: 'go to the gym', doneAt: null },
                { txt: 'buy groceries for dinner', doneAt: 187111111 },
                { txt: 'finish your book', doneAt: 187111111 },
                { txt: 'cook dinner', doneAt: 187111111 },
                { txt: 'no going to bed until everything done', doneAt: 187111111 },
            ]
        },
        style: {
            backgroundColor: utilService.getRandomNoteColor()
        }
    },
    {
        id: utilService.makeId(),
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'Project missions:',
            todos: [
                { txt: 'create mood board', doneAt: null },
                { txt: 'create a document with detailed information about the project', doneAt: 187111111 },
                { txt: 'organize what is important, crucial and nice to have', doneAt: 187111111 },
                { txt: 'make low fidelity wireframe', doneAt: 187111111 },
            ]
        },
        style: {
            backgroundColor: utilService.getRandomNoteColor()
        }
    },
    {
        id: utilService.makeId(),
        type: 'NoteImg',
        isPinned: false,
        info: {
            title: 'mmm coffee...',
            url: 'https://i.pinimg.com/564x/cf/49/a8/cf49a823bb4062a3329e2e22becf0cbf.jpg'
        },
        style: {
            backgroundColor: utilService.getRandomNoteColor()
        }
    },
    {
        id: utilService.makeId(),
        type: 'NoteImg',
        isPinned: false,
        info: {
            title: 'cool arrows',
            url: 'https://i.pinimg.com/564x/fd/21/0f/fd210f348dc0dfd0485e09b3ad5b448f.jpg'
        },
        style: {
            backgroundColor: utilService.getRandomNoteColor()
        }
    },
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

function addTodo(noteId){
    return storageService.get(NOTE_KEY, noteId)
        .then((noteToAdd) =>{
            const newTodo = {txt: '', doneAt: null}
            noteToAdd.info.todos.push(newTodo)
            return storageService.post(NOTE_KEY,noteToAdd)
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
        type: 'NoteTxt',
        createdAt: new Date().getDate(),
        isPinned: false,
        style: {
            backgroundColor: utilService.getRandomNoteColor()
        },
        info: {
            txt: '',
            title: '',
            todos: [],
            url: '',
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
            console.log(noteToToggle)
            noteToToggle.isPinned = !noteToToggle.isPinned
            return storageService.put(NOTE_KEY, noteToToggle)
        })
}

function changeNoteColor(noteId, newColor) {
    return storageService.get(NOTE_KEY, noteId)
        .then(note => {
            if (!note) {
                throw new Error("Note not found...")
            }
            note.style.backgroundColor = newColor
            return storageService.put(NOTE_KEY, note)
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

