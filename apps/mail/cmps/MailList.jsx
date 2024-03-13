const { useState } = React

import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails }) {
    console.log(mails);

    if (!mails) return <div className="loader"><span>III</span></div>
    return <section className="mail-list">
        <h2>Inbox Messages</h2>
        <table>
            <tbody>
            {
                mails.map(mail => {
                    return (
                        <tr key={mail.id} onClick={() => setRead(prevRead => !prevRead)}>
                            <MailPreview mail={mail}/>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    </section>
}
