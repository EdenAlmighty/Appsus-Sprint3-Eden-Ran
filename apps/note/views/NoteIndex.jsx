import { noteService } from '../services/note.service.js'

import { NoteList } from '../cmps/NoteList.jsx'
import { AddNote } from '../cmps/AddNote.jsx'

const { useEffect, useState } = React

export function NoteIndex() {
    const [notes, setNotes] = useState(null)

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        console.log(notes)
        noteService.query(notes)
            .then(setNotes)
    }

    function onSaveNote(note) {
        console.log(note)
        return noteService.save(note)
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

    function onChangeNoteColor(noteId, newColor) {
        noteService.changeNoteColor(noteId, newColor)
            .then(loadNotes)
    }

    if (!notes) return <div className="loader"><span>III</span></div>

    return <section className="note-main-container">
        <AddNote onSaveNote={onSaveNote} />
        <NoteList notes={notes}
            onRemoveNote={onRemoveNote}
            onSaveNote={onSaveNote}
            onDuplicateNote={onDuplicateNote}
            onToggleNotePin={onToggleNotePin}
            onChangeNoteColor={onChangeNoteColor}
        />
    </section>
}
