const { useState } = React

export function AddBookModal({onSubmit,setModalOpen}){
    const [modalInputsToUpdate, setModalInputsToUpdate] = useState(
        {
            price: 0,
            title: '',
            subtitle: ''
        }
    )
    function onSubmitBook(ev){
        ev.preventDefault()
        onSubmit(modalInputsToUpdate)
        setModalInputsToUpdate({
            price: 0,
            title: '',
            subtitle: ''
        })
        setModalOpen()
    }

    function handleChange({target}) {
        let {value, name: field, type} = target
        // console.log(value, field, type);
        if (type === 'number') value = +value
        setModalInputsToUpdate((prevModalInputsToUpdate) => ({...prevModalInputsToUpdate, [field]: value}))
    }
    
    console.log(modalInputsToUpdate);

    return <section className="add-book">
        <form onSubmit={(ev) => onSubmitBook(ev)}>
            <label htmlFor="title-add-booke">Book Title: </label>
                <input 
                type="text" 
                name="title" 
                id="title-add-book" 
                value={modalInputsToUpdate.title}
                onChange={handleChange}
                placeholder="Enter book title"
            />        
            <label htmlFor="subtitle-add-book">Book Subtitle: </label>
                <input 
                type="text" 
                name="subtitle" 
                id="subtitle-add-booke" 
                value={modalInputsToUpdate.subtitle}
                onChange={handleChange}
                placeholder="Enter book subtitle"
            />        
            <label htmlFor="price-add-book">Price</label>
            <input 
            type="number" 
            name="price" 
            id="price-add-book" 
            value={modalInputsToUpdate.price}
            onChange={handleChange}
            placeholder="Enter book price"
            />
            <button>Submit</button>
        </form>
    </section>
        
}

// amount listPrice subtitle title