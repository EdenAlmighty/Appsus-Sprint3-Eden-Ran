const { useState, Fragment, useEffect } = React
const { Link } = ReactRouterDOM
const { useNavigate, useParams } = ReactRouter



import { MailPreview } from "./MailPreview.jsx"
import { MailDetails } from "../views/MailDetails.jsx"
import { mailService } from "../services/mail.service.js"
import { LongTxt } from "../../books/books/cmps/LongTxt.jsx"
import { showSuccessMsg } from "../../../services/event-bus.service.js"


export function MailList({ mails, loadMails , onSetRead,onRemoveMail,onStarMail}) {

    // const [mails,setMails] = useState(null)
    const [expandedRowId, setExpandedRowId] = useState('')
    const [isDetails, setIsDetails] = useState(false)
    const [selectedMail, setSelectedMail] = useState(false)

    const navigate = useNavigate()
    const params = useParams()
    console.log(params);

    useEffect(() => {
        if (params.mailId) {
            setIsDetails(true)
        }
    }, [mails])



    function moveToPage(mailId) {
        navigate(`/mail/${mailId}`)
    }

    console.log(params);

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
    


