const { useState, useEffect, Fragment } = React
const { Link } = ReactRouterDOM
const { useNavigate } = ReactRouter

import { mailService } from "../services/mail.service.js"

export function MailPreview({ mail, onSetRead, onRemoveMail, onStarMail, expandedRowId, setExpandedRowId, setIsDetails, setSelectedMail }) {
    const navigate = useNavigate()

    const min = 1000 * 60
    const hour = min * 60
    const day = hour * 24
    const week = day * 7
    const month = day * 30

    const isExpended = mail.id === expandedRowId
    console.log(isExpended);

    function getFormattedDate(mail) {
        const date = new Date(mail.sentAt)
        if (Date.now() - date < min*2){
        return `Just now...`
        }
        if (Date.now() - date < hour) {
            return `${parseInt((Date.now() - date) / min)} minutes ago..`
        }
        if (Date.now - date < day){
            return `${parseInt(Date.now() - date / hour)} hours ago..`
        }
        if (Date.now - date < week) {
            return `${Date.now() - date - week} days ago..`
        }

        if (Date.now - date < month){
            return `${date.getDate()} ${date.getMonth()} `
        }
        return `${date.getDate()} ${date.getMonth()}.${date.getFullYear()}`
    }

    function getFormattedSubject(mail) {
        if (mail.subject.length > 20) {
            return mail.subject.substring(0, 20)
        }
        return mail.subject
    }

    // function moveToPage(mailId) {
    //     console.log('clicked');
    //     navigate(`/mail/${mailId}`)
    // }

    function moveToPageDetails(mailId) {
        onSetRead(true,mailId)
        navigate(`/mail/${mailId}`)
        // setSelectedMail(mailId)
        // setIsDetails(true)
    }

    function moveToPagePreview(mailId) {
        onSetRead(true,mailId)
        isExpended ? setExpandedRowId('') : setExpandedRowId(mailId)
    }

    function getMailClass(isRead, mailId) {
        let str = ''
        // if (expandedRowId === mailId){
        //     str+= 'expanded-row '
        // }
        str += isRead ? 'row-mail read-mail' : 'row-mail'
        return str

    }

    function getStarClass() {
        return mail.star ? 'star-active circle-icon' : 'circle-icon'
    }

    function getReadIcon() {
        return mail.isRead ? <span class="material-symbols-outlined circle-icon">drafts</span> : <span class="material-symbols-outlined circle-icon">mark_email_unread</span>
    }

    return <Fragment>
        <tr key={mail.id} className={getMailClass(mail.isRead, mail.id)} >
            <td>
                <div className={`mail-actions left`} onClick={() => onStarMail(mail.id)}><span class={`material-symbols-outlined ${getStarClass()}`}>star</span></div>
            </td>
            <td onClick={() => moveToPageDetails(mail.id)} className="list-sender">{mail.sender}</td>
            {/* <td>{mail.from}</td> */}
            <td className="list-subject" onClick={() => moveToPageDetails(mail.id)}>{getFormattedSubject(mail)}</td>
            <td onClick={() => moveToPageDetails(mail.id)} className="mail-body-msg">{mail.body}</td>
            <td className="mail-actions-right-container">
                <button className="mail-actions right" onClick={() => onSetRead(!mail.isRead, mail.id)}>{getReadIcon()}</button>
                <button className="mail-actions right" onClick={() => onRemoveMail(mail.id)}><span className="material-symbols-outlined circle-icon">delete</span></button>
                <button className="mail-actions right btn-preview" onClick={() => moveToPagePreview(mail.id)}>Preview</button>
            </td>
            <td className="mail-date-list" onClick={() => moveToPageDetails(mail.id)}>{getFormattedDate(mail)}</td>
        </tr>
        {
            isExpended && <tr className="mail-info-row-extended">
                <td className="mail-info-row">
                    <h2>From: {mail.from}</h2>
                    <h3>To: {mail.to}</h3>
                    <h4>Subject: {mail.subject}</h4>
                    <section className="mail-body">
                        {mail.body}
                    </section>
                </td>
                <section className="actions-buttons-extended-container">
                    <button className="mail-actions-extended" onClick={() => onSetRead(!mail.isRead, mail.id)}>{getReadIcon()}</button>
                    <button className="mail-actions-extended" onClick={() => onRemoveMail(mail.id)}><span className="material-symbols-outlined circle-icon">delete</span></button>
                    <button className="mail-actions-extended go-to-mail-btn" onClick={() => moveToPageDetails(mail.id)}>Go to mail <i class="fa-solid fa-arrow-right"></i> </button>
                 
                </section>
            </tr>

        }

    </Fragment>
}

