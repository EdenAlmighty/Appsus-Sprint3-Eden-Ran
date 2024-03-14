import { noteService } from '../services/note.service.js'
import { utilService } from '../../../services/util.service.js';

import { NotePreview } from "./NotePreview.jsx"


export function NoteList({ notes, onRemoveNote, onSaveNote, onDuplicateNote, onToggleNotePin}) {
    console.log(notes);
    if (!notes) return <div>loading</div>

    return <section className="note-list-container">
        {
            notes.map((note) => <div className="note-card" key={note.id} style={{ backgroundColor: utilService.getRandomNoteColor()}}>

                <NotePreview note={note} onSaveNote={onSaveNote}/>
                <button onClick={() => {onRemoveNote(note.id)}}>❌</button>
                <button onClick={() => {onDuplicateNote(note.id)}}>🆕</button>
                <button onClick={() => {onToggleNotePin(note.id)}}>📌</button>
            </div>)
        }
    </section>
}
