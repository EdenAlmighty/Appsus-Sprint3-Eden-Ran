const { useState, useEffect, Fragment } = React

import { mailService } from "../services/mail.service.js"

export function MailPreview({ mail , onSetRead, onRemoveMail }) {

    function getFormattedDate(mail) {
        const date = new Date(mail.sentAt)
        return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
    }

    function setRead(isRead, mailId) {
        onSetRead(isRead, mailId)
            .then((mail) => console.log(mail))
    }

    function getFormattedSubject(mail) {
        if (mail.subject.length > 20) {
            return mail.subject.substring(0, 20)
        }
        return mail.subject
    }

    return <Fragment>
        <td>{mail.sender}</td>
        {/* <td>{mail.from}</td> */}
        <td>{getFormattedSubject(mail)}</td>
        <td>{mail.body}</td>
        <td>{getFormattedDate(mail)}</td>
        <td>
            <button onClick={() => onSetRead(!mail.isRead,mail.id)}>{mail.isRead ? 'Unread' : 'Read'}</button>
            <button onClick={() => onRemoveMail(mail.id)}>Delete</button>
        </td>
    </Fragment>
}