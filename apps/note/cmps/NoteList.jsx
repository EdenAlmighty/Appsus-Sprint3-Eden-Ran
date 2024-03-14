import { NotePreview } from "./NotePreview.jsx"

const { Link } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote, onSaveNote, onDuplicateNote, onToggleNotePin}) {
    console.log(notes);
    if (!notes) return <div>loading</div>

    return <section className="note-list-container">
        {/* <div>Notes List</div> */}
        {
            notes.map((note) => <div className="note-card" key={note.id} >

                <NotePreview note={note} onSaveNote={onSaveNote}/>
                <button onClick={() => {onRemoveNote(note.id)}}>❌</button>
                <button onClick={() => {onDuplicateNote(note.id)}}>🆕</button>
                <button onClick={() => {onToggleNotePin(note.id)}}>📌</button>
            </div>)
        }

    </section>
}
