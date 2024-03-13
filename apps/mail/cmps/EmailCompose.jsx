const { useState, useRef, useEffect } = React

import { mailService } from '../services/mail.service.js'

export function EmailCompose() {


    const [mailToCompose, setMailToCompose] = useState(mailService.getNewMail())
    console.log(mailToCompose);

    const intervalIdRef = useRef()

    useEffect(() => {
        intervalIdRef.current = setInterval(() => {
            updateMailToCompose()
        },5000)

        return () => {
            clearInterval(intervalIdRef.current)
        }
    },[mailToCompose])

    function onSubmit() {

    }

    function handleChange({target}){
        let {value, name: field} = target
        console.log(value,field);
        setMailToCompose((prevMailToCompose) => ({...prevMailToCompose,[field]:value}))
    }

    function updateMailToCompose(){
        console.log(mailToCompose);
        // saveDraftMail(mailToCompose)
    }

    return <section className="email-compose">
        <form onClick={onSubmit}>
            <p>From: {mailToCompose.from}</p>
            <label htmlFor="compose-to-input"></label>
            <input type="text"
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
            onChange={handleChange}
            />
        </form>
    </section>
}