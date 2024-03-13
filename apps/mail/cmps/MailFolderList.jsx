const { useState, useEffect } = React

export function MailFolderList({ onSetFilter, filterBy }){

    const [filterByToUpdate, setFilterByToUpdate] = useState(filterBy)
    useEffect(() => {
        onSetFilter(filterByToUpdate)
    },[filterByToUpdate])

    function handleChange(value){
        console.log( target.value)
    }

    return <section className="mail-folder-list">
        <ul className="clean-list mail-folder-list-items">
            <li onClick={() => handleChange('inbox')}>Inbox</li>
            <li onClick={() => handleChange('inbox')}>Sent</li>
            <li onClick={() => handleChange('inbox')}>Trash</li>
            <li onClick={() => handleChange('inbox')}>Draft</li>
        </ul>
    </section>
    
}