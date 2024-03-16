function NoteColor({ selectedColor, handleColorChange }) {
    const colorOptions = ['#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF']

    return (
        <div className="color-picker">
            {colorOptions.map(color => (
                <button key={color}
                        style={{
                            backgroundColor: color,
                            width: '20px',
                            height: '20px',
                            margin: '5px',
                            border: color === selectedColor ? '2px solid black' : '1px solid grey',
                            cursor: 'pointer'
                        }}
                        onClick={() => handleColorChange(color)} />
            ))}
        </div>
    )
}
