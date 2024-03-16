export function NoteColor({ selectedColor, handleColorChange, onClose }) {
    const colorOptions = ['#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF']

    return (
        <div className="color-picker-popup">
            <div className="color-picker">
                {colorOptions.map(color => (
                    <button key={color}
                        style={{
                            backgroundColor: color,
                            width: '40px', 
                            height: '40px',
                            margin: '10px',
                            borderRadius: '50%',
                            border: color === selectedColor ? '2px solid black' : '1px solid grey',
                            cursor: 'pointer'
                        }}
                        onClick={() => {handleColorChange(color)}} />
                ))}
            </div>
            <button onClick={onClose} className="close-btn">Close</button>
        </div>
    )
}
