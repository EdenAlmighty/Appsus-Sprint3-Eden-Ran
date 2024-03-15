import { noteService } from "../services/note.service.js"
const { useEffect, useState } = React

export function AddNote({ onSaveNote }) {
    const [note, setNote] = useState(noteService.getEmptyNote())
    const [cmpType, setCmpType] = useState('null')

    function onAddNote(ev) {
        ev.preventDefault()
        if (!cmpType) return
        onSaveNote(note)
        setNote(noteService.getEmptyNote())
        setCmpType(null)
    }

    function handleChange({ target }) {
        let { value, name } = target
        if (name === 'cmpType') {
            setCmpType(value)
            setNote(prevNote => ({
                ...prevNote,
                type: value,
                info: { ...prevNote.info, [name]: value }
            }))
        } else if (cmpType === 'NoteImg' || cmpType === 'NoteVideo') {
            setNote(prevNote => ({
                ...prevNote,
                info: { ...prevNote.info, url: value }
            }))
        } else if (cmpType === 'NoteTodos') {
            setNote(prevNote => ({
                ...prevNote,
                info: { ...prevNote.info, todos: value }
            }))
        } else if (cmpType === 'NoteTxt') {
            setNote(prevNote => ({
                ...prevNote,
                info: { ...prevNote.info, txt: value }
            }))

        }
    }


    return (
        <form onSubmit={onAddNote} >
            {/* <input
                type="text"
                placeholder="Title"
                name="title"
                onChange={handleChange}
            /> */}
            <section>
                <input type="radio" id="NoteTxt" name="cmpType" value="NoteTxt" checked={cmpType === 'NoteTxt'} onChange={handleChange} />
                <label htmlFor="NoteTxt">Text</label>

                <input type="radio" id="NoteImg" name="cmpType" value="NoteImg" checked={cmpType === 'NoteImg'} onChange={handleChange} />
                <label htmlFor="NoteImg">Image</label>

                <input type="radio" id="NoteVideo" name="cmpType" value="NoteVideo" checked={cmpType === 'NoteVideo'} onChange={handleChange} />
                <label htmlFor="NoteVideo">YouTube</label>

                <input type="radio" id="NoteTodos" name="cmpType" value="NoteTodos" checked={cmpType === 'NoteTodos'} onChange={handleChange} />
                <label htmlFor="NoteTodos">Todo List</label>
            </section>
            <DynamicCmp cmpType={cmpType} name="info" value={note.info} onChange={handleChange} />


            <button type="submit">add note</button>
        </form>
    )
}

//TODO: Make dynCmp
function DynamicCmp({ cmpType, name, value, onChange }) {
    switch (cmpType) {
        case 'NoteImg' || 'NoteVideo':
            return (
                <input type="text"
                    placeholder="Paste image URL here..."
                    name={name}
                    onChange={onChange} />)
        case 'NoteVideo':
            return (
                <input type="text"
                    placeholder="Paste YouTube Video URL here..."
                    name={name}
                    onChange={onChange} />)
        case 'NoteTodos':
            return (
                <textarea
                    placeholder="Create Todo List:"
                    name={name}
                    onChange={onChange} />)
        case 'NoteTxt':
            return (
                <input
                    type="text"
                    placeholder="Take a note..."
                    name="text"
                    onChange={onChange} />)
        default:
            return null

    }
}

// function DynamicCmp(props) {
//     switch (props.cmpType) {
//         case 'Select':
//             return <RateSelectInput {...props} />;
//         case 'TextBox':
//             return <RateTextInput {...props} />;
//         case 'Stars':
//             return <RateStarsInput {...props} />;
//         default:
//             return null;
//     }
// }
