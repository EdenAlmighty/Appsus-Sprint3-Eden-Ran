const { useState , useEffect } = React

export function MailFilter({ onSetFilter, filterBy }) {

    const [filterByToUpdate, setFilterByToUpdate] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToUpdate)
    },[filterByToUpdate])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        console.log(value, field, type)
        if (type === 'checkbox') {
            value = target.checked
        }
        setFilterByToUpdate((prevfilterByToUpdate) => ({ ...prevfilterByToUpdate, [field]: value }))
    }


function onFilter(ev) {
    ev.preventDefault()
    onSetFilter(filterByToUpdate)
}

return <section className="mail-filter">
    <form onSubmit={onFilter}>
        <div className="filter-input-container">
            <label htmlFor="search-email" className="search-email-label"></label>
            <input
                type="text"
                name="txt"
                id="search-email"
                value={filterByToUpdate.txt}
                onChange={handleChange}
                placeholder="Search mail"
            />
           </div>
            <label htmlFor="search-isread">Read</label>
            <input
                type="checkbox"
                name="isRead"
                id="search-isread"
                value={filterByToUpdate.isRead}
                onChange={handleChange}
            // placeholder="By title"
            />
    </form>
</section>
}