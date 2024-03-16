import { noteService } from "../services/note.service.js"
const { useEffect, useState, useRef } = React

export function AddNote({ onSaveNote }) {
    const [note, setNote] = useState(noteService.getEmptyNote())
    // const [formValue,setFormValue] = useState({title:'', txt:''})
    const [cmpType, setCmpType] = useState('')
    const inputRef = useRef(null)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
            setCmpType('NoteTxt')
        }
    }, [])

    function onAddNote(ev,elForm) {
        ev.preventDefault()
        if (!cmpType) return
        onSaveNote(note)
            .then(setCmpType('NoteTxt'))
            .then(setNote(noteService.getEmptyNote()))
    }

    console.log(note);

    function handleChangeInfo({ target }) {
        let { value, name } = target
        console.log(value);
        
        // if (name === 'cmpType') {
        //     setCmpType(value)
        //     setNote(prevNote => ({
        //         ...prevNote,
        //         type: value,
        //         info: { ...prevNote.info, [name]: value }
        //     }))
        // } else
         if (cmpType === 'NoteImg' || cmpType === 'NoteVideo') {
            setNote(prevNote => ({
                ...prevNote,
                info: { ...prevNote.info, url: value }
            }))
        } else if (cmpType === 'NoteTodos') {
            const todosArray = value.split(',').map(todo => todo.trim()).filter(todo => todo !== ' ')
            const todosObjects = todosArray.map(todo => ({ txt: todo, checked: false }))
            setNote(prevNote => ({
                ...prevNote,
                info: { ...prevNote.info, todos: todosObjects }
            }))
        } else if (cmpType === 'NoteTxt') {
            setNote(prevNote => ({
                ...prevNote,
                info: { ...prevNote.info, txt: value }
            }))

        }
    }

    function handleChangeTitle({ target }) {
        let { value, name: field, type } = target
        setNote(prevNote => ({ ...prevNote, info: { ...prevNote.info, title: value } }))
        console.log(type, field, value);
    }

    function toggleMainInput(ev) {
        ev.preventDefault()
        setCmpType('NoteTxt')
    }


    return (
        <form className="main-input-container" onSubmit={onAddNote} >
            <input
                type="text"
                placeholder="Title"
                name="title"
                onChange={handleChangeTitle}
                value={note.info.title}
                onClick={((ev) => toggleMainInput(ev))}
            />

            <DynamicCmp cmpType={cmpType} name="info" value={note.info} onChange={handleChangeInfo} inputRef={inputRef} />

            <section className="note-input-container">
                <input type="radio" id="NoteTxt" name="cmpType" value="NoteTxt" checked={cmpType === 'NoteTxt'} onChange={handleChangeInfo} />
                <label htmlFor="NoteTxt"><span className="material-symbols-outlined">text_fields</span></label>

                <input type="radio" id="NoteImg" name="cmpType" value="NoteImg" checked={cmpType === 'NoteImg'} onChange={handleChangeInfo} />
                <label htmlFor="NoteImg"><span className="material-symbols-outlined">photo</span></label>

                <input type="radio" id="NoteVideo" name="cmpType" value="NoteVideo" checked={cmpType === 'NoteVideo'} onChange={handleChangeInfo} />
                <label htmlFor="NoteVideo"><span className="material-symbols-outlined">youtube_activity</span></label>

                <input type="radio" id="NoteTodos" name="cmpType" value="NoteTodos" checked={cmpType === 'NoteTodos'} onChange={handleChangeInfo} />
                <label htmlFor="NoteTodos"><span className="material-symbols-outlined">check_box</span></label>
            </section>


            <button type="submit">add note</button>
        </form>
    )
}

// TODO: Make dynCmp
function DynamicCmp({ cmpType, name, value, onChange, inputRef, handleChangeInfo, onAddNote }) {
    switch (cmpType) {
        case 'NoteImg':
            return (
                <input type="text"
                    placeholder="Paste image URL here..."
                    name={name}
                    onChange={onChange}
                    value={value.url}
                    className="google-keep-input" />)
        case 'NoteVideo':
            return (
                <input type="text"
                    placeholder="Paste YouTube Video URL here..."
                    name={name}
                    onChange={onChange}
                    value={value.url}
                    className="google-keep-input" />)
        case 'NoteTodos':
            return (
                <textarea
                    placeholder="Create Todo List: (separate with commas)"
                    name="info"
                    value={value.todos.map(todo => todo.txt).join(', ')}
                    onChange={onChange}
                    className="google-keep-input" />
            )
        case 'NoteTxt':
            return (
                <input
                    type="text"
                    placeholder="Take a note..."
                    name="text"
                    onChange={onChange}
                    ref={inputRef}
                    value={value.txt}
                    className="google-keep-input" />)
        default:
            return null
    }
}