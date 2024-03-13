const { useState } = React

import { MailPreview } from "./MailPreview.jsx"
import { mailService } from "../services/mail.service.js"

export function MailList({ mails ,loadMails}) {

    function onSetRead(isRead,mailId){
        mailService.get(mailId)
            .then(mail => {
                mail.isRead = isRead
                return mailService.save(mail)
            })
            .then(loadMails)
    }

    if (!mails) return <div className="loader"><span>III</span></div>
    return <table className="mail-list">
            <tbody>
                {
                    <MailPreview 
                    mails={mails}
                    onSetRead = {onSetRead}
                     />
                }
            </tbody>
        </table>
}
