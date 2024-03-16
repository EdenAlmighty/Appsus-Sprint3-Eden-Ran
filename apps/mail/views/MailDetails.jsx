const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { MailFolderList } from "../cmps/MailFolderList.jsx";
import { mailService } from "../services/mail.service.js"

export function MailDetails({ onSetRead, onRemoveMail, onStarMail }) {
    console.log('here');
    const [isLoading, setIsLoading] = useState(true)
    const [mail, setMail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [params.mailId])

    useEffect(() => {
        loadMail()
    }, [onStarMail])

    useEffect(() => {
        loadMail()
    }, [onRemoveMail])

    useEffect(() => {
        loadMail()
    }, [onSetRead])

    function loadMail() {
        setIsLoading(true)
        mailService.get(params.mailId)
            .then(mail => setMail(mail))
            .catch(err => {
                console.log('err', err);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    // function starMail(mailId){
    //     onStarMail(mailId)

    // }

    function getStarClass() {
        return mail.star ? 'star-active circle-icon' : 'circle-icon'
    }

    function getReadIcon() {
        return mail.isRead ? <span class="material-symbols-outlined circle-icon">drafts</span> : <span class="material-symbols-outlined circle-icon">mark_email_unread</span>
    }

    function removeMail(mailId) {
        onRemoveMail(mailId)
        navigate('/mail')
    }


    if (isLoading || !mail) return <div className="loader"><span>III</span></div>

    return <section className="mail-details">

        <div className="mail-details-back-btn">
            <Link to="/mail"><button><span className="material-symbols-outlined circle-icon">navigate_before</span></button></Link>
        </div>
        <section className="mail-details-actions">
            <div className={`mails-details-action-btn`} onClick={() => onStarMail(mail.id)}><span class={`material-symbols-outlined ${getStarClass()}`}>star</span></div>
            <button className="mails-details-action-btn" onClick={() => removeMail(mail.id)}><span className="material-symbols-outlined circle-icon">delete</span></button>
            <button className="mails-details-action-btn" onClick={() => onSetRead(!mail.isRead, mail.id)}>{getReadIcon()}</button>

        </section>
        <section className="mail-details-header">
            <h2>From: {mail.from}</h2>
            <h3>To: {mail.to}</h3>
            <h4>Subject: {mail.subject}</h4>
        </section>
        <section className="mail-body">
            {mail.body}
        </section>
    </section>


}