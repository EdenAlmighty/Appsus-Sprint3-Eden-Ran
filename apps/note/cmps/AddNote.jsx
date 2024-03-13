import { noteService } from "../services/note.service.js"
const { useEffect, useState } = React

export function AddNote({ onSaveNote }) {
    const [note, setNote] = useState(noteService.getEmptyNote())

    function onAddNote(ev) {
        ev.preventDefault()
        if (!note.info.title || !note.info.txt) return
        onSaveNote(note)
        setNote(noteService.getEmptyNote())
    }

    function handleChange({ target }) {
        let { value, name: field } = target

        setNote(prevNote => {
            return { ...prevNote, info: { ...prevNote.info, [field]: value } }
        })
    }

    return (
        <form onSubmit={onAddNote} >
            <input
                type="text"
                placeholder="Title"
                name="title"
                value={note.info.title}
                onChange={handleChange}
            />
            <input
                placeholder="Take a note..."
                name="txt"
                value={note.info.txt}
                onChange={handleChange}
            />
            <button type="submit">add note</button>
        </form>
    )
}