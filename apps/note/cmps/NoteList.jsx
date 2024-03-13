import { NotePreview } from "./NotePreview.jsx"

const { Link } = ReactRouterDOM

export function NoteList({ notes }) {
    console.log(notes);
    if(!notes) return <div>loading</div>

    return <section className="note-list-container">
        {/* <div>Notes List</div> */}
        {
            notes.map((note) => <div className="note-card" key={note.id} >
                
                <NotePreview note={note} />
                <button>X</button>
            </div>)
        }

    </section>
}
