const { useState, useEffect } = React

export function MailFolderList({ onSetFilter, filterBy }){

    const [filterByToUpdate, setFilterByToUpdate] = useState(filterBy)
    useEffect(() => {
        onSetFilter(filterByToUpdate)
    },[filterByToUpdate])

    function handleChange(value){
        setFilterByToUpdate({'status' : value})
    }

    return <section className="mail-folder-list">
        <ul className="clean-list mail-folder-list-items">
            <li onClick={() => handleChange('inbox')}>Inbox</li>
            <li onClick={() => handleChange('sent')}>Sent</li>
            <li onClick={() => handleChange('trash')}>Trash</li>
            {/* <li onClick={() => handleChange('draft')}>Draft</li> */}
        </ul>
    </section>
    
}