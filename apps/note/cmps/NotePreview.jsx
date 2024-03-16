const { useState, Fragment, useEffect, useRef } = React

import { noteService } from "../services/note.service.js"

import { NoteVideo } from "./noteTypes/NoteVideo.jsx"

export function NotePreview({ note, onSaveNote, onToggleNotePin, onRemoveNote, onDuplicateNote, isPinned }) {
    const [content, setContent] = useState('NoteTxt')
    const noteCardClasses = `material-symbols-outlined notes ${isPinned ? 'active-pin' : ''}`


    const [editedNote, setEditedNote] = useState(note)


    function handleChangeTitle(ev) {
        const newTitle = ev.target.innerText
        setEditedNote(prevEditedNote => ({
            ...prevEditedNote,
            info: { ...prevEditedNote.info, title: newTitle }
        }))
        saveUpdatedNote() 
    }

    function handleChangeInfo({ target }) {
        setEditedNote((prevEditedNote) => ({ ...prevEditedNote, info: { txt: target.innerText } }))
        saveUpdatedNote()
    }

    function saveUpdatedNote() {
        noteService.save(editedNote)
    }


    function getVideoFromUrl(value) {
        const videoId = value.match(/(?:youtu\.be\/|youtube\.com\/(?:.*[\?&]v=|.*\/embed\/|.*\/v\/))([\w-]{11})/)
        return videoId ? videoId[1] : null
    }

    function handleChange(idx) {
        const updatedTodo = [...note.info.todos]
        updatedTodo[idx].checked = !updatedTodo[idx].checked
        setContent(updatedTodo)
    }
    let currContent
    const { info } = note
    //TODO: Refactor to Dynamic Cmp
    switch (note.type) {
        case 'NoteTxt':
            currContent = note.info.txt
            break
        case 'NoteImg':
            currContent = <img src={note.info.url} alt={note.info.title} />
            break
        case 'NoteTodos':
            currContent = (
                <ul className="clean-list">
                    {
                        note.info.todos.map((todo, idx) => (
                            <li key={idx}>
                                <input
                                    type="checkbox"
                                    checked={todo.checked || false}
                                    onChange={() => handleChange(idx)}
                                />
                                {todo.txt}
                            </li>
                        ))
                    }
                </ul>
            )
            break
        case 'NoteVideo':
            const videoId = getVideoFromUrl(note.info.url)
            console.log(videoId)
            currContent = videoId ? <NoteVideo videoId={videoId} /> : 'invalid id'
            break
        default:
            currContent = note.info.title
            break
    }

    return <Fragment >
        <div onClick={() => { onToggleNotePin(note.id) }}><span className={noteCardClasses}>keep</span></div>
        <h1 className='note-card-title'
            suppressContentEditableWarning
            contentEditable="true"
            onInput={handleChangeTitle}>
            {note.info.title}</h1>
        <blockquote
            suppressContentEditableWarning
            contentEditable="true"
            onInput={(ev) => handleChangeInfo(ev)}>
            {currContent}
        </blockquote>

        <section className="action-btns flex">
            <div onClick={() => { onRemoveNote(note.id) }}><span className="material-symbols-outlined notes">delete</span></div>
            <div onClick={() => { onDuplicateNote(note.id) }}><span className="material-symbols-outlined notes">content_copy</span></div>
        </section>
        {/* <div onClick={onRemoveNote}>Delete</div>
        <div onClick={onDuplicateNote}>Duplicate</div> */}
    </Fragment>
}