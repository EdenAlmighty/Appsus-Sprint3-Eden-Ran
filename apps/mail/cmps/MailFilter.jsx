const { useState } = React

export function MailFilter({onSetFilter,filterBy}){

    const [filterByToUpdate, setFilterByToUpdate] = useState(filterBy)
    
    function handleChange({ target }){
        console.log(target.value);
    }

    function onFilter(ev){
        ev.preventDefault()
        console.log(ev);
    }
    
    return <section className="mail-filter">
    <h2>Filter Mails</h2>
    <form onSubmit={onFilter}>
        <div className="filter-input-container">
        <label htmlFor="search-email">Title</label>
        <input 
        type="text" 
        name="search-mail" 
        id="search-email" 
        // value={filterByToUpdate.title}
        onChange={handleChange}
        placeholder="By title"
        />
        <button>Search</button>
        </div>
    </form>
</section>
}