import { object } from "prop-types"
const { Link, useSearchParams } = ReactRouterDOM


const { useState, useEffect } = React

export function MailSort({ sortBy, onSetSort }) {

    const [sortedBy,onSetSortedBy] = useState(sortBy)



    function setSort(field) {
        if (field === 'date') {

            sortBy.sentAt === 1 ? onSetSort({ sentAt: -1 }) : onSetSort({ sentAt: 1 })
            sortBy.sentAt === 1 ? onSetSortedBy({ sentAt: -1 }) : onSetSortedBy({ sentAt: 1 })
        }
        if (field === 'subject') {
            sortBy.subject === 1 ?  onSetSort({subject: -1}) :  onSetSort({subject: 1})
            sortBy.subject === 1 ?  onSetSortedBy({subject: -1}) :  onSetSortedBy({subject: 1})
        }
        if (field === 'sender') {
            sortBy.sender === 1 ?  onSetSort({sender: -1}) :  onSetSort({sender: 1})
            sortBy.sender === 1 ?  onSetSortedBy({sender: -1}) :  onSetSortedBy({sender: 1})
        }
    }

    return <section className="mail-sort">

        <button className="sort-btn" onClick={() => setSort('sender')}>Sender {sortBy.sender ? (sortBy.sender === 1 ? <i class="fa-solid fa-arrow-down"></i> : <i class="fa-solid fa-arrow-up"></i>) : '' }</button>
        <button className="sort-btn" onClick={() => setSort('date')}>Date {sortBy.sentAt ? (sortBy.sentAt === 1 ? <i class="fa-solid fa-arrow-down"></i> : <i class="fa-solid fa-arrow-up"></i> ): '' }</button>
        <button className="sort-btn" onClick={() => setSort('subject')}>Subject {sortBy.subject ? (sortBy.subject === 1 ? <i class="fa-solid fa-arrow-down"></i> : <i class="fa-solid fa-arrow-up"></i>) : '' }</button>
        <label htmlFor="checkbox-ascending"></label>

    </section>
}

