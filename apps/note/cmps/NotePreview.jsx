const { useState, useEffect, useRef } = React

import { noteService } from "../services/note.service.js"

import { NoteVideo } from "./noteTypes/NoteVideo.jsx"

export function NotePreview({ note }) {
    const [editing, setEditing] = useState(false)
    const [content, setContent] = useState('')

    const [editedNote, setEditedNote] = useState(note)

    function handleChangeInfo({ target }) {
        setEditedNote((prevEditedNote) => ({ ...prevEditedNote, info: { txt: target.innerText } }))
        saveUpdatedNote()
    }

    function saveUpdatedNote() {
        noteService.save(editedNote)
    }


    function getVideoFromUrl(value){
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
            console.log(videoId);
            currContent = videoId ? <NoteVideo videoId={videoId}/> : 'invalid id' 
            break
        default:
            currContent = note.info.title
            break
    }

    return <article className='note-preview-container '>
        <h1 className='note-card-title'>{note.info.title}</h1>
        <blockquote
            suppressContentEditableWarning
            contentEditable="true"
            onInput={(ev) => handleChangeInfo(ev)}>
            {currContent}
        </blockquote>
    </article>
}