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
        mailService.get(mailId)
            .then((mail) => {
                if (mail.removedAt === null) {
                    mail.removedAt = Date.now()
                    return mailService.save(mail)
                } else return mailService.remove(mailId)
            }).then(loadMails)
    }

    function getMailClass(isRead) {
        return isRead ? 'row-mail read-mail' : 'row-mail'
    }

    function onStarMail(mailId) {
        mailService.get(mailId)
            .then(mail => {
                if (mail.star) {
                    mail.star = false
                } else { 
                    mail.star = true
                }
                return mailService.save(mail)
            }).then(loadMails)
    }

    function moveToPage(mailId) {
        navigate(`/mail/${mailId}`)
    }
    console.log(mails);
    if (!mails) return <div className="loader"><span>III</span></div>
    if (!mails.length) return <div>No Mails</div>
    return <table className="mail-list">
        <span className="total-mails" >Total Mails: {mails.length}</span>
        <tbody>
            {
                mails.map(mail => {
                    return <Fragment key={mail.id}>
                        <tr key={mail.id} className={getMailClass(mail.isRead)} >
                            <MailPreview onClick={() => moveToPage(mail.id)}
                                mail={mail}
                                onSetRead={onSetRead}
                                onRemoveMail={onRemoveMail}
                                onStarMail={onStarMail}
                            />
                        </tr>
                    </Fragment>
                })
            }
        </tbody>
    </table>
}
