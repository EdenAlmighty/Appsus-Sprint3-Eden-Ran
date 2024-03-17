import { noteService } from "../services/note.service.js"
const { useEffect, useState, useRef } = React

export function AddNote({ onSaveNote }) {
    const [note, setNote] = useState(noteService.getEmptyNote())
    const [cmpType, setCmpType] = useState('')
    const inputRef = useRef(null)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
            setCmpType('NoteTxt')
        }
    }, [])

    

    function onAddNote(ev) {
        ev.preventDefault()
        if (!cmpType) return
        note.type = cmpType
        onSaveNote(note)
            // .then(setCmpType(''))
            .then(setNote(noteService.getEmptyNote()))
        // .then(setCmpType('NoteTxt'))
        setNote(noteService.getEmptyNote())
    }


    console.log(note);

    function handleChangeInfo({ target }) {
        let { value } = target
        console.log(value);

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

    function onSetCmpType(cmpType){
        setCmpType(cmpType)
        setNote(prevNote => ({...prevNote, type: cmpType}))
        setNote(prevNote => ({...prevNote , info: {
            txt: '',
            title: '',
            todos: [],
            url: '',
        }}))
        
    }


    return (

        <form className="main-input-container" onSubmit={onAddNote} >
            <input
                className="google-keep-input top"
                type="text"
                placeholder="Title"
                name="title"
                onChange={handleChangeTitle}
                value={note.info.title}
                onClick={((ev) => toggleMainInput(ev))}
            />

            <DynamicCmp cmpType={cmpType} name="info" value={note.info} onChange={handleChangeInfo} inputRef={inputRef}
            />

            <section className="note-input-container bottom">
                <input type="radio" id="NoteTxt" name="cmpType" value="NoteTxt" checked={cmpType === 'NoteTxt'} onChange={handleChangeInfo} onClick={() => onSetCmpType('NoteTxt')} />
                <label htmlFor="NoteTxt"><span className="material-symbols-outlined">text_fields</span></label>

                <input type="radio" id="NoteImg" name="cmpType" value="NoteImg" checked={cmpType === 'NoteImg'} onChange={handleChangeInfo} onClick={() => onSetCmpType('NoteImg')} />
                <label htmlFor="NoteImg"><span className="material-symbols-outlined">photo</span></label>

                <input type="radio" id="NoteVideo" name="cmpType" value="NoteVideo" checked={cmpType === 'NoteVideo'} onChange={handleChangeInfo} onClick={() => onSetCmpType('NoteVideo')}/>
                <label htmlFor="NoteVideo"><span className="material-symbols-outlined">youtube_activity</span></label>

                <input type="radio" id="NoteTodos" name="cmpType" value="NoteTodos" checked={cmpType === 'NoteTodos'} onChange={handleChangeInfo} onClick={() => onSetCmpType('NoteTodos')}/>
                <label htmlFor="NoteTodos"><span className="material-symbols-outlined">check_box</span></label>
                <button className="note-submit" type="submit"><span class="material-symbols-outlined">task_alt</span></button>
            </section>

        </form>
    )
}


// TODO: Make dynCmp
function DynamicCmp({ cmpType, name, value, onChange, inputRef }) {
    switch (cmpType) {
        case 'NoteImg':
            return (
                <input type="text"
                    name={name}
                    placeholder="Paste image URL here..."
                    onInput={onChange}
                    value={value.url}
                    className="google-keep-input" />)
        case 'NoteVideo':
            return (
                <input type="text"
                    placeholder="Paste YouTube Video URL here..."
                    name={name}
                    onInput={onChange}
                    value={value.url}
                    className="google-keep-input" />)
        case 'NoteTodos':
            return (
                <textarea
                    placeholder="Create Todo List: (separate with commas)"
                    name="info"
                    value={value.todos.map(todo => todo.txt).join('  , ')}
                    onInput={onChange}
                    className="google-keep-input" />
            )
        case 'NoteTxt':
            return (
                <input
                    type="text"
                    placeholder="Take a note..."
                    name="text"
                    onInput={onChange}
                    // ref={inputRef}
                    value={value.txt}
                    className="google-keep-input" />)
        default:
            break
    }

}
