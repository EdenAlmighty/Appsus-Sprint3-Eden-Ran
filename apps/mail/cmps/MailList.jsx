const { useState } = React

import { MailPreview } from "./MailPreview.jsx"
import { mailService } from "../services/mail.service.js"

export function MailList({ mails, loadMails }) {

    // const [mails,setMails] = useState(null)

    function onSetRead(isRead, mailId) {
        return mailService.get(mailId)
            .then(mail => {
                mail.isRead = isRead
                return mailService.save(mail)
            })
            .then(loadMails)
            
    }

    function onRemoveMail(mailId){
        mailService.remove(mailId)
            .then(loadMails)
    }

    function getMailClass(isRead) {
        return isRead ? 'row-mail read-mail' : 'row-mail'
    }

    if (!mails) return <div className="loader"><span>III</span></div>
    return <table className="mail-list">
        <tbody>
            {
                mails.map(mail => {
                    return <tr key={mail.id} className={getMailClass(mail.isRead)}>
                        <MailPreview
                            mail={mail}
                            onSetRead={onSetRead}
                            onRemoveMail={onRemoveMail}
                        />
                    </tr>
                })

            }
        </tbody>
    </table>
}
