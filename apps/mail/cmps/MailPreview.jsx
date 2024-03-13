const { useState, useEffect, Fragment } = React
const { Link } = ReactRouterDOM
const { useNavigate } = ReactRouter


import { mailService } from "../services/mail.service.js"

export function MailPreview({ mail, onSetRead, onRemoveMail }) {

    const navigate = useNavigate()

    function getFormattedDate(mail) {
        const date = new Date(mail.sentAt)
        return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
    }

    function getFormattedSubject(mail) {
        if (mail.subject.length > 20) {
            return mail.subject.substring(0, 20)
        }
        return mail.subject
    }

    function moveToPage(mailId) {
        navigate(`/mail/${mailId}`)
    }

    return <Fragment>
        <td onClick={() => moveToPage(mail.id)}>{mail.sender}</td>
        {/* <td>{mail.from}</td> */}
        <td onClick={() => moveToPage(mail.id)}>{getFormattedSubject(mail)}</td>
        <td onClick={() => moveToPage(mail.id)}>{mail.body}</td>
        <td onClick={() => moveToPage(mail.id)}>{getFormattedDate(mail)}</td>
        <td>
            <button className="mail-actions" onClick={() => onSetRead(!mail.isRead, mail.id)}>{mail.isRead ? '💌' : '📧'}</button>
            <button className="mail-actions" onClick={() => onRemoveMail(mail.id)}>🗑️</button>
        </td>
    </Fragment>
}