import { noteService } from '../services/note.service.js'
import { utilService } from '../../../services/util.service.js'

import { NotePreview } from "./NotePreview.jsx"

const { useState, Fragment, useEffect } = React

export function NoteList({ notes, onRemoveNote, onSaveNote, onDuplicateNote, onToggleNotePin }) {
    const [pinnedNotes, setPinnedNotes] = useState([])
    const [unPinnedNotes, setUnPinnedNotes] = useState([])

    useEffect(() => {
        setPinnedNotes(noteService.getPinnedNotes(notes))
        setUnPinnedNotes(noteService.getUnPinnedNotes(notes))
    }, [notes])

    console.log(notes)

    if (!notes) return <div className="loader"><span>III</span></div>
    return (
        <section className="note-list-container">
            {pinnedNotes.length !== 0 && (
                <Fragment><h2>Pinned Notes</h2>
                    <section className="pinned-notes">
                        {pinnedNotes.map((note) => (
                            <div className="note-card" key={note.id} style={{ backgroundColor: note.style.backgroundColor }}>
                                <NotePreview note={note} onSaveNote={onSaveNote} onToggleNotePin={onToggleNotePin} onRemoveNote={onRemoveNote} onDuplicateNote={onDuplicateNote} isPinned={note.isPinned} />
                            </div>
                        ))}
                    </section>
                </Fragment>
            )}

            {unPinnedNotes.length !== 0 && (
                <Fragment><h2>Notes</h2>
                    <section className="unPinned-notes">
                        {unPinnedNotes.map((note) => (
                            <div className="note-card" key={note.id} style={{ backgroundColor: note.style.backgroundColor }}>
                                <NotePreview note={note} onSaveNote={onSaveNote} onToggleNotePin={onToggleNotePin} onRemoveNote={onRemoveNote} onDuplicateNote={onDuplicateNote} isPinned={note.isPinned} />
                            </div>
                        ))}
                    </section>
                </Fragment>
            )}
        </section>
    )
}

