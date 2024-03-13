const { useState } = React

export function NotePreview({ note }) {
    const [content, setContent] = useState('')

    let currContent

    function handleChange(idx) {
        const updatedTodo = [...note.info.todos]
        updatedTodo[idx].checked = !updatedTodo[idx].checked
        setContent(updatedTodo)
    }

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
        default:
            currContent = note.info.title
            break
    }

    return <article className='note-preview-container '>
        <h1 className='note-card-title'>{note.info.title}</h1>
        <blockquote
            contentEditable="true"
            onInput={(ev) => setContent(ev.target.innerText)}>
            {currContent}
        </blockquote>

        {/* <cite
            contentEditable="true">-- Write your own name here
        </cite> */}
    </article>
}