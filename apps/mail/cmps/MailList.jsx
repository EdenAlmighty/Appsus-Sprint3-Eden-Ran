const { useState, Fragment } = React
const { Link } = ReactRouterDOM
const { useNavigate } = ReactRouter


import { MailPreview } from "./MailPreview.jsx"
import { mailService } from "../services/mail.service.js"

export function MailList({ mails, loadMails }) {

    // const [mails,setMails] = useState(null)

    const navigate = useNavigate()

    function onSetRead(isRead, mailId) {
        return mailService.get(mailId)
            .then(mail => {
                mail.isRead = isRead
                return mailService.save(mail)
            })
            .then(loadMails)

    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(loadMails)
    }

    function getMailClass(isRead) {
        return isRead ? 'row-mail read-mail' : 'row-mail'
    }

    function moveToPage(mailId) {
        navigate(`/mail/${mailId}`)
    }

    if (!mails) return <div className="loader"><span>III</span></div>
    return <table className="mail-list">
        <tbody>
            {
                mails.map(mail => {
                    return <Fragment key={mail.id}>
                        <tr key={mail.id} className={getMailClass(mail.isRead)} >
                            <MailPreview onClick={() => moveToPage(mail.id)}
                                mail={mail}
                                onSetRead={onSetRead}
                                onRemoveMail={onRemoveMail}
                            />
                        
                        {/* <td>
                            <button className="mail-actions" onClick={(ev) => onSetRead(ev,!mail.isRead, mail.id)}>{mail.isRead ? '💌' : '📧'}</button>
                            <button className="mail-actions" onClick={(ev) => onRemoveMail(ev,mail.id)}>🗑️</button>
                        </td> */}
                        </tr>
                    </Fragment>
                })
            }
        </tbody>
    </table>
}
