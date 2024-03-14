import { object } from "prop-types"

const { useState, useEffect } = React

export function MailSort({ sortBy, onSetSort }) {

    const [sortedBy,onSetSortedBy] = useState(sortBy)



    function setSort(field) {
        if (field === 'date') {
            onSetSort({ sentAt: 1 })
            onSetSortedBy({ sentAt: 1 })
        }
        if (field === 'subject') {
            onSetSort({subject: 1})
            onSetSortedBy({subject: 1})
        }
    }

    function onSetDiff({target}){
        if (target.checked){
            const key = (Object.keys(sortedBy))
            onSetSort({[key[0]]:1})
        } else {
            const key = (Object.keys(sortedBy))
            onSetSort({[key[0]]:-1})
        }
    }

    return <section className="mail-sort">

        <button onClick={() => setSort('date')}>Date</button>
        <button onClick={() => setSort('subject')}>Subject</button>
        <label htmlFor="checkbox-ascending"></label>
        <input type="checkbox"
        id="checkbox-ascending"
        onClick={ev => onSetDiff(ev)}
        ></input>

    </section>
}

