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
    console.log(mails);
    if (!mails) return <div className="loader"><span>III</span></div>
    if (!mails.length) return <div>No Mails</div>
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
                        </tr>
                    </Fragment>
                })
            }
        </tbody>
    </table>
}
