const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./views/About.jsx"
import { Home } from "./views/Home.jsx"
import { MailIndex } from "./apps/mail/views/MailIndex.jsx"
import { MailDetails } from "./apps/mail/views/MailDetails.jsx"
import { NoteIndex } from "./apps/note/views/NoteIndex.jsx"



export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            {/* <main className="full main-layout"> */}
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/about" element={<About />} />
                <Route path="/note" element={<NoteIndex />} />


                <Route path="/mail" element={<MailIndex />}/>
                    {/* <Route path="/mail" element={<MailIndex />} /> */}
                    <Route path="/mail/:mailId" element={< MailDetails />} />
                    {/* <Route path="/mail/:txt" element = {<MailIndex/>}/> */}

              
            </Routes>
            {/* </main> */}
        </section>
    </Router>
}
