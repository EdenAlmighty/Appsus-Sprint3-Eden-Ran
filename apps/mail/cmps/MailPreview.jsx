const { Fragment } = React


export function MailPreview({ mails, onSetRead }) {
    function getFormattedDate(mail) {
        const date = new Date(mail.sentAt)
        return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
    }

    function setRead(isRead,mailId){
        onSetRead(isRead,mailId)
    }

    function getFormattedSubject(mail) {
        if (mail.subject.length > 20) {
            return mail.subject.substring(0, 20)
        }
        return mail.subject
    }

    function getMailClass(isRead){
        return isRead ? 'row-mail read-mail' : 'row-mail'
    }

    return <Fragment>
        {
            mails.map(mail => {
                return (<tr key={mail.id} onClick={() => setRead(true,mail.id)} className={getMailClass(mail.isRead)}>
                    <td>{mail.sender}</td>
                    {/* <td>{mail.from}</td> */}
                    <td>{getFormattedSubject(mail)}</td>
                    <td>{mail.body}</td>
                    <td>{getFormattedDate(mail)}</td>
                </tr>
                )
            })
        }
    </Fragment>
}