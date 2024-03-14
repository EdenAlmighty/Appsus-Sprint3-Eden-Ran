import { noteService } from "../services/note.service.js"
const { useEffect, useState } = React

export function AddNote({ onSaveNote }) {
    const [note, setNote] = useState(noteService.getEmptyNote())
    const [cmpType, setCmpType] = useState(null)

    function onAddNote(ev) {
        ev.preventDefault()
        if (!note.info.title || !note.info.txt) return
        onSaveNote(note)
        setNote(noteService.getEmptyNote())
    }


    // function handleChange({ target }) {
    //     let { value, name: field } = target

    //     setNote(prevNote => {
    //         return { ...prevNote, info: { ...prevNote.info, [field]: value } }
    //     })
    // }
    function handleChange({ target }) {
        let { value, name } = target
        if (name === 'cmpType') {
            setCmpType(value)
            setNote(prevNote => ({
                ...prevNote, type: value, info: { ...prevNote.info, [name]: value }
            }))
        } else if (cmpType === 'NoteImg') {
            setNote(prevNote => ({
                ...prevNote,
            info: {
                ...prevNote.info,
                url: value }
            }))
        } else {
            setNote(prevNote => ({
                ...prevNote,
                info: { ...prevNote.info, [name]: value }

            }))
            console.log(cmpType);
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
            {/* <input
                placeholder="Take a note..."
                name="txt"
                onChange={handleChange}
            /> */}
            <section>
                <input type="radio" id="text" name="cmpType" value="text" checked={cmpType === 'text'} onChange={handleChange} />
                <label htmlFor="text">Text</label>

                <input type="radio" id="NoteImg" name="cmpType" value="NoteImg" checked={cmpType === 'NoteImg'} onChange={handleChange} />
                <label htmlFor="NoteImg">Image</label>

                <input type="radio" id="youtube" name="cmpType" value="youtube" checked={cmpType === 'youtube'} onChange={handleChange} />
                <label htmlFor="youtube">YouTube</label>

                <input type="radio" id="todo" name="cmpType" value="todo" checked={cmpType === 'todo'} onChange={handleChange} />
                <label htmlFor="todo">Todo List</label>
            </section>
            <DynamicCmp cmpType={cmpType} name="info" value={note.info} onChange={handleChange} />


            <button type="submit">add note</button>
        </form>
    )
}

//TODO: Make dynCmp
function DynamicCmp({ cmpType, name, value, onChange }) {
    switch (cmpType) {
        case 'NoteImg':
            return (
                <input type="text"
                    placeholder="Paste image URL here..."
                    name={name}
                    // value={'value'}
                    onChange={onChange}
                />)
        case 'youtube':
            return (
                <input type="text"
                    placeholder="Paste YouTube Video URL here..."
                    name={name}
                    onChange={onChange}
                />
            )
        case 'todo':
            return (
                <textarea
                    placeholder="Create Todo List:"
                    name={name}
                    onChange={onChange}
                />
            )
        case 'text':
            return (
                <input
                    type="text"
                    placeholder="Take a note..."
                    name="text"
                    onChange={onChange}
                />
            )
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
