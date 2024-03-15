const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

export function MailDetails() {
    console.log('here');
    const [isLoading, setIsLoading] = useState(true)
    const [mail, setMail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [params.mailId])

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
    
    if (isLoading) return <div className="loader"><span>III</span></div>
    
    return <section className="mail-details">
        <div className="mail-details actions">
            <Link to="/mail"><button>Back</button></Link>
        </div>
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