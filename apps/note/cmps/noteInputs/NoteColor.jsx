export function NoteColor({ selectedColor, handleColorChange, onClose }) {
    const colorOptions = ['#efeff1', '#e9e3d3', '#f5e2dc', '#d3bedb', '#afccdc','#d3e4ec','#b4ded3', '#e2f6d3', '#fff8b8', '#f29f75', '#faafa9']

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
