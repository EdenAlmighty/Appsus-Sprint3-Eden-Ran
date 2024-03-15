const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouter
const { Link, useSearchParams } = ReactRouterDOM


export function MailFilter({ onSetFilter, filterBy = getFilterFromParams(searchParams) }) {

    const [filterByToUpdate, setFilterByToUpdate] = useState(filterBy)
    const [searchParams, setSearchParams] = useSearchParams()
    // console.log(txt);
    console.log(filterBy);

    useEffect(() => {
        setSearchParams(filterByToUpdate)
        onSetFilter(filterByToUpdate)
    }, [filterByToUpdate])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        console.log(value, field, type)
        console.log(filterBy);
        if (type === 'checkbox') {
            value = target.checked
        }
        console.log(filterByToUpdate);
        setFilterByToUpdate(() => ({ ...filterBy, [field]: value }))
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
            />
        </form>
    </section>
}