import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'

const { useEffect, useState } = React

export function NoteIndex() {
    const [notes, setNotes] = useState(null)

    useEffect(() => {
        loadNotes()
    }, [])
    // console.log(notes);
    function loadNotes() {
        noteService.query(notes)
            .then(setNotes)
    }

    if (!notes) return <div>Loading...</div>
    return <section className="note-main-container">
        <h2>Note app</h2>
        <NoteList notes={notes} />
    </section>
}
