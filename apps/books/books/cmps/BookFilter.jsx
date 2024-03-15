const { useState , useEffect } = React

export function BookFilter({onSetFilter,filterBy}){
    const [filterByToUpdate, setFilterByToUpdate] = useState(filterBy)
    
    useEffect(() => {
        onSetFilter(filterByToUpdate)
    },[filterByToUpdate])

    function onFilter(ev){
        ev.preventDefault()
        onSetFilter(filterByToUpdate)
    }

    function handleChange({ target }){
        let {value, name:field, type} = target
        if (type === 'number') value = +value
        setFilterByToUpdate((prevFilterBy) => ({...prevFilterBy, [field]: value}))
    }

    return <section className="book-filter">
        <h2>Filter Books</h2>
        <form onSubmit={onFilter}>
            <div className="input-container">
            <label htmlFor="title">Title</label>
            <input 
            type="text" 
            name="title" 
            id="title" 
            value={filterByToUpdate.title}
            onChange={handleChange}
            placeholder="By title"
            />
            </div>
            <div className="input-container">
            <label htmlFor="price">Price</label>
            <input 
            type="number" 
            name="price" 
            id="price" 
            onChange={handleChange}
            placeholder="By price"/>
            </div>
            <div className="input-container">
            <label htmlFor="page-count">Page Count</label>
            <input 
            type="number" 
            name="page" 
            id="page-count" 
            onChange={handleChange}
            placeholder="By pages"
            />
            </div>

        </form>
    </section>
}