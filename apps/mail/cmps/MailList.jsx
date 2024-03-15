const { useState, Fragment } = React
const { Link } = ReactRouterDOM
const { useNavigate } = ReactRouter


import { MailPreview } from "./MailPreview.jsx"
import { mailService } from "../services/mail.service.js"

export function MailList({ mails, loadMails }) {

    // const [mails,setMails] = useState(null)
    const [expandedRowId, setExpandedRowId] = useState('')

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

    if (!mails) return <div className="loader"><span>III</span></div>
    if (!mails.length) return <div>No Mails</div>
    return <section className="mail-list-container">
        <span className="total-mails" >Total Mails: {mails.length}</span>
    <table className="mail-list">
        <tbody>
            {
                mails.map(mail => 
                  
                        
                            <MailPreview 
                                key={mail.id}
                                mail={mail}
                                onSetRead={onSetRead}
                                onRemoveMail={onRemoveMail}
                                onStarMail={onStarMail}
                                setExpandedRowId={setExpandedRowId}
                                expandedRowId={expandedRowId}
                            />
               
                )
            }
        </tbody>
    </table>
    </section>
}
