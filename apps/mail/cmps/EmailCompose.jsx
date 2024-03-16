const { useState, useRef, useEffect } = React

import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { LongTxt } from '../../books/books/cmps/LongTxt.jsx'
import { mailService } from '../services/mail.service.js'

export function EmailCompose({ setIsComposing }) {


    const [isExpanded, setIsExpanded] = useState(false)
    const [mailToCompose, setMailToCompose] = useState(mailService.getNewMail())
    const [mailSent, setMailSent] = useState()

    const intervalIdRef = useRef()

    console.log(mailToCompose,isExpanded);

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
        showSuccessMsg(('Email sent'))
        saveMail(mailToCompose)
    }

    console.log(mailToCompose);

    function handleChange({ target }) {
        let { value, name: field } = target
        // console.log(value, field);
        setMailToCompose((prevMailToCompose) => ({ ...prevMailToCompose, [field]: value }))
    }

    function saveMail(mailToCompose) {
        mailService.saveComposedMail(mailToCompose)
        setIsComposing(false)
    }

    function updateMailToCompose() {
        const { subject, to } = mailToCompose
        console.log(subject, to);
        if (subject && to) {
            showSuccessMsg(('Draft saved'))
            mailService.save(mailToCompose)
                .then(mail => {
                    setMailToCompose(prevMailToCompose => ({ ...prevMailToCompose, id: mail.id }))

                    showSuccessMsg('Draft saved')
                })
                
        }
        // saveDraftMail(mailToCompose)
    }

    function onSetCompose(ev){
        ev.preventDefault()
        
        setIsComposing((prevIsComposing) => !prevIsComposing)
    }

    function onSetExpanded(ev){
        ev.preventDefault()
        setIsExpanded((prevIsExpanded) => !prevIsExpanded)
    }



    if (!mailToCompose) return <div>error</div>
    return <section className={`email-compose ${isExpanded ? 'expanded' : ''}`}>
        <div className={`${isExpanded ? 'backdrop-compose' : ''}`}></div>
        <form onSubmit={(ev) => onSubmit(ev)}>
            <div className='email-compose-header'>
                <h2 >New Message</h2>
                <div className="compose-small-actions">
                    <button onClick={(ev) => onSetCompose(ev)}>-</button>
                    <button onClick={(ev) => onSetExpanded(ev)}>+</button>
                </div>
            </div>
            <p>From: {mailToCompose.from}</p>
            <label htmlFor="compose-to-input"></label>
            <textarea type="email"

                id='compose-to-input'
                name='to'
                placeholder='Recipients'
                onChange={handleChange} required
            />
            <label htmlFor="compose-subject-input"></label>
            <textarea type="text"
                id='compose-subject-input'
                name='subject'
                placeholder='Subject'
                onChange={handleChange} required
            />
            <label htmlFor="compose-body-text"></label>
            <textarea type="text"
                id='compose-body-text'
                name='body'
                className={`${isExpanded ? 'input-expanded' : ''}`}
                onChange={handleChange} required
            />
            <button>Send</button>
        </form>
    </section>
}