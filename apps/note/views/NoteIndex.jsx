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
        noteService.query(notes)
            .then(setNotes)
    }

    function onSaveNote(note){
        console.log(note);
        noteService.save(note)
        .then(loadNotes)
    }

    if (!notes) return <div>Loading...</div>
    return <section className="note-main-container">
        <h2 className="page-title">Note app</h2>
        {/* <input type="text" placeholder="Take a note..." /> */}
        <AddNote onSaveNote={onSaveNote}/>
        <NoteList notes={notes} />
    </section>
}
