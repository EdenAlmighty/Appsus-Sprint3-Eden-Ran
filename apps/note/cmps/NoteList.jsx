import { NotePreview } from "./NotePreview.jsx"

const { Link } = ReactRouterDOM

export function NoteList({ notes }) {


    return <section className="note-list-container">
        {/* <div>Notes List</div> */}
        {
            notes.map((note) => <div className="note-card" key={note.id} >
                <NotePreview note={note} />
            </div>)
        }

    </section>
}
