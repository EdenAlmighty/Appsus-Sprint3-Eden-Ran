
export function NoteVideo({ videoId }) {
    return (
        <div className="video-container">
            <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allowFullScreen
            ></iframe>
        </div>
    );
}