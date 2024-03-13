

export function MailPreview({ mail }) {
    function getFormattedDate(){
        const date = new Date (mail.sentAt)
        return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
    }

    function getFormattedSubject(){
        if(mail.subject.length > 20){
            return mail.subject.substring(0,20)
        }
        return mail.subject
    }

    return <React.Fragment>
        <td>{mail.sender}</td>
        {/* <td>{mail.from}</td> */}
        <td>{getFormattedSubject()}</td>
        <td>{mail.body}</td>
        <td>{getFormattedDate()}</td>
    </React.Fragment>
}