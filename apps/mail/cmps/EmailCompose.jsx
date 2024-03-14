const { useState, useRef, useEffect } = React

import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { mailService } from '../services/mail.service.js'

export function EmailCompose({ setIsComposing }) {


    const [isExpanded, setIsExpanded] = useState(false)
    const [mailToCompose, setMailToCompose] = useState(mailService.getNewMail())
    const [mailSent, setMailSent] = useState()

    const intervalIdRef = useRef()

    useEffect(() => {
        intervalIdRef.current = setInterval(() => {
            updateMailToCompose()
        }, 5000)

        return () => {
            clearInterval(intervalIdRef.current)
        }
    }, [mailToCompose])

    function onSubmit(ev) {
        console.log('submitted');
        ev.preventDefault()
        // setMailToCompose((prevMailToCompose) => ({...prevMailToCompose, isDraft:false}))
        saveMail(mailToCompose)
    }

    console.log(mailToCompose);

    function handleChange({ target }) {
        let { value, name: field } = target
        // console.log(value, field);
        setMailToCompose((prevMailToCompose) => ({ ...prevMailToCompose, [field]: value }))
    }

    function saveMail() {
        mailService.saveComposedMail(mailToCompose)
        setIsComposing(false)
    }

    function updateMailToCompose() {
        console.log(mailToCompose);
        const { subject, to } = mailToCompose
        if (subject && to) {
            mailService.save(mailToCompose)
                .then(mail => setMailToCompose(prevMailToCompose => ({ ...prevMailToCompose, id: mail.id })))
                .then(() => showSuccessMsg('Draft saved'))
        }
        // saveDraftMail(mailToCompose)
    }
    if (!mailToCompose) return <div>error</div>
    return <section className={`email-compose ${isExpanded ? 'expanded' : ''}`}>
        <div className={`${isExpanded ? 'backdrop-compose' : ''}`}></div>
        <form onSubmit={(ev) => onSubmit(ev)}>
            <div className='email-compose-header'>
                <h2 >New Message</h2>
                <div className="compose-small-actions">
                    <button onClick={() => setIsComposing((prevIsComposing) => !prevIsComposing)}>-</button>
                    <button onClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}>+</button>
                </div>
            </div>
            <p>From: {mailToCompose.from}</p>
            <label htmlFor="compose-to-input"></label>
            <input type="email"

                id='compose-to-input'
                name='to'
                placeholder='Recipients'
                onChange={handleChange}
            />
            <label htmlFor="compose-subject-input"></label>
            <input type="text"
                id='compose-subject-input'
                name='subject'
                placeholder='Subject'
                onChange={handleChange}
            />
            <label htmlFor="compose-body-text"></label>
            <input type="text"
                id='compose-body-text'
                name='body'
                className={`${isExpanded ? 'input-expanded' : ''}`}
                onChange={handleChange}
            />
            <button>Send</button>
        </form>
    </section>
}