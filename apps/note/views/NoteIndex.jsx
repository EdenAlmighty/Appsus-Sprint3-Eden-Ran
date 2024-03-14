import { noteService } from '../services/note.service.js'

import { NoteList } from '../cmps/NoteList.jsx'
import { AddNote } from '../cmps/AddNote.jsx'

const { useEffect, useState } = React

export function NoteIndex() {
    const [notes, setNotes] = useState(null)

    useEffect(() => {
        loadNotes()
    }, [setNotes])

    function loadNotes() {
        console.log(notes);
        noteService.query(notes)
            .then(setNotes)
    }

    function onSaveNote(note) {
        console.log(note);
        noteService.save(note)
            .then(loadNotes)
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(loadNotes)
    }

    function onDuplicateNote(noteId) {
        noteService.duplicateNote(noteId)
            .then(loadNotes)
    }

    function onToggleNotePin(noteId) {
        noteService.toggleNotePin(noteId)
            .then(loadNotes)
    }

    function handleAction(func, ...args) {
        return () => {
            return func(...args)
                .then(() => loadNotes())
        }
    }

    if (!notes) return <div className="loader"><span>III</span></div>
    return <section className="note-main-container">
        <h2 className="page-title">Note app</h2>
        <AddNote onSaveNote={onSaveNote} />

        <h1>Pinned</h1>

        <NoteList notes={notes.filter(note => note.isPinned)}
            onRemoveNote={onRemoveNote}
            onSaveNote={onSaveNote}
            onDuplicateNote={onDuplicateNote}
            onToggleNotePin={onToggleNotePin}
        />

        <h1>Notes</h1>
        <NoteList notes={notes.filter(note => !note.isPinned)}
            onRemoveNote={onRemoveNote}
            onSaveNote={onSaveNote}
            onDuplicateNote={onDuplicateNote}
            onToggleNotePin={onToggleNotePin}
        />

    </section>
}

// function NoteListView({ notes, handleAction }) {
//     return (
//         <NoteList
//             notes={notes}
//             onRemoveNote={noteId => handleAction(noteService.remove(noteId))}
//             onSaveNote={handleAction(noteService.save)}
//             onDuplicateNote={handleAction(noteService.duplicateNote)}
//             onToggleNotePin={handleAction(noteService.toggleNotePin)}
//         />
//     )
// }